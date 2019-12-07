/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DATE
*/
_m.constructor.prototype.helpers["date_diff"] = function(o, d1, f1, d2, f2, m)
{
    var dd1 = _m.expression_function["moment_date"](d1, f1);
    var dd2 = _m.expression_function["moment_date"](d2, f2);

    return dd1.diff(dd2, "" + m + "");
};
/*
    NOW
*/
_m.constructor.prototype.helpers["now"] = function(o, f)
{
    if (typeof f === "undefined")
    {
        f = _m.options.date.default_date_format;
    }
    return moment().format(f);
};