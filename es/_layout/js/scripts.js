(function($){	
	
	// -------------------------------------------------------------------------------------------------------
	// Form Validation script - used by the Contact Form script
	// -------------------------------------------------------------------------------------------------------
	
	function validateMyAjaxInputs() {

		$.validity.start();
		// Validator methods go here:
		$("#name").require();
		$("#email").require().match("email");
		$("#subject").require();
		$("#message").require();

		// End the validation session:
		var result = $.validity.end();
		return result.valid;
	}
	
	// -------------------------------------------------------------------------------------------------------
	// ClearForm 
	// -------------------------------------------------------------------------------------------------------
	
	$.fn.clearForm = function() {
		return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
		return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea')
		this.value = '';
		else if (type == 'checkbox' || type == 'radio')
		this.checked = false;
		else if (tag == 'select')
		this.selectedIndex = -1;
		});
	};
	

	$(document).ready(function(){
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////						   
		
		// -------------------------------------------------------------------------------------------------------
		// Contact Form 
		// -------------------------------------------------------------------------------------------------------
		
		$("#contact-form").submit(function () {
								
			if (validateMyAjaxInputs()) { //  procced only if form has been validated ok with validity
				var str = $(this).serialize();
				$.ajax({
					type: "POST",
					url: "_layout/php/send.php",
					data: str,
					success: function (msg) {
						$(document).ajaxComplete(function (event, request, settings) {
							if (msg == 'OK') { // Message Sent? Show the 'Thank You' message
								result = '<div class="alert alert-success">Your message has been sent. Thank you!</div>';
								$('#contact-form').clearForm();
							} else {
								result = msg;
							}
							$("#formstatus").html(result);
						});
					}
		
				});
				return false;
			}
		});


		
		// -------------------------------------------------------------------------------------------------------
		// Dropdown Menu
		// -------------------------------------------------------------------------------------------------------
		
		$("ul#dropdown-menu li").hover(function () {							 
			$(this).addClass("hover");
			$('ul:first', this).css({visibility: "visible",display: "none"}).slideDown(200);
		}, function () {
			$(this).removeClass("hover");
			$('ul:first', this).css({visibility: "hidden"});
		});
		
		// -------------------------------------------------------------------------------------------------------
		// Make entire service overview clickable
		// -------------------------------------------------------------------------------------------------------
		

		$(".service-overview").click(function(){
			 window.location=$(this).find("a").attr("href");
			 return false;
		});
		
		// -------------------------------------------------------------------------------------------------------
		// Hover over Portfolio Overview + make entire portfolio overview clickable
		// -------------------------------------------------------------------------------------------------------
		
		$(".portfolio-item-overlay").hide();
		
		$(".portfolio-item").hover(
		  function(){$(this).find('.portfolio-item-overlay').show();},
		  function(){$(this).find('.portfolio-item-overlay').hide();}
		);


	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
	
})(window.jQuery);	

// non jQuery scripts below