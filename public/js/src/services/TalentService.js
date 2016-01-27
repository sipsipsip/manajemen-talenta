var $ = require('jquery');

var host = '';

var TalentService = {
	loadGroupList: function(){
        return $.ajax({
            method: 'GET',
            url: 'api/v1/talent-group',
            cache: false
        });
	},
    loadArchivedGroupList: function(){
        return $.ajax({
            method: 'GET',
            url: 'api/v1/talent-group/archived',
            cache: false
        });
    },
	createGroup: function(properties){
	    return $.ajax({
	        method: 'POST',
	        data: properties,
	        url: 'api/v1/talent-group',
	        cache: false
	    });
	},
	loadSectionOfGroup: function(group_id){
	    return $.ajax({
	        method: 'GET',
	        url: 'api/v1/talent-group/'+group_id+'/talent-section',
	        cache: false
	    })
	},
	deleteGroup: function(group_id){
	    return $.ajax({
	        method: 'POST',
	        url: 'api/v1/talent-group/'+group_id+'/delete',
	        cache: false
	    });
	},

	duplicateGroup: function(group_id, group_title){
	    return $.ajax({
	        method: 'POST',
	        data: {group_title: group_title},
	        url: 'api/v1/talent-group/'+group_id+'/duplicate',
	        cache: false
	    });
	},

    toggleArchiveGroup: function(group_id){
        return $.ajax({
            method: 'POST',
            url: 'api/v1/talent-group/'+group_id+'/toggle-archive',
            cache: false
        });
    }

}


module.exports = TalentService;