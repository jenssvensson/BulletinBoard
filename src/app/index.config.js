(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .config(config);

  /** @ngInject */
  function config(toastr) {

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }

})();
