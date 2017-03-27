var is_muted=false;
var bg_mute=false;
var vformat=null;
var loadinTip=null;

$(document).ready(function () {

    var classAddCount = 0;
    var addedMobiles = [];
    var classAdd = 'active-box';//CSS selected class
    var img_path = "images/mobiles/";
    var acc_img_path = "images/accessory/";
    var mobileArg = null;
    var accesoryArg = null;


    $(function(){
   //Bring The container center
    var container=$('.wrapper');	 
        var viewHeight=$( window ).height();
        var containerHeight=$(container).height();
        var topMargin=(viewHeight-containerHeight)/3;
        $('.wrapper').css({'margin-top' : topMargin});
	
    });
    $(function(){
    //Detect User Agent
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || ua.search("Safari") >= 0 && ua.search("Chrome") < 0){
          $('#alert-msg').html("Using Google Chrome or Firefox Browser will give you a better experience.");
        $('#alert').modal('show');
    }
    });


    getMobilesToCompare();
    getAccessories();

    $('.side-menu').addClass('none-sidemenu');
    //Get all the mobiles for compare
    function getMobilesToCompare() {jQuery.ajax({
            url: "db/db_queries.php",
            data: {"action": "Allmobiles"},
            type: 'GET',

            success: function (data) {
                var mobileList = $.parseJSON(data);
//                console.debug(mobileList);
                mobileArg = [mobileList];

                var divs = '';
                $.each(mobileList, function (key, mobile) {
                    divs += "<div class='col-sm-3 text-center hoverbox '><h4 class='text-center'>" + mobile.name + "</h4><img src='" + img_path + mobile.thumb + "' class='img-responsive mobile' data-id='" + mobile.id + "'><h4 class='text-center purple'>Rs." + mobile.price + "</h4> <div class='col-sm-12 text-center'> <button type='button' class='btn btn-info text-center mobile-spec-btn'  data-id='" + mobile.id + "'>Read More</button> </div></div>";
                })
                $('#mobile-display').append(divs);


                $(document).on('click', '.mobile', function () {
                    if ($(this).hasClass(classAdd)) {
                        classAddCount--;
                        //Removes selected mobiles from array
                        function removeMobile(array, item) {
                            for (var i in array) {
                                if (array[i] == item) {
                                    array.splice(i, 1);
                                    break;
                                }
                            }
                        }

                        removeMobile(addedMobiles, $(this).data('id'));

                        $('#compare-btn').attr('disabled', 'disabled');
                        $(this).removeClass(classAdd);
                    } else {
                        if (classAddCount < 2) {
                            classAddCount++;
                            addedMobiles.push($(this).data('id'));

                            $(this).addClass(classAdd);
                            if (classAddCount == 2) {
                                $('#compare-btn').prop("disabled", false);
                            }
                        }
                    }
                });

                //Gets Read more content
                $(document).on('click', '.mobile-spec-btn', function () {
                    $('#phone-list').css('display', 'none');
                    var select_mobile = $(this).data('id');
                    set_mobilespec(select_mobile);

                });
            },
            error: function (err) {
                console.log(err.message);
            }
        });
    }

    $(function () {
       //Gets Custom mesaages to display
           var data = doAjax({"action": "Custommsg"});
      $('#custom-msg').attr('data-content',data[0]['message']);

    });


    if (typeof Modernizr.video.webm !== 'undefined' && Modernizr.video.webm == 'probably') {
        vformat='webm';
    } else {
        vformat='mp4';
    }

    function getAccessories() {

        jQuery.ajax({
            url: "db/db_queries.php",
            data: {"action": "Allaccessory"},
            type: 'GET',

            success: function (data) {
                var accessoryList = $.parseJSON(data);
                accesoryArg = [accessoryList];
                //  console.debug(accesoryArg);

                var divs = '';
                var i=0;
                $.each(accessoryList, function (key, accessory) {

                    divs += "<div class='col-sm-2 text-center hoverbox '><h4 class='text-center'>" + accessory.name + "</h4><img src='" + acc_img_path + accessory.thumb + "' class='img-responsive accessory' data-id='" + accessory.id + "'><button type='button' class='btn btn-info text-center accessory-spec-btn'  data-id='" + accessory.id + "'>Read More</button> </div></div>";
                })
                $('#accessory-display').append(divs);




                //Gets Read more content
                $(document).on('click', '.accessory-spec-btn', function () {
                    $('#accessory-list').css('display', 'none');
                    var select_accessory = $(this).data('id');
                    set_accessoryspec(select_accessory);

                });
            },
            error: function (err) {
                console.log(err.message);
            }
        });
    }

    $('#back-phonelist').click(function () {
        $('#phone-spec').css('display', 'none');
        $('#phone-list').css('display', 'block');
    });

    $('#back-accessorylist').click(function () {
        $('#accessory-spec').css('display', 'none');
        $('#accessory-list').css('display', 'block');
        $('#accessory-list').css('display', 'block');
    });

    $.getJSON( "js/tips.loading.json",function(data){
        loadinTip=data;});


    $('.back-to-list').click(function () {

        $('#mobile-compare').css('display', 'none');
        $('#phone-list').css('display', 'block');
    });

    $('#compare-btn').click(function () {
        $('#compare-btn').attr('disabled', 'disabled');
        $('#compare-list div').remove();
        $('#phone-list').css('display', 'none');
        $('#mobile-compare').css('display', 'block');

        var divs = "";

        $.each(addedMobiles, function (index, mobile_id) {

            var mobiles = mobileArg[0];
            var mobile = null;
            for (var i in mobiles) {
                if (mobiles[i]['id'] == mobile_id) {
                    mobile = mobiles[i];
                    break;

                }
            }


            var highligts = JSON.parse(mobile['highlights']);
            var li = '';
            $.each(highligts, function (index, value) {
                li += "<li>" + value + "</li>";
            });

            var device_dtls = JSON.parse(mobile['device_dtls']);
            var li_dtl = '';

            $.each(device_dtls, function (feature, value) {
                li_dtl += "<label>" + feature + "</label><p>" + value + "</p>";
            });

            divs += "<div class='col-xs-6'><div class='col-sm-12 text-center black'>" +
            "<h4>" + mobile['name'] + "</h4><hr/></div>" +
            "<div class='col-sm-12 black'><img class='img-responsive mobile-comp' src='images/mobiles/" + mobile['thumb'] + "'></div>" +
            "<h5>Device Details</h5>" +
            "<h5>Highlights</h5>" +
            "<ul>" + li + "</ul><ul>" + li_dtl + "</ul> " +
            "<h3>Rs." + mobile['price'] + "<h3>" +
            "</div>";


        });
        classAddCount=0;
        addedMobiles=[];
        $('.mobile').removeClass(classAdd);

        $('#compare-list').append(divs);



    });

    //Display Accessory Spec
    function set_accessoryspec(select_accessory) {
        var accessories = accesoryArg[0];
        var accessory = null;
        $('#accessory-highlight li').remove();
        for (var i in accessories) {
            if (accessories[i]['id'] == select_accessory) {
                accessory = accessories[i];
                select_accessory=null;
                break;
            }
        }

        $('#accessory-spec').css('display', 'block');
        $('#accessory-name').html(accessory['name']);
        $('#accessory-price').html("Rs." + accessory['price']);
        $('#accessory-desc').html(accessory['description']);

        highligts = JSON.parse(accessory['highlights']);

        var li ='';
        $.each(highligts, function (index, value) {
            li += "<li>" + value + "</li>";
        });
        $('#accessory-highlight').append(li);

        $('#accessory-image').attr('src', acc_img_path + accessory['thumb']);

    }

    //Display Mobile Spec
    function set_mobilespec(select_mobile) {
        var mobiles = mobileArg[0];
        var mobile = null;
        for (var i in mobiles) {
            if (mobiles[i]['id'] == select_mobile) {
                mobile = mobiles[i];
                break;
            }
        }

        $('#phone-spec').css('display', 'block');

        $('#mobile-name').html(mobile['name']);
        $('#mobile-price').html("Rs." + mobile['price']);
        $('#mobile-desc').html(mobile['description']);

        var highligts = JSON.parse(mobile['highlights']);
        var li = '';
        $.each(highligts, function (index, value) {
            li += "<li>" + value + "</li>";
        });
        $('#mobile-highlight').append(li);

        var device_dtls = JSON.parse(mobile['device_dtls']);
        var li = '';
        $.each(device_dtls, function (feature, value) {
            li += "<p>" + feature + "</p>" + "<li>" + value + "</li><br/>";
        });
        $('#mobile-details').append(li);
        $('#mobile-desc').html(mobile['description']);
        $('#mobile-image').attr('src', img_path + mobile['thumb']);

    }



    function doAjax(data_obj) {
        var ajaxResponse;
        jQuery.ajax({
            async: false,
            url: 'db/db_queries.php',
            type: 'GET',
            data: data_obj,
            success: function (response) {
                var res = JSON.parse(response);
                ajaxResponse = res;
            },

            error: function () {
            }

        });
        return ajaxResponse;


    }



    $("#mediaButton").click(function () {
        if ($("#call-menu").hasClass('call-menu-click')) {
            $("#call-menu").removeClass('call-menu-click');
        } else {
            $("#call-menu").addClass("important call-menu-click");
        }
    });




    /**************Manage 3D Console*****************/
    load_videos('section_one');

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    function load_videos(section) {

        videos_count = $('.' + section).length;

        $('#status').fadeOut(); // will first fade out the loading animation
        var param = new Date().getTime();
        var imageName="images/vtour_welcome.gif?"+param;
        $('#welcome>img').attr('src',imageName);
        $('#preloader').delay(9000).fadeOut('slow');
        setTimeout(do_start, 3000);



    }



    function do_start() {

        $('.side-menu').removeClass('none-sidemenu');

        TweenMax.staggerFrom(".btn", 1, {opacity: 0, y: -50});
        $('[data-toggle="tooltip"]').tooltip();
    }

    $("#btn-vaslist").on('click',function () {

        $('#my-account').hide();
        $('#vas-list').show();

    });

    $("#btn-backvaslist").on('click',function () {

        $('#my-account').show();
        $('#vas-list').hide();

    });




});



var introFile ='audios/bgmusic.mp3';
var intro = new buzz.sound(introFile, {loop:true});
intro.play();




function toggle_bgmusic(){
    if(is_muted) {
    }else if(!intro.isMuted()) {
       bg_mute=true;

    }else if(intro.isMuted()){
        intro.unmute();
        $('#music-icon').removeClass('fa fa-play').addClass('fa fa-pause');
    }



}

$('#music-btn').click(function(){
    intro.toggleMute();
    if (intro.isMuted() ) {
        is_muted=true;
        $('#music-icon').removeClass('fa fa-pause').addClass('fa fa-play');
    }else{
        is_muted=false;
        $('#music-icon').removeClass('fa fa-play').addClass('fa fa-pause');
    }
});



$("[data-toggle=popover]").popover();

$("#popoverExampleTwo").popover({
    html: true,
    content: function () {
        return $('#popoverExampleTwoHiddenContent').html();
    },
    title: function () {
        return $('#popoverExampleTwoHiddenTitle').html();
    }
});
