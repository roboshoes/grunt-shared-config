"use strict";

var grunt = require( "grunt" );

exports.shared_config = {

	setUp: function( done ) {
		done();
	},

	style_options: function( test ) {
		test.expect( 12 );

		var files = {
			// scss
			scss:       [ grunt.file.read( "tmp/config.scss" ), grunt.file.read( "test/expected/config.scss" ) ],
			scss_yml:   [ grunt.file.read( "tmp/config_yml.scss" ), grunt.file.read( "test/expected/config.scss" ) ],
			// sass flavoured
			sass:       [ grunt.file.read( "tmp/config.sass" ), grunt.file.read( "test/expected/config.sass" ) ],
			sass_yml:   [ grunt.file.read( "tmp/config_yml.sass" ), grunt.file.read( "test/expected/config.sass" ) ],
			// less
			less:       [ grunt.file.read( "tmp/config.less" ), grunt.file.read( "test/expected/config.less" ) ],
			less_yml:   [ grunt.file.read( "tmp/config_yml.less" ), grunt.file.read( "test/expected/config.less" ) ],
			// stylus
			stylus:     [ grunt.file.read( "tmp/config.styl" ), grunt.file.read( "test/expected/config.styl" ) ],
			stylus_yml: [ grunt.file.read( "tmp/config_yml.styl" ), grunt.file.read( "test/expected/config.styl" ) ],
			// scss (files object based)
			scss1:      [ grunt.file.read( "tmp/config1.scss" ), grunt.file.read( "test/expected/config1.scss" ) ],
			scss1_yml:  [ grunt.file.read( "tmp/config1_yml.scss" ), grunt.file.read( "test/expected/config1.scss" ) ],
			// less (files object based)
			less1:      [ grunt.file.read( "tmp/config1.less" ), grunt.file.read( "test/expected/config1.less" ) ],
			less1_yml:  [ grunt.file.read( "tmp/config1_yml.less" ), grunt.file.read( "test/expected/config1.less" ) ]
		};

		test.equal( files.scss[0], files.scss[1], "SCSS should be equal." );
		test.equal( files.scss_yml[0], files.scss[1], "SCSS (yml source) should be equal." );

		test.equal( files.sass[0], files.sass[1], "SASS should be equal." );
		test.equal( files.sass_yml[0], files.sass[1], "SASS (yml source) should be equal." );

		test.equal( files.less[0], files.less[1], "LESS should be equal." );
		test.equal( files.less_yml[0], files.less[1], "LESS (yml source) should be equal." );

		test.equal( files.stylus[0], files.stylus[1], "Stylus should be equal." );
		test.equal( files.stylus_yml[0], files.stylus[1], "Stylus (yml source) should be equal." );

		test.equal( files.scss1[0], files.scss1[1], "SCSS (config1.scss) should be equal." );
		test.equal( files.scss1_yml[0], files.scss1[1], "SCSS (config1.scss) (yml source) should be equal." );

		test.equal( files.less1[0], files.less1[1], "LESS (config1.less) should be equal." );
		test.equal( files.less1_yml[0], files.less1[1], "LESS (config1.less) (yml source) should be equal." );

		test.done();
	},

	js_options: function( test ) {
		test.expect( 2 );

		var actual = grunt.file.read( "tmp/config.js" );
		var expected = grunt.file.read( "test/expected/config.js" );

		var actualFileBased = grunt.file.read( "tmp/config1.js" );
		var expectedFileBased = grunt.file.read( "test/expected/config1.js" );

		test.equal( actual, expected, "JS should be equal." );
		test.equal( actualFileBased, expectedFileBased, "JS (config1.js) should be equal." );

		test.done();
	},

	amd_options: function( test ) {
		test.expect( 1 );

		var actual = grunt.file.read( "tmp/config-amd.js" );
		var expected = grunt.file.read( "test/expected/config-amd.js" );

		test.equal( actual, expected, "JS AMD should be equal." );

		test.done();
	},

	sass_maps_options: function( test ) {
		test.expect( 2 );

		var files = {
			sassMaps:  [ grunt.file.read( "tmp/configMaps.scss"),  grunt.file.read( "test/expected/configMaps.scss" ) ],
			sassMaps1: [ grunt.file.read( "tmp/configMaps1.scss"), grunt.file.read( "test/expected/configMaps1.scss" ) ]
		};

		test.equal( files.sassMaps[0], files.sassMaps[1], "SASS Maps  (configMaps.scss) should be equal." );
		test.equal( files.sassMaps1[0], files.sassMaps1[1], "SASS Maps  (configMaps1.scss) should be equal." );

		test.done();
	},

	mask_options: function( test ) {
		test.expect( 2 );

		var files = {
			mask:      [ grunt.file.read( "tmp/config_mask.scss"),  grunt.file.read( "test/expected/config_mask.scss" ) ],
			maskAllow: [ grunt.file.read( "tmp/config_mask_allow.scss"),  grunt.file.read( "test/expected/config_mask_allow.scss" ) ]
		};

		test.equal( files.mask[0], files.mask[1], "Masked (config_mask.scss) should be equal." );
		test.equal( files.maskAllow[0], files.maskAllow[1], "Masked allow (config_mask_allow.scss) should be equal." );

		test.done();
	},
	mask_options_yml: function( test ) {
		test.expect( 2 );

		var files = {
			mask:      [ grunt.file.read( "tmp/config_mask_yml.scss"),  grunt.file.read( "test/expected/config_mask.scss" ) ],
			maskAllow: [ grunt.file.read( "tmp/config_mask_allow_yml.scss"),  grunt.file.read( "test/expected/config_mask_allow.scss" ) ]
		};

		test.equal( files.mask[0], files.mask[1], "Masked (config_mask_yml.scss) should be equal to config_mask.scss." );
		test.equal( files.maskAllow[0], files.maskAllow[1], "Masked allow (config_mask_allow_yml.scss) should be equal to config_mask_allow.scss." );

		test.done();
	}

};
