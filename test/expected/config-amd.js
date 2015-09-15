define( function() {

	return {
		"HEIGHT": 120,
		"WIDTH": 380,
		"AMOUNT": 0.33,
		"ANIMATION_SPEED": 100,
		"COLOR": "#BEBEBE",
		"TRANSITION": [
			"color 0.4s",
			"height 1s ease"
		],
		"WIDTHS": [
			1920,
			1600,
			1280,
			620
		],
		"GRID_IMAGES": [
			[
				"one.png",
				"two.png",
				"three.png"
			],
			[
				"four.png",
				"five.png",
				"six.png"
			],
			[
				"seven.png",
				"eight.png",
				"nine.png"
			]
		],
		"DEEP_LIST": [
			{
				"PROP1": "val1",
				"PROP2": 4,
				"PROP3": [
					"hello",
					"world"
				],
				"PROP4": [
					{
						"WORD": "hello",
						"LANGUAGE": "english"
					},
					{
						"WORD": "hallo",
						"LANGUAGE": "german"
					}
				]
			},
			{
				"PROP1": "val2",
				"PROP5": false
			}
		],
		"LABELED_COLOR": "red",
		"TRANSPARENT_COLOR": "transparent",
		"RGB_COLOR": "rgb(255, 0, 0)",
		"RGBA_COLOR": "rgba(255, 0, 0, 0.5)",
		"CAR": {
			"RED": "#FF0000",
			"GREEN": "#00FF00",
			"BLUE": "#0000FF",
			"INNER": {
				"SEAT": 10
			}
		},
		"TRANSFORM": "rotateY(0deg) translateZ(288px)",
		"PATH": "a/path/to/something.png",
		"STRING": "some string content",
		"TRUEFALSE": true,
		"TRUEFALSESTRING": "true",
		"N": null,
		"OFFSET": 20
	}

} );
