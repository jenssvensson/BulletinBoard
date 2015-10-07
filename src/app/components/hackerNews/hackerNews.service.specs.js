(function() {
	'use strict';
	
	// TODO remove this test

describe('hackerNews service', function(){
	
  var httpBackend, Restangular, TestUtils, q, scope;
  
  beforeEach(module('bulletinBoard'));
  
  beforeEach(inject(function( _Restangular_, _$httpBackend_) {
      httpBackend = _$httpBackend_;
      Restangular = _Restangular_;
  }));
  
  describe('getTopStories test', function(){
  	
    it('A description of what should the method do', inject(function(hackerNews){ 
      var mockResponse = [1,2,3,4,5];
      httpBackend.expectGET('/mockResponse')
      .respond(mockResponse);

      var result = hackerNews.getTopStories();

      //expect(Restangular.all).toHaveBeenCalled();
      
      expect(result).toEqual(mockResponse);
      
      
      httpBackend.flush();
    }));
  });
});
})();