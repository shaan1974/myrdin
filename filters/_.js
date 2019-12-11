/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	APPLY FILTERS
*/
_m.constructor.prototype.applyFilters = function(str, filters)
{
    //  VARIABLES
    var parms, cnt, len, qlen, q;

    filters = filters.split("|");

    //  LOOP
    for (q = 0, qlen = filters.length; q < qlen; q++)
    {

        //  CHECK IF PARAMETERS 
        parms = filters[q].match(this.regExp._APPLY_FILTERS_);

        if (parms !== null)
        {
            filters[q] = filters[q].split(" ")[0];

            for (cnt = 0, len = parms.length; cnt < len; cnt++)
            {
                parms[cnt] = parms[cnt].slice(1, -1);
            }
        }

        //  IF A QUICK FILTER IS DEFINED WE CALL IT.
        if (this.quick_filters_call.indexOf(filters[q]) !== -1)
        {
            str = str[this.quick_filters_replace[this.quick_filters_call.indexOf(filters[q])]]();
        }
        else
        {
            str = this.filters[filters[q]](str, parms);
        }
    }

    return str;
};
/*
	FILTERS
*/
_m.constructor.prototype.filters = [];
/*
    QUICK FILTERS, IN PLACE OF CALL A PROTOTYPE WE CALL DIRECTLY THE ORIGINAL STATMENTS
*/
_m.constructor.prototype.quick_filters_call = ["uppercase", "lowercase", "trim", "ltrim", "rtrim"];
_m.constructor.prototype.quick_filters_replace = ["toUpperCase", "toLowerCase", "trim", "trimLeft", "trimRight"];
/*
    ADD FILTERS

    _m.addFilter("avg2","var sum = a.reduce(function(previous, current){ return current += previous; }); return (sum / a.length);")

    Each function should receive 2 parms, "a" the value of the element, "parms" if parms are attach to the filter
*/
_m.constructor.prototype.addFilter = function(name, fct)
{
    _m.filters["" + name + ""] = new Function('a', 'parms', '' + fct + '');
};