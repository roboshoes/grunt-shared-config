# grunt-shared-config

[![Build Status](https://travis-ci.org/MathiasPaumgarten/grunt-shared-config.png?branch=master)](https://travis-ci.org/MathiasPaumgarten/grunt-shared-config)

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

#### options.cssFormat
Type: `String`
Default value: `"dash"`

One of four possible types: `"dash"`, `"underscore"`, `"camelcase"`, `"uppercase"` defining the format in which variables are written.

```scss
$animation-speed: 2s;   // dash
$animation_speed: 2s;   // underscore
$ANIMATION_SPEED: 2s;   // uppercase
$animationSpeed: 2s;    // camelcase
```

#### options.jsFormat
Type: `String`
Default value: `"uppercase"`

Same as `options.cssFormat` but for js files.


#### options.amd
Type: `Boolean`
Default value: `false`

Defines weather or not JS files are written in AMD style or as plain objects.


#### options.ngconstant
Type: `Boolean`
Default value: `false`

Defines weather or not JS files are written in Angular constant module style or as plain objects. *Note*: Can not be used with AMD.


#### options.module
Type: `String`
Default value: `"globalConfig.sharedConfig"`

This string determines the name of the Angulare constent module.


#### options.name
Type: `String`
Default value: `options`

This value is only relevant if `options.amd` is set to `false`. This String determines the name of the config object (for JavaScript).


#### options.useSassMaps
Type: `Boolean`
Default value: `false`

If this is set to `true` for every __SCSS__ file it will generate a Sass Map file instead.


#### options.indention
Type: `String`
Default value: `\t`

This is used for indention. Defaults to tab, pass spaces if you prefer that.


#### options.mask
Type: `Object` or `String` or `Array`
Default: undefined

If mask is an object, this is used to mask the config object before output.
If mask is a string and a file exists at this path (either JSON or YAML), this is read in and used to mask the config object before output.
If mask is an array, the array items are treated one after the other like if it would be a single value (string or object) by overwriting the former already existing mask.

A mask is an object (if from file, read as JSON or YAML) that includes key value pairs like this:
`key: true` includes this value including any nested objects
`key: false` don't include this
`key: allowLevel-1` include the first level in the result, any nested objects will not end up in the result. You can use `allowLevel-2` and so on, to define the number of levels to include.

Of course you can nest these key value pairs to have granular control over what ends up in the output.


#### options.maskAllowUnknownLevels
Type: `Number`
Default: 0

Defines how many levels within the config file will be allowed if the value is not set in the mask. Setting it to 1 for instance means that every value 1 level deeply nested in the config will be accepted, if not specified in the config.
By default the value will be 0. that means values that are not defined in the mask file will be ignored.


#### options.singlequote
Type: `Boolean`
Default `false`

If true, determines that single quotes (`'`) should be used in the JavaScript objects otherwise double quotes (`"`) are used.


### Options (Files)


#### src
Type: `String` or `Array`

Contains a single config file (JSON or YAML) or an array of files. The config file may contains nested values. Files ending with .yml or .yaml are parsed as YAML, all others as JSON.


#### dest
Type: `String` or `Array`

Contains all output files. Format is detected by file extension. *Available extension: `.js`, `.sass`, `.scss`, `.styl`, `.less`*


#### files
Type: `Array`

This array can be used as a substitution for `src` and `dest` to allow multi-processing per task.


### Usage Examples

__grunt-shared-config__ requires a JSON or YAML file to generate the config files from. The JSON file must supply all variable in _hyphon format_.
For the following examples let's assume we supply this `config.json`.

```json
{
	"height": "120px",
	"width": "500px",
	"amount": "33%",
	"animation-speed": "100s",
	"color": "#BEBEBE",
	"labeled-color": "red",
	"transform": "rotateY(0deg) translateZ(288px)",
	"car": {
		"blue": "#0000FF",
		"green": "#00FF00"
	}
	"some-text": "'some text content'"
	"path": "some/path/to/some/file.png"
}
```

__NOTE__: While converting the variables for JS, it strips all units (such as `px`, `%`, etc.) and also converts percenteges from `33%` to `0.33`.
__NOTE__: Value that must be exported as String must start and end with *'*.

#### AMD and SCSS files.
The following task creates an AMD based JavaScript file and all available CSS preprocessor format files.

```js
grunt.initConfig( {
	shared_config: {
		default: {
			options: {
				name: "globalConfig",
				cssFormat: "dash",
				jsFormat: "uppercase",
				amd: true
			},
			src: "config.json",
			dest: [
				"styles/config.scss",
				"styles/config.sass",
				"styles/config.less",
				"styles/config.styl",
				"scripts/config.js"
			]
		},
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
		"ANIMATION_SPEED": 100,
		"COLOR": "#BEBEBE",
		"LABELED_COLOR": "red",
		"TRANSFORM": "rotateY(0deg) translateZ(288px)",
		"CAR": {
			"BLUE": "#0000FF",
			"GREEN": "#00FF00"
		}
        "SOME_TEXT": "some text content"
        "PATH": "some/path/to/some/file.png"
	}

} );
```

_styles/config.scss_
```scss
$height: 120px;
$width: 500px;
$amount: 33%;
$animation-speed: 100s;
$color: #BEBEBE";
$labeled-color: red;
$transform: rotateY(0deg) translateZ(288px);
$car-blue: #0000FF;
$car-green: #00FF00;
$some-text: "some text content"
$path: "some/path/to/some/file.png"
```

#### Angular constant module and SCSS files.
The following task creates an [Angular constant module](https://docs.angularjs.org/api/ng/type/angular.Module#constant) based JavaScript file and all available CSS preprocessor format files. The module name will be `options.name` suffixed with `.sharedConfig`.

```js
grunt.initConfig( {
	shared_config: {
		default: {
			options: {
				name: "globalConfig",
				cssFormat: "dash",
				jsFormat: "uppercase",
				ngconstant: true
			},
			src: "config.json",
			dest: [
				"styles/config.scss",
				"styles/config.sass",
				"styles/config.less",
				"styles/config.styl",
				"scripts/config.js"
			]
		},
	}
} )
```

_scripts/config.js_
```JavaScript
angular.module("globalConfig.sharedConfig", [])
	.constant("globalConfig", {

	return {
		"HEIGHT": 120,
		"WIDTH": 500,
		"AMOUNT": 0.33,
		"ANIMATION_SPEED": 100,
		"COLOR": "#BEBEBE",
		"CAR": {
		"BLUE": "#0000FF",
		"GREEN": "#00FF00"
	}
} );
```

_styles/config.scss_
```scss
$height: 120px;
$width: 500px;
$amount: 33%;
$animation-speed: 100s;
$color: #BEBEBE";
$car-blue: #0000FF;
$car-green: #00FF00;
```


#### Basic JS files.
The following task creates a plain JS file.

```js
grunt.initConfig( {
	shared_config: {
		default: {
			options: {
				name: "options",
				jsFormat: "underscore"
			},
			src: "config.json",
			dest: "scripts/config.js"
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
	"animation_speed": 100,
	"color": "#BEBEBE"
	"labeled_color": "red",
	"transform": "rotateY(0deg) translateZ(288px)",
	"car": {
		"blue": "#0000FF",
		"green": "#00FF00"
	},
    "some_text": "some text content"
    "path": "some/path/to/some/file.png"
};
```


#### Multiprocessing per Task
The following task allows processing of processing of multiple config files with seperate outputs using the `files` option.

```js
grunt.initConfig( {
	shared_config: {
		filesTest: {
			options: {
				name: "globalConfig",
				cssFormat: "camelcase",
				jsFormat: "camelcase"
			},
			files: [
				{
					src: "config.json",
					dest: [
						"styles/config.scss",
						"styles/config.less"
					]
				},{
					src: [
						"config.json",
						"config1.json"
					],
					dest: [
						"styles/config1.scss",
						"scripts/config.js"
					]
				}
			]
		}
    }
} )
```


#### Generate Sass Maps

```js
grunt.initConfig( {
	shared_config: {
		default: {
			options: {
				name: "globalConfig",
				useSassMaps: true
			},
			src: "config.json",
			dest: [
				"styles/config.scss"
			]
		},
	}
} )
```

_scripts/config.scss_
```scss
$globalConfig: (
	height: 120px,
	width: 500px,
	amount: 33%,
	animation-speed: 100s,
	color: #BEBEBE,
	labeled-color: red,
	transform: rotateY(0deg) translateZ(288px),
	car: (
		red: #FF0000,
		green: #00FF00,
		blue: #0000FF
	),
    some-text: "some text content"
    path: "some/path/to/some/file.png"
);
```

#### Masking
```js
grunt.initConfig( {
	shared_config: {
		default: {
			options: {
				name: "globalConfig",
				useSassMaps: true
				mask: "mask.json",
			},
			src: "config.json",
			dest: [
				"styles/config.scss"
			]
		}
	}
} );
```
_config.json_
```js
{
	"height": "120px",
	"width": "500px",
	"amount": "33%",
	"animation-speed": "100s",
	"color": "#BEBEBE",
	"car": {
		"red": "#FF0000",
		"green": "#00FF00",
		"blue": "#0000FF",
		"inner": {
			"seat": "10px"
		}
	},
	"path": "a/path/to/something.png"
	"string": "'some text content'"
}
```
_mask.json_
```js
{
    "height": true,
    "animation-speed": false,
    "car": {
        "green": false,
        "inner": "allowLevel-1"
    },
    "path": false
    "string": false
}
```
_styles/config.scss_
```scss
$globalConfig: (
	height: 120px,
	car: (
		inner: (
			seat: 10px
		)
	)
);
```



## Release History
* 2014-10-27      v0.3.9      Allow css values
* 2014-09-25      v0.3.8      Allow null values
* 2014-06-11      v0.3.2      Adds sass maps option
* 2014-06-03      v0.3.0      Adds nested variables
* 2014-04-25      v0.2.2      Fixes hex color definition in JS
* 2013-05-11      v0.2.0      new configuration (with respect to the grunt conventions)
* 2013-05-08      v0.1.0      Added Stylus and LESS support
* 2013-05-08      v0.0.1      Initial Release


## Contributors
* [@MathiasPaumgarten](https://github.com/MathiasPaumgarten) Mathias Paumgarten
* [@cee](https://github.com/ceee) Tobias Klika
* [@FredyC](https://github.com/FredyC) Daniel K.
* [@meodai](https://github.com/meodai) David A.
* [@lucalanca](https://github.com/lucalanca) João Figueiredo
* [@benib](https://github.com/benib) Beni B.
* [@barraq](https://github.com/barraq) Rémi Barraquand
