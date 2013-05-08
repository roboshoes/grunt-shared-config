# grunt-shared-config

> Create config files for CSS preprocessors (SASS/SCSS/LESS/Stylus) and JS from one source

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-shared-config --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( "grunt-shared-config" );
```

## The "shared_config" task

### Overview
This task helps you to create multiple config files in SCSS/SASS/LESS/Stylus/JS/JS (AMD flavored).

### Options

#### options.config
Type: `String`

A string value representing the JSON file containing the shared variables.


#### options.out
Type: `Array`

This array contains all files that need to be generated from the `options.config` input.


#### options.cssFormat
Type: `String`
Default value: `"dash"`

One of four possible types: `"dash"`, `"underscore"`, `"camelcase"`, `"uppercase"` defining the format in which variables are written.

```scss
$animation-speed: 2s;   // dash
$animation_speed: 2s;   // underscore
$ANIMATION_SPEED: 2s;   // camelcase
$animationSpeed: 2s;    // uppercase
```

#### options.jsFormat
Type: `String`
Default value: `"uppercase"`

Same as `options.cssFormat` but for js files.


#### options.amd
Type: `Boolean`
Default value: `true`

Defines weather or not JS files are written in AMD style or as plain objects.


#### options.name
Type: `String`
Default value: `options`

This value is only relevant if `options.amd` is set to `false`. This String determines the name of the config object.



### Usage Examples

__grunt-shared-config__ requires a JSON file to generate the config files from. The JSON file must supply all variable in _hyphon format_.
For the following examples let's assume we supply this `config.json`.

```json
{
	"height": "120px",
	"width": "500px",
	"amount": "33%",
	"animation-speed": "100s"
}
```

__NOTE__: While converting the variables for JS, it strips all units (such as `px`, `%`, etc.) and also converts percenteges from `33%` to `0.33`.

#### AMD and SCSS files.
The following task creates an AMD based JavaScript file and SCSS file.

```js
grunt.initConfig( {
	shared_config: {
		options: {
			config: "config.json",
			jsFormat: "uppercase",
			cssFormat: "dash"
			out: [
				"scripts/config.js",
				"styles/config.scss"
			]
		}
	}
} )
```

_scripts/config.js_
```JavaScript
define( function() {

	return {
		"HEIGHT": 120,
		"WIDTH": 500,
		"AMOUNT": 0.33,
		"ANIMATION_SPEED": 100
	}

} );
```

_styles/config.scss_
```scss
$height: 120px;
$width: 500px;
$amount: 33%;
$animation-speed: 100s;
```


#### Basic JS files.
The following task creates a plain JS file.

```js
grunt.initConfig( {
	shared_config: {
		options: {
			config: "config.json",
			jsFormat: "underscore",
			amd: false,
			name: "options",
			out: [
				"scripts/config.js"
			]
		}
	}
} )
```

_scripts/config.js_
```JavaScript
var options = {
	"height": 120,
	"width": 500,
	"amount": 0.33,
	"animation_speed": 100
};
```


## Release History
* 2013-05-08      v0.1.0      Added Stylus and LESS support
* 2013-05-08      v0.0.1      Initial Release
