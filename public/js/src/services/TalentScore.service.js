var $ = require('jquery');

var host = '';

var TalentScore = {
	create: function(talent){
		return $.ajax({
			method: 'POST',
			cache: false,
			url: 'api/v1/talent-score',
			data: talent
		});
	},
	get: function(id){
		return $.ajax({
			method: 'GET',
			cache: false,
			url: 'api/v1/talent-score/'+id
		});
	},
	update: function(talent){
		// TODO
	},
	delete: function(talent){
		return $.ajax({
			method: 'post',
			cache: false,
			url: 'api/v1/talent-score/'+id+'/delete'
		});
	}
}


module.exports = TalentScore;