/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	STRING
*/
µµ.constructor.prototype.filters["uppercase"] = function(str)
{
    return str.toUpperCase();
};

µµ.constructor.prototype.filters["lowercase"] = function(str)
{
    return str.toLowerCase();
};

µµ.constructor.prototype.filters["trim"] = function(str)
{
    return str.trim();
};

µµ.constructor.prototype.filters["capitalizeFirstLetter"] = function(str)
{
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
};

µµ.constructor.prototype.filters["capitalizeEachWord"] = function(str)
{

    return (str).split(" ").map(function(o)
    {
        return µµ.filters.capitalizeFirstLetter(o);
    }).join(" ");
};

µµ.constructor.prototype.filters["trim"] = function(str)
{

    return str.replace(/^\s+|\s+$/g, "");
};

µµ.constructor.prototype.filters["ltrim"] = function(str)
{

    return str.replace(/^\s+/, "");
};

µµ.constructor.prototype.filters["rtrim"] = function(str)
{

    return str.replace(/\s+$/, "");
};

µµ.constructor.prototype.filters["split"] = function(str, parms)
{

    var p1 = (typeof parms !== "undefined") ? parms[0] : " ";

    return str.split("" + p1 + "");
};

µµ.constructor.prototype.filters["slice"] = function(str, parms)
{

    var p1 = (typeof parms !== "undefined") ? parms[0] : 0;
    var p2 = (typeof parms !== "undefined") ? parms[1] : (str.length - 1);

    return str.slice(p1, p2);
};

µµ.constructor.prototype.filters["urlEncode"] = function(str)
{

    return encodeURIComponent(str);
};

µµ.constructor.prototype.filters["urlDecode"] = function(str)
{

    return decodeURIComponent(str);
};

µµ.constructor.prototype.filters["linearize"] = function(str)
{

    return (str.replace(/(\t|\n|\r)/gi, "")).trim();
};
/*
    TRUNCATE use 'text-clip.js' as dependency

    Options :
    #0 - length
    #1 - breakWord
    #2 - indicator
*/
µµ.constructor.prototype.filters["truncate"] = function(str, o)
{
    return clipHtml(str, o[0],
    {
        breakWords: Boolean(o[1]),
        html: true,
        imageWeight: 2,
        indicator: "" + o[2] + "",
        maxLines: 5
    });
};