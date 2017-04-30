$('#password-reset-form').validate({
			rules: {
				password:{
					required:true,
					minlength: 6,
					maxlength: 16
				},
				password1:{
					required:true,
					minlength: 6,
					maxlength: 16,
					equalTo: "#password-field"
				}
			},

			messages: {
				password:{
					required:"Please Enter Password",
					minlength: "Please Enter minimum 6 characters or digits",
					maxlength: "Max length Exceed"
				},
				password1:{
					required:"Please Re Enter Password",
					minlength: "Please Enter minimum 6 characters or digits",
					maxlength: "Max length Exceed",
					equalTo:"Password Mismatched"
				}
			},

			submitHandler: function(form) {
				var post_data = {
					// email:"afsal@cartoonmango.com",
					encrypted_code:"shjhjsjhjdhhsjhjshjshjs",
					password:$(form).find("#password-field").val(),

				}
				console.log(post_data)
				var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
				kumulos_init.call('updateadminpwd',post_data,function(res){
					if(res==1){
						$("#password-reset-form .error-display").text("Password updated successfully")
					}else{
						$("#password-reset-form .error-display").text("Internal Error")
						setTimeout(function(){
							$("#password-reset-form  .error-display").text("")
						},4000)
					}
				});
			}
		});
		$("form").submit(function(e){
    e.preventDefault()
})