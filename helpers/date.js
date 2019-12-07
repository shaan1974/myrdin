/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DATE
*/
µµ.constructor.prototype.helpers["date_diff"] = function(o, d1, f1, d2, f2, m)
{
    var dd1 = µµ.expression_function["moment_date"](d1, f1);
    var dd2 = µµ.expression_function["moment_date"](d2, f2);

    return dd1.diff(dd2, "" + m + "");
};
/*
    NOW
*/
µµ.constructor.prototype.helpers["now"] = function(o, f)
{
    if (typeof f === "undefined")
    {
        f = µµ.options.date.default_date_format;
    }
    return moment().format(f);
};