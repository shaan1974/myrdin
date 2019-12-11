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
/*
    AVERAGE
*/
_m.constructor.prototype.filters["avg"] = function(a)
{
    var sum = a.reduce(function(previous, current)
    {
        return current += previous;
    });
    return (sum / a.length);
};
/*
    ARRAY FIRST
*/
_m.constructor.prototype.filters["array_first"] = function(a)
{
    return a[0];
};
/*
    ARRAY LAST
*/
_m.constructor.prototype.filters["array_last"] = function(a)
{
    return a[a.length - 1];
};