/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
	OPTIONS
*/
_m.constructor.prototype.options = {

    "lg": "fr",

    "date":
    {
        "default_date_format": "LLLL"
    },

    "format":
    {
        "currency":
        {
            "symbol": "€", // default currency symbol is '$'
            "format": "%v %s", // controls output: %s = symbol, %v = value/number (can be object: see below)
            "decimal": ",", // decimal point separator
            "thousand": ".", // thousands separator
            "precision": 2 // decimal places
        },
        "number":
        {
            "symbol": "",
            "format": "%v",
            "precision": 2,
            "thousand": ".",
            "decimal": ","
        }

    }
};