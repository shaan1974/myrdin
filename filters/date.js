/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    DATE
*/
µµ.constructor.prototype.filters["dateFormat"] = function(v, f)
{

    return moment(v, "" + f[0] + "").format("" + f[1] + "");
};

/*
    DATE ADD
    Keys :
    years "y" , "quarters" : "Q" , "months" : "M" , "weeks" : "w" , "days" : "d" , "hours" : "h" , "minutes" : "m", "seconds" : "s" , "milliseconds" : "ms"
*/
µµ.constructor.prototype.filters["dateAdd"] = function(v, f)
{

    return moment(v, f[0]).add(f[1], f[2]).format(f[3]);

};
/*
    DATE 
    Keys :
    years "y" , "quarters" : "Q" , "months" : "M" , "weeks" : "w" , "days" : "d" , "hours" : "h" , "minutes" : "m", "seconds" : "s" , "milliseconds" : "ms"
*/
µµ.constructor.prototype.filters["dateSubstract"] = function(v, f)
{

    return moment(v, f[0]).subtract(f[1], f[2]).format(f[3]);

};