(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .filter('objectToArray', objectToArray);

  /** @ngInject */
  function objectToArray() {
    return function(input) {
    	if (typeof input !== 'object' || Array.isArray(input) || input === null) {
				return input;
			}
      var out = []; 
      for(var key in input){
        out.push(input[key]);
      }
      return out;
    };
  }
})();