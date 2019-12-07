/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
_m.constructor.prototype.generateTemplate = function()
{
    //  VARIABLES
    //
    var starting_code;
    var that = this;
    var uuid = this.uuid();
    this.internal_uuid = uuid;
    window["__TMP_" + uuid + ""] = "";
    window["__TMP_JSON_" + uuid + ""] = this.generateData.jsonData;

    //  CORRECT TEMPLATE
    //  FIXES FOR :
    //  - FOR BREAKLINES, USELESS SPACES, TAB, COMMENTS
    this.correctTemplate();

    //  TAKE RAW CONTENT, REPLACE "{" AND "}", IN THIS CASE ELEMENT INSIDE ARE NOT TREATED AS STATEMENTS.
    this.rawSectionInTemplate();

    //  ADD START AND END FAKE TAG TO HELPER THE REGULAR EXPRESSION THAT CHECK ALL NON DYNAMIC ELEMENTS INSIDE THE TEMPLATE
    this.generateData["template"] = "{{TEMPLATE_START}}" + this.generateData["template"] + "{{TEMPLATE_END}}";

    //  ESCAPE SINGLE QUOTE FOR VARIABLES WITH FILTERS
    this.generateData["template"] = this.generateData["template"].replace(

        this.regExp2._VAR_,
        function(v)
        {
            // return v.replace(that.regExpReplace["_SINGLE_QUOTES_"][0], that.regExpReplace["_SINGLE_QUOTES_"][1]);
            var r = that.regExpReplace["_SINGLE_QUOTES_"];
            return v.replace(r[0], r[1]);
        }
    );

    //  FIX - ESCAPE DOUBLE QUOTE INTO IF AND ELSE IF
    this.generateData["template"] = this.generateData["template"].replace(

        this.regExpFix.FIX_IF_ELSE_IF_DOUBLE_QUOTES_,
        function(v)
        {
            // return v.replace(that.regExpReplace["_DOUBLE_QUOTES_"][0], that.regExpReplace["_DOUBLE_QUOTES_"][1]);
            var r = that.regExpReplace["_DOUBLE_QUOTES_"];
            return v.replace(r[0], r[1]);
        }
    );

    //  REPLACE ALL NON DYNAMIC ELEMENTS WITH CONCATENATION STRING AND ESCAPE DOUBLE QUOTES    
    this.generateData["template"] = this.generateData["template"].replace(

        this.regNotStatments,
        function(v)
        {
            var r = that.regExpReplace["_DOUBLE_QUOTES_"];
            return (v === "}}{{") ? v : '}}.concat("' + (v).slice(2, -2).replace(r[0], r[1]) + '"){{';
            // return (v === "}}{{") ? v : '}}.concat("' + (v).slice(2, -2).replace(that.regExpReplace["_DOUBLE_QUOTES_"][0], that.regExpReplace["_DOUBLE_QUOTES_"][1]) + '"){{';
        }
    );

    //  REPLACE START AND END FAKE TAG WITH CODE
    //  BBB FULL CONTEXT INTO EACH
    //
    starting_code = "var ndxs = [0]; var bbb; var parents_context=[ window['__TMP_JSON_" + uuid + "'] ]; var root_context = parents_context[0]; var ndx=0; var current_context = parents_context[0]; var zzz=''; zzz=zzz.concat('')";
    this.generateData["template"] = this.generateData["template"].replace("{{TEMPLATE_START}}", "" + starting_code + "");
    this.generateData["template"] = this.generateData["template"].replace("{{TEMPLATE_END}}", ".concat('')");

    //  SPECIAL REPLACEMENT FOR HELPER TO AVOID PROBLEM WITH SINGLE QUOTES
    this.generateData["template"] = this.generateData["template"].replace(

        this.regExp2._HELPER_,
        function(v)
        {
            var r = that.regExpReplace["_SINGLE_QUOTES2_"];
            return v.replace(r[0], r[1]);
            // return v.replace(that.regExpReplace["_SINGLE_QUOTES2_"][0], that.regExpReplace["_SINGLE_QUOTES2_"][1]);
        }
    );

    //  REPLACEMENT OF REGULAR EXPRESSIONS FOR ALL DEFINED STATMENTS ( EACH, FOR, IF , VARIABLES ...)
    for (var key in this.regExp2)
    {
        if (this.regExp2.hasOwnProperty(key))
        {
            this.generateData["template"] = this.generateData["template"].replace(this.regExp2[key], this.replaceBy2[key]);
        }
    }

    //  END OF DYNAMIC CODE
    this.generateData["template"] += "; window['__TMP_" + uuid + "']=zzz;";

    //  EVALUATION
    eval(this.generateData["template"]);
    //  SET GENERATED TO OBJECT
    this.generatedCode = window['__TMP_' + uuid];
    //  REMOVE TEMP WINDOW VARIABLE
    delete window['__TMP_' + uuid];
    delete window['__TMP_JSON_' + uuid];
};

_m.constructor.prototype.putInPlaceTemplate = function()
{
    //  OUTPUT INSIDE DEDICATE CONTAINER
    document.querySelector(this.generateData["dest"]).innerHTML = "";
    // document.querySelector(this.generateData["dest"]).insertAdjacentHTML('beforeend', "<!-- *:root -->" + this.generatedCode + "<!-- /*:root -->");
    document.querySelector(this.generateData["dest"]).insertAdjacentHTML('beforeend', "" + this.generatedCode + "");
    console.log(this.generatedCode.length);
};