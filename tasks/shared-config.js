/*
 * grunt-shared-config
 *
 * Use this task to create multiple config files for JS/JS-AMD, SCSS/SASS/LESS/stylus from one JSON.
 *
 * Copyright (c) 2013 Mathias Paumgarten
 * Licensed under the MIT license.
 */

"use strict";

var camelCase = require( "mout/string/camelCase" );
var hyphenate = require( "mout/string/hyphenate" );
var underscore = require( "mout/string/underscore" );
var deepClone = require( "mout/lang/deepClone" );
var endsWith = require( "mout/string/endsWith" );
var typecast = require( "mout/string/typecast" );

module.exports = function( grunt ) {

	grunt.registerMultiTask( "shared_config", "Your task description goes here.", function() {


		// ===========
		// -- UTILS --
		// ===========

		var normalizeOutArray = function( value ) {
			if ( typeof value === "string" ) return [ value ];
			else return value;
		}

		var normlizeFormat = function( value ) {
			var possibles = [ "uppercase", "underscore", "camelcase", "dash" ];

			if ( possibles.indexOf( value ) < 0 ) return possibles[ 0 ];
			else return value;
		}

		var matches = function( arr, value ) {
			return !!~arr.indexOf( value );
		}

		var format = function( value, type ) {

			value = value.replace( /-/g, " " );

			if ( type === "underscore" ) {

				return underscore( value );

			}  else if ( type === "uppercase" ) {

				return value.toUpperCase().replace( / /g, "_" );

			} else if ( type === "camelcase" ) {

				return camelCase( value );

			} else if ( type === "dash" ) {

				return hyphenate( value );

			}

		}


		// ==============
		// -- SETTINGS --
		// ==============

		// default options

		var options = this.options( {
			amd: true,
			config: "",
			jsFormat: "uppercase",
			cssFormat: "dash",
			name: "config",
			out: []
		} );

		// available file extensions

		var fileExtensions = {
			js: [ "js" ],
			css: [ "scss", "sass", "less", "stylus" ]
		};

		// variable patterns

		var outputPattern = {
			scss: "${{key}}: {{value}};",
			sass: "${{key}}: {{value}}",
			less: "@{{key}}: {{value}};",
			stylus: "{{key}} = {{value}}"
		};


		// Normalize user input

		options.out = normalizeOutArray( options.out );
		options.jsFormat = normlizeFormat( options.jsFormat );
		options.cssFormat = normlizeFormat( options.cssFormat );


		// JSON containing vars

		var data = grunt.file.readJSON( options.config );


		// AMD template

		var template = "define( function() {\n\n\treturn {<<content>>\t}\n\n} );\n";


		// ================
		// -- GENERATORS --
		// ================

		// Generate Style files

		var generateStyle = function( data, type ) {
			var content = "";
			var name, key;

			for ( key in data ) {
				name = format( key, options.cssFormat );
				content += styleLine( name, data[ key ], type );
			}

			return content;
		}

		var styleLine = function( key, value, type ) {
			return outputPattern[ type ].replace('{{key}}', key).replace('{{value}}', value) + "\n";
		}


		// Generate JavaScript files

		var generateJS = function( data ) {
			var content = "var " + options.name + " = ";
			var prepedData = prepareValues( data );

			content += JSON.stringify( prepedData, null, "\t" );
			content += ";\n";

			return content;
		}

		var generateAMD = function( data ) {
			var content = deepClone( template );
			var prepedData = prepareValues( data );
			var string = JSON.stringify( prepedData, null, "\t\t" );

			string = string.substr( 1, string.length - 2 );

			return content.replace( "<<content>>", string );
		}

		var prepareValues = function( data ) {

			var newData = {};
			var key, value;

			for ( key in data ) {

				value = data[ key ];

				if ( endsWith( value, "%" ) ) {

					value = typecast( value.substr( 0, value.length - 1 ) ) / 100;

				} else {

					value = typecast( value.replace( /[^0-9.]/g, "" ) );

				}

				newData[ format( key, options.jsFormat ) ] = value;
			}

			return newData;
		}


		// ===================
		// -- SHARED CONFIG --
		// ===================

		options.out.forEach( function( file ) {

			var fileType = file.split( "." ).pop().toLowerCase();
			var output;

			if ( matches( fileExtensions.css, fileType ) ) {

				output = generateStyle( data, fileType );

			} else if ( matches( fileExtensions.js, fileType ) ) {

				if ( options.amd ) output = generateAMD( data );

				else output = generateJS( data );

			}

			grunt.file.write( file, output );

			grunt.log.ok( "File: " + file + " created." );

		} );

	} );

};
