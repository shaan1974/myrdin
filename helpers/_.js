/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    HELPERS
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