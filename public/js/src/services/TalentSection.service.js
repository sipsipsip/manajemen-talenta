var $ = require('jquery');


var TalentSection = {

	create: function(){},
	get: function(){},
	update: function(){},
	delete: function(){},
	getTalentScoreList: function(section_id){
		$.ajax({
			method: 'GET',
			cache: false,
			url: 'api/v1/talent-section/'+section_id+'/talent-score'
		});
	}
}

module.exports = TalentSection;