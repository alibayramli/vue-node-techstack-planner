// function solution(A) {
// 	if (A.includes(0)) {
// 		return 0;
// 	}
// 	let minusSign = 0;
// 	A.forEach((element) => {
// 		if (element < 0) {
// 			minusSign++;
// 		}
// 	});
// 	return minusSign % 2 === 0 ? 1 : -1;
// }
// function solution(S) {
// 	const arr = [];
// 	let cnt = 0;
// 	for (let i = 0; i < 26; i++) {
// 		arr[i] = 0;
// 	}
// 	for (let i = 0; i < S.length; i++) {
// 		const index = S[i].charCodeAt(0) - 97;
// 		arr[index]++;
// 	}
// 	arr.sort((a, b) => b - a);
// 	for (let i = 1; i < arr.length; i++) {
// 		while (arr[i] && arr[i] >= arr[i - 1]) {
// 			arr[i]--;
// 			cnt++;
// 		}
// 	}
// 	return cnt;
// }
// console.log(solution('ccaaffddecee'));

// eslint-disable-next-line complexity
// function solution(S, T) {
// 	if (S === T) {
// 		return 'NOTHING';
// 	}
// 	if (S.length === T.length + 1) {
// 		for (let i = 0; i < S.length; i++) {
// 			if (S[i] !== T[i]) {
// 				if (S[i] === S[i - 1]) {
// 					return 'JOIN ' + S[i];
// 				}
// 			}
// 		}
// 	}
// 	if (S.length === T.length) {
// 		let cnt = 0;
// 		const swappedElements = [];
// 		for (let i = 0; i < S.length; i++) {
// 			if (S[i] !== T[i] && S.indexOf(T[i]) >= 0) {
// 				cnt++;
// 				swappedElements.push(S[i]);
// 			}
// 		}
// 		if (cnt === 2) {
// 			return `SWAP ${swappedElements[0]} ${swappedElements[1]}`;
// 		}
// 	}
// 	for (let i = 0; i < S.length; i++) {
// 		if (S[i] === T[i]) {
// 			if (i === S.length - 1 && T[i + 1]) {
// 				return `add ${T[i + 1]}`;
// 			}
// 		}
// 	}
// 	return 'IMPOSSIBLE';
// }
// console.log(solution('tale', 'late'));