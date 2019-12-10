# Myrdin
Javascript Template Engine

Still in beta version.

But you can already test it with files from examples folder.

Tested on Chrome and Firefox.
It's even working with Internet Explorer.

```javascript
_m(jsonData, template, "#content");
```

### **Parameters :**

* Json Data 
* template, could be a variable or the selector of a SCRIPT TAG or other HTML tag like div.
* Destination selector

Template statements :

### **Variables :**

Basic ( current context )
```
{{=firstname}}
```

Root
```
{{=./firstname}}
```

Parent
```
{{=../firstname}}
```

Inside Array context
```
{{=.}}
```

Internal variables
```
{{=@index}}
{{=@now}}
```
