var HeroController;

HeroController = (function(){
	function HeroController(Restangular, $scope,$http){
	this.superhero1Selected = null;
	this.superhero2Selected = null;
	this.superheroForm = {gender:"Male"};
	this.errorCondition=false;
	this.showConfirm=false;
	this.title = "my title";

	_this = this;



	this.superheroList = null;
	this.listError = false;

	this.save = function(value){
		_this.showConfirm = false;
		_this.errorCondition = false;
		_this.getKey("save");
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
		submitHero.powers = submitHero.powers.split(";");
		submitHero.weaknesses = submitHero.weaknesses.split(";");
		Restangular.service(apikey+"/heroes").post(submitHero).then(function() {
		  console.log("All ok");
		  _this.showConfirm=true;
		  _this.superheroForm = {gender:"Male"};
		}, function(response) {
		  console.log("Error with status code", response.status);
		  _this.errorCondition=true;
		});

	}
	this.getHeros = function(apikey){
		console.log("made it to the getHeros method :)");
		https://hero-merge.herokuapp.com/2d452517/heroes
		_this.superheroList = Restangular.all(apikey+"/heroes").getList();
	}

}
return HeroController;

})();

angular.module('myApp').controller('HeroController', ['Restangular', '$scope','$http', HeroController]);