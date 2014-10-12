angular.module("globalConfig.sharedConfig", [])
	.constant("globalConfig", {
		"HEIGHT": 120,
		"WIDTH": 380,
		"AMOUNT": 0.33,
		"ANIMATION_SPEED": 100,
		"COLOR": "#BEBEBE",
		"CAR": {
			"RED": "#FF0000",
			"GREEN": "#00FF00",
			"BLUE": "#0000FF",
			"INNER": {
				"SEAT": 10
			}
		},
		"STRING": "a/path/to/something.png",
		"TRUEFALSE": true,
		"TRUEFALSESTRING": "true",
		"N": null,
		"OFFSET": 20
	});