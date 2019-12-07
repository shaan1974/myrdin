if (window.NodeList && !NodeList.prototype.forEach)
{
    NodeList.prototype.forEach = function(callback, thisArg)
    {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++)
        {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(searchString, position)
    {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!String.prototype.endsWith)
{
    String.prototype.endsWith = function(searchString, position)
    {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
        {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

var ElementPrototype = window.Element.prototype;

if (typeof ElementPrototype.matches !== 'function')
{
    ElementPrototype.matches = ElementPrototype.msMatchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.webkitMatchesSelector || function matches(selector)
    {
        var element = this;
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
        var index = 0;

        while (elements[index] && elements[index] !== element)
        {
            ++index;
        }

        return Boolean(elements[index]);
    };
}

if (typeof ElementPrototype.closest !== 'function')
{
    ElementPrototype.closest = function closest(selector)
    {
        var element = this;

        while (element && element.nodeType === 1)
        {
            if (element.matches(selector))
            {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}

if (!String.prototype.trimLeft)
{
    String.prototype.trimLeft = function()
    {
        return this.replace(/^\s+/, "");
    };
}

if (!String.prototype.trimRight)
{
    String.prototype.trimRight = function()
    {
        return this.replace(/\s+$/, "");
    };
}