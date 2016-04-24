module.exports = function(app) {
  var request = require('request');
  var UserInfo = require('./userInfo.js');
  var CohortInfo = require('./cohortInfo.js');

  app.get('/', function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  app.get('/user', function(req, res) {
    var username = req.query.user_name;
    var userinfo = new UserInfo();

    userinfo.requestToGitHub(username)
    .then(function(userData) {
      return res.send(userData);
    }).catch(function(error) {
      return res.send(error);
    });
  });

  app.get('/cohort/feb16', function(req, res) {
    var cohortinfo = new CohortInfo();

    cohortinfo.requestToGitHub()
    .then(function(userData) {
      return res.send(userData);
    }).catch(function(error) {
      return res.send(error);
    });
  });
};
