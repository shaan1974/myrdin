# Myrdin
Javascript Template Engine

Still in beta version, so bugs could still exists.

But you can already test it with files from examples folder.

Tested on Chrome and Firefox.
It's even working with Internet Explorer.

```javascript
_m(jsonData, template, "#content");
```

## **Parameters :**

* Json Data 
* template, could be a variable or the selector of a SCRIPT TAG or other HTML tag like div.
* Destination selector

### **To do :**

* I don't know yet :)

### **Template statements :**

### **Variables :**

* Basic
```
{{=firstname}}
```

* With filter(s)
```
{{=data_array | uniq|join '-' }}
```

* Index Array
```
{{=users[0].aka}}
```

* Root
```
{{=./firstname}}
```

* Parent
```
{{=../firstname}}
```

* Inside Array context
```
{{=.}}
```

* Internal variables
```
{{=@index}}
{{=@now}}
{{=@year}}
```

### **Statments :**

**if / else if / else**

```
{{? if lesson EQ "French" ?}}
  <p>French Lesson__.</p>
{{? else if lesson EQ "English" ?}}
	<p>English Lesson__.</p>  
{{? else ?}}            
	<p>Otherh Lesson__.</p>
{{? end if ?}}
```

**Raw**

Don't take in could element defined into this section.
```
<p class="raw">
  {{% raw %}}
    {{firstname}} - {{lastname}}
  {{%/raw%}}				
</p>
```

**Each - Loop**

On Object with loop inside loop.
```
<ul>
  {{# each users #}}
  <li>
      [{{=@index}}] - firstname : {{=firstname}} , Lastname : {{=lastname}}
      <p>
        Language(s):
        <ul>
        {{# each lang #}}
          <li>{{=lang}} , level = [{{=level}}/5]</li>
        {{# end each #}}
        </ul>						
      </p>        
  </li>
  {{# end each #}}  
</ul>
```

On Ojbect with sorting.
```
<table border="1">
  <tr>
    <td>City</td>
    <td>Price</td>
    <td>Zip</td>
  </tr>
  {{# each home 'city','-price' #}}
  <tr>
    <td>{{=city}}</td>
    <td>{{=price}}</td>
    <td>{{=zip}}</td>
  </tr>
  {{# end each #}}
</table>
```

On Array.
```
<ul>		
  {{# each data_array #}}
  <li>
    <p>({{=@index}})"{{=.}}"</p>
  </li>
  {{/# each #}}
</ul>		
```

**With**

To create a context on a simple object.

```
Details:
<br/>
{{# with details #}}
  	BIRTHDATE: {{=birtdate}}), PLACE: {{=place}}
{{# end with #}}    
```

**List**

String field separated with comas.

```
<ul>		
  {{# list todo_list #}}
  <li>
    {{? if @first ?}}<p>_FIRST_ELM_</p>{{? end if ?}}
    <p>({{=@index}})"{{=.}}"</p>
    {{? if @last ?}}<p>_LAST_ELM_</p>{{? end if ?}}  
  </li>
  {{# end list #}}
</ul>  
```

Sorted list.

```
<b>CUSTOM TODO LIST SORT - DESC</b>
<ul>		
    {{# list todo_list 'DESC' #}}
    <li>
      <p>({{=@index}})"{{=.}}"</p>
    </li>
    {{# end list #}}
</ul>  
```

**Every with Otherwise**

Loop with else if the loop is empty.

```
<p>
  <b>TRAINING #1</b>
  <ul>
  {{# every trainings #}}
    <li>{{=trainer}}</li>
	{{# otherwise #}}
  	<li>Sorry no trainings now.</li>
{{# end every #}}
 </ul>
</p>
```

**For**

To create fake data with element columns.

```
<b>FOR ()</b>
<ul>		
  {{# for (fruit, color) in details_fruits #}}
  <li>
    Name : {{=fruit}} , color : {{=color}}
  </li>
{{# end for #}}
</ul>
```
### **Filters :**

Create a new one :
```
_m.addFilter("avg2", "var sum = a.reduce(function(previous, current){ return current += previous; }); return (sum / a.length);");
```

### **Helpers :**

**Custom functions.**

```
<p>NOW custom format: "{{^now 'DD-MM-YYYY HH:mm:ss'}}"</p>
<p>NOW config format: "{{^now}}"</p>
<p>UUID: "{{^uuid}}"</p>
<p>_DATE DIFF: (04-01-1986)-(31-12-1985) "{{^date_diff update_date , 'DD-MM-YYYY' , creation_date , 'DD-MM-YYYY' , 'days' }}"</p>
```

Create a new one :
```
_m.addHelper("avg", "var sum = parm1.reduce(function(previous, current){ return current += previous; }); return (sum / parm1.length);");
```

### **Inline templates :**

Templates tooks the current context.

Defintion.

```
{{~ fullName}}
  "{{=firstname}}-{{=lastname}}"
{{/~}}	
```

Call.

```
<p>({{> fullName }})</p>
```

### **Outsite templates :**

```
_m.addTemplate("dates", "Dates : {{=creation_date}} {{=update_date}}.");
```

For the call it's the same as inline templates.

### **Debuging :**

To debug a define variable.

```
{{^debug notes}}
```

To debug current context.

```
{{^debug 'context'}}
```

### **Precompile templates :**

Take a look to examples 4 and 5.

Example 4 you can pregenerate the compile template.
Example 5 how to use a precompiled template.