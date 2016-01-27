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
		return $.ajax({
		    method: 'POST',
		    cache: false,
		    data: talent,
		    url: 'api/v1/talent-score/'+talent.nip+'/update'
		});
	},
	delete: function(nip,section_id){
		return $.ajax({
			method: 'post',
			cache: false,
			data: {section_id: section_id},
			url: 'api/v1/talent-score/'+nip+'/delete'
		});
	}
}


module.exports = TalentScore;