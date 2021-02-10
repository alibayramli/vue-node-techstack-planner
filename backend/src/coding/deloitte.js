// Task 1

// -- write your code in SQLite 3.11.0
// Erol
// SELECT task_id, name,
// case
//     when avg(score) > 60 then 'Easy'
//     when avg(score) <= 60 and avg(score) > 20 then 'Medium'
//     else 'Hard'
// end as 'Difficulty'
// from tasks, reports where
// tasks.id
//  = reports.task_id group by task_id having count(score) >= 1;

// Me
// SELECT task_id, name,
// CASE
// WHEN AVG(score) > 60 THEN 'Easy'
// WHEN AVG(score) > 20 AND AVG(score) <= 60 THEN 'Medium'
// ELSE 'Hard'
// END AS task_level
// FROM tasks, reports
// WHERE tasks.id = reports.task_id
// GROUP BY task_id
// HAVING count(score) >= 1;

// Task 2

// Erol
// const tables = document.getElementsByTagName('table');
// let maxTdCount = 0;
// Array.from(tables).forEach((table) => {
// 	maxTdCount = Math.max(table.getElementsByTagName('td').length, maxTdCount);
// });
// console.log(maxTdCount);

// Me
// function solution() {
//     const tables = document.querySelectorAll('table');
//     const tdsCountArray = [];
//     [...tables].forEach(table => {
//         tdsCountArray.push(table.querySelectorAll('td').length)
//     });
//     return Math.max(...tdsCountArray);
// }

// Task 3

// Erol
// class Solution {
//     public int solution(int[] ranks) {
//         // write your code in Java SE 8
//         int total = 0;
//         Set<Integer> privateRanks =  new HashSet<Integer>();
//         for (int i = 0; i< ranks.length; i++) {
//             privateRanks.add(ranks[i]);
//         }
//         for(int j = 0; j < ranks.length; j++){
//             if(privateRanks.contains(ranks[j]+1)){
//                 total++;
//             }
//         }
//         return total;
//     }
// }

// Me
// import java.util.*;
// class Solution {
//     public int solution(int[] ranks) {
//         int reportCount = 0;
//         Set<Integer> uniqueRanks = new HashSet<Integer>();
//         for(int rank : ranks){
//             uniqueRanks.add(rank);
//         }
//         for(int rank : ranks){
//             reportCount += uniqueRanks.contains(rank + 1) ? 1 : 0;
//         }
//         return reportCount;
//     }
// }

// Task 4

// Erol
// class Solution {
//     public int solution(int A, int B) {
//         // write your code in Java SE 8
//         int C = (A+B)/4;
//         if(C == 0) {
//             return 0;
//         }
//         int total = A/C + B/C;
//         return total == 4 ? C : C-1;
//     }
// }

// Me
// class Solution {
//     public int solution(int A, int B) {
//         int possible = Math.max(A, B) / 4;
//         while (A / (possible + 1) + B / (possible + 1) >= 4) {
//             possible++;
//         }
//         return possible;
//     }
// }