# simple-redirect-server

> A simple redirect server used for redirecting old to new sites using a csv file. See example folder for more information.

## Install

```
$ npm install simple-redirect-server
```

## Usage

```js
var srs = require('simple-redirect-server');

//Init server
srs.init({
    portListen: 1337, //HTTP server will listen on this port
    httpStatusCode: 301, //This will be the http code used for redirections
    csvFile: "./redirects.csv" //Path to csv file used for redirections
});
```

## Example
See example folder for an example.

## License

GPL-2.0 © [Region Halland](http://regionhalland.se)