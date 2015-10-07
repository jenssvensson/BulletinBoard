(function() {
  'use strict';

  describe('object to array filter', function(){
  	
    var $filter;
    
    beforeEach(module('bulletinBoard'));

    beforeEach(inject(function(_$filter_){
      $filter = _$filter_;
    }));

    it('should convert object to array', inject(function($controller) {
      
    	var filter = $filter('objectToArray');
    	var input = {first: 'first', second: 'second'};
      
      expect(filter(input)).toEqual(['first', 'second']);
    }));
    
    it('should return everyting but object as it is', inject(function($controller) {
      
    	var filter = $filter('objectToArray');
      
      expect(filter(null)).toEqual(null);
      expect(filter(true)).toEqual(true);
      expect(filter([1,2])).toEqual([1,2]);
      expect(filter('string')).toEqual('string');
      expect(filter(3)).toEqual(3);
    }));
  });
})();