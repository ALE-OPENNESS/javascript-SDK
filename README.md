# o2g-sdk

  

This javascript SDK allows to create applications using [OpenTouch Open Gateway API](https://api.dspp.al-enterprise.com/omnipcx-open-gateway-02g/).

It provides access to all the services available in O2G. To connect to an O2G server, you create an O2G application, use your credential to connect and use services.

## Create an 'Hello World' application
This tutorial explains how to start a simple O2G application. the O2G SDK is available as a [ES Module](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). 
At the end of this tutorial, you will have a working O2G application that can be considered as a starting point for developing an application using the O2G SDK.
### Set up the development environment
Developing with O2G-SDK required to have Node.js and NPM installed on your computer. To check if you have installed Node.js and NPM run the following commands:
```
> node --version
v16.13.0
> npm --version
8.1.0
```
If either Node.js or NPM are not installed, please install them following this [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
<p>
In addition you need to have openssl installed in order to generate a self-signed certificate to test your application. You can test if openssl is installed by entering command:</p>

```
> openssl version
OpenSSL 3.0.0 7 sep 2021 (Library: OpenSSL 3.0.0 7 sep 2021)
```
If openssl is not installed, please install it following this [guide](https://wiki.openssl.org/index.php/Binaries).

### Environment
O2G SDK can be used on Google Chrome, Firefox or Microsoft Edge browers.

### Create a web application
Create a new folder for the application. 
```
> mkdir o2gHelloWorld
> cd o2gHelloWorld
> npm init -y
```
This will create a ***package.json*** file. This step is required to install O2G SDK as a NPM package.
### Install O2G SDK
In your application folder, enter the following command:
```
npm i -S o2g-sdk
```
Once O2G SDK has been installed, the application folder look like this:
```
├-- node_modules
|   └-- o2g-sdk
|       ├-- dist
|       |   ├-- o2g-sdk.min.js
|       |   └-- o2g-sdk.min.js.map
|       ├-- LICENSE
|       ├-- package.json
|       └-- types
|           ├-- ...
└-- package.json
```
The O2G SDK has been added to the ***node_modules*** folder.

### Setup a local http server
To test your application you need a local HTTPS server. And you need to configure this HTTP server in the [CORS](https://fetch.spec.whatwg.org/#http-cors-protocol) authorized section on the O2G server configuration. 

In your application folder, enter the following command:
```
> npm i -D http-server
```
To run the http server in secured mode, you need to create a self-signed certificate. Enter the command:
```
> openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
An enter the IP address of your computer as *Common Name*. You should have now a *cert.pem* file and a *key.pem* file.

Then create a ***public*** folder in the application forder and copy the o2g-sdk files.
```shell
> cd public
> copy ../node_modules/o2g-sdk/dist/* .
```
Start the http server by entering command:
```
> ./node_modules/http-server/bin/http-server -S -C cert.pem -o public/ -p 1443
```
You can configure a shell script to easily start the http server.

In public folder create an ***index.html*** file with the following content:
```html
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>O2G Application</title>
	</head>
	<body>
		<h1>Hello World O2G</h1>
    </body>
</html>
```
Open your browser and go to `https://your-server-address:1443`.  Yout should see the *Hello World* message.

### Loading the O2G SDK
Go in public folder and create an ***index.js*** file with the following content:
```javascript
import {o2g} from  './o2g-sdk.min.js'

// On loaded callback
var  onLoaded = function  onLoaded() {
	console.log('On SDK Loaded !');

	var  h1 = document.createElement("H1");
	h1.innerHTML = "O2G SDK has been Loaded";
	document.body.appendChild(h1);
};

document.addEventListener(o2g.O2G_ONLOADED, onLoaded);
o2g.load();
```
And modify the ***index.html*** file to load the ***index.js***.
```html
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>O2G Application</title>
		
		<!-- Load index.js as a module -->
		<script type="module" src="./index.js"></script>
	</head>
	<body>
		<h1>Hello World O2G</h1>
    </body>
</html>
```
Go back to your browser and refresh the page.
You should see a new message: *O2G SDK has been Loaded*.

### Connect to O2G
Connecting to O2G requires having a user or administrator credential and to have a running O2G server to connect on.
Modify the ***index.js*** file as follow:
```javascript
import {o2g} from  './o2g-sdk.min.js'

// On loaded callback
var  onLoaded = function  onLoaded() {
	console.log('On SDK Loaded !');

	// Create a Host object representing the O2G server
	let  host = {
		privateAddress: 'adress-of-the-o2g-server'
	};
	// Initialize your application
	o2g.initialize('myApplication', host);
	// Login 
	o2g.login("oxe1000", "0000");
};

// Callback in case of successful login
var  onLoginSucceeded = async  function  onLoginSucceeded() {
	alert("login succeeded");
}

// Callback in case of login failure
var  onLoginFailed = function  onLoginFailed() {
	alert("Login failed");
}

document.addEventListener(o2g.O2G_ONLOADED, onLoaded);
document.addEventListener(o2g.O2G_ONLOGIN_FAILED, onLoginFailed);
document.addEventListener(o2g.O2G_ONLOGIN_SUCCEEDED, onLoginSucceeded);
o2g.load();
```
Go back to your browser and refresh the page. 
You see a alert message indicating a successful login ? Congratulation: You have created your first O2G application!
You got a failure message ? Check the following:

 1. In your browser enter directly the O2G server address. maybe your server has a self-signed certificate and you have to explicitely authorize access.
 2. Check the credential you have passed are correct.
 3. Check you have configured the O2G server CORS to accept request coming from your server. If not you will get a CORS error message.

  

## License

[MIT](https://choosealicense.com/licenses/mit/)

  

# Contributions
We welcome your input on issues and suggestions. We encourage you to [file a new issue](https://github.com/ALE-OPENNESS/javascript-SDK/issues/new) for any feedback or questions!
