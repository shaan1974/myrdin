/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    CORRECT TEMPLATE

        - Remove comments
        - Remove breaklines, tab 
        - Fix multiples spaces with one
*/
µµ.constructor.prototype.correctTemplate = function()
{
    //  INCLUDE FIX REMOVE COMMENTS AND BREAKLINES,TABS REG EXP
    var _FIX_COMMENT_BREAKLINES_TABS_ = new RegExp(this.regExpFix._FIX_REMOVE_COMMENTS_.source + "|" + this.regExpFix._FIX_BREAKLINES_TABS_.source, "gi");

    //	REMOVE COMMENTS
    //  REMOVE BREAKLINES AND TABS
    this.generateData["template"] = this.generateData["template"].replace(_FIX_COMMENT_BREAKLINES_TABS_, "");

    //  REMOVE USELESS SPACES
    this.generateData["template"] = this.generateData["template"].replace(this.regExpFix._FIX_SPACES_, " ");

    //  TRIM
    this.generateData["template"] = this.generateData["template"].trim();
};
/*
    RAW SECTION

        Replace all start and ending paragraphs caracters inside RAW block.
*/
µµ.constructor.prototype.rawSectionInTemplate = function()
{
    //  VAR
    var that = this;

    this.generateData["template"] = this.generateData["template"].replace(this.regRawFull, function(b, content)
    {
        return content.replace(that.regExp._START_PARAGRAPH_, "&#123;").replace(that.regExp._END_PARAGRAPH_, "&#125;");
    });
};
/*
    GET VAR

        Get variable value.

        ARGUMENTS :

        "pc"        - parent context
        "path"      - path not empty if parent(s) or root
        "filters"   - if variable as filters attach
        "ndxs"      - indexes array
*/
µµ.constructor.prototype.getVar = function(pc, path, name, filters, ndxs)
{
    //  VARIABLES
    var v, cnt, len, e, safe = false,
        m, index;

    //  IF @INDEX
    if (name === "@index")
    {
        return ndxs[ndxs.length - (path.length) / 3 - 1];
    }
    //  IF FROM INSIDE LOOP OR ARRAY, 2 CASES IF NDXS EXIST OF NOT.
    else if (name === ".")
    {
        // return (typeof ndxs === "undefined") ? pc[pc.length - 1] : pc[ndxs.length - (path.length) / 3 - 1];
        v = (typeof ndxs === "undefined") ? pc[pc.length - 1] : pc[ndxs.length - (path.length) / 3 - 1];
    }
    else
    {
        //  VARIABLE - CURRENT CONTENT        
        if (path === "")
        {
            v = pc[pc.length - 1];
        }
        //  VARIABLE - ROOT
        else if (path === "./")
        {
            v = pc[0];
        }
        //  VARIABLE - PARENT
        else if (path.indexOf("../") === 0)
        {
            v = pc[pc.length - (path.length) / 3 - 1];
        }

        //  COMMON
        //  EX: users[1].firstname
        e = name.split(".");

        for (cnt = 0, len = e.length; cnt < len; cnt++)
        {
            //  IF ELEMENT IS ARRAY OR NOT DEFINE WITH BRACKET
            m = e[cnt].match(this.regExpExtract["_VAR_"]);
            v = (m[2] === undefined) ? v[m[1]] : v[m[1]][m[3]];
        }
    }
    //  IN CASE OF V RETURN UNDEFINED IT'S MEAN THAT WE SHOULD ACCESS TO VARIABLE CREATE FROM FAKE CONTEXT RELATED TO FOR (X,Y,Z...)
    if (typeof v === "undefined")
    {
        v = this.fakeContext[this.fakeContext.length - 1][name];
    }

    //  CHECK IF SAFE OR NOT
    if (filters !== "")
    {
        //  REPLACE STARTING PIPE FOLLOWED BY SPACE AND END SPACE WITH NOTHING, REPLACE SPACE BEFORE AND AFTER PIPE, FINALY SPLIT TO GET AN ARRAY
        //  SPLIT WITH SEPARATOR GENERATED INTO VARS.JS
        filters = filters.split("_,_");

        if (filters.indexOf("safe") !== -1)
        {
            index = filters.indexOf("safe");

            filters.splice(index, 1);
            safe = true;
        }

        //  IF FILTERS EXIST BECAUSE AT BASE SOME VARIABLES COULD ONLY HAVE SAFE FILTER.
        v = (filters.length !== 0) ? this.applyFilters(v, filters.join("|")) : v;
    }

    //  IF SAFE IS TRUE (KEEP FORMATING) OR CONSTRUCTOR IS AN ARRAY OR CONSTRUCTOR IS NUMBER
    return (safe || v.constructor.toString().indexOf("Array") !== -1 || v.constructor.toString().indexOf("Number") !== -1) ? v : this.stripHtml(v);
};
/*
    GET HELPER

        Build helper call.
        
        ARGUMENTS :
    
        "pc"        - parent context
        "name"      - name
        "parms"     - parmameters
*/
µµ.constructor.prototype.getHelpers = function(pc, name, parms)
{
    //  IF NO PARMS WE CAN CALL THE HELPER DIRECTLY
    if (parms === "")
    {
        return this.helpers[name]();
    }

    var cnt, len, value;

    //  IF PARMS WE HAVE TO REBUILD THE PARMS AS ARRAY ARGUMENTS

    //  SPECIAL CASE FOR MATH
    if (name === "math")
    {
        var real_parms, myKeys, myValues;

        real_parms = parms.replace(this.regExpReplace["_REAL_PARMS_"][0], this.regExpReplace["_REAL_PARMS_"][1]);

        /*var myObject = jsep("" + real_parms + "");
        myKeys = JSON.stringify(myObject).match(µµ.regExp._MATCH_NAMES_GLOBAL_).map(function(o)
        {
            return o.match(µµ.regExp._MATCH_NAMES_)[1];
        });*/

        myKeys = this.expressionVar(real_parms);


        for (cnt = 0, len = myKeys.length; cnt < len; cnt++)
        {
            value = ("{{=" + myKeys[cnt] + "}}").replace(this.regExp2._VAR_, this.getBy2._VAR2_).split("_,_");

            myValues = this.getVar(pc, value[0], value[1], value[2]);
            parms = parms.replace(myKeys[cnt], myValues);
        }

        return new Function('return ' + parms.replace(/\'/gi, "") + ';')();
    }
    else
    {
        var send_parms, send_parm;

        send_parms = parms.replace(this.regExpReplace["HELPER1_"][0], this.regExpReplace["HELPER1_"][1]).replace(this.regExpReplace["HELPER2_"][0], this.regExpReplace["HELPER2_"][1]).trim().split(",");

        for (cnt = 0, len = send_parms.length; cnt < len; cnt++)
        {
            send_parm = send_parms[cnt];

            if (send_parm.indexOf("'") !== 0)
            {
                value = ("{{=" + send_parm + "}}").replace(this.regExp2._VAR_, this.getBy2._VAR2_).split("_,_");

                send_parms[cnt] = this.getVar(pc, value[0], value[1], value[2]);
            }
            else
            {
                send_parms[cnt] = send_parm.slice(1, -1);
            }
        }

        //  BUILD ARGUMENTS FOR FUNCTION CALL
        send_parms = [pc].concat(send_parms);

        return this.helpers[name].apply(this, send_parms);
    }
};
/*
    SORT JSON WITH FILTERS
    ex : jsonData.homes.sort(µµ.fieldSorter(['city', '-price']));
*/
µµ.constructor.prototype.fieldSorter = function(fields)
{
    return function(a, b)
    {
        return fields
            .map(function(o)
            {
                var dir = 1;
                if (o[0] === '-')
                {
                    dir = -1;
                    o = o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
            })
            .reduce(function firstNonZeroValue(p, n)
            {
                return p ? p : n;
            }, 0);
    };
};