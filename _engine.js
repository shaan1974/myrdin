/*jshint sub:true*/
/*jslint evil: true */
/*jslint esversion:6 */
/*
    MAIN

    // GENERATE FROM STRING TEMPLATE
        console.clear();
        console.time("Total");
        µµ(jsonData,template,"#content")
        console.timeEnd("Total");

    //  GENERATE FROM SCRIPT TAG OR HTML CONTENT
        
        // SCRIPT
        console.clear();
        console.time("Total");
        µµ(jsonData,"#tmpl","#content")
        console.timeEnd("Total");

        // HTML
        console.clear();
        console.time("Total");
        µµ(jsonData,"#content","#content")
        console.timeEnd("Total");        

*/
function µµ(jsonData, template, destContent)
{
    /*
        INTERNAL FUNCTIONS
    */
    µµ.about = function()
    {
        var about = {
            Version: 0.58,
            Author: "Liuzzi Stéphane Aka Shaan1974",
            Started: "17-10-2019",
            Updated: "06-12-2019"
        };
        return about;
    };

    /*
        INTERNAL VARIABLES
        CALL WITH "µµ.version"
    */
    µµ.version = µµ.about().Version;

    if (typeof jsonData === "undefined") return µµ.about();

    /*
        INTERNAL CALL
    */
    if (jsonData)
    {
        if (window === this)
        {
            return new µµ(jsonData, template, destContent);
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

        µµ.generateData = {
            "template": template,
            "dest": destContent,
            "jsonData": jsonData

        };

        µµ.generateTemplate();
        µµ.putInPlaceTemplate();

        return;
    }
    return µµ.about();
}