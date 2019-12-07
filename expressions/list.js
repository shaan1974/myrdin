/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    LIST CONTAINS
*/
_m.constructor.prototype.expression_function["list_contains"] = function(o, p)
{
    return (o.split(",").indexOf(p) === -1) ? false : true;
};
/*  
    LIST TO ARRAY
*/
_m.constructor.prototype.expression_function["list_to_array"] = function(v)
{
    return v.split(",");
};