(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .directive('header', header);

  /** @ngInject */
  function header() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/header/header.html',
    };

    return directive;
  }

})();
