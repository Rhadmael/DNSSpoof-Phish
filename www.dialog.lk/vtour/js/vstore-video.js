window.VStoreVideo = function(config){

    $ = jQuery;

    if ($('#main_video_container').length < 1)
        alert('No video container found for main video.');

    $('body').append('<video id="preload" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"> </video>');

    var main     = videojs('main_video_container').preload('none').controls(false);
    var preload  = videojs('preload').muted(true);

    this.main                   = main;
    /**
     * Callback to run after goTo video is completed
     * this var is used to store the callback since
     * we are not completely destroying main video object on each load
     * @type {Boolean}
     */
    this.on_main_ended_callback = false;
    this.preload                = preload;
    this.current_step           = false;
    this.config                 = config;
    this.mediaPath              = 'http://www.dialog.000webhostapp.com/vtour/videos/morn/';

    this.goTo = function(key, callbackFn){

        if (typeof callbackFn == "function")
            this.on_main_ended_callback = callbackFn;
        else
            this.on_main_ended_callback = false;

        var forward_src       = this._makeForwardSrc(key);
        var backward_src      = this._makeBackwardSrc(key);
        var that = this;

        var buffer = this._bufferVideo;

        if (this._isLegacyTech() === false) {
            buffer(forward_src, function(path){
                this.main.src(path).load().play();
                buffer(backward_src, function(){});
            });
        } else {
            this.main.src(forward_src).load().play();
        }

        this.main.on('ended', function(){
            that.current_step = key;
            that._renderContent(key);

            if (typeof that.on_main_ended_callback == "function") {
                that.on_main_ended_callback(this);
                that.on_main_ended_callback = false;
            }
        });
    };

    this.back = function(callbackFn){

        this.on_main_ended_callback = callbackFn;

        if (this.current_step === false)
            throw "Not currently in middle of a step.";

        var src = this._makeBackwardSrc(this.current_step);
        
        if (this._isLegacyTech() === false) {

            this._bufferVideo(src, function(){
                this.main.src(src).load().play();
            });

        } else {
            this.main.src(src).load().play();
        }

    };

    this.getMainVideoContainer = function(){
        return this.main;
    };

    this.getPreloadVideoContainer = function(){
        return this.preload;
    };

    this._makeSrc = function(key, slug) {

        if (typeof this.config[key]['id'] == 'undefined')
            throw "No video found for " + key;

        var index  = this.config[key]['id'];
        var path   = this.mediaPath + index + '_' + slug + '.webmhd.';

        return [
            { type: "video/webm", src: path + 'webm'},
            { type: "video/mp4", src: path + 'mp4' }
        ];
    };

    this._makeForwardSrc = function(key){
        return this._makeSrc(key, 'forward');
    };

    this._makeBackwardSrc = function(key){
        return this._makeSrc(key, 'rewind');
    };

    this._renderContent = function(key){

        if (typeof this.config[key] != 'undefined' && typeof this.config[key]['content'] != 'undefined') {
            content_path = this.config[key]['content'];
        } else {
            content_path = false;
        }

        if (content_path !== false) {
            var content_path = 'content/' + content_path;
            $('#content').load(content_path);            
        }
    };

    this._bufferVideo = function(path, callbackFn){

        var preload = this.preload;
        preload.src(path).load();

        var preloadChecker = setInterval(function(){

            var playing = false;

            if (preload.readyState()) {

                if (preload.buffered().length > 0) { //buffering has started

                    if (preload.buffered().end(0) >= (preload.duration() - 0.1)) {

                        preload.pause();
                        clearInterval(preloadChecker);
                        //preloaded
                        callbackFn(path);
                    }

                }

            } else {
                if (playing === false) {
                    preload.play();
                    playing = true;
                }
            }

        }, 1000);
    };

    this._isLegacyTech = function(){

        var ua = window.navigator.userAgent;

        //safari
        // var is_safari = ua.indexOf("Safari") > -1;

        // if (is_safari)
        //     return true;

        var msie = ua.indexOf('MSIE ');

        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');

        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // IE 12 => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    };
};