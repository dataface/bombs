// TODO
// introduce speed setting
// replace bomb with exploded version at first step
// figure out why an object format would be good for this


var c = {
	bombscape: '____o_____o_oo_____o____',
	bombs: 'o',
	nothing: '_',
	lforce: '<',
	rforce: '>',
	cfire: 'x'
}

// --- a little helper
function getIndices (arr, val) {
	var indices = [],
		i;

	for (i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			indices.push(i);
		}
	}

	return indices;
}

function detonate (config) {

	var frame = config.bombscape.split(''),
		locations = getIndices(frame, config.bombs),
		rightForce,
		leftForce;

	for (b in locations) {
		// I could use a better sorting algorithm to alternate between l and right
		// in a frame FULL of bombs we could explode them at the same time (?)
		var bomb = locations[b];

		frame[bomb] = config.nothing;
		tickRight(bomb, frame);
		tickLeft(bomb, frame);
	}

	console.log(frame.join(''));

	tick(frame);

	function tick (frame) {
		rightForce = getIndices(frame, config.rforce),
		leftForce = getIndices(frame, config.lforce),
		forces = rightForce.concat(leftForce), // THIS IS TEMPORARY
		crossfire = getIndices(frame, config.cfire);

		// if left and right forces collide we form crossfire
		for (x in crossfire) {
			frame[crossfire[x]] = config.nothing;
		}

		for (f in forces) {

			// force right
			if (frame[forces[f]] === config.rforce) {
				tickRight(forces[f], frame);

			// force left
			} else if (frame[forces[f]] === config.lforce) {
				tickLeft(forces[f], frame);
			}

			// clear the previous force
			frame[forces[f]] = config.nothing;
		}

		// this is crappy and i need a better way to return the value
		console.log(frame.join(''));

		if (forces.length || crossfire.length) {
			tick(frame);
		}
	}

	function tickRight (index, arr) {

		if (index + 1 < arr.length) {
			if (arr[index + 1] === config.lforce) {
				arr[index + 1] = config.cfire;
			} else {
				arr[index + 1] = config.rforce;
			}
		}
	}

	function tickLeft (index, arr) {
		if (index - 1 >= 0) {
			if (arr[index - 1] === config.rforce) {
				arr[index - 1] = config.cfire;
			} else {
				arr[index - 1] = config.lforce;
			}
		}
	}
}

// class Bombscape ()
// class Bomb ()

// demonstrate what bombs we're starting with (stupid)
console.log(c.bombscape);

detonate(c);


