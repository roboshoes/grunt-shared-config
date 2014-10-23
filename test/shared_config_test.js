"use strict";

var grunt = require( "grunt" );

exports.shared_config = {

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

		test.equal( files.scss[ 0 ], files.scss[ 1 ], "SCSS should be equal." );
		test.equal( files.scss_yml[ 0 ], files.scss[ 1 ], "SCSS (yml source) should be equal." );

		test.equal( files.sass[ 0 ], files.sass[ 1 ], "SASS should be equal." );
		test.equal( files.sass_yml[ 0 ], files.sass[ 1 ], "SASS (yml source) should be equal." );

		test.equal( files.less[ 0 ], files.less[ 1 ], "LESS should be equal." );
		test.equal( files.less_yml[ 0 ], files.less[ 1 ], "LESS (yml source) should be equal." );

		test.equal( files.stylus[ 0 ], files.stylus[ 1 ], "Stylus should be equal." );
		test.equal( files.stylus_yml[ 0 ], files.stylus[ 1 ], "Stylus (yml source) should be equal." );

		test.equal( files.scss1[ 0 ], files.scss1[ 1 ], "SCSS (config1.scss) should be equal." );
		test.equal( files.scss1_yml[ 0 ], files.scss1[ 1 ], "SCSS (config1.scss) (yml source) should be equal." );

		test.equal( files.less1[ 0 ], files.less1[ 1 ], "LESS (config1.less) should be equal." );
		test.equal( files.less1_yml[ 0 ], files.less1[ 1 ], "LESS (config1.less) (yml source) should be equal." );

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

		test.equal( actual, expected, "JS AMD (config-amd.js) should be equal." );

		test.done();
	},

	ngconstant_options: function( test ) {
		test.expect( 1 );

		var actual = grunt.file.read( "tmp/config-ngconstant.js" );
		var expected = grunt.file.read( "test/expected/config-ngconstant.js" );

		test.equal( actual, expected, "JS NGConstant (config-ngconstant.js) should be equal." );

		test.done();
	},

	sass_maps_options: function( test ) {
		test.expect( 2 );

		var files = {
			sassMaps:  [ grunt.file.read( "tmp/configMaps.scss"),  grunt.file.read( "test/expected/configMaps.scss" ) ],
			sassMaps1: [ grunt.file.read( "tmp/configMaps1.scss"), grunt.file.read( "test/expected/configMaps1.scss" ) ]
		};

		test.equal( files.sassMaps[ 0 ], files.sassMaps[ 1 ], "SASS Maps (configMaps.scss) should be equal." );
		test.equal( files.sassMaps1[ 0 ], files.sassMaps1[ 1 ], "SASS Maps (configMaps1.scss) should be equal." );

		test.done();
	},

	mask_options: function( test ) {
		test.expect( 6 );

		var files = {
			mask:  [ grunt.file.read( "tmp/config_mask.scss" ), grunt.file.read( "test/expected/config_mask.scss" ) ],
			mask1: [ grunt.file.read( "tmp/config_mask1.scss" ), grunt.file.read( "test/expected/config_mask1.scss" ) ],
			mask2: [ grunt.file.read( "tmp/config_mask2.scss" ), grunt.file.read( "test/expected/config_mask2.scss" ) ],
			mask3: [ grunt.file.read( "tmp/config_mask3.scss" ), grunt.file.read( "test/expected/config_mask3.scss" ) ],
			mask4: [ grunt.file.read( "tmp/config_mask4.scss" ), grunt.file.read( "test/expected/config_mask4.scss" ) ],
			mask5: [ grunt.file.read( "tmp/config_mask5.js" ), grunt.file.read( "test/expected/config_mask5.js" ) ],
		};

		test.equal( files.mask[ 0 ], files.mask[ 1 ], "Masked file (config_mask.scss) should be equal." );
		test.equal( files.mask1[ 0 ], files.mask1[ 1 ], "Masked file (config_mask1.scss) should be equal." );
		test.equal( files.mask2[ 0 ], files.mask2[ 1 ], "Masked file (config_mask2.scss) should be equal." );
		test.equal( files.mask3[ 0 ], files.mask3[ 1 ], "Masked file (config_mask3.scss) should be equal." );
		test.equal( files.mask4[ 0 ], files.mask4[ 1 ], "Masked file (config_mask4.scss) should be equal." );
		test.equal( files.mask5[ 0 ], files.mask5[ 1 ], "Masked file (config_mask5.js) should be equal." );

		test.done();
	},

};
