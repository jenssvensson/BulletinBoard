(function() {
  'use strict';

  /**
   * Service that handles getting data from Server.
   */
  
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
		
  	/**
  	 * Function that calls "/topstories". 
  	 * Base url and suffix is set globally elsewhere. 
  	 */
		function getTopStories() {
			var promise = Restangular.all('topstories').getList();
			
			return promise.then(function(response){
				return response.plain();
			}, function() {
				return 'error';
			});
		}
		
  	/**
  	 * Function that calls "/item/<id>" 
  	 * Base url and suffix is set globally elsewhere.
  	 */
		function getStoryInfo(id) {
			var promise = Restangular.one('item', id).get();
			
			return promise.then(function(response){
				return response.plain();
			}, function (){
				return 'error';
			});
		}
		
  	/**
  	 * Function that calls "/user/<username>".
  	 * Base url and suffix is set globally elsewhere.
  	 */
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