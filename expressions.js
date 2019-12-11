/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    PARSE EXPRESSION SUN FCT
*/
_m.constructor.prototype.parseExpression_rbc = function(fv)
{
    return _m.regExpRevert[fv];
};

_m.constructor.prototype.parseExpression_sort = function(a, b)
{
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length    
    return b.length - a.length;
};

_m.constructor.prototype.parseExpression_array_replace = function(r)
{
    return r.replace("[", "_SBR_").replace("]", "_EBR_");
};

_m.constructor.prototype.parseExpression_dot_replace = function(r)
{
    return r.replace(_m.regExp._DOT_, "_DOT_");
};
/*
	PARSE EXPRESSION
*/
_m.constructor.prototype.parseExpression = function(pc, exp, ndx, ccc)
{
    //  VAR
    var cnt, len, current_key, v, n, value, c;

    //	BASE REPLACEMENTS FOR MATH, STRING OPERATORS AND COMPARISONS OPERATORS
    /*
    for (cnt = 0, len = this.base_replacements.length; cnt < len; cnt++)
    {
        exp = exp.replace(this.base_replacements[cnt].key, this.base_replacements[cnt].replace);
    }
    */
    cnt = 0;
    len = this.base_replacements.length;
    while (cnt < len)
    {
        exp = exp.replace(this.base_replacements[cnt].key, this.base_replacements[cnt].replace);
        cnt++;
    }

    //  CHECK IF EXPRESSION NEED REPLACEMENT BELOW
    if (exp.match(this.regExpBigCheck) !== null)
    {
        //	REPLACEMENTS
        //
        //	REPLACE SPECIAL VAR WITH "@" with "__IV_" : @index,@first,@last,@odd,@even,@now
        exp = exp.replace(this.regExp._INTERNAL_VARS_, " __IV_\$1 ");

        //	REPLACE FOR VAR WITH
        //  #1 - test[1]
        exp = exp.replace(
            this.regExp._ARRAY_VARS_,
            _m.parseExpression_array_replace
        );

        //	#2 - user.status
        exp = exp.replace(
            this.regExp._DOT_VARS_,
            _m.parseExpression_dot_replace
        );

        //  #3 - "PARENT" - ../
        exp = exp.replace(this.regExp._PARENT_VARS_, "_BDOT_");

        //  #4 - "ROOT" - ./
        exp = exp.replace(this.regExp._ROOT_VARS_, "_ROOT_");

        //  #5 - "CURRENT" "." (FOR ARRAY)
        exp = exp.replace(this.regExp._SELF_, "_SELF_");
    }

    //  #6 - INTERNAL FUNCTION LIKE MATH, LEN, BINARYLENGHT
    //
    //  GET ALL FUNCTIONS DEFINED INTO "EXPRESSION_FUNCTION"
    //    
    //  REPLACE EXPRESSION FUNCTION WITH DEFINE START TAG.
    //  len -> INTERNAL_FUNCTION__len_
    //
    /*for (cnt = 0, len = this.fct_keys.length; cnt < len; cnt++)
    {
        exp = exp.replace(this.fct_keys_rg[cnt], " INTERNAL_FUNCTION_" + this.fct_keys[cnt] + "_ ");
    }*/
    cnt = 0;
    len = this.fct_keys.length;
    while (cnt < len)
    {
        exp = exp.replace(this.fct_keys_rg[cnt], " INTERNAL_FUNCTION_" + this.fct_keys[cnt] + "_ ");
        cnt++;
    }

    //  REPLACE END PARENTHESIS WITH DEFINE ALIAS
    exp = exp.replace(this.regExp._END_PARENTHESIS_, " _ENDP_ ");

    //  IF VALUE EXIST RELATED TO NAME FOUND INTO JSON STRINGIFY STRING TRY TO GET THE VALUE
    //

    if (this.expressionVar(exp).length != 0)
    {
        var myKeys = this.expressionVar(exp);
        //	SORT ARRAY TO GET MAXIMUM LENGTH STRING TO MIN TO AVOID COLLISION INTO REMPLACEMENT
        //
        myKeys.sort(_m.constructor.prototype.parseExpression_sort);

        //	LOOP TO CHECK IF VAR EXIST OR NOT
        //
        for (cnt = 0, len = myKeys.length; cnt < len; cnt++)
        {
            current_key = myKeys[cnt];
            //  CASE OF INTERNAL FUNCTION
            //
            if (current_key.indexOf("INTERNAL_FUNCTION_") === 0)
            {
                exp = exp.replace(current_key, "_m.expression_function." + current_key.slice(18, -1) + "(");
            }
            //  CASE OF INTERNAL VAR STARTING WITH "@" (first,last,odd,even,index)
            //
            else if (current_key.indexOf("__IV_") === 0)
            {
                exp = _m.parseExpressionSmallFct[current_key.substr(5)](exp, current_key, ndx, ccc);
            }
            else
            {
                //  BACK TO REPLACEMENT STRING TO ORIGNAL STRING
                //
                n = current_key.replace(
                    this.regExpBigCheck2,
                    _m.parseExpression_rbc
                );

                if (n !== "_ENDP_")
                {
                    value = ("{{=" + n + "}}").replace(this.regExp2._VAR_, this.getBy2._VAR2_).split("_,_");

                    v = this.getVar(pc, value[0], value[1], value[2].trim());
                    c = v.constructor.toString();

                    if (c.indexOf("Array") !== -1)
                    {
                        // v = " [" + ("-,-" + v.join("-,-") + "-,-").replace(this.regExpReplace["_EXPRESSION_ARRAY_"][0], this.regExpReplace["_EXPRESSION_ARRAY_"][1]).slice(2, -2) + "] ";
                        v = JSON.stringify(v);
                    }
                    else if (c.indexOf("Number") !== -1)
                    {
                        v = v;
                    }
                    else
                    {
                        v = "'" + v.replace(this.regExpReplace["_SINGLE_QUOTES_"][0], this.regExpReplace["_SINGLE_QUOTES_"][1]) + "'";
                    }
                }
                else
                {
                    v = ")";
                }

                exp = exp.replace(current_key, v);
            }
        }
    }

    //  CREATE NEW FUNCTION TO GET RESULT IN RETURN 

    this.parsedExptression = new Function('return ' + exp + ';');

    //	RETURN
    return this.parsedExptression();
};

_m.constructor.prototype.parseExpressionSmallFct = {

    "first": function(e, c, n, ccc)
    {
        return e.replace(c, " " + n + " === 0 ");
    },

    "last": function(e, c, n, ccc)
    {
        return e.replace(c, " " + n + " === " + (ccc.length - 1) + " ");
    },
    "odd": function(e, c, n, ccc)
    {
        return e.replace(c, " Boolean( (" + n + " / 2) !== parseInt((" + n + " / 2))  ) ");
    },
    "even": function(e, c, n, ccc)
    {
        return e.replace(c, " Boolean( (" + n + " / 2) === parseInt((" + n + " / 2)) ) ");
    },
    "index": function(e, c, n, ccc)
    {
        return e.replace(c, "" + n + " ");
    }
};