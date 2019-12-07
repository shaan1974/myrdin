/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*    
    NUMBER
*/
/*
     DESC :  RETURN CALCULATED MATH EXPRESSION
     TYPE :  STRING
*/
µµ.constructor.prototype.expression_function["math"] = function(strExpr)
{
    return new Function("return " + strExpr)();
};
/*
    DESC :  CHECK IF VALUE IS BETWEEN RANGE OF NUMBER
    TYPE :  NUMBER, IF STRING IT'S CONVERTED.
*/
µµ.constructor.prototype.expression_function["inRange"] = function(v, sValue, eValue)
{
    if (v.constructor.toString().indexOf("String()") != -1)
    {
        v = Number("" + v + "");
    }

    if (sValue.constructor.toString().indexOf("String()") != -1)
    {
        sValue = Number("" + sValue + "");
    }

    if (eValue.constructor.toString().indexOf("String()") != -1)
    {
        eValue = Number("" + eValue + "");
    }

    return (sValue < v && v < eValue) ? true : false;
};