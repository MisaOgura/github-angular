var fs = require('fs');

console.log('runing?');

fs.readFile('feb16Cohort.txt', function(err, cohort) {
  if (err) console.log(err);
  cohortList = cohort.toString().split('\n');
  cohortList.pop();
  console.log(cohortList);
});


function listCohort() {
  fs.readFile('feb16Cohort.txt', function(err, cohort) {
    if (err) console.log(err);
    cohort = cohort.toString().split('\n');
    cohort.pop();
    return cohort;
  });
}
