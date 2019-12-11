/* jshint sub:true */
/* jslint evil: true */
/* jslint esversion:6 */
/*
	VARIABLES
*/
_m.constructor.prototype.debug = false;
_m.constructor.prototype.generatedCode = "";

_m.constructor.prototype.base_replacements = [
    //	MATH, STRING OPERATORS
    {
        "key": /[ ]EQ[ ]/gi,
        "replace": " === "
    },
    {
        "key": /[ ]NEQ[ ]/gi,
        "replace": " !== "
    },
    {
        "key": /[ ]GT[ ]/gi,
        "replace": " > "
    },
    {
        "key": /[ ]GTE[ ]/gi,
        "replace": " >= "
    },
    {
        "key": /[ ]LT[ ]/gi,
        "replace": " < "
    },
    {
        "key": /[ ]LTE[ ]/gi,
        "replace": " <= "
    },
    //	COMPARISONS OPERATORS
    {
        "key": /[ ]AND[ ]/gi,
        "replace": " && "
    },
    {
        "key": /[ ]OR[ ]/gi,
        "replace": " || "
    },
    {
        "key": /[ ]NOT[ ]/gi,
        "replace": " ! "
    }
];
//	PRECOMPIL REG EXP

_m.constructor.prototype.regExp = {
    "_INTERNAL_VARS_": /@([\w]+)/gi,
    "_ARRAY_VARS_": /\w+\[\d+\]/gi,
    "_DOT_VARS_": /(\s{1}[a-zA-Z]{1}[\w\[\]]+(?:\.[a-zA-Z]{1}[\w\[\]]+){1,}\s{1})/gi,
    "_PARENT_VARS_": /\.\.\//gi,
    "_DOT_": /\./gi,
    "_ROOT_VARS_": /\.\//gi,
    "_SELF_": /[ ]\.[ ]/gi,
    "_END_PARENTHESIS_": /\)/gi,
    "_MATCH_NAMES_GLOBAL_": /"name":"(\w+)"/g,
    "_MATCH_NAMES_": /"name":"(\w+)"/,
    "_REVERT_DOT_": /_DOT_/gi,
    "_REVERT_ROOT_": /_ROOT_/gi,
    "_REVERT_PARENT_": /_BDOT_/gi,
    "_REVERT_STARTING_BRACKET_": /_SBR_/gi,
    "_REVERT_ENDING_BRACKET_": /_EBR_/gi,
    "_REVERT_SELF_": /_SELF_/gi,
    "_REVERT_END_PARENTHESIS_": /_ENDP_/gi,
    "_SINGLE_QUOTE_": /\'/gi,
    "_DOUBLE_QUOTE_": /\"/gi,
    "_MATH_EXPRESSION_": /math\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/gi,
    "_ESCAPE_DOUBLE_QUOTES_": /\"/gi,
    "_WHITE_SPACES_CHAR_": /\s/gi,
    "_START_PARAGRAPH_": /{/gi,
    "_END_PARAGRAPH_": /}/gi,
    "_APPLY_sort_filters_": /[\']((.|\\n)*?)[\']|[\"]((.|\n)*?)[\"]/gi,
    "_UUID_": /[xy]/g,
    "_APPLY_FILTERS_": /[\']((.|\\n)*?)[\']|[\"]((.|\n)*?)[\"]/gi
};

_m.constructor.prototype.regExpRevert = {
    "_DOT_": ".",
    "_ROOT_": "./",
    "_BDOT_": "../",
    "_SBR_": "[",
    "_EBR_": "]",
    "_SELF_": " . "
};

_m.constructor.prototype.regExpReplace = {
    "_DOUBLE_QUOTES_": [
        /\"/gi, "\\\""
    ],
    "_SINGLE_QUOTES_": [
        /\'/gi, "\\\'"
    ],
    "_SINGLE_QUOTES2_": [
        /'/gi, "\\'"
    ],
    "_FILTER1_": [
        /^\|\s*(.*?)\s*$/, "$1"
    ],
    "_FILTER2_": [
        /\s*\|\s*/gi, "|"
    ],
    "_REAL_PARMS_": [
        /[\'\+\-\*\/\(\)]/gi, ""
    ],
    "EXP_VAR_SINGLE_QUOTE_": [
        /'(.*?)'/gi, " "
    ],
    "EXP_VAR_DOUBLE_QUOTE_": [
        /"(.*?)"/gi, " "
    ],
    "EXP_VAR_ARRAY_": [
        /\[(.*?)\]/gi, " "
    ],
    "EXP_COMMA_": [
        /,/gi, " "
    ],
    "EXP_TRUE_FALSE_": [
        /\strue\s|\sfalse\s/gi, " "
    ],
    "EXP_WHITE_SPACE_": [
        /\s{2,}/gi, " "
    ],
    "HELPER1_": [
        /^(.*?)\s/, ""
    ],
    "HELPER2_": [
        /\s+,\s+/gi, ","
    ],
    "_EXPRESSION_ARRAY_": [
        /-,-/gi, "','"
    ]
};

_m.constructor.prototype.regExpressionBig = new RegExp(_m.regExpReplace["EXP_VAR_SINGLE_QUOTE_"][0].source + "|" + _m.regExpReplace["EXP_VAR_DOUBLE_QUOTE_"][0].source + "|" + _m.regExpReplace["EXP_VAR_ARRAY_"][0].source + "|" + _m.regExpReplace["EXP_COMMA_"][0].source + "|" + _m.regExpReplace["EXP_TRUE_FALSE_"][0].source + "|" + _m.regExpReplace["EXP_WHITE_SPACE_"][0].source, "gi");

_m.constructor.prototype.regExpExtract = {
    "_VAR_": /(\w+)(\[(\d+)\])*/,
    "_WORDS_": /\w+/gi
};

_m.constructor.prototype.regExpFix = {
    "_FIX_REMOVE_COMMENTS_": /{{!--\s*((.|\n)*?)\s*--}}/gi,
    "_FIX_BREAKLINES_TABS_": /([ ]*\r\n|[ ]*\r|[ ]*\n|\t)/gim,
    "_FIX_SPACES_": /[ ]{2,}/gi,
    "FIX_IF_ELSE_IF_DOUBLE_QUOTES_": /{{\?\s*(else\s*)*if\s*(.*?)\s*\?}}/gi
};

_m.constructor.prototype.regNotStatments = /}}(.*?){{/gi;

_m.constructor.prototype.regRawFull = /{{%\s*raw\s*%}}(.*?){{%\/\s*raw\s*%}}/gi;

_m.constructor.prototype.regExp2 = {
    /*  EACH - ITERATOR */
    "_EACH_START_": /{{#\s*each\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi, // {{# each }} OR {# each home 'city','-price' #}}
    "_EACH_END_": /{{#\s*end\s*each\s*#}}|{{\/#\s*each\s*#}}/gi, // {{# end each #}} OR {{/#each#}}
    /*  VARS */
    "_VAR_INDEX_": /{{=@index}}/gi,
    "_VAR_NOW_": /{{=@now}}/gi,
    "_VAR_YEAR_": /{{=@year}}/gi,
    "_VAR_": /{{=(\s*((?:[\.]{0,2}\/)*)([(@\w\-)\[\]]+(?:\.[(@\w\-)\[\]]+)*|\.{1})((?:\s*\|\s*[\w\'\,\s\-\"\'\\]+)*\s*))}}/gi,
    /* HELPER */
    "_HELPER_": /{{\^\s*(([@\w\.\/\-]+)((?:\s+[[\"|\']*[\w\-\.\[\]\@\/\,\'\\\+\*\:]+[\"|\']*)*))\s*}}/gi,
    /*  TEMPLATE */
    "_INLINE_TEMPLATE_START_": /{{~\s*([\w\-]+)\s*}}/gi,
    "_INLINE_TEMPLATE_END_": /{{\/~\s*}}/gi,
    "_INLINE_TEPLATE_CALL_": /{{>\s*(.*?)\s*}}/gi,
    /*  CONDITIONNAL */
    "_IF_": /{{\?\s*if\s*(.*?)\s*\?}}/gi,
    "_ELSE_": /{{\?\s*else\s*\?}}/gi,
    "_ELSE_IF_": /{{\?\s*else\s*if\s*(.*?)\s*\?}}/gi,
    "_END_IF_": /{{\?\s*end\s*if\s*\?}}|{{\/\?\s*if\s*\?}}/gi, // {{? end if ?}} OR {{/? if ?}}
    /*  WITH - ITERATOR */
    "_WITH_": /{{#\s*with\s*(.*?)\s*#}}/gi,
    "_END_WITH_": /{{#\s*end\s*with\s*#}}|{{\/#\s*with\s*#}}/gi, // {{# end with #}} OR  {{/# with #}}
    /*  LIST - ITERATOR */
    /*"_LIST_": /{{#\s*list\s*(.*?)\s*#}}/gi,*/
    "_LIST_": /{{#\s*list\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi,
    "_END_LIST_": /{{#\s*end\s*list\s*#}}|{{\/#\s*list\s*#}}/gi, // {{# end list #}} OR  {{/# list #}}
    /*  EVERY -ITERATOR */
    /*"_EVERY_START_": /{{#\s*every\s*(.*?)\s*#}}/gi,*/
    "_EVERY_START_": /{{#\s*every\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi,
    "_OTHERWISE_": /{{#\s*otherwise\s*#}}/gi,
    "_EVERY_END_": /{{#\s*end\s*every\s*#}}|{{\/#\s*every\s*#}}/gi, // {{# end every #}} OR {{/# every #}}
    /* FOR - ITERATOR */
    "_FOR_": /{{#\s+for\s+\((.*?)\)\s+in\s+(\w+)\s+#}}/gi,
    "_END_FOR_": /{{#\s*end\s*for\s*#}}|{{\/#\s*for\s*#}}/gi, // {{/# for #}} OR {{# end for #}}
    /*  SWITCH - CONDITIONAL */
    "_SWITCH_": /{{\?\s*switch\s*(.*?)\s*\?}}/gi,
    "_END_SWITCH": /{{\?\s*end\sswitch\s*\?}}|{{\/\?\s*switch\s*\?}}/gi, // {{? end switch ?}} OR {{/? switch ?}}
    "_CASE_": /{{\?\s*case\s*(.*?)\s*\?}}/gi,
    "_END_CASE_": /{{\?\s*end\s*case\s*\?}}|{{\/\?\s*case\s*\?}}/gi, // {{? end case ?}} OR {{/? case ?}}
    "_DEFAULT_": /{{\?\s*default\s*\?}}/gi,
    "_END_DEFAULT_": /{{\?\s*end\s*default\s*\?}}|{{\/\?\s*default\s*\?}}/gi // {{? end default ?}} OR {{/? default ?}}
};

_m.constructor.prototype.replaceBy2 = {
    /*  EACH - ITERATOR */
    "_EACH_START_": function(base, loop_var, filter, sort_filters)
    {
        //  IF FILTER HAS BEEN DEFINED OR NOT
        sort_filters = (typeof sort_filters != "undefined") ? "current_context." + loop_var + ".sort(_m.fieldSorter(['" + sort_filters + "'])); " : "";

        var qqq = ";";
        qqq += "  " + sort_filters + "";
        qqq += "  for (var cnt" + _m.counters + " = 0, len" + _m.counters + " = current_context." + loop_var + ".length; cnt" + _m.counters + " < len" + _m.counters + "; cnt" + _m.counters + "++)";
        qqq += "  { ";
        qqq += "      loop_" + loop_var + "(current_context." + loop_var + "[cnt" + _m.counters + "], cnt" + _m.counters + ", current_context." + loop_var + ");";
        qqq += "  ";
        qqq += "      function loop_" + loop_var + "(current_context, ndx, bbb)";
        qqq += "      {";
        qqq += "          ndxs.push(ndx);";
        qqq += "          parents_context.push(current_context);";
        qqq += "          zzz = zzz";

        _m.counters = _m.counters + 1;
        return qqq;
    },
    "_EACH_END_": function()
    {
        var qqq = ";";
        qqq += "          ndxs.pop();";
        qqq += "          parents_context.pop();";
        qqq += "      }";
        qqq += "  }";
        qqq += "  zzz = zzz";

        return qqq;
    },
    /*  VARS */
    "_VAR_INDEX_": ".concat(ndx)",
    "_VAR_NOW_": ".concat( moment().format(_m.options.date.default_date_format) )",
    "_VAR_YEAR_": ".concat( moment().format(_m.options.date.year) )",
    "_VAR_": function(v0, v1, v2, v3, v4)
    {
        // GENERATED FILTERS
        v4 = v4.trim().replace(_m.regExpReplace["_FILTER1_"][0], _m.regExpReplace["_FILTER1_"][1]).replace(_m.regExpReplace["_FILTER2_"][0], _m.regExpReplace["_FILTER2_"][1]).split("|").join("_,_");

        return ".concat( _m.getVar(parents_context, '" + v2 + "','" + v3 + "','" + v4.trim() + "',ndxs) )";
    },
    /* HELPER */
    "_HELPER_": ".concat(_m.getHelpers(parents_context, '$2','$3'))",
    /*  TEMPLATE */
    "_INLINE_TEMPLATE_START_": "; function fct_$1(parents_context) { var zzz=''; zzz = zzz",
    "_INLINE_TEMPLATE_END_": "; return zzz; } zzz = zzz.concat('')",
    "_INLINE_TEPLATE_CALL_": ".concat( fct_$1(parents_context) )",
    /*  CONDITIONNAL */
    "_IF_": "; if( _m.parseExpression(parents_context,\" $1 \",ndx,bbb) ) { zzz = zzz",
    "_ELSE_IF_": "; } else if( _m.parseExpression(parents_context,\"$1\",ndx,bbb) ) { zzz = zzz",
    "_ELSE_": "; } else { zzz = zzz",
    "_END_IF_": "; } zzz = zzz.concat('') ",
    /*  WITH - ITERATOR */
    "_WITH_": "; [current_context.$1].forEach (  function(current_context,ndx,bbb)  { parents_context.push(current_context); zzz = zzz",
    "_END_WITH_": "; parents_context.pop(); } ); zzz = zzz",
    /*  LIST - ITERATOR */
    "_LIST_": function(base, loop_var, filter, sort_filters)
    {
        if (typeof sort_filters === "undefined")
        {
            sort_filters = "";
        }
        else
        {
            sort_filters = (sort_filters === "ASC") ? ".sort()" : ".sort().reverse()";
        }

        var qqq = ";";
        qqq += "    current_context." + loop_var + ".split(',')" + sort_filters + ".forEach";
        qqq += "    (  ";
        qqq += "        function(current_context,ndx,bbb)";
        qqq += "        { ";
        qqq += "            ndxs.push(ndx);";
        qqq += "            parents_context.push(current_context);";
        qqq += "            zzz = zzz";

        return qqq;
    },
    "_END_LIST_": function()
    {
        var qqq = ";";
        qqq += "            ndxs.pop();";
        qqq += "            parents_context.pop();";
        qqq += "        }";
        qqq += "    );";
        qqq += "    zzz = zzz";

        return qqq;
    },
    /*  EVERY -ITERATOR */
    "_EVERY_START_": function(base, loop_var, filter, sort_filters)
    {
        sort_filters = (typeof sort_filters != "undefined") ? "current_context." + loop_var + ".sort(_m.fieldSorter(['" + sort_filters + "'])); " : "";

        //  IF FILTER HAS BEEN DEFINED OR NOT
        var qqq = ";";
        qqq += "   if ( current_context." + loop_var + ".length!=0 ) ";
        qqq += "   { ";
        qqq += "   " + sort_filters + "";
        qqq += "       for (var cnt" + _m.counters + " = 0, len" + _m.counters + " = current_context." + loop_var + ".length; cnt" + _m.counters + " < len" + _m.counters + "; cnt" + _m.counters + "++)";
        qqq += "       { ";
        qqq += "          loop_" + loop_var + "(current_context." + loop_var + "[cnt" + _m.counters + "], cnt" + _m.counters + ", current_context." + loop_var + ");";
        qqq += "        ";
        qqq += "          function loop_" + loop_var + "(current_context, ndx, bbb)";
        qqq += "          {";
        qqq += "             ndxs.push(ndx);";
        qqq += "             parents_context.push(current_context);";
        qqq += "             zzz = zzz";

        _m.counters = _m.counters + 1;

        return qqq;
    },
    "_OTHERWISE_": function()
    {
        var qqq = ";";
        qqq += "             ndxs.pop();";
        qqq += "             parents_context.pop();";
        qqq += "          }";
        qqq += "       }";
        qqq += "   } ";
        qqq += "   else ";
        qqq += "   {";
        qqq += "      zzz = zzz";

        return qqq;
    },
    "_EVERY_END_": function()
    {
        var qqq = ";";
        qqq += "   } ";
        qqq += "   zzz = zzz.concat('') ";

        return qqq;
    },
    /* FOR - ITERATOR */
    "_FOR_": function(base, aka_vars, loop_var)
    {
        var qqq = ";";

        qqq += " current_vars = '" + aka_vars + "'; ";
        qqq += " _m.for_instances.push( (current_vars.replace(_m.regExp._WHITE_SPACES_CHAR_, '')).split(',') ); ";
        qqq += " current_context." + loop_var + ".forEach ";
        qqq += " (  ";
        qqq += "     function(current_context,ndx,bbb)  ";
        qqq += "     { ";
        qqq += "         var build_vars = {}; ";
        qqq += "         for (var cnt=0;cnt<this.length;cnt++) ";
        qqq += "         { ";
        qqq += "             build_vars[''+this[cnt]+''] = current_context[cnt]; ";
        qqq += "         } ";
        qqq += "         _m.fakeContext.push( build_vars); ";
        qqq += "         ndxs.push(ndx); ";
        qqq += "         parents_context.push(current_context); ";
        qqq += "         zzz = zzz";

        return qqq;
    },
    "_END_FOR_": function()
    {
        var qqq = ";";

        qqq += "          ndxs.pop();";
        qqq += "          parents_context.pop();";
        qqq += "          _m.fakeContext.pop(); ";
        qqq += "      } , _m.for_instances[_m.for_instances.length-1] ";
        qqq += " ); ";
        qqq += " _m.for_instances.pop(); zzz = zzz";

        return qqq;
    },
    /*  SWITCH - CONDITIONAL */
    "_SWITCH_": "; switch( current_context.$1 ) { ",
    "_END_SWITCH": "} zzz = zzz.concat('')",
    "_CASE_": "\ncase $1 : zzz = zzz.concat('')",
    "_END_CASE_": "; break; \n",
    "_DEFAULT_": "\n default : zzz = zzz.concat('')",
    "_END_DEFAULT_": ";\n"
};

_m.constructor.prototype.getBy2 = {
    "_VAR2_": "$2_,_$3_,_$4"
};

_m.fakeContext = [];
_m.for_instances = [];

_m.regExpBigCheck = new RegExp(_m.regExp._INTERNAL_VARS_.source + "|" + _m.regExp._ARRAY_VARS_.source + "|" + _m.regExp._DOT_VARS_.source + "|" + _m.regExp._DOT_.source + "|" + _m.regExp._PARENT_VARS_.source + "|" + _m.regExp._ROOT_VARS_.source + "|" + _m.regExp._SELF_.source, "gi");
_m.regExpBigCheck2 = new RegExp(_m.regExp._REVERT_DOT_.source + "|" + _m.regExp._REVERT_ROOT_.source + "|" + _m.regExp._REVERT_PARENT_.source + "|" + _m.regExp._REVERT_STARTING_BRACKET_.source + "|" + _m.regExp._REVERT_ENDING_BRACKET_.source + "|" + _m.regExp._REVERT_SELF_.source, "gi");

_m.counters = 0;