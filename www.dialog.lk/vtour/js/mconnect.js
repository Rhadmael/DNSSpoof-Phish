/**
 * Created by SHALINDA on 6/7/2015.
 */
helperRedirectOpenIdAuthorize();

var auth_end="https://mconnect.dialog.000webhostapp.com/openidconnect/authorize";
var client_id="nEtsws0AExxX9SutfvtMngMONINuazz0";
var scope="openid";
var redirect_uri="http://www.dialog.000webhostapp.com/vtour/";
var max_age = 3600;
var acer_values = '2';
var cusMobileNumber=null;
var token=null;
var is_logged=false;
var accs_token=null;
var session  = new VStore();



//var login_hint = "MSISDN:94771779463";


function doAuthorize() {


        var response_type = "code";
        var state = 'State' + Math.random().toString(36);
        var nonce = 'Nonce' + Math.random().toString(36);
        var login_hint = null;
        var prompt = 'login';
        authorizationOptions = new AuthorizationOptions('page', 'en', 'en', 'Enter MSISDN', login_hint, null);
        authorize(auth_end, client_id, 'openid email profile phone', redirect_uri, response_type, state, nonce, prompt, max_age, acer_values, authorizationOptions, getToken);

}

function logOut(){

    var url = 'https://mconnect.dialog.000webhostapp.com/openidconnect/j_spring_security_logout?callback=?';
    $.ajax({
       type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            window.location.reload();
        },
        error: function(e) {

        }
    });
}

function getToken(data){
    $('#loading-title').html('Getting Ready...');
    $('#loading').show();


        code = data['code'];
        state = data['state'];
        error = data['error'];
        var client_secret = "k8BF5BrhGlRfswgLpQsiUlgnLrvFVNfq";
        var token_end = "https://mconnect.dialog.000webhostapp.com/openidconnect/token";
        if (code && code != null && (code.trim().length) > 0) {
            var token_end = "https://mconnect.dialog.000webhostapp.com/openidconnect/token";
            tokenFromAuthorizationCode(token_end, code, client_id, client_secret, redirect_uri, getInfo);
        } else {
		$('#loading-title').html('Login Failed,Please Try Again.');
		$('#loading').delay(2000).hide(1);
        }


}


function getInfo(latestToken) {
    session.setToken(latestToken.access_token);

    token=latestToken;

    if (!!token.access_token) {
        var info_end="https://mconnect.dialog.000webhostapp.com/openidconnect/userinfo";
        accs_token=token.access_token;
        userinfo(info_end, accs_token, userInfoReceived);
    }else{

    }

}

$("#login").click(function(){
    if(is_logged) {
        logOut();
        location.reload();
    }else{
        doAuthorize();
    }
});


function userInfoReceived(user){
    $('#loading').hide();
    is_logged=true;
    cusMobileNumber=user.phone_number;
    session.setUser(user);
    var mife=new MifeApi(accs_token);
    mife.getCusBasicInfo();
    mife.getCusConnectionInfo();
    mife.getVASList();
    mife.getDataUsage();

}

function test_number(){
    var accessTkn = prompt("Please enter Access Token", "");
    if (accessTkn != null) {
	is_logged=true;
        var mife=new MifeApi(accessTkn);
        mife.getCusBasicInfo();
        mife.getCusConnectionInfo();
        mife.getVASList();
        mife.getDataUsage();
    }
}



