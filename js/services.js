main.factory('Config', function($timeout, $http) {

	
	var data = null;
	
	jQuery.ajax({
        url: '/config.json',
        success: function (result) {
           data =  result;
        },
        error : function(){
        	console.log("error");
        },
        async: false
    });
	
	return data;
	
});
