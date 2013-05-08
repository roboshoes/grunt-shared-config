"use strict";

var grunt = require( "grunt" );

exports.shared_config = {

	setUp: function( done ) {
		done();
	},

	style_options: function( test ) {
		test.expect( 4 );

		var actualSCSS = grunt.file.read( "tmp/config.scss" );
		var expectedSCSS = grunt.file.read( "test/expected/config.scss" );

		var actualSASS = grunt.file.read( "tmp/config.sass" );
		var expectedSASS = grunt.file.read( "test/expected/config.sass" );

		var actualLESS = grunt.file.read( "tmp/config.less" );
		var expectedLESS = grunt.file.read( "test/expected/config.less" );

		var actualStylus = grunt.file.read( "tmp/config.stylus" );
		var expectedStylus = grunt.file.read( "test/expected/config.stylus" );

		test.equal( actualSCSS, expectedSCSS, "SCSS should be equal." );
		test.equal( actualSASS, expectedSASS, "SASS should be equal." );
		test.equal( actualLESS, expectedLESS, "LESS should be equal." );
		test.equal( actualStylus, expectedStylus, "Stylus should be equal." );

		test.done();
	},

	js_options: function( test ) {
		test.expect( 1 );

		var actual = grunt.file.read( "tmp/config.js" );
		var expected = grunt.file.read( "test/expected/config.js" );

		test.equal( actual, expected, "JS should be equal." );

		test.done();
	},

	amd_options: function( test ) {
		test.expect( 1 );

		var actual = grunt.file.read( "tmp/config-amd.js" );
		var expected = grunt.file.read( "test/expected/config-amd.js" );

		test.equal( actual, expected, "JS AMD should be equal." );

		test.done();
	}

};
