/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    ARRAY
*/
/*
    UNIQ
*/
_m.constructor.prototype.filters["uniq"] = function(a)
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
_m.constructor.prototype.filters["join"] = function(a, parms)
{
    // var p1 = (typeof parms !== "undefined") ? parms[0] : ",";
    var p1 = (typeof parms !== "undefined" && parms !== null) ? parms[0] : ",";
    return a.join(p1);
};
/*
    SIZE
*/
_m.constructor.prototype.filters["size"] = function(a)
{
    return a.length;
};