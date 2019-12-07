/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    ARRAY
*/
/*
    UNIQ
*/
µµ.constructor.prototype.filters["uniq"] = function(a)
{
    function onlyUnique(value, index, self)
    {
        return self.indexOf(value) === index;
    }

    return a.filter(onlyUnique);
};
/*
    JOIN
*/
µµ.constructor.prototype.filters["join"] = function(a, parms)
{
    // var p1 = (typeof parms !== "undefined") ? parms[0] : ",";
    var p1 = (typeof parms !== "undefined" && parms !== null) ? parms[0] : ",";
    return a.join(p1);
};
/*
    SIZE
*/
µµ.constructor.prototype.filters["size"] = function(a)
{
    return a.length;
};