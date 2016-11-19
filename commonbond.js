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

var thebombs = 'BB.BBB.....BBBB';

function detonate (bombs) {

	console.log(bombs);

	var frame = bombs.split(''),
		locations = getIndices(frame, 'B'),
		rightForce,
		leftForce;

	for (b in locations) {
		// I could use a better sorting algorithm to alternate between l and right
		// in a frame FULL of bombs we could explode them at the same time (?)
		var bomb = locations[b];

		frame[bomb] = '.';

		// left
		if (bomb - 1 >= 0) {
			if (frame[bomb - 1] !== '.') {
				frame[bomb - 1] = 'x';
			} else {
				frame[bomb - 1] = '<';
			}
		}

		// right
		if (bomb + 1 < frame.length) {
			if (frame[bomb + 1] !== '.') {
				frame[bomb + 1] = 'x';
			} else {
				frame[bomb + 1] = '>';
			}
		}
	}

	console.log(frame.join(''));

	tick(frame);

	function tick (frame) {
		// consolidate these two into 1 array and then if-statement them later (?)
		rightForce = getIndices(frame, '>'), // these should start as 'B' and THEN become an arrow
		leftForce = getIndices(frame, '<'),
		crossfire = getIndices(frame, 'x');

		// stop if there's nothing left
		if (!rightForce.length && !leftForce.length && !crossfire.length) {
			return;
		}

		for (x in crossfire) {
			frame[crossfire[x]] = '.';
		}

		for (r in rightForce) {
			frame[rightForce[r]] = '.';

			if (rightForce[r] + 1 < frame.length) {
				if (frame[rightForce[r] + 1] !== '.') {
					frame[rightForce[r] + 1] = 'x';
				} else {
					frame[rightForce[r] + 1] = '>';
				}
			}
		}

		for (l in leftForce) {
			frame[leftForce[l]] = '.';

			if (leftForce[l] - 1 >= 0) {
				if (frame[leftForce[l] - 1] !== '.') {
					frame[leftForce[l] - 1] = 'x';
				} else {
					frame[leftForce[l] - 1] = '<';
				}
			}
		}

		console.log(frame.join(''));

		tick(frame);
	}
}

detonate(thebombs);


