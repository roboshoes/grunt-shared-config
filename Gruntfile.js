/*
* grunt-shared-config
*
*
* Copyright (c) 2013 Mathias Paumgarten
* Licensed under the MIT license.
*/

"use strict";

module.exports = function( grunt ) {

	grunt.initConfig( {

		jshint: {

			all: [
				"Gruntfile.js",
				"tasks/*.js",
				"<%= nodeunit.tests %>",
			],

			options: {
				jshintrc: ".jshintrc",
			}
		},

		clean: {
			tests: [ "tmp" ]
		},

		shared_config: {

			styles: {
				options: {
					config: "test/fixtures/config.json",
					cssFormat: "dash",

					out: [
						"tmp/config.scss",
						"tmp/config.sass"
					]
				},

			},

			amd: {
				options: {
					config: "test/fixtures/config.json",
					amd: true,
					jsFormat: "uppercase",
					out: [
						"tmp/config-amd.js",
					]
				}
			},

			js: {
				options: {
					config: "test/fixtures/config.json",
					amd: false,
					jsFormat: "underscore",
					name: "options",
					out: [
						"tmp/config.js",
					]
				},

			}

		},

		nodeunit: {
			tests: [ "test/*_test.js" ],
		},

	} );


	grunt.loadTasks( "tasks" );

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );

	grunt.registerTask( "test", [ "clean", "shared_config", "nodeunit" ] );
	grunt.registerTask( "default", [ "jshint", "test" ] );

};
