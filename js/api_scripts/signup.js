		$('#signup-form').validate({
			rules: {
				email:{
					required:true,
					email:true,
					is_email_available:true
				},
				username:{
					required:true
				},
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
				},
				terms:{
					required:true
				}
			},
			messages: {
				email:{
					required:"Please Enter email id",
					email:"Incorrect Email id",
					is_email_available:"Email id is already taken"
				},
				username:"Please Enter firstname",
				password:{
					required:"Please Enter Password",
					minlength: "Please Enter minimum 6 characters or digits",
					maxlength: "Max length Exceed"
				},
				password1:{
					required:"Please Enter Password",
					minlength: "Please Enter minimum 6 characters or digits",
					maxlength: "Max length Exceed",
					equalTo:"Password Mismatched"
				},
				terms:{
					required:""
				}
			},


			submitHandler: function(form) {
				$("#signup-form .error-display").text("")
				var post_data = {
					email:$(form).find("#email-field").val(),
					password:$(form).find("#password-field").val(),
					username:$(form).find("#username-field").val(),

				}
				var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
				kumulos_init.call('insertadmindetails',post_data,function(res){
					if(res){
						$("#signup-form .error-display").text("Account Has been created successfully").addClass("success")
						$("#email-field").addClass("is-used")
					}else{
						$("#signup-form .error-display").text("Please Check email id or Password").addClass("failure")

					}
					setTimeout(function(){
						$("#signup-form .error-display").text("").removeClass("success").removeClass("failure")
					},4000)
				});
			}
		});
		$('#signup-form').submit(function(e){
			e.preventDefault();
		})

		$.validator.addMethod('is_email_available', function (value, element, param) {
			if($(element).hasClass("is-used"))
				return false;
			else
				return true;
    //Your Validation Here
}, '');
		$("#email-field").keyup(function(){
			if($(this).hasClass("is-used"))
				$(this).removeClass("is-used")
			else
				return
		})
		$("#email-field").blur(function(){
			var email = $(this).val()
			var that = this
			var k= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
			k.call('adminemailavailability',{email:email},function(res){
				if(res.length == 0)
					$(that).removeClass("is-used");
				else
					$(that).addClass("is-used");
				$(that).valid();

			})
		})