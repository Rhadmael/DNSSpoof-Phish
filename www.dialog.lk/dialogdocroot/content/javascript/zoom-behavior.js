	/**
	 * Full gallery example
	 *
	 * The code below creates the gallery. No editing needed to
	 * actual zoom script file ( zoomit.jquery.js )
	 *
	 */
	
	// use load event on window to start the script
	jQuery(window).load(function(){		
		
		var previews 	= jQuery('.full-image a'), // image previews
			thumbnails 	= jQuery('.gallery-thumbnails a'); // small thumbnails for changing previews
		
		// start zoom only on visible element
		jQuery('.zoomIt.visible').jqZoomIt({
			init : function(){ // on zoom init, add class to element
				jQuery( this ).addClass('zoomIt_loaded');
			}
		});
		
		// small navigation thumnails functionality
		jQuery(thumbnails).click(function(e){
			e.preventDefault();
			// hide all previews
			jQuery(previews).removeClass('visible').addClass('hidden');
			// get key of thumbnail
			var key = jQuery.inArray( this, thumbnails );
			// show preview having the same key as small thumbnail
			jQuery(previews[key]).removeClass('hidden').addClass('visible');		
			// check if preview has loaded class and if not, start zoom and add class
			if( !jQuery(previews[key]).hasClass('zoomIt_loaded') ){
				// start zoom
				jQuery(previews[key]).jqZoomIt();
				// add zoom loaded class
				jQuery(previews[key]).addClass('zoomIt_loaded');				
			}
		})
		
	});