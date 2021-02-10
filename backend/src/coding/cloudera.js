// function minimizeBias(ratings) {
// 	// array sort is in-place, no need to create another array for this task
// 	ratings.sort((a, b) => a - b);
// 	const closeElements = [];
// 	for (let idx = 0; idx < ratings.length; idx += 2) {
// 		const chunk = ratings.slice(idx, idx + 2);
// 		closeElements.push(chunk);
// 	}
// 	const diffOfCloseElements = closeElements.map(element => element[1] - element[0]);
// 	const sum = diffOfCloseElements.reduce((acc, val) => acc + val, 0);
// 	return sum;
// }
// function minimizeBias(ratings) {
// 	ratings.sort((a, b) => a - b);
// 	const pairs = [];
// 	for (let i = 0; i < ratings.length; i += 2) {
// 		const pair = [ratings[i], ratings[i + 1]];
// 		pairs.push(pair);
// 	}
// 	// First get the diff value of the pairs then sum all of the diff values.
// 	return pairs.map(pair => pair[1] - pair[0]).reduce((acc, val) => acc + val);
// }

// console.log(minimizeBias([4, 2, 5, 1]));

// function itemsSort(items) {
// 	const map = items.reduce(
// 		(acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
// 		new Map(),
// 	);
// 	const arr = [];
// 	const sortedElements = [ ...map ].sort((a, b) => {
// 		if (a[1] === b[1]) {
// 			return a[0] - b[0];
// 		}
// 		return a[1] - b[1];
// 	});
// 	sortedElements.forEach((el) => {
// 		let index = el[1];
// 		while (index !== 0) {
// 			arr.push(el[0]);
// 			index--;
// 		}
// 	});
// 	return arr;
// }

// function itemsSort(items) {
// 	const obj = {};
// 	const arr = [];
// 	for (const el of items) {
// 		obj[el] = (obj[el] || 0) + 1;
// 	}
// 	const sortedElements = Object.entries(obj).sort((a, b) => a[1] === b[1] ? (a[0] - b[0]) : (a[1] - b[1]));
// 	for (let i = 0; i < sortedElements.length; i++) {
// 		while (sortedElements[i][1] !== 0) {
// 			arr.push(sortedElements[i][0]);
// 			sortedElements[i][1]--;
// 		}
// 	}
// 	return arr;
// }
// console.log(itemsSort([8, 7, 5, 5, 5, 1, 1, 1, 4, 4]));