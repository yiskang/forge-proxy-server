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

const express = require( 'express' );
const forgeProxy =require ( './forge-proxy' );

const app =express () ;
app.get( '/forge-proxy/*', forgeProxy.get );

app.set( 'port', process.env.PORT || 8085 );

const server = app.listen( app.get( 'port' ), function() {
  console.log( 'Server listening on port ' + server.address ().port ) ;
});

server.on( 'error', function( err ) {
  if( err.errno == 'EACCES' ) {
    console.log( 'Port ' + app.get ('port') + ' already in use.\nExiting...' );
    process.exit ( 1 );
  }
});