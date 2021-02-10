// function showAllMonthsWithSpecificCharacteristics(startYear, endYear) {
// 	// 1st step: find months of the year for the specifics
// 	// push this to the array
// 	const returnCorrectMonth = [];
// 	for (let i = startYear; i <= endYear; i++) {
// 		for (let month = 0; month < 12; month++) {
// 			const date = new Date(i, month);
// 			const monthWith31Days = [0, 2, 4, 6, 7, 9, 11];
// 			if (date.getDay() === 5 && monthWith31Days.includes(month)) {
// 				returnCorrectMonth.push([i, month]);
// 			}
// 		}
// 	}
// 	return returnCorrectMonth;
// 	// return the array
// }
// console.log(showAllMonthsWithSpecificCharacteristics(2000, 2010));