var videos  = {};

for (var i = 30; i >= 0; i--) {
    videos[i] = {id:i};
};

var vstore_video = new VStoreVideo(videos);
var main         = vstore_video.getMainVideoContainer();
var preload      = vstore_video.getPreloadVideoContainer();

function change_scene(poster,img_div_id) {
    $('video').attr('poster', 'images/'+poster);
    $('.appended_img').remove();
    $(img_div_id).clone().appendTo('#parent').addClass('appended_img').css('display', 'block');
    $('[data-toggle="tooltip"]').tooltip();
}

$('input[value="Back"]').click(function(){
    $('#loading-content').hide();
    $('#loading').show();
    $('#v'+vstore_video.current_step).fadeOut('slow');

    vstore_video.back(function(){
        $('.appended_img').show();
        $('#cb').show().fadeOut(3000);
        $('.side-menu').removeClass('none-sidemenu');
        $('#paths').fadeIn();
    });
});

function walk_in(i) {


    var tip = loadinTip[0][i];

    $('#loading-title').html(tip);
    
    $('#loading-content').show();
    $('#loading').show();
    $('#paths').fadeOut();
    
    if (i == 1 ) {
        if (!session.hasUserLoggedIn()) {
            doAuthorize();
            return false;
        }
    }

    vstore_video.goTo(i, function(){
        $('#v'+i).fadeIn('slow');
    });
}

main.on('waiting', function(){
    $('#loading-content').show();
    $('#loading').show();
    $('#paths').fadeOut();
});

main.on('loadeddata', function(){
    $('#loading').hide();
    $('.side-menu').addClass('none-sidemenu');
    $('.appended_img').hide();
});