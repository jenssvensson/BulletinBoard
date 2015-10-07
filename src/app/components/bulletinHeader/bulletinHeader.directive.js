(function() {
  'use strict';
  
  /**
   * Directive for header. Usage: <bulletin-header></bulletin-header>
   */

  angular
    .module('bulletinBoard')
    .directive('bulletinHeader', bulletinHeader);

  /** @ngInject */
  function bulletinHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/bulletinHeader/bulletinHeader.html',
    };

    return directive;
  }

})();
