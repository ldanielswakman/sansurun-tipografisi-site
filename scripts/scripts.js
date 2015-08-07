	$(document).ready(function(e) {
		
		$(document).on('mouseenter', '.ISO', function(){
			
			$(this).children("span").fadeToggle('fast');
				
		});
		$(document).on('mouseleave', '.ISO', function(){
			
			$(this).children("span").fadeToggle('fast');
				
		});
		
		$(document).on('click', '#Download', function(){
			
			window.location = 'AmnestyFont.zip';
				
		});
		
		$(document).on('click', '.PlayIcon', function(){
			
			$(".VideoPlayer").fadeToggle('fast');
				
		});
		
		$('#Fonts, #Posters, #TypeTool').click(function() {
			// set classes on tabs
			$('.Tabs .txt').removeClass('selected');
			$(this).addClass('selected');
			// set visibility of target
			$target = $(this).attr('id');
			$('.Tabcontent').fadeOut('fast');
			$('.' + $target).fadeIn('fast');
			if($target == 'TypeTool') {
				$('.TypeTool textarea').focus();
			} else {
				$('.TypeTool textarea').blur();
			}
		});
		
		$('.ISO').each(function() {
			var Font = $(this).data('rel').valueOf();
			
			$(this).css({"background-image": "url(assets/Fonts/"+Font+".png)"});

		});	
		
		$('.Fonts').isotope({
		// options
			itemSelector	: '.ISO',
			layoutMode		: 'fitRows'
		});
					
	});