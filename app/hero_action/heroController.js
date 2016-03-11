var HeroController;

HeroController = (function(){
	function HeroController(Restangular, $scope,$http){
	this.superhero1Selected = null;
	this.superhero2Selected = null;
	this.superheroList = null;
	this.superheroForm = {gender:"Male"};
	this.errorCondition=false;
	this.showConfirm=false;
	this.title = "my title";

	_this = this;

	this.listError = false;

	this.save = function(value){
		_this.showConfirm = false;
		_this.errorCondition = false;
		_this.getKey("save");
	}

	this.list = function(){
		_this.showConfirm = false;
		_this.errorCondition = false;
		_this.getKey("list");	
	}

	this.getKey = function(action){
		Restangular.all("getApiKey").customGET("").then(function(apikeys){
		  var apikey = apikeys.apiKey;
		  
		  if(action === "save"){
		  	_this.saveHero(apikey);
		  }else{
		  	_this.getHeros(apikey);
		  }
		  
		});
	}

	//populate super hero list
	this.list();

//sample hero:
	/*{
    "id": 1,
    "hero_name": "Batman",
    "real_name": "Bruce Wayne",
    "gender": "Male",
    "attributes": {
      "intelligence": 100,
      "strength": 17,
      "speed": 27,
      "durability": 50,
      "power": 46,
      "combat": 100
    },
    "powers": [
      "Martial Arts",
      "Weapons",
      "Super Intelligence"
    ],
    "weaknesses": [
      "Mortal"
    ]
  }*/


	this.saveHero = function(apikey){
		console.log("made it to the save hero method :)");
		var submitHero = angular.copy(_this.superheroForm);
		if(_this.superhero1Selected != null){
			submitHero.weaknesses = [];
			angular.extend(submitHero.weaknesses, _this.superhero1Selected.weaknesses, _this.superhero2Selected.weaknesses);
		}else{
			submitHero.powers = submitHero.powers.split(";");
			submitHero.weaknesses = submitHero.weaknesses.split(";");
		}
		Restangular.service(apikey+"/heroes").post(submitHero).then(function() {
		  _this.showConfirm=true;
		  _this.superheroForm = {gender:"Male"};
		  _this.superhero1Selected = null;
		  _this.superhero2Selected = null;
		}, function(response) {
		  console.log("Error with status code", response.status);
		  _this.errorCondition=true;
		});

	}
	this.getHeros = function(apikey){
		//https://hero-merge.herokuapp.com/2d452517/heroes
		_this.superheroList = Restangular.all(apikey+"/heroes").getList().$object;
	}

	$scope.$watch('c.superheroForm.powers.length', function(length) {     
		if(_this.superhero1Selected != null){   
	    	var valid = length <= 5;
	    	$scope.superheroForm.powers = $scope.c.superheroForm.powers;
	    	$scope.superheroForm.$setValidity("max5", valid);
	    }
	});
}
return HeroController;

})();

angular.module('myApp').controller('HeroController', ['Restangular', '$scope','$http', HeroController]);