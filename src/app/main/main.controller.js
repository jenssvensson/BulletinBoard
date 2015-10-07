(function() {
  'use strict';

  angular
    .module('bulletinBoard')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, hackerNews, toastr, $q) {
    var vm = this;

    vm.loadStories = loadStories;
    vm.setFilter = setFilter;
    vm.displayStories = null;
    vm.storyAmount = 10;
    vm.loading = false;
    vm.filterSetting = 'score';
    
    loadStories();
    
    function loadStories() {
    	// Add loading and things
    	vm.loading = true;
    	vm.displayStories = null;
			hackerNews.getTopStories().then(function (data){
				var stories = getRandomStories(vm.storyAmount, data);
				getStoriesInfo(stories);
			}, function () {
				toastr.error('Failed to load top stories list from API', 'Error');
			});
		}
    
    function getStoriesInfo(stories){
    	
    	var apiCalls = [];
    	
    	for (var key in stories) {
    		apiCalls.push(hackerNews.getStoryInfo(key));
    	}
    	
    	$q.all(apiCalls).then(function (results){
    		for (var int = 0; int < results.length; int++) {
    			if (results[int] === 'error') {
    				toastr.error('Failed to load story info from API' , 'Error');
    				return;
					}
					stories[results[int].id] = results[int];
				}
    		getAuthorsInfo(stories);
    	});
    	
    }
    
    function getAuthorsInfo(stories){
    	var apiCalls = [];
    	
    	for (var key in stories) {
    		apiCalls.push(hackerNews.getAuthorInfo(stories[key].by));
    	}
    	
    	$q.all(apiCalls).then(function (results){
    		
    		var keys = Object.keys(stories);
      	
    		for (var int = 0; int < results.length; int++) {
    			// Intercept error and send message to user
    			if (results[int] === 'error') {
    				toastr.error('Failed to author info from API' , 'Error');
    				return;
					}
					stories[keys[int]].by = results[int];
				}
    		
    		// Add the data to model
    		vm.displayStories = stories;
    		vm.loading = false;
    	});
    	
    }
    
		function getRandomStories(count, stories){
			
			var randomStories = {};
			
			var int = 0;
			while (int < count) {
				var story = stories[Math.floor(Math.random() * stories.length)];
				if (randomStories[story] === undefined) {
					randomStories[story] = {}; //place holder with blank data
					int++;
				}
			}
			return randomStories;
		}
		
		function setFilter(filter) {
			vm.filterSetting = filter;
		}
    
    /* vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1443715949751;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
    */
  }
})();
