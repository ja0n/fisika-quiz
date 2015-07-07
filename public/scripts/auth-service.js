;(function(angular) {
  "use strict";

  angular.module("auth.service", []).
  /////////////////////////////////////////////////////////////////////////////
  //! Authentication service
  factory("auth", function($rootScope, $http, $location, logger) {
    var user = sessionStorage.sessionData ? JSON.parse(sessionStorage.sessionData) : null

    function load() {
      if($location.path() == '/login') return null;
      return user ? user : user = sessionStorage.sessionData ? JSON.parse(sessionStorage.sessionData) : goToLogin('Precisa estar logado!')
    }

    // Perform the login.
    function perform_login(user, cb) {
      var url = 'http://'+ location.hostname +':3000/logout', status;

      $http.post(url, user).success(function(data) {
        if (data.success) {
          user = data.user;
          sessionStorage.sessionData = JSON.stringify(data.user);
          status = { msg: 'Logado com sucesso!', data: data };
        } else {
          status = { msg: 'Usuário não encontrado!', err: true };
        }
        $rootScope.$broadcast('user_logged_in', status);
        cb(status);
      }).error(function(data) {
        status = { msg: 'Algum problema aconteceu!', err: true };
        $rootScope.$broadcast('user_logged_in', status);
        cb(status);
      });
    }

    function goToLogin(msg) {
      $location.path('/login');
      //logger.logWarning(msg);
      return null;
    }

    // Perform the logout.
    function perform_logout(cb) {
      // var url = "http://edoo.dev/logout", status;
      var url = 'http://'+ location.hostname +':3000/logout', status;

      $http.get(url).success(function(data) {
        user = null; sessionStorage.removeItem('sessionData');
        status = { msg: 'Deslogado!', success: true };
        $rootScope.$broadcast('user_logged_out', status);
        cb(status);
      }).error(function(data) {
        status = { msg: 'Falha ao deslogar!', err: true };
        $rootScope.$broadcast('user_logged_out', status);
        cb(status);
      });
    }

    return {
      get user () {
        return load();
      },
      login: function(user, cb) {
        perform_login(user, cb);
      },
      logout: function(cb) {
        perform_logout(cb);
      }
    };
  });
}(angular));
