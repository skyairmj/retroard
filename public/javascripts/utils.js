/**
Usage:

Input Query String:    href="j.html?name=nayan&age=29&salary=20000&interest[]=php&interest[]=jquery&interest[1]=python&interest[2]=Csharp&fan[friend]=rangan&fan[family]=sujan&sports[1]=cricket&sports[2]=football";

Output JSON String
({name:"nayan", age:29, salary:20000, interest:["php", "python", "Csharp"], fan:{friend:"rangan", family:"sujan"}, sports:{1:"cricket", 2:"football"}})

See more via http://stackoverflow.com/questions/789755/how-can-i-convert-query-string-or-json-object-map-to-single-json-object-with-jqu
*/
(function() {
    Utils = {
        jsonifyQueryString : function (queryString) {
            queryArray = queryString.split('&');
            stack = {};
            for (var i in queryArray) {
                var a = queryArray[i].split('=');
                var name = a[0],
                    value = isNaN(a[1]) ? a[1] : parseFloat(a[1]);
                if (name.match(/(.*?)\[(.*?)]/)) {
                    name = RegExp.$1;
                    name2 = RegExp.$2;
                    if (name2) {
                        if (!(name in stack)) {
                            stack[name] = {};
                        }
                        stack[name][name2] = value;
                    } else {
                        if (!(name in stack)) {
                            stack[name] = [];
                        }
                        stack[name].push(value);
                    }
                } else {
                    stack[name] = value;
                }
            }
            return stack;
        }
    }
})();