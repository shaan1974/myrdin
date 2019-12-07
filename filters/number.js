/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	NUMBER
*/
µµ.constructor.prototype.filters["increment"] = function(v)
{
    // if (µµ.isString(v))
    if (v.constructor.toString().indexOf("String()") != -1)
    {
        v = Number("" + v + "");
    }

    return v++;
};

µµ.constructor.prototype.filters["decrement"] = function(v)
{
    // if (µµ.isString(v))
    if (v.constructor.toString().indexOf("String()") != -1)
    {
        v = Number("" + v + "");
    }

    return v--;
};
/*
    ABS
*/
µµ.constructor.prototype.filters["abs"] = function(v)
{
    return Math.abs(v);
};
/*
    ROUNDING
*/
µµ.constructor.prototype.filters["round"] = function(v)
{
    return Math.round(v);
};

µµ.constructor.prototype.filters["ceil"] = function(v)
{
    return Math.ceil(v);
};

µµ.constructor.prototype.filters["floor"] = function(v)
{
    return Math.floor(v);
};
/*
    SQRT
*/
µµ.constructor.prototype.filters["sqrt"] = function(v)
{
    return Math.sqrt(v);
};
/*
    POW
*/
µµ.constructor.prototype.filters["pow"] = function(v, x)
{
    return Math.pow(v, x);
};
/*
    FORMAT
    http://openexchangerates.github.io/accounting.js/
*/
µµ.constructor.prototype.filters["formatNumber"] = function(v)
{
    return accounting.formatMoney(v, µµ.options.format.number);
};

µµ.constructor.prototype.filters["formatCurrency"] = function(v)
{
    return accounting.formatMoney(v, µµ.options.format.currency);
};