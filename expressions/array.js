/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    ARRAY TO LIST
*/
µµ.constructor.prototype.expression_function["array_to_list"] = function(v)
{
    return v.join(",");
};
/*
    ARRAY ARE EQUALS
*/
µµ.constructor.prototype.expression_function["array_are_equal"] = function(a1, a2)
{
    return a1.toString() === a2.toString();
};
/*
    ARRAY INDEX OF
*/
µµ.constructor.prototype.expression_function["array_indexof"] = function(v, p)
{
    return v.indexOf(p);
};
/*
    IN ARRAY
*/
µµ.constructor.prototype.expression_function["in_array"] = function(v, p)
{
    return (v.indexOf(p) !== -1) ? true : false;
};