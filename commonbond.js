// TODO
// refactor with new sorting algorithm
// introduce speed setting
// figure out why an object format would be good for this

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

var thebombs = '......B...B......';

function detonate (bombs) {

	var frame = bombs.split(''),
		locations = getIndices(frame, 'B'),
		rightForce,
		leftForce;

	for (b in locations) {
		// I could use a better sorting algorithm to alternate between l and right
		// in a frame FULL of bombs we could explode them at the same time (?)
		var bomb = locations[b];

		frame[bomb] = '.';

		tickLeft(bomb, frame);
		tickRight(bomb, frame);
	}

	console.log(frame.join(''));

	tick(frame);

	function tick (frame) {
		// consolidate these two into 1 array and then if-statement them later (?)
		rightForce = getIndices(frame, '>'), // these should start as 'B' and THEN become an arrow
		leftForce = getIndices(frame, '<'),
		forces = rightForce.concat(leftForce), // maybe a bad idea
		crossfire = getIndices(frame, 'x');

		for (x in crossfire) {
			frame[crossfire[x]] = '.';
		}

		for (f in forces) {

			if (frame[forces[f]] === '>') {
				tickRight(forces[f], frame);

			} else if (frame[forces[f]] === '<') {
				tickLeft(forces[f], frame);
			}

			frame[forces[f]] = '.';
		}

		console.log(frame.join(''));

		if (forces.length || crossfire.length) {
			tick(frame);
		}
	}

	function tickRight (index, arr) {

		if (index + 1 < arr.length) {
			if (arr[index + 1] === '<') {
				arr[index + 1] = 'x';
			} else {
				arr[index + 1] = '>';
			}
		}
	}

	function tickLeft (index, arr) {
		if (index - 1 >= 0) {
			if (arr[index - 1] === '>') {
				arr[index - 1] = 'x';
			} else {
				arr[index - 1] = '<';
			}
		}
	}
}

console.log(thebombs);

detonate(thebombs);


