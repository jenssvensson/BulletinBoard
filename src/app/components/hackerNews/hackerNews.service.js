(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .service('hackerNews', hackerNews);

  /** @ngInject */
  function hackerNews(Restangular) {
  	
  	var service = {
  			getTopStories: getTopStories, 
  			getAuthorInfo: getAuthorInfo,
  			getStoryInfo: getStoryInfo,
  	};
  	
  	return service;
		  
		function getTopStories() {
			var promise = Restangular.all('topstories').getList();
			
			return promise.then(function(response){
				return response.plain();
			}, function() {
				// Add toaster message here
				return 'error';
			});
		}
		
		function getStoryInfo(id) {
			var promise = Restangular.one('item', id).get();
			
			return promise.then(function(response){
				return response.plain();
			}, function (){
				return 'error';
			});
		}
		
		function getAuthorInfo(username) {
			var promise = Restangular.one('user', username).get();
			
			return promise.then(function(response){
				return response.plain();
			}, function (){
				return 'error';
			});
		}
  }

})();