userApp.controller('UsersController', ['SearchService', function(SearchService) {

  var self = this;

  self.users = [misa,nick,shane,simon];

  self.cohort = function() {
    SearchService.getCohort();
  };

  self.search = function(username) {
    SearchService.getUser(username)
    .then(function(userData){
    return self.users.push(userData);
    });
  };
}]);
