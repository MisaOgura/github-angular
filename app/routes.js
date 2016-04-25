module.exports = function(app) {
  var request = require('request');
  var UserInfo = require('./userInfo.js');
  var fs = require('fs');
  var userinfo = new UserInfo();

  app.get('/', function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.get('/user', function(req, res) {
    var username = req.query.user_name;

    userinfo.requestToGitHub(username)
    .then(function(userData) {
      return res.send(userData);
    }).catch(function(error) {
      return res.send(error);
    });
  });

  app.get('/cohort/feb16', function(req, res) {
    _listCohort('feb16Cohort.txt', function(err, cohort) {
      promises = [];

      cohort.forEach(function(member) {
        // use map to do it without intermidiary array
        promises.push(userinfo.requestToGitHub(member));
      });

      Promise.all(promises)
      .then(function(userData) {
        return res.send(userData);
      }).catch(function(error) {
        return res.send(error);
      });
    });
  });


  function _listCohort(filepath, done) {
    fs.readFile(filepath, function(err, data) {
      if (err) console.log(err);
      cohort = data.toString().split('\n');
      cohort.pop();
      shuffle(cohort);
      // done function: waterfall pattern
      done(null, cohort);
    });
  }

  function shuffle(array) {
    var j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
  }
};
