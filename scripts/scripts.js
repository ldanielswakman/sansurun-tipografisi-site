	$(document).ready(function(e) {
		
		$(document).on('mouseenter', '.ISO', function(){
			
			$(this).children("span").fadeToggle('fast');
				
		});
		$(document).on('mouseleave', '.ISO', function(){
			
			$(this).children("span").fadeToggle('fast');
				
		});
		
		$(document).on('click', '.ico', function(){
			
			window.location = 'AmnestyFont.zip';
				
		});
		
		$(document).on('click', '.PlayIcon', function(){
			
			$(".VideoPlayer").fadeToggle('fast');
				
		});
		
		$(document).on('click', '#Main', function(){
			$(".Fonts").fadeToggle('fast');
			$(".Posters").fadeToggle('fast');
			$(this).addClass('selected');
			$("#Post").removeClass('selected');
		});
		
		$(document).on('click', '#Post', function(){
			$(".Fonts").fadeToggle('fast');
			$(".Posters").fadeToggle('fast');
			$(this).addClass('selected');
			$("#Main").removeClass('selected');
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

		$('#string').on('input', function() {
			// show or hide actions
			if( $(this).val().length > 1) {
				$('.TypeTool .actions').addClass('active');
			} else {
				$('.TypeTool .actions').removeClass('active');
			}
		});
		
					
	});