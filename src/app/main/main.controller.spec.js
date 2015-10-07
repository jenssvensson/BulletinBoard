(function() {
  'use strict';

  describe('controllers', function(){

    var $controller;
  	
    beforeEach(module('bulletinBoard'));

    beforeEach(inject(function(_$controller_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));

    it('should set some default values', inject(function($controller) {
      var vm = $controller('MainController');
      
      expect(vm.storyAmount).toEqual(10);
      expect(vm.filterSetting).toEqual('score');
    }));
    
  });
})();
