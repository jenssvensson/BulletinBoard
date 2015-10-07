(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, hackerNews, toastr, $q) {
    var vm = this;

    /**
     * Exposing functions for the view
     */
    vm.loadStories = loadStories;
    vm.setFilter = setFilter;
    
    /**
     * Data holders and flags
     */
    vm.displayStories = null;
    vm.storyAmount = 10;
    vm.loading = false;
    vm.filterSetting = 'score';
    vm.error = true;
    
    /**
     * Load all the stories on init.
     */
    loadStories();
    
    /**
     * Function that gets top stories list from API. 
     */
    function loadStories() {
    	
    	vm.error = false;
    	vm.loading = true;
    	vm.filterSetting = 'score';
    	vm.displayStories = null;
    	
			hackerNews.getTopStories().then(function (data){
				var stories = getRandomStories(vm.storyAmount, data);
				getStoriesInfo(stories);
			}, function () {
	    	vm.error = true;
	    	vm.loading = false;
				toastr.error('Failed to load top stories list from API', 'Error');
			});
		}
    
    /**
     * Function that get specific info about a number of stories
     */
    function getStoriesInfo(stories){
    	
    	var apiCalls = [];
    	
    	for (var key in stories) {
    		apiCalls.push(hackerNews.getStoryInfo(key));
    	}
    	
    	$q.all(apiCalls).then(function (results){
    		for (var int = 0; int < results.length; int++) {
    			
    			if (results[int] === 'error') {
    	    	vm.error = true;
    	    	vm.loading = false;
    				toastr.error('Failed to load story info from API' , 'Error');
    				return;
					}
					stories[results[int].id] = results[int];
				}
    		
    		getAuthorsInfo(stories);
    	});
    }
    
    /**
     * Function that gets author info for the stories.
     */
    function getAuthorsInfo(stories){
    	var apiCalls = [];
    	
    	for (var key in stories) {
    		apiCalls.push(hackerNews.getAuthorInfo(stories[key].by));
    	}
    	
    	$q.all(apiCalls).then(function (results){
    		
    		var keys = Object.keys(stories);
      	
    		for (var int = 0; int < results.length; int++) {
    			
    			if (results[int] === 'error') {
    	    	vm.error = true;
    	    	vm.loading = false;
    				toastr.error('Failed to author info from API' , 'Error');
    				return;
					}
					stories[keys[int]].by = results[int];
				}
    		
    		vm.displayStories = stories;
    		vm.loading = false;
    	});
    	
    }
    
    /**
     * Pick a number of random stories from collection.
     */
		function getRandomStories(count, stories){
			
			var randomStories = {};
			var int = 0;
			
			while (int < count) {
				var story = stories[Math.floor(Math.random() * stories.length)];
				
				if (randomStories[story] === undefined) {
					randomStories[story] = {};
					int++;
				}
			}
			
			return randomStories;
		}
		
		function setFilter(filter) {
			vm.filterSetting = filter;
		}
  }
})();
