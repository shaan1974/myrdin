µµ.fct_keys = [];
for (var key in µµ.constructor.prototype.expression_function)
{
    if (µµ.constructor.prototype.expression_function.hasOwnProperty(key))
    {
        µµ.fct_keys.push(key);
    }
}

µµ.fct_keys.sort(function(a, b)
{
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
});

µµ.fct_keys_rg = [];
for (var cnt = 0, len = µµ.fct_keys.length; cnt < len; cnt++)
{
    µµ.fct_keys_rg.push(new RegExp('\\s+(' + µµ.fct_keys[cnt] + '\\()', 'gi'));
}