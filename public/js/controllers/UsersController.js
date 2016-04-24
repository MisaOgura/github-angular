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
      self.users.unshift(userData);
    });
  };
}]);
