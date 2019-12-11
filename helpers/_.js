/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    ADD HELPER

    _m.helpers("avg","var sum = parm1.reduce(function(previous, current){ return current += previous; }); return (sum / parm1.length);")

    Each function should receive parms: "o" the element, "parms" if parms are attach to the filter , parm1,parm2,parm3 and so on.
*/
_m.constructor.prototype.addHelper = function(name, fct)
{
    _m.helpers["" + name + ""] = new Function('o', 'parm1', '' + fct + '');
};
/*
    COMMON HELPERS
*/
_m.constructor.prototype.helpers = {
    /*
        CONCAT
    */
    "concat": function()
    {
        var args = Array.prototype.slice.call(arguments).slice(1);

        return this.expression_function["concat"].apply(null, args);
    },
    /*
        MATH
    */
    "math": function(parms, math_exp)
    {
        // return new Function("return " + strExpr)();
        // console.log(parms);

        var resultCalculation = this.parseExpression("" + math_exp + "", parms[0], parms[1], parms[2], parms[3], 'mathExpression');

        return resultCalculation;
    }
};