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

		watch: {
			hint: {
				files: [
					"Gruntfile.js",
					"tasks/*.js",
					"<%= nodeunit.tests %>"
				],

				tasks: [ "jshint" ],

				options: {
					debounceDelay: 150
				}
			},

			tests: {
				files: [
					"tasks/*.js",
					"<%= nodeunit.tests %>"
				],

				tasks: [ "test" ],

				options: {
					debounceDelay: 150
				}
			}
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
			style_yml: {
				options: {
					name: "globalConfig",
					cssFormat: "dash",
					jsFormat: "underscore"
				},
				src: [
					"test/fixtures/config.yml",
					"test/fixtures/config1.yml"
				],
				dest: [
					"tmp/config_yml.scss",
					"tmp/config_yml.sass",
					"tmp/config_yml.less",
					"tmp/config_yml.styl",
					"tmp/config_yml.js"
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
			amdTest_yml: {
				options: {
					name: "globalConfig",
					jsFormat: "uppercase",
					amd: true
				},
				src: [
					"test/fixtures/config.yml",
					"test/fixtures/config1.yml"
				],
				dest: "tmp/config-amd_yml.js"
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
			},
			filesTest_yml: {
				options: {
					name: "globalConfig",
					cssFormat: "camelcase",
					jsFormat: "camelcase"
				},
				files: [
					{
						src: "test/fixtures/config1.json",
						dest: [
							"tmp/config1_yml.scss",
							"tmp/config1_yml.less"
						]
					},{
						src: [
							"test/fixtures/config.yml",
							"test/fixtures/config1.yml"
						],
						dest: [
							"tmp/config1_yml.js"
						]
					}
				]
			},

			sassMaps: {
				options: {
					useSassMaps: true,
					name: "globalConfig"
				},
				files: [
					{
						src: [
							"test/fixtures/config.json"
						],
						dest: [
							"tmp/configMaps.scss"
						]
					},
					{
						src: [
							"test/fixtures/config1.json"
						],
						dest: [
							"tmp/configMaps1.scss"
						]
					}
				]
			},
			sassMaps_yml: {
				options: {
					useSassMaps: true,
					name: "globalConfig"
				},
				files: [
					{
						src: [
							"test/fixtures/config.yml"
						],
						dest: [
							"tmp/configMaps_yml.scss"
						]
					},
					{
						src: [
							"test/fixtures/config1.yml"
						],
						dest: [
							"tmp/configMaps1_yml.scss"
						]
					}
				]
			},

			mask: {
				options: {
					name: "globalConfig",
					useSassMaps: true,
					maskFile: "test/fixtures/mask.json"
				},
				files: [
					{
						src: [
							"test/fixtures/config.yml"
						],
						dest: [
							"tmp/config_mask.scss"
						]
					}
				]
			},
			mask_allowMode: {
				options: {
					name: "globalConfig",
					useSassMaps: true,
					maskFile: "test/fixtures/mask.json",
					maskAllowMode: true
				},
				files: [
					{
						src: [
							"test/fixtures/config.yml"
						],
						dest: [
							"tmp/config_mask_allow.scss"
						]
					}
				]
			},
		},

		nodeunit: {
			tests: [ "test/*_test.js" ],
		}

	} );


	grunt.loadTasks( "tasks" );

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-nodeunit" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.registerTask( "test", [ "clean", "jshint", "shared_config", "nodeunit" ] );
	grunt.registerTask( "default", [ "test" ] );

};
