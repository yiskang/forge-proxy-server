[![Node.js](https://img.shields.io/badge/Node.js-8.9.4-blue.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-5.8.0-blue.svg)](https://www.npmjs.com/)
![Platforms](https://img.shields.io/badge/platform-windows%20%7C%20osx%20%7C%20linux-lightgray.svg)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://opensource.org/licenses/MIT)

# Autodesk Forge Proxy Server

## Overview

This sample is demonstrating how to host a proxy server to forward all requests from the Forge Viewer to this backend without showing access token in your viewer frontend.

## Requirements

* node.js v8.9.4 or later

<a name="setup"></a>
## Setup

1. Download and install [Node.js](http://nodejs.org/) (that will install npm as well)
2. Download this repo anywhere you want
3. Execute 'npm install', this command will download and install the required node modules automatically for you. <br />
   ```bash
   npm install
   ```

<a name="UseOfTheSample"></a>
## Use of the sample

Before starting the server, you have to set the Forge credentials up.

- Mac OSX/Linux (Terminal)
   ```bash
   export FORGE_CLIENT_ID=<<YOUR_CLIENT_ID_FROM_DEVELOPER_PORTAL>>
   export FORGE_CLIENT_SECRET=<<YOUR_CLIENT_SECRET>>
   ```

- Windows (use **Node.js command line** from Start menu)
   ```bash
   set FORGE_CLIENT_ID=<<YOUR_CLIENT_ID_FROM_DEVELOPER_PORTAL>>
   set FORGE_CLIENT_SECRET=<<YOUR_CLIENT_SECRET>>
   ```


- Windows (use **Powershell** from Start menu)
   ```bash
   $env:FORGE_CLIENT_ID="<<YOUR_CLIENT_ID_FROM_DEVELOPER_PORTAL>>"
   $env:FORGE_CLIENT_SECRET="<<YOUR_CLIENT_SECRET>>"
   ```


Then Run the server <br />
   ```bash
   npm start
   ```

- Configure viewer endpoint
Initialize your viewer app in this way:

```JavaScript
const options = {
   env: 'AutodeskProduction',
   accessToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5X2RldiJ9.eyJjbGllbnRfaWQiOiJjWTFqcm1rQXhPSVptbnNsOVhYN0puVURtVEVETGNGeCIsImV4cCI6MTQ4NzU2NzgwMSwic2NvcGUiOlsiZGF0YTpyZWFkIl0sImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9qd3RleHAzMCIsImp0aSI6InJZcEZZTURyemtMOWZ1ZFdKSVVlVkxucGNWT29BTDg0dFpKbXlmZ29ORW1MakF0YVVtWktRWU1lYUR2UGlnNGsifQ.uzNexXCeu4efGPKGGhHdKxoJDXHAzLb28B2nSjrq_ys' //!<<< Pass a expired token to avoid initializing auth issue on the Forge Viewer v7.x
};

Autodesk.Viewing.Initializer( options, () => {
  // Change derivative endpoint to Proxy endpoint
  Autodesk.Viewing.endpoint.setApiEndpoint( 'http://127.0.0.1:8085/forge-proxy', 'derivativeV2' );

  Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
});
```

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.

## Written by

Eason Kang <br />
Forge Partner Development <br />
https://developer.autodesk.com/ <br />
https://forge.autodesk.com/blog <br />