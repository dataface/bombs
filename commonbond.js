
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

		for (l in leftForce) {
			frame[leftForce[l]] = '.';

			if (leftForce[l] - 1 <= frame.length) {
				frame[leftForce[l] - 1] = '<';
			}
		}

		for (r in rightForce) {
			frame[rightForce[r]] = '.';

			if (rightForce[r] + 1 < frame.length) {
				frame[rightForce[r] + 1] = '>';
			}
		}

		console.log(frame.join(''));

		tick(frame);
	}
}

detonate(thebombs);


