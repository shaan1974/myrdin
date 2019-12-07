/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	EXPRESSIONS FUNCTIONS
*/
µµ.constructor.prototype.expression_function = {
    /*
        DESC :  CHECK IF ELEMENT IS EMPTY
        TYPE :  STRING,LIST AND ARRAY
    */
    "is_empty": function(strExp)
    {

        if (typeof strExp !== "undefined")
        {
            //  IN CASE OF ARRAY TYPE
            if (strExp.constructor.toString().indexOf("Array()") != -1)
            {
                return (strExp.length === 0) ? true : false;
            }

            if (strExp.constructor.toString().indexOf("String()") != -1)
            {
                return (strExp === "") ? true : false;
            }
        }
        return true;
    },
    /*
        DESC :  CALCULATE LENGTH. 
        TYPE :  STRING,LIST AND ARRAY.
    */
    "len": function(strExp)
    {
        return (typeof strExp !== "undefined") ? strExp.length : 0;
    },
    /*
        DESC :  CAST VARIABLE TO AN OTHER TYPE
        TYPE :  STRING, INTEGER, FLOAT

        PARMS : INTEGER (CEIL,FLOOR,ROUND)
    */
    "cast_to": function(t, v, parms)
    {
        if (t === "STRING")
        {
            return "" + v + "";
        }
        else if (t === "INTEGER")
        {
            v = (v).match(/[\d\.]+/)[0];
            if (typeof parms !== "undefined")
            {
                v = Math["" + parms + ""](parseFloat(v));
            }
            return parseInt(v, 10);
        }
        else if (t === "FLOAT")
        {
            return (typeof parms === "undefined") ? parseFloat(v) : parseFloat(v).toFixed(parms);
        }
    }
};