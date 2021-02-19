Improves your development with portlets that are created with `yo liferay-js` 🥳🎉

Tool, which downloads a liferay page from a liferay portal and configures a webpack with the fetched index.html. Which automatically loads your index.js from your js-portlet into webpack.

# Advantages of lfr-js-start to the lnbs-start:
- You are in the context of a liferay page
- You have all the window.Liferay.* functions
- You get the correct Language keys
- You have the the original config of the portlet
- Vue and Typescript files work

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

### Disable Auth Token
So far I didn't find a solution to keep the Auth Token enabled. I'm open for any hints. I would like to implement a Basic Auth for example.
Disable the token inside the portal-ext.properties and restart the portal. The main problem is with the token the Liferay.Language.get('') calls will fail.
```
auth.token.check.enabled=false
```

### Place and Configure Portlet
Deploy your portlet on the Liferay instance and place it on the root so you see it when you call 'localhost:8080' for example. Be sure the page is public. Authorization is not supported so far.

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
  },
  user: 'test@liferay.com',
  password: 'test'
}

```

But there is also the possiblity to only configure the wrong values and your and the default config get merged

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
This is the main js file. The entrypoint for webpack.

## user 
Specifies the username/email with that you can log in. Currently used to set a variable called "LIFERAY_USER" \
Default is "test@liferay.com" \
Careful this variable isn't available in the deployment on the liferay!

## password
Specifies the password for the user you want to log in. Currently used to set a variable called "LIFERAY_PASSWORD"\
Default value is "test" \
Careful this variable isn't available in the deployment on the liferay!
