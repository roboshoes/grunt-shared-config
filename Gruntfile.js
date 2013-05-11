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
			default: {
				options: {
					name: "globalConfig",
					cssFormat: "dash",
					jsFormat: "underscore"
				},
				src: [
					"test/fixtures/config.json",
					"test/fixtures/config1.json"
				],
				dest: [
					"tmp/config.scss",
					"tmp/config.sass",
					"tmp/config.less",
					"tmp/config.styl",
					"tmp/config.js"
				]
			},

			amdTest: {
				options: {
					name: "globalConfig",
					jsFormat: "uppercase",
					amd: true
				},
				src: [
					"test/fixtures/config.json",
					"test/fixtures/config1.json"
				],
				dest: "tmp/config-amd.js"
			},

			filesTest: {
				options: {
					name: "globalConfig",
					cssFormat: "camelcase",
					jsFormat: "camelcase"
				},
				files: [
					{
						src: "test/fixtures/config1.json",
						dest: [
							"tmp/config1.scss",
							"tmp/config1.less"
						]
					},{
						src: [
							"test/fixtures/config.json",
							"test/fixtures/config1.json"
						],
						dest: [
							"tmp/config1.js"
						]
					}
				]
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
