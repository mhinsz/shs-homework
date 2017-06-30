$(document).ready(function(){			
	function infoAnimate(){
		var y = 1;
		$('.text p').each(function() {
			var $this = $(this);
			var timer = (y*250);
			setTimeout(function(){
				$this.addClass('unhide');	
			}, timer);
			y++;
		});
	}
	
	infoAnimate();

	function formValidate() {
		var valid = true;
		$('input,textarea').each(function() {
            if($(this).val() == ''){
				valid = false;
			}
        });	
		return valid;
	}

	$('input[type="submit"]').click(function(e){
		e.preventDefault();
		if(formValidate()){
			var array = $('#contact-form').serializeArray();
			var formData = {};
		
			jQuery.each(array, function() {
				formData[this.name] = this.value || '';
			});
			//console.log(JSON.stringify(formData));
			$.ajax({
				url: 'http://www.storagecode.com/api/demo.php',
				type : "POST",
				data : JSON.stringify(formData)
			}).done(function(result) { 
				console.log(result); 
				$('.form-holder').animate({
						'opacity':'0',
						'margin-top':'50px'
					},function(){
						$(this).html('<p class="thank-you">Thank <span>You</span></p>').animate({'opacity':'1','margin-top':'0px',});	
				});
			}).fail(function(result) { 
				console.log(result);
			});
		} else {
			alert("Please complete all required fields.");	
		}
	});
	
});