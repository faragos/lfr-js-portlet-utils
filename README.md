Tool, which Downloads a liferay page and configures a webpack with that portlet for you

How to install
```
npm install -s @clavis/lfr-js-portlet-utils
```

Add a script call
```
  "scripts": {
    "start": "lfr-js-start"
  }
```

depends on the resource override Plugin:

https://chrome.google.com/webstore/detail/resource-override/pkoacgokdfckfpndoffpifphamojphii?hl=en

or

https://addons.mozilla.org/en-US/firefox/addon/resourceoverride/

```
{"v":1,"data":[{"id":"d1","matchUrl":"http://localhost:3000/*","rules":[{"type":"normalOverride","match":"http://localhost:3000","replace":"http://localhost:3000","on":true},{"type":"normalOverride","match":"http://localhost:3000/o/*","replace":"http://localhost:8080/o/*","on":true},{"type":"normalOverride","match":"http://localhost:3000/combo*","replace":"http://localhost:8080/combo*","on":true},{"type":"normalOverride","match":"http://localhost:3000/image/*","replace":"http://localhost:8080/image/*","on":true},{"type":"headerRule","match":"*","requestRules":"","responseRules":"set Access-Control-Allow-Origin: *;set Access-Control-Allow-Headers: Origin%2C%20X-Requested-With%2C%20Content-Type%2C%20Accept%2C%20%20x-csrf-token","on":true},{"type":"normalOverride","match":"http://localhost:3000/documents/*","replace":"http://localhost:8080/documents/*","on":true},{"type":"normalOverride","match":"http://localhost:3000/language/*","replace":"http://localhost:8080/language/*","on":true}],"on":true}]}
```