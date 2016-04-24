userApp.controller('UsersController', ['SearchService', function(SearchService) {

  var self = this;

  self.users = [];
  var febCohortUsed = false;
  var message = document.getElementById('searchMessage');

  self.cohort = function() {
    if (!febCohortUsed){
      SearchService.getCohort()
      .then(function(userData){
        userData.forEach(function(member) {
          if (!isAlreadyListed(member.login)) {
            message.textContent = 'Grabbed the whole Feb\'16 cohort!';
            self.users.push(member);
          }
        });
      });
      febCohortUsed = true;
    }
  };

  self.search = function(username) {
    document.getElementById('searchBox').value = '';
    document.getElementById('searchMessage').textContent = '';
    SearchService.getUser(username)
    .then(function(userData){
      var user = document.getElementById(userData.login);
      if (userData.login === undefined) {
        message.textContent = 'Could not find a match';
      }
      else if (isAlreadyListed(userData.login)) {
        user.scrollIntoView(true);
        user.style.border = 'black solid 2px';
      }
      else {
        message.textContent = 'Grabbed ' + userData.login + '!';
        self.users.unshift(userData);
      }
    });
  };

  function isAlreadyListed(newUsername){
    usernameList = [];
    self.users.forEach(function(user) {
      usernameList.push(user.login);
    });
    return usernameList.includes(newUsername);
  }
}]);
