"use strict";

// Void elements are elements without inner content,
// which close themselves regardless of trailing slash.
// E.g. both <br> and <br /> are self-closing.
var VOID_ELEMENTS = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

// Block elements trigger newlines where they're inserted,
// and are always safe places for truncation.
var BLOCK_ELEMENTS = ["address", "article", "aside", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tfoot", "ul", "video"];

var NEWLINE_CHAR_CODE = 10; // '\n'
var EXCLAMATION_CHAR_CODE = 33; // '!'
var DOUBLE_QUOTE_CHAR_CODE = 34; // '"'
var AMPERSAND_CHAR_CODE = 38; // '&'
var SINGLE_QUOTE_CHAR_CODE = 39; // '\''
var FORWARD_SLASH_CHAR_CODE = 47; // '/'
var SEMICOLON_CHAR_CODE = 59; // ';'
var TAG_OPEN_CHAR_CODE = 60; // '<'
var EQUAL_SIGN_CHAR_CODE = 61; // '='
var TAG_CLOSE_CHAR_CODE = 62; // '>'

var CHAR_OF_INTEREST_REGEX = /[<&\n\ud800-\udbff]/;

var TRIM_END_REGEX = /\s+$/;

/**
 * Clips a string to a maximum length. If the string exceeds the length, it is truncated and an
 * indicator (an ellipsis, by default) is appended.
 *
 * In detail, the clipping rules are as follows:
 * - The resulting clipped string may never contain more than maxLength characters. Examples:
 *   - clip("foo", 3) => "foo"
 *   - clip("foo", 2) => "f…"
 * - The indicator is inserted if and only if the string is clipped at any place other than a
 *   newline. Examples:
 *   - clip("foo bar", 5) => "foo …"
 *   - clip("foo\nbar", 5) => "foo"
 * - If the html option is true and valid HTML is inserted, the clipped output *must* also be valid
 *   HTML. If the input is not valid HTML, the result is undefined (not to be confused with JS'
 *   "undefined" type; some errors might be detected and result in an exception, but this is not
 *   guaranteed).
 *
 * @param string The string to clip.
 * @param maxLength The maximum length of the clipped string in number of characters.
 * @param options Optional options object. May contain the following property:
 *                breakWords - By default, we try to break only at word boundaries. Set to true if
 *                             this is undesired.
 *                html - Set to true if the string is HTML-encoded. If so, this method will take
 *                       extra care to make sure the HTML-encoding is correctly maintained.
 *                imageWeight - The amount of characters to assume for images. This is used
 *                              whenever an image is encountered, but also for SVG and MathML
 *                              content. Default: 2.
 *                indicator - The string to insert to indicate clipping. Default: "…".
 *                maxLines - Maximum amount of lines allowed. If given, the string will be
 *                           clipped either at the moment the maximum amount of characters is
 *                           exceeded or the moment maxLines newlines are discovered, whichever
 *                           comes first.
 *
 * @return The clipped string.
 */
/*
module.exports = function clip(string, maxLength)
{
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] :
    {};

    if (!string)
    {
        return "";
    }

    string = string.toString();

    if (options.indicator === undefined)
    {
        options.indicator = "\u2026";
    }

    return options.html ? clipHtml(string, maxLength, options) : clipPlainText(string, maxLength, options);
};
*/

function clipHtml(string, maxLength, options)
{
    var _options$imageWeight = options.imageWeight,
        imageWeight = _options$imageWeight === undefined ? 2 : _options$imageWeight,
        indicator = options.indicator,
        maxLines = options.maxLines;


    var numChars = indicator.length;
    var numLines = 1;

    var i = 0;
    var isUnbreakableContent = false;
    var tagStack = [];
    var length = string.length;

    for (; i < length; i++)
    {
        var rest = i ? string.slice(i) : string;
        var nextIndex = rest.search(CHAR_OF_INTEREST_REGEX);
        var nextBlockSize = nextIndex > -1 ? nextIndex : rest.length;
        i += nextBlockSize;

        if (!isUnbreakableContent)
        {
            numChars += nextBlockSize;
            if (numChars > maxLength)
            {
                i = Math.max(i - numChars + maxLength, 0);
                break;
            }
        }

        if (nextIndex === -1)
        {
            break;
        }

        var charCode = string.charCodeAt(i);
        if (charCode === TAG_OPEN_CHAR_CODE)
        {
            var nextCharCode = string.charCodeAt(i + 1);
            var isSpecialTag = nextCharCode === EXCLAMATION_CHAR_CODE;
            if (isSpecialTag && string.substr(i + 2, 2) === "--")
            {
                var commentEndIndex = string.indexOf("-->", i + 4) + 3;
                i = commentEndIndex - 1; // - 1 because the outer for loop will increment it
            }
            else if (isSpecialTag && string.substr(i + 2, 7) === "[CDATA[")
            {
                var cdataEndIndex = string.indexOf("]]>", i + 9) + 3;
                i = cdataEndIndex - 1; // - 1 because the outer for loop will increment it

                // note we don't count CDATA text for our character limit because it is only
                // allowed within SVG and MathML content, both of which we don't clip
            }
            else
            {
                // don't open new tags if we are currently at the limit
                if (numChars === maxLength && string.charCodeAt(i + 1) !== FORWARD_SLASH_CHAR_CODE)
                {
                    numChars++;
                    break;
                }

                var attributeQuoteCharCode = 0;
                var endIndex = i;
                var isAttributeValue = false;
                while (true /* eslint-disable-line */ )
                {
                    endIndex++;
                    if (endIndex >= length)
                    {
                        throw new Error("Invalid HTML: " + string);
                    }

                    var _charCode = string.charCodeAt(endIndex);
                    if (isAttributeValue)
                    {
                        if (attributeQuoteCharCode)
                        {
                            if (_charCode === attributeQuoteCharCode)
                            {
                                isAttributeValue = false;
                            }
                        }
                        else
                        {
                            if (isWhiteSpace(_charCode))
                            {
                                isAttributeValue = false;
                            }
                            else if (_charCode === TAG_CLOSE_CHAR_CODE)
                            {
                                isAttributeValue = false;
                                endIndex--; // re-evaluate this character
                            }
                        }
                    }
                    else if (_charCode === EQUAL_SIGN_CHAR_CODE)
                    {
                        while (isWhiteSpace(string.charCodeAt(endIndex + 1)))
                        {
                            endIndex++; // skip whitespace
                        }
                        isAttributeValue = true;

                        var firstAttributeCharCode = string.charCodeAt(endIndex + 1);
                        if (firstAttributeCharCode === DOUBLE_QUOTE_CHAR_CODE || firstAttributeCharCode === SINGLE_QUOTE_CHAR_CODE)
                        {
                            attributeQuoteCharCode = firstAttributeCharCode;
                            endIndex++;
                        }
                        else
                        {
                            attributeQuoteCharCode = 0;
                        }
                    }
                    else if (_charCode === TAG_CLOSE_CHAR_CODE)
                    {
                        var isEndTag = string.charCodeAt(i + 1) === FORWARD_SLASH_CHAR_CODE;
                        var tagNameStartIndex = i + (isEndTag ? 2 : 1);
                        var tagNameEndIndex = Math.min(indexOfWhiteSpace(string, tagNameStartIndex), endIndex);
                        var tagName = string.slice(tagNameStartIndex, tagNameEndIndex).toLowerCase();
                        if (tagName.charCodeAt(tagName.length - 1) === FORWARD_SLASH_CHAR_CODE)
                        {
                            // Remove trailing slash for self-closing tag names like <br/>
                            tagName = tagName.slice(0, tagName.length - 1);
                        }

                        if (isEndTag)
                        {
                            var currentTagName = tagStack.pop();
                            if (currentTagName !== tagName)
                            {
                                throw new Error("Invalid HTML: " + string);
                            }

                            if (tagName === "math" || tagName === "svg")
                            {
                                isUnbreakableContent = tagStack.indexOf("math") !== -1 || tagStack.indexOf("svg") !== -1;
                                if (!isUnbreakableContent)
                                {
                                    numChars += imageWeight;
                                    if (numChars > maxLength)
                                    {
                                        break;
                                    }
                                }
                            }

                            if (BLOCK_ELEMENTS.indexOf(tagName) !== -1)
                            {
                                // All block level elements should trigger a new line
                                // when truncating
                                if (!isUnbreakableContent)
                                {
                                    numLines++;
                                    if (numLines > maxLines)
                                    {
                                        // If we exceed the max lines, push the tag back onto the
                                        // stack so that it will be added back correctly after
                                        // truncation
                                        tagStack.push(tagName);
                                        break;
                                    }
                                }
                            }
                        }
                        else if (VOID_ELEMENTS.indexOf(tagName) !== -1 || string.charCodeAt(endIndex - 1) === FORWARD_SLASH_CHAR_CODE)
                        {
                            if (tagName === "br")
                            {
                                numLines++;
                                if (numLines > maxLines)
                                {
                                    break;
                                }
                            }
                            else if (tagName === "img")
                            {
                                numChars += imageWeight;
                                if (numChars > maxLength)
                                {
                                    break;
                                }
                            }
                        }
                        else
                        {
                            tagStack.push(tagName);
                            if (tagName === "math" || tagName === "svg")
                            {
                                isUnbreakableContent = true;
                            }
                        }

                        i = endIndex;
                        break;
                    }
                }
                if (numChars > maxLength || numLines > maxLines)
                {
                    break;
                }
            }
        }
        else if (charCode === AMPERSAND_CHAR_CODE)
        {
            var _endIndex = i + 1;
            var isCharacterReference = true;
            while (true /* eslint-disable-line */ )
            {
                var _charCode2 = string.charCodeAt(_endIndex);
                if (isCharacterReferenceCharacter(_charCode2))
                {
                    _endIndex++;
                }
                else if (_charCode2 === SEMICOLON_CHAR_CODE)
                {
                    break;
                }
                else
                {
                    isCharacterReference = false;
                    break;
                }
            }

            if (!isUnbreakableContent)
            {
                numChars++;
                if (numChars > maxLength)
                {
                    break;
                }
            }

            if (isCharacterReference)
            {
                i = _endIndex;
            }
        }
        else if (charCode === NEWLINE_CHAR_CODE)
        {
            if (!isUnbreakableContent)
            {
                numChars++;
                if (numChars > maxLength)
                {
                    break;
                }

                numLines++;
                if (numLines > maxLines)
                {
                    break;
                }
            }
        }
        else
        {
            if (!isUnbreakableContent)
            {
                numChars++;
                if (numChars > maxLength)
                {
                    break;
                }
            }

            // high Unicode surrogate should never be separated from its matching low surrogate
            var _nextCharCode = string.charCodeAt(i + 1);
            if ((_nextCharCode & 0xfc00) === 0xdc00)
            {
                i++;
            }
        }
    }

    if (numChars > maxLength)
    {
        var nextChar = takeHtmlCharAt(string, i);
        if (indicator)
        {
            var peekIndex = i + nextChar.length;
            while (string.charCodeAt(peekIndex) === TAG_OPEN_CHAR_CODE && string.charCodeAt(peekIndex + 1) === FORWARD_SLASH_CHAR_CODE)
            {
                var nextPeekIndex = string.indexOf(">", peekIndex + 2) + 1;
                if (nextPeekIndex)
                {
                    peekIndex = nextPeekIndex;
                }
                else
                {
                    break;
                }
            }

            if (peekIndex && (peekIndex === string.length || isLineBreak(string, peekIndex)))
            {
                // if there's only a single character remaining in the input string, or the next
                // character is followed by a line-break, we can include it instead of the clipping
                // indicator (provided it's not a special HTML character)
                i += nextChar.length;
                nextChar = string.charAt(i);
            }
        }

        // include closing tags before adding the clipping indicator if that's where they
        // are in the input string
        while (nextChar === "<" && string.charCodeAt(i + 1) === FORWARD_SLASH_CHAR_CODE)
        {
            var _tagName = tagStack.pop();
            var tagEndIndex = _tagName ? string.indexOf(">", i + 2) : -1;
            if (tagEndIndex === -1 || string.replace(TRIM_END_REGEX, "").slice(i + 2, tagEndIndex) !== _tagName)
            {
                throw new Error("Invalid HTML: " + string);
            }

            i = tagEndIndex + 1;
            nextChar = string.charAt(i);
        }

        if (i < string.length)
        {
            if (!options.breakWords)
            {
                // try to clip at word boundaries, if desired
                for (var j = i - indicator.length; j >= 0; j--)
                {
                    var _charCode3 = string.charCodeAt(j);
                    if (_charCode3 === TAG_CLOSE_CHAR_CODE || _charCode3 === SEMICOLON_CHAR_CODE)
                    {
                        // these characters could be just regular characters, so if they occur in
                        // the middle of a word, they would "break" our attempt to prevent breaking
                        // of words, but given this seems highly unlikely and the alternative is
                        // doing another full parsing of the preceding text, this seems acceptable.
                        break;
                    }
                    else if (_charCode3 === NEWLINE_CHAR_CODE || _charCode3 === TAG_OPEN_CHAR_CODE)
                    {
                        i = j;
                        break;
                    }
                    else if (isWhiteSpace(_charCode3))
                    {
                        i = j + (indicator ? 1 : 0);
                        break;
                    }
                }
            }

            var result = string.slice(0, i) + (isLineBreak(string, i) ? "" : indicator);
            while (tagStack.length)
            {
                var _tagName2 = tagStack.pop();
                result += "</" + _tagName2 + ">";
            }
            return result;
        }
    }
    else if (numLines > maxLines)
    {
        var _result = string.slice(0, i);
        while (tagStack.length)
        {
            var _tagName3 = tagStack.pop();
            _result += "</" + _tagName3 + ">";
        }
        return _result;
    }

    return string;
}

function clipPlainText(string, maxLength, options)
{
    var indicator = options.indicator,
        maxLines = options.maxLines;


    var numChars = indicator.length;
    var numLines = 1;

    var i = 0;
    var length = string.length;

    for (; i < length; i++)
    {
        numChars++;
        if (numChars > maxLength)
        {
            break;
        }

        var charCode = string.charCodeAt(i);
        if (charCode === NEWLINE_CHAR_CODE)
        {
            numLines++;
            if (numLines > maxLines)
            {
                break;
            }
        }
        else if ((charCode & 0xfc00) === 0xd800)
        {
            // high Unicode surrogate should never be separated from its matching low surrogate
            var nextCharCode = string.charCodeAt(i + 1);
            if ((nextCharCode & 0xfc00) === 0xdc00)
            {
                i++;
            }
        }
    }

    if (numChars > maxLength)
    {
        var nextChar = takeCharAt(string, i);
        if (indicator)
        {
            var peekIndex = i + nextChar.length;
            if (peekIndex === string.length)
            {
                return string;
            }
            else if (string.charCodeAt(peekIndex) === NEWLINE_CHAR_CODE)
            {
                return string.slice(0, i + nextChar.length);
            }
        }

        if (!options.breakWords)
        {
            // try to clip at word boundaries, if desired
            for (var j = i - indicator.length; j >= 0; j--)
            {
                var _charCode4 = string.charCodeAt(j);
                if (_charCode4 === NEWLINE_CHAR_CODE)
                {
                    i = j;
                    nextChar = "\n";
                    break;
                }
                else if (isWhiteSpace(_charCode4))
                {
                    i = j + (indicator ? 1 : 0);
                    break;
                }
            }
        }

        return string.slice(0, i) + (nextChar === "\n" ? "" : indicator);
    }
    else if (numLines > maxLines)
    {
        return string.slice(0, i);
    }

    return string;
}

function indexOfWhiteSpace(string, fromIndex)
{
    var length = string.length;

    for (var i = fromIndex; i < length; i++)
    {
        if (isWhiteSpace(string.charCodeAt(i)))
        {
            return i;
        }
    }
    // rather than -1, this function returns the length of the string if no match is found,
    // so it works well with the Math.min() usage below
    return length;
}

function isCharacterReferenceCharacter(charCode)
{
    return charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122;
}

function isLineBreak(string, index)
{
    var firstCharCode = string.charCodeAt(index);
    if (firstCharCode === NEWLINE_CHAR_CODE)
    {
        return true;
    }
    else if (firstCharCode === TAG_OPEN_CHAR_CODE)
    {
        var newlineElements = "(" + BLOCK_ELEMENTS.join("|") + "|br)";
        var newlineRegExp = new RegExp("^<" + newlineElements + "[\t\n\f\r ]*/?>", "i");
        return newlineRegExp.test(string.slice(index));
    }
    else
    {
        return false;
    }
}

function isWhiteSpace(charCode)
{
    return charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
}

function takeCharAt(string, index)
{
    var charCode = string.charCodeAt(index);
    if ((charCode & 0xfc00) === 0xd800)
    {
        // high Unicode surrogate should never be separated from its matching low surrogate
        var nextCharCode = string.charCodeAt(index + 1);
        if ((nextCharCode & 0xfc00) === 0xdc00)
        {
            return String.fromCharCode(charCode, nextCharCode);
        }
    }
    return String.fromCharCode(charCode);
}

function takeHtmlCharAt(string, index)
{
    var char = takeCharAt(string, index);
    if (char === "&")
    {
        while (true /* eslint-disable-line */ )
        {
            index++;
            var nextCharCode = string.charCodeAt(index);
            if (isCharacterReferenceCharacter(nextCharCode))
            {
                char += String.fromCharCode(nextCharCode);
            }
            else if (nextCharCode === SEMICOLON_CHAR_CODE)
            {
                char += String.fromCharCode(nextCharCode);
                break;
            }
            else
            {
                break;
            }
        }
    }
    return char;
}