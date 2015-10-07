(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular) {
	
		// Global config for the base url and suffix of the endpoint.
		Restangular.setBaseUrl('https://hacker-news.firebaseio.com/v0/');
		Restangular.setRequestSuffix('.json');
  }

})();
