userApp.service('SearchService', ['$http', function($http) {

  this.getCohort = function() {
    return $http
                .get('/cohort/feb16')
                .then(function(response) {
                  return response.data;
                });
  };

  this.getUser = function(username) {
    return $http({
                  url: "/user",
                  method: 'GET',
                  params: {user_name: username}
                })
                .then(function(response) {
                  return response.data;
                });
  };
}]);
