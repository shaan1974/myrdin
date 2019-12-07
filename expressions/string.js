/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*    
    STRING
*/
/*
    DESC :  CALCULATE BINARY LENGTH 
    TYPE :  STRING
*/
_m.constructor.prototype.expression_function["binarylen"] = function(strExp)
{
    var cr = 0,
        cl;

    if ((navigator.userAgent.match(/(MSIE |Trident.*rv[ :])([0-9]+)/) !== null) || (navigator.appVersion.indexOf('Edge') > -1))
    {
        cl = unescape(encodeURIComponent(strExp)).length;

        if (encodeURIComponent(strExp).match(/(%0A|%0D)/gi) !== null)
        {
            cr = encodeURIComponent(strExp).match(/(%0A|%0D)/gi).length;
        }
    }
    else
    {
        cl = (new TextEncoder('utf-8').encode(strExp)).length;
    }

    if (encodeURIComponent(strExp).match(/(%0A|%0D)/gi) !== null)
    {
        cr = encodeURIComponent(strExp).match(/(%0A|%0D)/gi).length;
    }

    return cl + cr;
};
/*
    DESC :  IF STARTS WITH
    TYPE :  STRING
*/
_m.constructor.prototype.expression_function["startsWith"] = function(strExp, v)
{
    return strExp.startsWith(v);
};
/*
    DESC :  IF ENDS WITH
    TYPE :  STRING
*/
_m.constructor.prototype.expression_function["endsWith"] = function(strExp, v)
{
    return strExp.endsWith(v);
};
/*
       DESC :  IF CONTAINS
       TYPE :  STRING
*/
_m.constructor.prototype.expression_function["contains"] = function(strExp, v)
{
    return (strExp.indexOf(v) != -1) ? true : false;
};
/*
        DESC :  CONCAT ALL ARGUMENTS PASS TO THE FUNCTION
        TYPE :  RETURN TYPE IS STRING
*/
_m.constructor.prototype.expression_function["concat"] = function()
{
    return Array.prototype.slice.call(arguments).join("");
};