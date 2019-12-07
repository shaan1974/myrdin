/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	NUMBER
*/
_m.constructor.prototype.filters["increment"] = function(v)
{
    /*
    if (v.constructor.toString().indexOf("String()") != -1)
    {
        v = Number("" + v + "");
    }

    return v++;
    */
    return (v * 1) + 1;
};

_m.constructor.prototype.filters["decrement"] = function(v)
{
    /*if (v.constructor.toString().indexOf("String()") != -1)
    {
        v = Number("" + v + "");
    }

    return v--;*/
    return (v * 1) - 1;
};
/*
    ABS
*/
_m.constructor.prototype.filters["abs"] = function(v)
{
    return Math.abs(v);
};
/*
    ROUNDING
*/
_m.constructor.prototype.filters["round"] = function(v)
{
    return Math.round(v);
};

_m.constructor.prototype.filters["ceil"] = function(v)
{
    return Math.ceil(v);
};

_m.constructor.prototype.filters["floor"] = function(v)
{
    return Math.floor(v);
};
/*
    SQRT
*/
_m.constructor.prototype.filters["sqrt"] = function(v)
{
    return Math.sqrt(v);
};
/*
    POW
*/
_m.constructor.prototype.filters["pow"] = function(v, x)
{
    return Math.pow(v, x);
};
/*
    FORMAT
    http://openexchangerates.github.io/accounting.js/
*/
_m.constructor.prototype.filters["formatNumber"] = function(v)
{
    return accounting.formatMoney(v, _m.options.format.number);
};

_m.constructor.prototype.filters["formatCurrency"] = function(v)
{
    return accounting.formatMoney(v, _m.options.format.currency);
};