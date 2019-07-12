/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

const config = {
	credentials: {
		// Replace placeholder below by the Consumer Key and Consumer Secret you got from
		// http://developer.autodesk.com/ for the production server
		client_id: process.env.FORGE_CLIENT_ID || '<YOUR_FORGE_CLIENT_ID>',
    client_secret: process.env.FORGE_CLIENT_SECRET || '<YOUR_FORGE_CLIENT_SECRET>'
  },
  scopes: {
    // Required scopes for the server-side application
    internal: ['bucket:create', 'bucket:read', 'data:read', 'data:create', 'data:write'],
    // Required scope for the client-side viewer
    public: ['viewables:read']
  },
  apiEndpoint: 'developer.api.autodesk.com',
  port: process.env.PORT ||  8085
};

module.exports = config ;