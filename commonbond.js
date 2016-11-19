// TODO
// refactor with new sorting algorithm
// introduce speed setting
// figure out why an object format would be good for this

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

var thebombs = '...B....BB.B.';

function detonate (bombs) {

	console.log(bombs);

	var frame = bombs.split(''),
		locations = getIndices(frame, 'B'),
		rightForce,
		leftForce;

	// step 1
	for (b in locations) {
		// I could use a better sorting algorithm to alternate between l and right
		// in a frame FULL of bombs we could explode them at the same time (?)
		var bomb = locations[b];

		frame[bomb] = '.';

		frame[bomb - 1] = '<';
		frame[bomb + 1] = '>';
	}

	console.log(frame.join(''));

	tick(frame);

	function tick (frame) {
		// consolidate these two into 1 array and then if-statement them later (?)
		rightForce = getIndices(frame, '>'),
		leftForce = getIndices(frame, '<'),
		crossfire = getIndices(frame, 'x');

		// stop if there's nothing left
		if (!rightForce.length && !leftForce.length && !crossfire.length) {
			return;
		}

		for (x in crossfire) {
			frame[crossfire[x]] = '.';
		}

		for (l in leftForce) {
			frame[leftForce[l]] = '.';

			if (leftForce[l] - 1 <= frame.length) {
				if (frame[leftForce[l] - 1] === '>') {
					frame[leftForce[l] - 1] = 'x';
				} else {
					frame[leftForce[l] - 1] = '<';
				}
			}
		}

		for (r in rightForce) {
			frame[rightForce[r]] = '.';

			if (rightForce[r] + 1 < frame.length) {
				if (frame[rightForce[r] + 1] === '<') {
					frame[rightForce[r] + 1] = 'x';
				} else {
					frame[rightForce[r] + 1] = '>';
				}
			}
		}

		console.log(frame.join(''));

		tick(frame);
	}
}

detonate(thebombs);


