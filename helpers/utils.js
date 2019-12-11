/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    UTILS
*/
/*
    CREATE UUID
*/
_m.constructor.prototype.helpers["uuid"] = function()
{
    return _m.uuid();
};
/*
    DEBUG
*/
_m.constructor.prototype.helpers["debug"] = function(o, v)
{
    console.log((v === "context") ? o : v);
    return "";
};