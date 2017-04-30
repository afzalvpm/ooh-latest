$('#forgot-password-form').validate({
	rules: {
		email:{
			required:true,
			email:true,
		}
	},

	messages: {
		email:{
			required:"Please Enter email id",
			email:"Incorrect Email id",
			is_email_available:"Email id is already taken"
		},
	},


	submitHandler: function(form) {
		var post_data = {
			email:$(form).find("#email-field").val(),

		}
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('insertadmindetails',post_data,function(res){
			if(res){
				$("#signup-form .error-display").text("Account Has been created successfully")
			}else{
				$("#signup-form .error-display").text("Please Check email id or Password")
				setTimeout(function(){
					$("#signup-form .error-display").text("")
				},4000)
			}
		});
	}
});
$('#forgot-password-form').submit(function(e){
	e.preventDefault();
})