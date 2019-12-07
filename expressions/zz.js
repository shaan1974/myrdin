_m.fct_keys = [];
for (var key in _m.constructor.prototype.expression_function)
{
    if (_m.constructor.prototype.expression_function.hasOwnProperty(key))
    {
        _m.fct_keys.push(key);
    }
}

_m.fct_keys.sort(function(a, b)
{
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    return b.length - a.length;
});

_m.fct_keys_rg = [];
for (var cnt = 0, len = _m.fct_keys.length; cnt < len; cnt++)
{
    _m.fct_keys_rg.push(new RegExp('\\s+(' + _m.fct_keys[cnt] + '\\()', 'gi'));
}