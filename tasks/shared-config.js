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
var extend = require( "extend" );

module.exports = function( grunt ) {

	grunt.registerMultiTask( "shared_config", "Your task description goes here.", function() {

		// ===========
		// -- UTILS --
		// ===========

		var normalizeOutArray = function( value ) {
			return typeof value === "string" ? [ value ] : value;
		};

		var existsIn = function( arr, value ) {
			return !!~arr.indexOf( value );
		};

		var normalizeFormat = function( value ) {
			return existsIn( varFormats, value ) ? value : varFormats[ 0 ];
		};

		var format = function( value, type ) {
			value = value.replace( /-/g, " " );

			switch ( type ) {
			case "underscore":
				return underscore( value );
			case "uppercase":
				return value.toUpperCase().replace( / /g, "_" );
			case "dash":
				return hyphenate( value );
			default:
				return camelCase( value );
			}
		};

		var fileExists = function( filePath ) {
			if ( !grunt.file.exists( filePath ) ) {
				grunt.log.warn( "Source file (" + filePath + ") not found." );
				return false;
			}
			return true;
		};



		// ==============
		// -- SETTINGS --
		// ==============

		// default options
		var options = this.options( {
			amd: false,
			config: "",
			jsFormat: "uppercase",
			cssFormat: "dash",
			name: "config",
			dest: []
		} );

		// possible variable formats
		var varFormats = [ "underscore", "uppercase", "dash", "camelcase" ];

		// available file extensions
		var fileExtensions = {
			js: [ "js" ],
			css: [ "scss", "sass", "less", "styl" ]
		};

		// variable patterns
		var outputPattern = {
			scss: "${{key}}: {{value}};\n",
			sass: "${{key}}: {{value}}\n",
			less: "@{{key}}: {{value}};\n",
			styl: "{{key}} = {{value}}\n",
			amd:  "define( function() {\n\n\treturn {{{vars}}\t}\n\n} );\n",
			js:   "var {{name}} = {{vars}};\n"
		};

		// Normalize user input
		options.dest = normalizeOutArray( options.dest );
		options.jsFormat = normalizeFormat( options.jsFormat );
		options.cssFormat = normalizeFormat( options.cssFormat );



		// ================
		// -- GENERATORS --
		// ================

		// Generate Style files
		var generateStyle = function( data, type ) {
			var content = "";
			var pattern = outputPattern[ type ];
			var name, key;

			for ( key in data ) {
				name = format( key, options.cssFormat );
				content += pattern.replace( '{{key}}', name ).replace( '{{value}}', data[ key ] );
			}

			return content;
		};


		// Generate JavaScript files
		var generateJS = function( data, type ) {
			var preparedData = prepareValues( data );
			var content = JSON.stringify( preparedData, null, "\t" );

			return outputPattern.js.replace( '{{name}}', options.name ).replace( '{{vars}}', content );
		};

		var generateAMD = function( data ) {
			var preparedData = prepareValues( data );
			var content = JSON.stringify( preparedData, null, "\t\t" );
			var pattern = deepClone( outputPattern.amd );

			content = content.substr( 1, content.length - 2 );

			return pattern.replace( "{{vars}}", content );
		};

		var prepareValues = function( data ) {
			var newData = {};
			var key, value;

			for ( key in data ) {
				value = data[ key ];

				if ( endsWith( value, "%" ) ) {
					value = parseInt( value, 10 ) / 100;
				} else {
					value = parseInt( value, 10 );
				}

				newData[ format( key, options.jsFormat ) ] = value;
			}

			return newData;
		};


		// ===================
		// -- SHARED CONFIG --
		// ===================

		this.files.forEach( function( file ) {

			var srcConfig = {};
			var destinationFiles = normalizeOutArray( file.dest );

			file.src.filter( fileExists ).map( function( filePath ) {

				// fetch JSON from file
				var src = grunt.file.readJSON( filePath );
				
				// add configuration vars to main config
				extend( true, srcConfig, src );

			} );


			destinationFiles.map( function( filePath ) {

				var fileType = filePath.split( "." ).pop().toLowerCase();
				var output, generator;

				// search for the correct generator by filetype
				if ( existsIn( fileExtensions.css, fileType ) ) {

					generator = generateStyle;

				} else if ( existsIn( fileExtensions.js, fileType ) ) {

					generator = options.amd ? generateAMD : generateJS;

				} else {

					grunt.log.warn( "Unknown filetype (" + fileType + ")." );
					return false;
				}

				// generate and save output
				output = generator.apply( null, [ srcConfig, fileType ] );
				grunt.file.write( filePath, output );

				grunt.log.ok( "File: " + filePath + " created." );
			} );

		} );


	} );

};
