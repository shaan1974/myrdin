/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    ARRAY TO LIST
*/
_m.constructor.prototype.expression_function["array_to_list"] = function(v)
{
    return v.join(",");
};
/*
    ARRAY ARE EQUALS
*/
_m.constructor.prototype.expression_function["array_are_equal"] = function(a1, a2)
{
    return a1.toString() === a2.toString();
};
/*
    ARRAY INDEX OF
*/
_m.constructor.prototype.expression_function["array_indexof"] = function(v, p)
{
    return v.indexOf(p);
};
/*
    IN ARRAY
*/
_m.constructor.prototype.expression_function["in_array"] = function(v, p)
{
    return (v.indexOf(p) !== -1) ? true : false;
};