Tool, which downloads a liferay page from a liferay portal and configures a webpack with that fetched index.html. Which automaticall loads your index.js from your modul into webpack also

# Advantages of lfr-js-start to the lnbs-start:
- You are in the context of a liferay page
- You have all the window.Liferay.* functions
- You get the correct Language keys
- You have the the original config of the portlet

# How to Use

## How to install
```
npm install -s @clavis/lfr-js-portlet-utils
```

### Add a script call to the package.json
```
  "scripts": {
    "start": "lfr-js-start"
  }
```
### Place and Configure Portlet
deploy your portlet on the liferay instance and place it on the root so you see it when you call 'localhost:8080' for example. Be sure the page is public. Authorization is not supported so far.

### Run
```
npm run start
```

## Example usage

https://github.com/faragos/lfr-js-portlet-example

# Config
You can configure the npm task with a 'liferay.portlet.config.js' in the root of the module. Here is the default config, which will be taken when no custom config is found:

```
module.exports = {
  protocol: 'http',
  host: 'localhost',
  originPort: 8080,
  port: 3000,
  remove: {
    selector: '[id^=js-portlet-] + script'
  },
  initCall: {
    selector: '[id^=js-portlet-] + script',
    id: 'portletElementId'
  },
  sources: {
    js: '/src/index.js'
  }
}

```

## protocol
Used to find the protocol which your Portal runs

## host
Used to find the host on which your Portal runs

## originPort
Used to find the port on which your Portal runs

## port
Specifies on which port webpack runs

## remove
Remove groups all configs of which parts of the fetched index.html needs to be removed

#### selector
Specifies a typical 'jQuery' to find all the things that need to be removed on the fetched index.html

## initCall
The initcall attribute groups all configs of the extraction of the configs from the portal. Through this init config we can extract the configuration in the portal and use it in our webpack

#### selector
Specifies a typical 'jQuery' to find the part in which the init call is fired for the js-portlet

#### portletElementId
Specifies which attribute of the parsed config is the id.

## sources
The sources attribute groups all the attributes which depend on the sources

#### js
This is the main js file. The entrypoint you can say for webpack.
