var $ = require('jquery');

var host = '';

var TalentService = {
	create: function(talent){
		$.ajax({
			method: 'POST',
			cache: false,
			url: 'api/v1/talent-score'
		})
	},
	get: function(){

	},
	update: function(talent){

	},
	delete: function(talent){

	}
}


module.exports = TalentService;