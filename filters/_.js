/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	APPLY FILTERS
*/
µµ.constructor.prototype.applyFilters = function(str, filters)
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

        str = this.filters[filters[q]](str, parms);
    }

    return str;
};
/*
	FILTERS
*/
µµ.constructor.prototype.filters = [];