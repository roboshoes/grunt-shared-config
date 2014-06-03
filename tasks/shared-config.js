/*
 * grunt-shared-config
 *
 * Use this task to create multiple config files for JS/JS-AMD, SCSS/SASS/LESS/stylus from one JSON.
 *
 * Copyright (c) 2013 Mathias Paumgarten
 * Licensed under the MIT license.
 */

"use strict";

var mout = require( "mout" );

module.exports = function( grunt ) {

	grunt.registerMultiTask( "shared_config", "Your task description goes here.", function() {

		// ===========
		// -- UTILS --
		// ===========

		function normalizeOutArray( value ) {
			return typeof value === "string" ? [ value ] : value;
		}

		function normalizeFormat( value ) {
			return mout.array.contains( varFormats, value ) ? value : varFormats[ 0 ];
		}

		function format( value, type ) {
			value = value.replace( /-/g, " " );

			switch ( type ) {
				case "underscore":
					return mout.string.underscore( value );
				case "uppercase":
					return value.toUpperCase().replace( / /g, "_" );
				case "dash":
					return mout.string.hyphenate( value );
				default:
					return mout.string.camelCase( value );
			}
		}

		function fileExists( filePath ) {
			if ( !grunt.file.exists( filePath ) ) {
				grunt.log.warn( "Source file (" + filePath + ") not found." );
				return false;
			}
			return true;
		}


		// ==============
		// -- SETTINGS --
		// ==============

		// default options
		var options = this.options( {
			amd: false,
			jsFormat: "uppercase",
			cssFormat: "dash",
			name: "config"
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
		function generateStyle( data, type ) {
			var content = "";
			var pattern = outputPattern[ type ];

			function generateContent( data, parentKey ) {
				var name, key;
				for ( key in data ) {
					name = parentKey ? format( parentKey + "-" + key, options.cssFormat ) : format( key, options.cssFormat );

					if ( typeof( data[ key ] ) === "object" ) {
						generateContent( data[ key ], name );
					}else{
						content += pattern.replace( '{{key}}', name ).replace( '{{value}}', data[ key ] );
					}
				}
			}

			generateContent( data );

			return content;
		}


		// Generate JavaScript files
		function generateJS( data, type ) {
			var preparedData = prepareValues( data );
			var content = JSON.stringify( preparedData, null, "\t" );

			return outputPattern.js.replace( '{{name}}', options.name ).replace( '{{vars}}', content );
		}

		function generateAMD( data ) {
			var preparedData = prepareValues( data );
			var content = JSON.stringify( preparedData, null, "\t\t" );
			var pattern = mout.lang.deepClone( outputPattern.amd );

			content = content.substr( 1, content.length - 2 );

			return pattern.replace( "{{vars}}", content );
		}

		function prepareValues( data ) {
			var newData = {};
			var key, value;

			for ( key in data ) {
				value = data[ key ];

				if ( mout.string.endsWith( value, "%" ) ) {
					value = parseInt( value, 10 ) / 100;
				} else if ( !mout.string.startsWith( value, "#" ) ) {
					value = parseInt( value, 10 );
				}

				newData[ format( key, options.jsFormat ) ] = value;
			}

			return newData;
		}


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
				mout.object.deepMixIn( srcConfig, src );

			} );


			destinationFiles.map( function( filePath ) {

				var fileType = filePath.split( "." ).pop().toLowerCase();
				var output, generator;

				// search for the correct generator by filetype
				if ( mout.array.contains( fileExtensions.css, fileType ) ) {

					generator = generateStyle;

				} else if ( mout.array.contains( fileExtensions.js, fileType ) ) {

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
