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

const https =require( 'https' );
const path =require( 'path' );
const config =require( './config' );
const { getPublicToken } = require( './forge-token' );

const EXTENSIONS = {
	gzip: [ '.json.gz', '.bin', '.pack' ],
	json: [ '.json.gz', '.json' ]
} ;

const WHITE_LIST = [
	'if-modified-since',
	'if-none-match',
	'accept-encoding',
	'x-ads-acm-namespace', // Forge Data Management API
	'x-ads-acm-check-groups' // Forge Data Management API
] ;

function hasExtension( filename, ext ) {
	return ( path.extname( filename ) === ext )  ;
}

function fixContentHeaders( req, res ) {
	// DS does not return content-encoding header
	// for gzip and other files that we know are gzipped,
	// so we add it here. The viewer does want
	// gzip files uncompressed by the browser
	if( EXTENSIONS.gzip.indexOf( path.extname( req.path ) ) > -1 )
		res.set( 'content-encoding', 'gzip' );
	if( EXTENSIONS.json.indexOf( path.extname( req.path ) ) > -1 )
		res.set( 'content-type', 'application/json' );
}

function setCORSHeaders( res ) {
	res.set( 'Access-Control-Allow-Origin', '*' );
	res.set( 'Access-Control-Allow-Credentials', false );
	res.set( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
}

function proxyClientHeaders( clientHeaders, upstreamHeaders ) {
	for( let i =0 ; i < WHITE_LIST.length ; i++ ) {
		if (clientHeaders.hasOwnProperty( WHITE_LIST[i] ))
			upstreamHeaders [WHITE_LIST [i]] = clientHeaders [WHITE_LIST [i]];
	}
	// Fix for OSS issue not accepting the
	// etag surrounded with double quotes...
	if( upstreamHeaders.hasOwnProperty( 'if-none-match' ) )
		upstreamHeaders['if-none-match'] = upstreamHeaders['if-none-match'].replace( /^"{1}|"{1}$/gm, '' );
}

function Proxy( endpoint, access_token ) {
	this.authHeaders = { Authorization: 'Bearer ' + access_token };
	this.endpoint = endpoint ;
}

Proxy.prototype.request = function( req, res, url ) {
	const options = {
		host: this.endpoint,
		port: 443,
		path: url,
		method: 'GET', // only proxy GET
		headers: this.authHeaders
	} ;
	proxyClientHeaders( req.headers, options.headers );
	const creq = https.request( options, function( cres ) {
		// Set encoding
		//cres.setEncoding ('utf8') ;
		Object.keys( cres.headers ).forEach( function( key ) {
			res.set ( key, cres.headers [key] );
		}) ;
		setCORSHeaders( res );
		fixContentHeaders( req, res );
		res.writeHead( cres.statusCode );
		cres.pipe( res );
		cres.on( 'error', function( err ) {
			// We got an error, return error 500 to the client
			console.error( err.message );
			res.end();
		});
	});
	creq.end();
}

async function proxyGet( req, res ) {
  const url = req.url.replace( /^\/forge\-proxy/gm, '' );
  const token = await getPublicToken();
	const proxy = new Proxy( config.apiEndpoint, token.access_token );
	proxy.request( req, res, url );
}

exports.get = proxyGet;