var $ = require('jquery');


var UserService = {

	getTalentData: function(user_nip){
		return $.ajax({
			method: 'GET',
			cache: false,
			url: 'api/v1/pegawai/'+user_nip+'/talent-data'
		});
	}
}

module.exports = UserService;