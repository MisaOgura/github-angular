userApp.controller('UsersController', ['SearchService', function(SearchService) {

  var self = this;

  self.users = [];

  self.cohort = function() {
    SearchService.getCohort()
    .then(function(userData){
      userData.forEach(function(member) {
        self.users.push(member);
      });
    });
  };

  self.search = function(username) {
    SearchService.getUser(username)
    .then(function(userData){
      if (isAlreadyListed(userData.login)) {
        var user = document.getElementById(userData.login);
        user.scrollIntoView(true);
        user.style.border = 'black solid 2px';
      }
      else {
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
