/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	FUNCTIONS
*/
_m.constructor.prototype.function = [];

/*
	GENERATE UUID
*/
_m.constructor.prototype.uuidv4 = function()
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        _m.regExp["_UUID_"],
        function(c)
        {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        }
    );
};
_m.constructor.prototype.uuid = function()
{
    return ("" + Math.random().toString(36).substring(2) + Date.now().toString(36) + "").toUpperCase();
};
/*
    STRIP HTML
*/
_m.constructor.prototype.stripHtml = function(str)
{
    if (str == null) return "";
    var div = document.createElement("div");
    div.innerHTML = str;

    return div.innerText;
};
/*
    EVALUATE
*/
_m.constructor.prototype.evaluate = function(str)
{
    //  VARS
    var cuid = _m.uuidv4();

    //	CREATE SCRIPT TAG AND POPULATE WITH INSTRUCTIONS
    var s = document.createElement('script');
    s.setAttribute("id", "ID_" + cuid + "");
    s.text = "" + str + "";

    //	APPEND TO DOM
    try
    {
        document.getElementsByTagName('head')[0].appendChild(s);
    }
    catch (e)
    {}

    //	REMOVE FROM DOM
    var elem = document.querySelector("#ID_" + cuid + "");
    elem.parentNode.removeChild(elem);
};
/*
    EXTRACT VARIABLES EXPRESSION
    TO REPLACE JSEP
*/
_m.constructor.prototype.expressionVar = function(z)
{
    //  ALL ELEMENT BEWTEEN SINGLE OR DOUBLE QUOTE
    //  ALL ELEMENT BEWTEEN SINGLE OR SINGLE QUOTE
    //  ARRAY
    //  COMMAS
    //  TRUE-FALSE
    //  REMOVE ALL WHITE SPACE ONLY WITH ONE WHITE SPACE
    z = z.replace(this.regExpressionBig, " ");

    //  TRIM
    z = z.trim();

    //  EXTRACT WORDS
    z = z.match(this.regExpExtract["_WORDS_"]);

    //  REMOVE ALL NUMBERS
    return z.filter(function(el)
    {
        return el != Number(el);
    });
};
/*
    GET INDEX OF NODE ON LOCATED ON THE SAME LEVEL
*/
_m.constructor.prototype.getNodeindex = function(elm)
{
    var c = elm.parentNode.children,
        i = 0;
    for (; i < c.length; i++)
        if (c[i] == elm) return i;
};