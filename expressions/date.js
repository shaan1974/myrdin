/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DATE
*/
/*
    FORMAT DATE
*/
_m.constructor.prototype.expression_function["moment_date"] = function(d, f)
{
    return moment(d, f);
};
/*
    RETURN DIFFERENCE BETWEEN 2 DATES
*/
_m.constructor.prototype.expression_function["date_diff"] = function(d1, d2, m)
{
    return d1.diff(d2, "" + m + "");
};