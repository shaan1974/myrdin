function _m(e,t,r){_m.about=function(){var e={Version:"0.79-B",Author:"Liuzzi Stéphane Aka Shaan1974",Started:"17-10-2019",Updated:"12-12-2019"};return e};_m.version=_m.about().Version;if(typeof e==="undefined")return _m.about();if(e){if(window===this){return new _m(e,t,r)}var n=true;try{if(document.querySelector(""+t+"").tagName==="SCRIPT"){t=document.querySelector(""+t+"").innerText}else{t=document.querySelector(""+t+"").innerHTML}t=t.replace(/{{&gt;\s/gi,"{{> ");n=false}catch(e){}_m.generateData={template:t,dest:r,jsonData:e};_m.generateTemplate();_m.putInPlaceTemplate();return}return _m.about()}_m.constructor.prototype.applyFilters=function(e,t){var r,n,i,s,o;t=t.split("|");for(o=0,s=t.length;o<s;o++){r=t[o].match(this.regExp._APPLY_FILTERS_);if(r!==null){t[o]=t[o].split(" ")[0];for(n=0,i=r.length;n<i;n++){r[n]=r[n].slice(1,-1)}}if(this.quick_filters_call.indexOf(t[o])!==-1){e=e[this.quick_filters_replace[this.quick_filters_call.indexOf(t[o])]]()}else{e=this.filters[t[o]](e,r)}}return e};_m.constructor.prototype.filters=[];_m.constructor.prototype.quick_filters_call=["uppercase","lowercase","trim","ltrim","rtrim"];_m.constructor.prototype.quick_filters_replace=["toUpperCase","toLowerCase","trim","trimLeft","trimRight"];_m.constructor.prototype.addFilter=function(e,t){_m.filters[""+e+""]=new Function("a","parms",""+t+"")};_m.constructor.prototype.filters["capitalizeFirstLetter"]=function(e){e=e.toLowerCase();return e.charAt(0).toUpperCase()+e.slice(1)};_m.constructor.prototype.filters["capitalizeEachWord"]=function(e){return e.split(" ").map(function(e){return _m.filters.capitalizeFirstLetter(e)}).join(" ")};_m.constructor.prototype.filters["split"]=function(e,t){var r=typeof t!=="undefined"?t[0]:" ";return e.split(""+r+"")};_m.constructor.prototype.filters["slice"]=function(e,t){var r=typeof t!=="undefined"?t[0]:0;var n=typeof t!=="undefined"?t[1]:e.length-1;return e.slice(r,n)};_m.constructor.prototype.filters["urlEncode"]=function(e){return encodeURIComponent(e)};_m.constructor.prototype.filters["urlDecode"]=function(e){return decodeURIComponent(e)};_m.constructor.prototype.filters["linearize"]=function(e){return e.replace(/(\t|\n|\r)/gi,"").trim()};_m.constructor.prototype.filters["truncate"]=function(e,t){return clipHtml(e,t[0],{breakWords:Boolean(t[1]),html:true,imageWeight:2,indicator:""+t[2]+"",maxLines:5})};_m.constructor.prototype.filters["hyphenate"]=function(e){return e.replace(/\s/gi,"-")};_m.constructor.prototype.filters["increment"]=function(e){return e*1+1};_m.constructor.prototype.filters["decrement"]=function(e){return e*1-1};_m.constructor.prototype.filters["abs"]=function(e){return Math.abs(e)};_m.constructor.prototype.filters["round"]=function(e){return Math.round(e)};_m.constructor.prototype.filters["ceil"]=function(e){return Math.ceil(e)};_m.constructor.prototype.filters["floor"]=function(e){return Math.floor(e)};_m.constructor.prototype.filters["sqrt"]=function(e){return Math.sqrt(e)};_m.constructor.prototype.filters["pow"]=function(e,t){return Math.pow(e,t)};_m.constructor.prototype.filters["formatNumber"]=function(e){return accounting.formatMoney(e,_m.options.format.number)};_m.constructor.prototype.filters["formatCurrency"]=function(e){return accounting.formatMoney(e,_m.options.format.currency)};_m.constructor.prototype.filters["to_fixed"]=function(e,t){return e.toFixed(t[0])};_m.constructor.prototype.filters["uniq"]=function(e){function onlyUnique(e,t,r){return r.indexOf(e)===t}return e.filter(onlyUnique)};_m.constructor.prototype.filters["join"]=function(e,t){var r=typeof t!=="undefined"&&t!==null?t[0]:",";return e.join(r)};_m.constructor.prototype.filters["size"]=function(e){return e.length};_m.constructor.prototype.filters["avg"]=function(e){var t=e.reduce(function(e,t){return t+=e});return t/e.length};_m.constructor.prototype.filters["array_first"]=function(e){return e[0]};_m.constructor.prototype.filters["array_last"]=function(e){return e[e.length-1]};_m.constructor.prototype.filters["dateFormat"]=function(e,t){return moment(e,""+t[0]+"").format(""+t[1]+"")};_m.constructor.prototype.filters["dateAdd"]=function(e,t){return moment(e,t[0]).add(t[1],t[2]).format(t[3])};_m.constructor.prototype.filters["dateSubstract"]=function(e,t){return moment(e,t[0]).subtract(t[1],t[2]).format(t[3])};_m.constructor.prototype.function=[];_m.constructor.prototype.uuid=function(){return(""+Math.random().toString(36).substring(2)+Date.now().toString(36)+"").toUpperCase()};_m.constructor.prototype.stripHtml=function(e){if(e==null)return"";var t=document.createElement("div");t.innerHTML=e;return t.innerText};_m.constructor.prototype.evaluate=function(e){var t=_m.uuid();var r=document.createElement("script");r.setAttribute("id","ID_"+t+"");r.text=""+e+"";try{document.getElementsByTagName("head")[0].appendChild(r)}catch(e){}var n=document.querySelector("#ID_"+t+"");n.parentNode.removeChild(n)};_m.constructor.prototype.expressionVar=function(e){e=e.replace(this.regExpressionBig," ");e=e.trim();e=e.match(this.regExpExtract["_WORDS_"]);return e.filter(function(e){return e!=Number(e)})};_m.constructor.prototype.getNodeindex=function(e){var t=e.parentNode.children,r=0;for(;r<t.length;r++)if(t[r]==e)return r};_m.constructor.prototype.generateTemplate=function(){if(typeof _m.precompiledCode!=="undefined"){eval(decodeURIComponent(_m.rot13(_m.precompiledCode)))}else{var starting_code;var that=this;var uuid=this.uuid();var key;this.internal_uuid=uuid;window["__TMP_"+uuid+""]="";window["__TMP_JSON_"+uuid+""]=this.generateData.jsonData;for(key in this.outsideTemplates){if(this.outsideTemplates.hasOwnProperty(key)){this.generateData["template"]="{{~"+key+"}} "+this.outsideTemplates[key]+" {{/~}} "+this.generateData["template"]}}this.correctTemplate();this.rawSectionInTemplate();this.generateData["template"]="{{TEMPLATE_START}}"+this.generateData["template"]+"{{TEMPLATE_END}}";this.generateData["template"]=this.generateData["template"].replace(this.regExp2._VAR_,function(e){var t=that.regExpReplace["_SINGLE_QUOTES_"];return e.replace(t[0],t[1])});this.generateData["template"]=this.generateData["template"].replace(this.regExpFix.FIX_IF_ELSE_IF_DOUBLE_QUOTES_,function(e){var t=that.regExpReplace["_DOUBLE_QUOTES_"];return e.replace(t[0],t[1])});this.generateData["template"]=this.generateData["template"].replace(this.regNotStatments,function(e){var t=that.regExpReplace["_DOUBLE_QUOTES_"];return e==="}}{{"?e:'}}.concat("'+e.slice(2,-2).replace(t[0],t[1])+'"){{'});starting_code="var ndxs = [0]; var bbb; var parents_context=[ window['__TMP_JSON_"+uuid+"'] ]; var root_context = parents_context[0]; var ndx=0; var current_context = parents_context[0]; var zzz=''; zzz=zzz.concat('')";this.generateData["template"]=this.generateData["template"].replace("{{TEMPLATE_START}}",""+starting_code+"");this.generateData["template"]=this.generateData["template"].replace("{{TEMPLATE_END}}",".concat('')");this.generateData["template"]=this.generateData["template"].replace(this.regExp2._HELPER_,function(e){var t=that.regExpReplace["_SINGLE_QUOTES2_"];return e.replace(t[0],t[1])});for(key in this.regExp2){if(this.regExp2.hasOwnProperty(key)){this.generateData["template"]=this.generateData["template"].replace(this.regExp2[key],this.replaceBy2[key])}}this.generateData["template"]+="; window['__TMP_"+uuid+"']=zzz;";if(_m.precompile===true){_m.generatedPrecompiledCode=this.generateData["template"];_m.generatedPrecompiledCode=_m.generatedPrecompiledCode.replace("window['__TMP_JSON_"+uuid+"']","_m.generateData.jsonData");_m.generatedPrecompiledCode=_m.generatedPrecompiledCode.replace("window['__TMP_"+uuid+"']=zzz;","");_m.generatedPrecompiledCode+="this.generatedCode = zzz;";_m.generatedPrecompiledCode=_m.generatedPrecompiledCode.replace(/\t/gi," ");_m.generatedPrecompiledCode=_m.rot13(encodeURIComponent(_m.generatedPrecompiledCode));document.getElementById("pc").value=_m.generatedPrecompiledCode}eval(this.generateData["template"]);this.generatedCode=window["__TMP_"+uuid];delete window["__TMP_"+uuid];delete window["__TMP_JSON_"+uuid]}};_m.constructor.prototype.putInPlaceTemplate=function(){document.querySelector(this.generateData["dest"]).innerHTML="";document.querySelector(this.generateData["dest"]).insertAdjacentHTML("beforeend",""+this.generatedCode+"");if(this.debug===true){console.log(this.generatedCode.length)}};_m.constructor.prototype.correctTemplate=function(){var e=new RegExp(this.regExpFix._FIX_REMOVE_COMMENTS_.source+"|"+this.regExpFix._FIX_BREAKLINES_TABS_.source,"gi");this.generateData["template"]=this.generateData["template"].replace(e,"");this.generateData["template"]=this.generateData["template"].replace(this.regExpFix._FIX_SPACES_," ");this.generateData["template"]=this.generateData["template"].trim()};_m.constructor.prototype.rawSectionInTemplate=function(){var r=this;this.generateData["template"]=this.generateData["template"].replace(this.regRawFull,function(e,t){return t.replace(r.regExp._START_PARAGRAPH_,"&#123;").replace(r.regExp._END_PARAGRAPH_,"&#125;")})};_m.constructor.prototype.getVar=function(e,t,r,n,i){var s,o,a,u,c=false,_,p;if(r==="@index"){return i[i.length-t.length/3-1]}else if(r==="."){s=typeof i==="undefined"?e[e.length-1]:e[i.length-t.length/3-1]}else{if(t===""){s=e[e.length-1]}else if(t==="./"){s=e[0]}else if(t.indexOf("../")===0){s=e[e.length-t.length/3-1]}u=r.split(".");for(o=0,a=u.length;o<a;o++){_=u[o].match(this.regExpExtract["_VAR_"]);s=_[2]===undefined?s[_[1]]:s[_[1]][_[3]]}}if(typeof s==="undefined"){s=this.fakeContext[this.fakeContext.length-1][r]}if(n!==""){n=n.split("_,_");if(n.indexOf("safe")!==-1){p=n.indexOf("safe");n.splice(p,1);c=true}s=n.length!==0?this.applyFilters(s,n.join("|")):s}return c||s.constructor.toString().indexOf("Array")!==-1||s.constructor.toString().indexOf("Number")!==-1?s:this.stripHtml(s)};_m.constructor.prototype.getHelpers=function(e,t,r){if(r===""){return this.helpers[t]()}var n,i,s;if(t==="math"){var o,a,u;o=r.replace(this.regExpReplace["_REAL_PARMS_"][0],this.regExpReplace["_REAL_PARMS_"][1]);a=this.expressionVar(o);for(n=0,i=a.length;n<i;n++){s=("{{="+a[n]+"}}").replace(this.regExp2._VAR_,this.getBy2._VAR2_).split("_,_");u=this.getVar(e,s[0],s[1],s[2]);r=r.replace(a[n],u)}return new Function("return "+r.replace(/\'/gi,"")+";")()}else{var c,_;c=r.replace(this.regExpReplace["HELPER1_"][0],this.regExpReplace["HELPER1_"][1]).replace(this.regExpReplace["HELPER2_"][0],this.regExpReplace["HELPER2_"][1]).trim().split(",");for(n=0,i=c.length;n<i;n++){_=c[n];if(_.indexOf("'")!==0){s=("{{="+_+"}}").replace(this.regExp2._VAR_,this.getBy2._VAR2_).split("_,_");c[n]=this.getVar(e,s[0],s[1],s[2])}else{c[n]=_.slice(1,-1)}}c=[e].concat(c);return this.helpers[t].apply(this,c)}};_m.constructor.prototype.fieldSorter=function(e){return function(r,n){return e.map(function(e){var t=1;if(e[0]==="-"){t=-1;e=e.substring(1)}if(r[e]>n[e])return t;if(r[e]<n[e])return-t;return 0}).reduce(function firstNonZeroValue(e,t){return e?e:t},0)}};_m.constructor.prototype.outsideTemplates=[];_m.constructor.prototype.addTemplate=function(e,t){_m.outsideTemplates[""+e+""]=t};_m.constructor.prototype.rot13=function(e){return e.replace(/([a-m])|([n-z])/gi,function(e,t,r){return String.fromCharCode(t?t.charCodeAt(0)+13:r?r.charCodeAt(0)-13:0)||e})};_m.constructor.prototype.expression_function={is_empty:function(e){if(typeof e!=="undefined"){if(e.constructor.toString().indexOf("Array()")!=-1){return e.length===0?true:false}if(e.constructor.toString().indexOf("String()")!=-1){return e===""?true:false}}return true},len:function(e){return typeof e!=="undefined"?e.length:0},cast_to:function(e,t,r){if(e==="STRING"){return""+t+""}else if(e==="INTEGER"){t=t.match(/[\d\.]+/)[0];if(typeof r!=="undefined"){t=Math[""+r+""](parseFloat(t))}return parseInt(t,10)}else if(e==="FLOAT"){return typeof r==="undefined"?parseFloat(t):parseFloat(t).toFixed(r)}}};_m.constructor.prototype.expression_function["binarylen"]=function(e){var t=0,r;if(navigator.userAgent.match(/(MSIE |Trident.*rv[ :])([0-9]+)/)!==null||navigator.appVersion.indexOf("Edge")>-1){r=unescape(encodeURIComponent(e)).length;if(encodeURIComponent(e).match(/(%0A|%0D)/gi)!==null){t=encodeURIComponent(e).match(/(%0A|%0D)/gi).length}}else{r=new TextEncoder("utf-8").encode(e).length}if(encodeURIComponent(e).match(/(%0A|%0D)/gi)!==null){t=encodeURIComponent(e).match(/(%0A|%0D)/gi).length}return r+t};_m.constructor.prototype.expression_function["startsWith"]=function(e,t){return e.startsWith(t)};_m.constructor.prototype.expression_function["endsWith"]=function(e,t){return e.endsWith(t)};_m.constructor.prototype.expression_function["contains"]=function(e,t){return e.indexOf(t)!=-1?true:false};_m.constructor.prototype.expression_function["concat"]=function(){return Array.prototype.slice.call(arguments).join("")};_m.constructor.prototype.expression_function["math"]=function(e){return new Function("return "+e)()};_m.constructor.prototype.expression_function["inRange"]=function(e,t,r){if(e.constructor.toString().indexOf("String()")!=-1){e=Number(""+e+"")}if(t.constructor.toString().indexOf("String()")!=-1){t=Number(""+t+"")}if(r.constructor.toString().indexOf("String()")!=-1){r=Number(""+r+"")}return t<e&&e<r?true:false};_m.constructor.prototype.expression_function["moment_date"]=function(e,t){return moment(e,t)};_m.constructor.prototype.expression_function["date_diff"]=function(e,t,r){return e.diff(t,""+r+"")};_m.constructor.prototype.expression_function["list_contains"]=function(e,t){return e.split(",").indexOf(t)===-1?false:true};_m.constructor.prototype.expression_function["list_to_array"]=function(e){return e.split(",")};_m.constructor.prototype.expression_function["array_to_list"]=function(e){return e.join(",")};_m.constructor.prototype.expression_function["array_are_equal"]=function(e,t){return e.toString()===t.toString()};_m.constructor.prototype.expression_function["array_indexof"]=function(e,t){return e.indexOf(t)};_m.constructor.prototype.expression_function["in_array"]=function(e,t){return e.indexOf(t)!==-1?true:false};_m.constructor.prototype.expression_function["is_array"]=function(e){return e.constructor.toString().indexOf("Array")===-1?false:true};_m.constructor.prototype.expression_function["item_pos_in_array"]=function(e,t,r){return e[t]===r?true:false};_m.constructor.prototype.expression_function["object_are_equal"]=function(e,t){return JSON.stringify(e)===JSON.stringify(t)};_m.fct_keys=[];for(var key in _m.constructor.prototype.expression_function){if(_m.constructor.prototype.expression_function.hasOwnProperty(key)){_m.fct_keys.push(key)}}_m.fct_keys.sort(function(e,t){return t.length-e.length});_m.fct_keys_rg=[];for(var cnt=0,len=_m.fct_keys.length;cnt<len;cnt++){_m.fct_keys_rg.push(new RegExp("\\s+("+_m.fct_keys[cnt]+"\\()","gi"))}_m.constructor.prototype.debug=false;_m.constructor.prototype.generatedCode="";_m.constructor.prototype.base_replacements=[{key:/[ ]EQ[ ]/gi,replace:" === "},{key:/[ ]NEQ[ ]/gi,replace:" !== "},{key:/[ ]GT[ ]/gi,replace:" > "},{key:/[ ]GTE[ ]/gi,replace:" >= "},{key:/[ ]LT[ ]/gi,replace:" < "},{key:/[ ]LTE[ ]/gi,replace:" <= "},{key:/[ ]AND[ ]/gi,replace:" && "},{key:/[ ]OR[ ]/gi,replace:" || "},{key:/[ ]NOT[ ]/gi,replace:" ! "}];_m.constructor.prototype.regExp={_INTERNAL_VARS_:/@([\w]+)/gi,_ARRAY_VARS_:/\w+\[\d+\]/gi,_DOT_VARS_:/(\s{1}[a-zA-Z]{1}[\w\[\]]+(?:\.[a-zA-Z]{1}[\w\[\]]+){1,}\s{1})/gi,_PARENT_VARS_:/\.\.\//gi,_DOT_:/\./gi,_ROOT_VARS_:/\.\//gi,_SELF_:/[ ]\.[ ]/gi,_END_PARENTHESIS_:/\)/gi,_MATCH_NAMES_GLOBAL_:/"name":"(\w+)"/g,_MATCH_NAMES_:/"name":"(\w+)"/,_REVERT_DOT_:/_DOT_/gi,_REVERT_ROOT_:/_ROOT_/gi,_REVERT_PARENT_:/_BDOT_/gi,_REVERT_STARTING_BRACKET_:/_SBR_/gi,_REVERT_ENDING_BRACKET_:/_EBR_/gi,_REVERT_SELF_:/_SELF_/gi,_REVERT_END_PARENTHESIS_:/_ENDP_/gi,_SINGLE_QUOTE_:/\'/gi,_DOUBLE_QUOTE_:/\"/gi,_MATH_EXPRESSION_:/math\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/gi,_ESCAPE_DOUBLE_QUOTES_:/\"/gi,_WHITE_SPACES_CHAR_:/\s/gi,_START_PARAGRAPH_:/{/gi,_END_PARAGRAPH_:/}/gi,_APPLY_sort_filters_:/[\']((.|\\n)*?)[\']|[\"]((.|\n)*?)[\"]/gi,_UUID_:/[xy]/g,_APPLY_FILTERS_:/[\']((.|\\n)*?)[\']|[\"]((.|\n)*?)[\"]/gi};_m.constructor.prototype.regExpRevert={_DOT_:".",_ROOT_:"./",_BDOT_:"../",_SBR_:"[",_EBR_:"]",_SELF_:" . "};_m.constructor.prototype.regExpReplace={_DOUBLE_QUOTES_:[/\"/gi,'\\"'],_SINGLE_QUOTES_:[/\'/gi,"\\'"],_SINGLE_QUOTES2_:[/'/gi,"\\'"],_FILTER1_:[/^\|\s*(.*?)\s*$/,"$1"],_FILTER2_:[/\s*\|\s*/gi,"|"],_REAL_PARMS_:[/[\'\+\-\*\/\(\)]/gi,""],EXP_VAR_SINGLE_QUOTE_:[/'(.*?)'/gi," "],EXP_VAR_DOUBLE_QUOTE_:[/"(.*?)"/gi," "],EXP_VAR_ARRAY_:[/\[(.*?)\]/gi," "],EXP_COMMA_:[/,/gi," "],EXP_TRUE_FALSE_:[/\strue\s|\sfalse\s/gi," "],EXP_WHITE_SPACE_:[/\s{2,}/gi," "],HELPER1_:[/^(.*?)\s/,""],HELPER2_:[/\s+,\s+/gi,","],_EXPRESSION_ARRAY_:[/-,-/gi,"','"]};_m.constructor.prototype.regExpressionBig=new RegExp(_m.regExpReplace["EXP_VAR_SINGLE_QUOTE_"][0].source+"|"+_m.regExpReplace["EXP_VAR_DOUBLE_QUOTE_"][0].source+"|"+_m.regExpReplace["EXP_VAR_ARRAY_"][0].source+"|"+_m.regExpReplace["EXP_COMMA_"][0].source+"|"+_m.regExpReplace["EXP_TRUE_FALSE_"][0].source+"|"+_m.regExpReplace["EXP_WHITE_SPACE_"][0].source,"gi");_m.constructor.prototype.regExpExtract={_VAR_:/(\w+)(\[(\d+)\])*/,_WORDS_:/\w+/gi};_m.constructor.prototype.regExpFix={_FIX_REMOVE_COMMENTS_:/{{!--\s*((.|\n)*?)\s*--}}/gi,_FIX_BREAKLINES_TABS_:/([ ]*\r\n|[ ]*\r|[ ]*\n|\t)/gim,_FIX_SPACES_:/[ ]{2,}/gi,FIX_IF_ELSE_IF_DOUBLE_QUOTES_:/{{\?\s*(else\s*)*if\s*(.*?)\s*\?}}/gi};_m.constructor.prototype.regNotStatments=/}}(.*?){{/gi;_m.constructor.prototype.regRawFull=/{{%\s*raw\s*%}}(.*?){{%\/\s*raw\s*%}}/gi;_m.constructor.prototype.regExp2={_EACH_START_:/{{#\s*each\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi,_EACH_END_:/{{#\s*end\s*each\s*#}}|{{\/#\s*each\s*#}}/gi,_VAR_INDEX_:/{{=@index}}/gi,_VAR_NOW_:/{{=@now}}/gi,_VAR_YEAR_:/{{=@year}}/gi,_VAR_:/{{=(\s*((?:[\.]{0,2}\/)*)([(@\w\-)\[\]]+(?:\.[(@\w\-)\[\]]+)*|\.{1})((?:\s*\|\s*[\w\'\,\s\-\"\'\\]+)*\s*))}}/gi,_HELPER_:/{{\^\s*(([@\w\.\/\-]+)((?:\s+[[\"|\']*[\w\-\.\[\]\@\/\,\'\\\+\*\:]+[\"|\']*)*))\s*}}/gi,_INLINE_TEMPLATE_START_:/{{~\s*([\w\-]+)\s*}}/gi,_INLINE_TEMPLATE_END_:/{{\/~\s*}}/gi,_INLINE_TEPLATE_CALL_:/{{>\s*(.*?)\s*}}/gi,_IF_:/{{\?\s*if\s*(.*?)\s*\?}}/gi,_ELSE_:/{{\?\s*else\s*\?}}/gi,_ELSE_IF_:/{{\?\s*else\s*if\s*(.*?)\s*\?}}/gi,_END_IF_:/{{\?\s*end\s*if\s*\?}}|{{\/\?\s*if\s*\?}}/gi,_WITH_:/{{#\s*with\s*(.*?)\s*#}}/gi,_END_WITH_:/{{#\s*end\s*with\s*#}}|{{\/#\s*with\s*#}}/gi,_LIST_:/{{#\s*list\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi,_END_LIST_:/{{#\s*end\s*list\s*#}}|{{\/#\s*list\s*#}}/gi,_EVERY_START_:/{{#\s*every\s*(.*?)\s*(\'(.*?)\'\s*)*#}}/gi,_OTHERWISE_:/{{#\s*otherwise\s*#}}/gi,_EVERY_END_:/{{#\s*end\s*every\s*#}}|{{\/#\s*every\s*#}}/gi,_FOR_:/{{#\s+for\s+\((.*?)\)\s+in\s+(\w+)\s+#}}/gi,_END_FOR_:/{{#\s*end\s*for\s*#}}|{{\/#\s*for\s*#}}/gi,_SWITCH_:/{{\?\s*switch\s*(.*?)\s*\?}}/gi,_END_SWITCH:/{{\?\s*end\sswitch\s*\?}}|{{\/\?\s*switch\s*\?}}/gi,_CASE_:/{{\?\s*case\s*(.*?)\s*\?}}/gi,_END_CASE_:/{{\?\s*end\s*case\s*\?}}|{{\/\?\s*case\s*\?}}/gi,_DEFAULT_:/{{\?\s*default\s*\?}}/gi,_END_DEFAULT_:/{{\?\s*end\s*default\s*\?}}|{{\/\?\s*default\s*\?}}/gi};_m.constructor.prototype.replaceBy2={_EACH_START_:function(e,t,r,n){n=typeof n!="undefined"?"current_context."+t+".sort(_m.fieldSorter(['"+n+"'])); ":"";var i=";";i+="  "+n+"";i+="  for (var cnt"+_m.counters+" = 0, len"+_m.counters+" = current_context."+t+".length; cnt"+_m.counters+" < len"+_m.counters+"; cnt"+_m.counters+"++)";i+="  { ";i+="      loop_"+t+"(current_context."+t+"[cnt"+_m.counters+"], cnt"+_m.counters+", current_context."+t+");";i+="  ";i+="      function loop_"+t+"(current_context, ndx, bbb)";i+="      {";i+="          ndxs.push(ndx);";i+="          parents_context.push(current_context);";i+="          zzz = zzz";_m.counters=_m.counters+1;return i},_EACH_END_:function(){var e=";";e+="          ndxs.pop();";e+="          parents_context.pop();";e+="      }";e+="  }";e+="  zzz = zzz";return e},_VAR_INDEX_:".concat(ndx)",_VAR_NOW_:".concat( moment().format(_m.options.date.default_date_format) )",_VAR_YEAR_:".concat( moment().format(_m.options.date.year) )",_VAR_:function(e,t,r,n,i){i=i.trim().replace(_m.regExpReplace["_FILTER1_"][0],_m.regExpReplace["_FILTER1_"][1]).replace(_m.regExpReplace["_FILTER2_"][0],_m.regExpReplace["_FILTER2_"][1]).split("|").join("_,_");return".concat( _m.getVar(parents_context, '"+r+"','"+n+"','"+i.trim()+"',ndxs) )"},_HELPER_:".concat(_m.getHelpers(parents_context, '$2','$3'))",_INLINE_TEMPLATE_START_:"; function fct_$1(parents_context) { var zzz=''; zzz = zzz",_INLINE_TEMPLATE_END_:"; return zzz; } zzz = zzz.concat('')",_INLINE_TEPLATE_CALL_:".concat( fct_$1(parents_context) )",_IF_:'; if( _m.parseExpression(parents_context," $1 ",ndx,bbb) ) { zzz = zzz',_ELSE_IF_:'; } else if( _m.parseExpression(parents_context,"$1",ndx,bbb) ) { zzz = zzz',_ELSE_:"; } else { zzz = zzz",_END_IF_:"; } zzz = zzz.concat('') ",_WITH_:"; [current_context.$1].forEach (  function(current_context,ndx,bbb)  { parents_context.push(current_context); zzz = zzz",_END_WITH_:"; parents_context.pop(); } ); zzz = zzz",_LIST_:function(e,t,r,n){if(typeof n==="undefined"){n=""}else{n=n==="ASC"?".sort()":".sort().reverse()"}var i=";";i+="    current_context."+t+".split(',')"+n+".forEach";i+="    (  ";i+="        function(current_context,ndx,bbb)";i+="        { ";i+="            ndxs.push(ndx);";i+="            parents_context.push(current_context);";i+="            zzz = zzz";return i},_END_LIST_:function(){var e=";";e+="            ndxs.pop();";e+="            parents_context.pop();";e+="        }";e+="    );";e+="    zzz = zzz";return e},_EVERY_START_:function(e,t,r,n){n=typeof n!="undefined"?"current_context."+t+".sort(_m.fieldSorter(['"+n+"'])); ":"";var i=";";i+="   if ( current_context."+t+".length!=0 ) ";i+="   { ";i+="   "+n+"";i+="       for (var cnt"+_m.counters+" = 0, len"+_m.counters+" = current_context."+t+".length; cnt"+_m.counters+" < len"+_m.counters+"; cnt"+_m.counters+"++)";i+="       { ";i+="          loop_"+t+"(current_context."+t+"[cnt"+_m.counters+"], cnt"+_m.counters+", current_context."+t+");";i+="        ";i+="          function loop_"+t+"(current_context, ndx, bbb)";i+="          {";i+="             ndxs.push(ndx);";i+="             parents_context.push(current_context);";i+="             zzz = zzz";_m.counters=_m.counters+1;return i},_OTHERWISE_:function(){var e=";";e+="             ndxs.pop();";e+="             parents_context.pop();";e+="          }";e+="       }";e+="   } ";e+="   else ";e+="   {";e+="      zzz = zzz";return e},_EVERY_END_:function(){var e=";";e+="   } ";e+="   zzz = zzz.concat('') ";return e},_FOR_:function(e,t,r){var n=";";n+=" current_vars = '"+t+"'; ";n+=" _m.for_instances.push( (current_vars.replace(_m.regExp._WHITE_SPACES_CHAR_, '')).split(',') ); ";n+=" current_context."+r+".forEach ";n+=" (  ";n+="     function(current_context,ndx,bbb)  ";n+="     { ";n+="         var build_vars = {}; ";n+="         for (var cnt=0;cnt<this.length;cnt++) ";n+="         { ";n+="             build_vars[''+this[cnt]+''] = current_context[cnt]; ";n+="         } ";n+="         _m.fakeContext.push( build_vars); ";n+="         ndxs.push(ndx); ";n+="         parents_context.push(current_context); ";n+="         zzz = zzz";return n},_END_FOR_:function(){var e=";";e+="          ndxs.pop();";e+="          parents_context.pop();";e+="          _m.fakeContext.pop(); ";e+="      } , _m.for_instances[_m.for_instances.length-1] ";e+=" ); ";e+=" _m.for_instances.pop(); zzz = zzz";return e},_SWITCH_:"; switch( current_context.$1 ) { ",_END_SWITCH:"} zzz = zzz.concat('')",_CASE_:" case $1 : zzz = zzz.concat('')",_END_CASE_:"; break; ",_DEFAULT_:" default : zzz = zzz.concat('')",_END_DEFAULT_:";"};_m.constructor.prototype.getBy2={_VAR2_:"$2_,_$3_,_$4"};_m.fakeContext=[];_m.for_instances=[];_m.tmp_array=["_INTERNAL_VARS_","_ARRAY_VARS_","_DOT_VARS_","_DOT_","_PARENT_VARS_","_ROOT_VARS_","_SELF_"];_m.regExpBigCheck=new RegExp(_m.tmp_array.map(function(e){return _m.regExp[e].source}).join("|"),"gi");_m.tmp_array=["_REVERT_DOT_","_REVERT_ROOT_","_REVERT_PARENT_","_REVERT_STARTING_BRACKET_","_REVERT_ENDING_BRACKET_","_REVERT_SELF_"];_m.regExpBigCheck2=new RegExp(_m.tmp_array.map(function(e){return _m.regExp[e].source}).join("|"),"gi");_m.counters=0;_m.precompile=false;_m.generatedPrecompiledCode="";_m.debug=false;_m.constructor.prototype.options={lg:"fr",date:{default_date_format:"LLLL",year:"YYYY"},format:{currency:{symbol:"€",format:"%v %s",decimal:",",thousand:".",precision:2},number:{symbol:"",format:"%v",precision:2,thousand:".",decimal:","}}};_m.constructor.prototype.parseExpression_rbc=function(e){return _m.regExpRevert[e]};_m.constructor.prototype.parseExpression_sort=function(e,t){return t.length-e.length};_m.constructor.prototype.parseExpression_array_replace=function(e){return e.replace("[","_SBR_").replace("]","_EBR_")};_m.constructor.prototype.parseExpression_dot_replace=function(e){return e.replace(_m.regExp._DOT_,"_DOT_")};_m.constructor.prototype.parseExpression=function(e,t,r,n){var i,s,o,a,u,c,_;i=0;s=this.base_replacements.length;while(i<s){t=t.replace(this.base_replacements[i].key,this.base_replacements[i].replace);i++}if(t.match(this.regExpBigCheck)!==null){t=t.replace(this.regExp._INTERNAL_VARS_," __IV_$1 ");t=t.replace(this.regExp._ARRAY_VARS_,_m.parseExpression_array_replace);t=t.replace(this.regExp._DOT_VARS_,_m.parseExpression_dot_replace);t=t.replace(this.regExp._PARENT_VARS_,"_BDOT_");t=t.replace(this.regExp._ROOT_VARS_,"_ROOT_");t=t.replace(this.regExp._SELF_,"_SELF_")}i=0;s=this.fct_keys.length;while(i<s){t=t.replace(this.fct_keys_rg[i]," INTERNAL_FUNCTION_"+this.fct_keys[i]+"_ ");i++}t=t.replace(this.regExp._END_PARENTHESIS_," _ENDP_ ");if(this.expressionVar(t).length!=0){var p=this.expressionVar(t);p.sort(_m.constructor.prototype.parseExpression_sort);for(i=0,s=p.length;i<s;i++){o=p[i];if(o.indexOf("INTERNAL_FUNCTION_")===0){t=t.replace(o,"_m.expression_function."+o.slice(18,-1)+"(")}else if(o.indexOf("__IV_")===0){t=_m.parseExpressionSmallFct[o.substr(5)](t,o,r,n)}else{u=o.replace(this.regExpBigCheck2,_m.parseExpression_rbc);if(u!=="_ENDP_"){c=("{{="+u+"}}").replace(this.regExp2._VAR_,this.getBy2._VAR2_).split("_,_");a=this.getVar(e,c[0],c[1],c[2].trim());_=a.constructor.toString();if(_.indexOf("Array")!==-1){a=JSON.stringify(a)}else if(_.indexOf("Number")!==-1){a=a}else{a="'"+a.replace(this.regExpReplace["_SINGLE_QUOTES_"][0],this.regExpReplace["_SINGLE_QUOTES_"][1])+"'"}}else{a=")"}t=t.replace(o,a)}}}this.parsedExptression=new Function("return "+t+";");return this.parsedExptression()};_m.constructor.prototype.parseExpressionSmallFct={first:function(e,t,r,n){return e.replace(t," "+r+" === 0 ")},last:function(e,t,r,n){return e.replace(t," "+r+" === "+(n.length-1)+" ")},odd:function(e,t,r,n){return e.replace(t," Boolean( ("+r+" / 2) !== parseInt(("+r+" / 2))  ) ")},even:function(e,t,r,n){return e.replace(t," Boolean( ("+r+" / 2) === parseInt(("+r+" / 2)) ) ")},index:function(e,t,r,n){return e.replace(t,""+r+" ")}};_m.constructor.prototype.addHelper=function(e,t){_m.helpers[""+e+""]=new Function("o","parm1",""+t+"")};_m.constructor.prototype.helpers={concat:function(){var e=Array.prototype.slice.call(arguments).slice(1);return this.expression_function["concat"].apply(null,e)},math:function(e,t){var r=this.parseExpression(""+t+"",e[0],e[1],e[2],e[3],"mathExpression");return r}};_m.constructor.prototype.helpers["uuid"]=function(){return _m.uuid()};_m.constructor.prototype.helpers["debug"]=function(e,t){console.log(t==="context"?e:t);return""};_m.constructor.prototype.helpers["date_diff"]=function(e,t,r,n,i,s){var o=_m.expression_function["moment_date"](t,r);var a=_m.expression_function["moment_date"](n,i);return o.diff(a,""+s+"")};_m.constructor.prototype.helpers["now"]=function(e,t){if(typeof t==="undefined"){t=_m.options.date.default_date_format}return moment().format(t)};_m.constructor.prototype.helpers["lipsum"]=function(e,t,r){t=parseInt(t);r=parseInt(r);var n,i,s;var o=["lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","ut","aliquam,","purus","sit","amet","luctus","venenatis,","lectus","magna","fringilla","urna,","porttitor","rhoncus","dolor","purus","non","enim","praesent","elementum","facilisis","leo,","vel","fringilla","est","ullamcorper","eget","nulla","facilisi","etiam","dignissim","diam","quis","enim","lobortis","scelerisque","fermentum","dui","faucibus","in","ornare","quam","viverra","orci","sagittis","eu","volutpat","odio","facilisis","mauris","sit","amet","massa","vitae","tortor","condimentum","lacinia","quis","vel","eros","donec","ac","odio","tempor","orci","dapibus","ultrices","in","iaculis","nunc","sed","augue","lacus,","viverra","vitae","congue","eu,","consequat","ac","felis","donec","et","odio","pellentesque","diam","volutpat","commodo","sed","egestas","egestas","fringilla","phasellus","faucibus","scelerisque","eleifend","donec","pretium","vulputate","sapien","nec","sagittis","aliquam","malesuada","bibendum","arcu","vitae","elementum","curabitur","vitae","nunc","sed","velit","dignissim","sodales","ut","eu","sem","integer","vitae","justo","eget","magna","fermentum","iaculis","eu","non","diam","phasellus","vestibulum","lorem","sed","risus","ultricies","tristique","nulla","aliquet","enim","tortor,","at","auctor","urna","nunc","id","cursus","metus","aliquam","eleifend","mi","in","nulla","posuere","sollicitudin","aliquam","ultrices","sagittis","orci,","a","scelerisque","purus","semper","eget","duis","at","tellus","at","urna","condimentum","mattis","pellentesque","id","nibh","tortor,","id","aliquet","lectus","proin","nibh","nisl,","condimentum","id","venenatis","a,","condimentum","vitae","sapien","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","sed","tempus,","urna","et","pharetra","pharetra,","massa","massa","ultricies","mi,","quis","hendrerit","dolor","magna","eget","est","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","integer","eget","aliquet","nibh","praesent","tristique","magna","sit","amet","purus","gravida","quis","blandit","turpis","cursus","in","hac","habitasse","platea","dictumst","quisque","sagittis,","purus","sit","amet","volutpat","consequat,","mauris","nunc","congue","nisi,","vitae","suscipit","tellus","mauris","a","diam","maecenas","sed","enim","ut","sem","viverra","aliquet","eget","sit","amet","tellus","cras","adipiscing","enim","eu","turpis","egestas","pretium","aenean","pharetra,","magna","ac","placerat","vestibulum,","lectus","mauris","ultrices","eros,","in","cursus","turpis","massa","tincidunt","dui","ut","ornare","lectus","sit","amet","est","placerat","in","egestas","erat","imperdiet","sed","euismod","nisi","porta","lorem","mollis","aliquam","ut","porttitor","leo","a","diam","sollicitudin","tempor","id","eu","nisl","nunc","mi","ipsum,","faucibus","vitae","aliquet","nec,","ullamcorper","sit","amet","risus","nullam","eget","felis","eget","nunc","lobortis","mattis","aliquam","faucibus","purus","in","massa","tempor","nec","feugiat","nisl","pretium","fusce","id","velit","ut","tortor","pretium","viverra","suspendisse","potenti","nullam","ac","tortor","vitae","purus","faucibus","ornare","suspendisse","sed","nisi","lacus,","sed","viverra","tellus","in","hac","habitasse","platea","dictumst","vestibulum","rhoncus","est","pellentesque","elit","ullamcorper","dignissim","cras","tincidunt","lobortis","feugiat","vivamus","at","augue","eget","arcu","dictum","varius","duis","at","consectetur","lorem","donec","massa","sapien,","faucibus","et","molestie","ac,","feugiat","sed","lectus","vestibulum","mattis","ullamcorper","velit","sed","ullamcorper","morbi","tincidunt","ornare","massa,","eget","egestas","purus","viverra","accumsan","in","nisl","nisi,","scelerisque","eu","ultrices","vitae,","auctor","eu","augue","ut","lectus","arcu,","bibendum","at","varius","vel,","pharetra","vel","turpis","nunc","eget","lorem","dolor,","sed","viverra","ipsum","nunc","aliquet","bibendum","enim,","facilisis","gravida","neque","convallis","a","cras","semper","auctor","neque,","vitae","tempus","quam","pellentesque","nec","nam","aliquam","sem","et","tortor","consequat","id","porta","nibh","venenatis","cras","sed","felis","eget","velit","aliquet","sagittis","id","consectetur","purus","ut","faucibus","pulvinar","elementum","integer","enim","neque,","volutpat","ac","tincidunt","vitae,","semper","quis","lectus","nulla","at","volutpat","diam","ut","venenatis","tellus","in","metus","vulputate","eu","scelerisque","felis","imperdiet","proin","fermentum","leo","vel","orci","porta","non","pulvinar","neque","laoreet","suspendisse","interdum","consectetur","libero,","id","faucibus","nisl","tincidunt","eget","nullam","non","nisi","est,","sit","amet","facilisis","magna","etiam","tempor,","orci","eu","lobortis","elementum,","nibh","tellus","molestie","nunc,","non","blandit","massa","enim","nec","dui","nunc","mattis","enim","ut","tellus","elementum","sagittis","vitae","et","leo","duis","ut","diam","quam","nulla","porttitor","massa","id","neque","aliquam","vestibulum","morbi","blandit","cursus","risus,","at","ultrices","mi","tempus","imperdiet","nulla","malesuada","pellentesque","elit","eget","gravida","cum","sociis","natoque","penatibus","et","magnis","dis","parturient","montes,","nascetur","ridiculus","mus","mauris","vitae","ultricies","leo","integer","malesuada","nunc","vel","risus","commodo","viverra","maecenas","accumsan,","lacus","vel","facilisis","volutpat,","est","velit","egestas","dui,","id","ornare","arcu","odio","ut","sem","nulla","pharetra","diam","sit","amet","nisl","suscipit","adipiscing","bibendum","est","ultricies","integer","quis","auctor","elit","sed","vulputate","mi","sit","amet","mauris","commodo","quis","imperdiet","massa","tincidunt","nunc","pulvinar","sapien","et","ligula","ullamcorper","malesuada","proin","libero","nunc,","consequat","interdum","varius","sit","amet,","mattis","vulputate","enim","nulla","aliquet","porttitor","lacus,","luctus","accumsan","tortor","posuere","ac","ut","consequat","semper","viverra","nam","libero","justo,","laoreet","sit","amet","cursus","sit","amet,","dictum","sit","amet","justo","donec","enim","diam,","vulputate","ut","pharetra","sit","amet,","aliquam","id","diam","maecenas","ultricies","mi","eget","mauris","pharetra","et","ultrices","neque","ornare","aenean","euismod","elementum","nisi,","quis","eleifend","quam","adipiscing","vitae","proin","sagittis,","nisl","rhoncus","mattis","rhoncus,","urna","neque","viverra","justo,","nec","ultrices","dui","sapien","eget","mi","proin","sed","libero","enim,","sed","faucibus","turpis","in","eu","mi","bibendum","neque","egestas","congue","quisque","egestas","diam","in","arcu","cursus","euismod","quis","viverra","nibh","cras","pulvinar","mattis","nunc,","sed","blandit","libero","volutpat","sed","cras","ornare","arcu","dui","vivamus","arcu","felis,","bibendum","ut","tristique","et,","egestas","quis","ipsum","suspendisse","ultrices","gravida","dictum","fusce","ut","placerat","orci","nulla","pellentesque","dignissim","enim,","sit","amet","venenatis","urna","cursus","eget","nunc","scelerisque","viverra","mauris,","in","aliquam","sem","fringilla","ut","morbi","tincidunt","augue","interdum","velit","euismod","in","pellentesque","massa","placerat","duis","ultricies","lacus","sed","turpis","tincidunt","id","aliquet","risus","feugiat","in","ante","metus,","dictum","at","tempor","commodo,","ullamcorper","a","lacus","vestibulum","sed","arcu","non","odio","euismod","lacinia","at","quis","risus","sed","vulputate","odio","ut","enim","blandit","volutpat","maecenas","volutpat","blandit","aliquam","etiam","erat","velit,","scelerisque","in","dictum","non,","consectetur","a","erat","nam","at","lectus","urna","duis","convallis","convallis","tellus,","id","interdum","velit","laoreet","id","donec","ultrices","tincidunt","arcu,","non","sodales","neque","sodales","ut","etiam","sit","amet","nisl","purus,","in","mollis","nunc","sed","id","semper","risus","in","hendrerit","gravida","rutrum","quisque","non","tellus","orci,","ac","auctor","augue","mauris","augue","neque,","gravida","in","fermentum","et,","sollicitudin","ac","orci","phasellus","egestas","tellus","rutrum","tellus","pellentesque","eu","tincidunt","tortor","aliquam","nulla","facilisi","cras","fermentum,","odio","eu","feugiat","pretium,","nibh","ipsum","consequat","nisl,","vel","pretium","lectus","quam","id","leo","in","vitae","turpis","massa","sed","elementum","tempus","egestas","sed","sed","risus","pretium","quam","vulputate","dignissim","suspendisse","in","est","ante","in","nibh","mauris,","cursus","mattis","molestie","a,","iaculis","at","erat","pellentesque","adipiscing","commodo","elit,","at","imperdiet","dui","accumsan","sit","amet","nulla","facilisi","morbi","tempus","iaculis","urna,","id","volutpat","lacus","laoreet","non","curabitur","gravida","arcu","ac","tortor","dignissim","convallis","aenean","et","tortor","at","risus","viverra","adipiscing","at","in","tellus","integer","feugiat","scelerisque","varius","morbi","enim","nunc,","faucibus","a","pellentesque","sit","amet,","porttitor","eget","dolor","morbi","non","arcu","risus,","quis","varius","quam","quisque","id","diam","vel","quam","elementum","pulvinar","etiam","non","quam","lacus","suspendisse","faucibus","interdum","posuere","lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit","duis","tristique","sollicitudin","nibh","sit","amet","commodo","nulla","facilisi","nullam","vehicula","ipsum","a","arcu","cursus","vitae","congue","mauris","rhoncus","aenean","vel","elit","scelerisque","mauris","pellentesque","pulvinar","pellentesque","habitant","morbi","tristique","senectus","et","netus","et","malesuada","fames","ac","turpis","egestas","maecenas","pharetra","convallis","posuere","morbi","leo","urna,","molestie","at","elementum","eu,","facilisis","sed","odio","morbi","quis","commodo","odio","aenean","sed","adipiscing","diam","donec","adipiscing","tristique","risus","nec","feugiat","in","fermentum","posuere","urna","nec","tincidunt","praesent","semper","feugiat","nibh","sed","pulvinar","proin","gravida","hendrerit","lectus","a","molestie"];var a="";for(n=0;n<r;n++){s=t;i=[];a=a+"<p>";while(--s){i.push(o[Math.floor(Math.random()*o.length)])}a=a+i.join(" ")+".";a=a+"</p>"}return a};