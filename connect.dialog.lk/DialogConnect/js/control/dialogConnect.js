(function(){

	DLGlogin = function(applicationId){
		window.location="https://connect.dialog.lk/DialogConnect/ConnectLogin?appId="+applicationId;
	};

	DLGlogout = function(appId,successCallback){
		var URL = "https://connect.dialog.lk/DialogConnect/AppUserLogout";
		document.cookie = "dialog_"+appId+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		
		$.ajax({
			type : "POST",				
			url : URL,
			data : {appId:appId},
			dataType: "jsonp"
        });
		
		setTimeout(function(){
			successCallback("success");
		},6000);
		
	};
	
	Selflogout = function(){
		var URL = "https://connect.dialog.lk/DialogConnect/AppUserLogout";
	   
	   $.ajax(URL, {
			type : 'POST',				
			url : URL,
			dataType : 'jsonp',
			async: false,
			cache: false
		});
	};
	
})();
