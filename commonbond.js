
/*
 * PROBLEM 2
 * @param String initial location of bomb
 * @param Int force of bomb
 * @return Array of strings
 */

function explode(bombs, force) {
	var frame = bombs.split(''), // store current frame
		source = [],
		animation = [bombs],
		next = [];

	function isClear(item) {
		return item === '.';
	}

	while (!frame.every(isClear)) {
		var next = [];

		// This is the part where the actual explosion process should happen.
		// 1. find B
		for (var i = 0; i < frame.length; i++) {
			switch(frame[i]) {
				case 'B':
					next.push('.');
					// 3. after [force] number of .'s - 1 on either side, insert a < or >
					break;
				case '>':
					// add a '.' with a '>' [force] items to the right
						// (if this collides with another > then add an x)
					break;
				case '<':
					// add a '.' with a '<' [force] items to the left
						// (if this collides with another < then add an x)
					break;
				default:
					next.push(frame[i]);
			}
		}

		// 4. Trim ends with the same [force] - 1

		// set 'next' as the next frame here
		frame = next;
		animation.push(next.join(''));
	}

	return animation;
}

// ---------------------------------------------

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

var thebombs = '.B......B.B...';

function detonate (bombs) {

	console.log(bombs);

	var frame = bombs.split(''),
		locations = getIndices(frame, 'B'),
		rightForce,
		leftForce;

	// step 1
	for (b in locations) {
		var bomb = locations[b];

		frame[bomb] = '.';

		frame[bomb - 1] = '<';
		frame[bomb + 1] = '>';
	}

	console.log(frame.join(''));

	tick(frame);

	function tick (frame) {
		// consolidate these two into 1 array and then if-statement them later
		rightForce = getIndices(frame, '>'),
		leftForce = getIndices(frame, '<');

		if (!rightForce.length && !leftForce.length) {
			return;
		}

		for (r in rightForce) {
			frame[rightForce[r]] = '.';

			if (!rightForce[r] + 1 > frame.length) {
				frame[rightForce[r] + 1] = '>';
			}
		}

		for (l in leftForce) {
			frame[leftForce[l]] = '.';

			if (!leftForce[l] - 1 < frame.length) {
				frame[leftForce[l] - 1] = '<';
			}
		}

		console.log(frame.join(''));

		tick(frame);
	}
}

detonate(thebombs);


