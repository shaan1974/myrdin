/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
function _m(jsonData, template, destContent)
{
    /*
        INTERNAL FUNCTIONS
    */
    _m.about = function()
    {
        var about = {
            Version: "0.72",
            Author: "Liuzzi Stéphane Aka Shaan1974",
            Started: "17-10-2019",
            Updated: "08-12-2019"
        };
        return about;
    };

    /*
        INTERNAL VARIABLES
        CALL WITH "_m.version"
    */
    _m.version = _m.about().Version;

    if (typeof jsonData === "undefined") return _m.about();

    /*
        INTERNAL CALL
    */
    if (jsonData)
    {
        if (window === this)
        {
            return new _m(jsonData, template, destContent);
        }

        var string_template = true;
        try
        {
            if (document.querySelector("" + template + "").tagName === "SCRIPT")
            {
                template = document.querySelector("" + template + "").innerText;
            }
            else
            {
                template = document.querySelector("" + template + "").innerHTML;
            }
            string_template = false;
        }
        catch (e)
        {

        }

        _m.generateData = {
            "template": template,
            "dest": destContent,
            "jsonData": jsonData
        };

        _m.generateTemplate();
        _m.putInPlaceTemplate();

        return;
    }
    return _m.about();
}