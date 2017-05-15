

$(function(){ 

	var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
	kumulos_init.call('getusername',{jwt_token:localStorage['ooh-jwt-token']},function(res){
	// console.log(res[0])
	if(res[0].username){
		$(".profile-desc h5").text(res[0].username)
	}else{
		window.location.href = "/signin/";
	}

})
	$(".notification-area").on("click",".a-profile",function(e){
		e.preventDefault();
		// alert("ddd")
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('getusername',{jwt_token:localStorage['ooh-jwt-token']},function(res){
			localStorage['ooh-jwt-token'] = ''
			window.location.href = "/signin/";
		})
	})
})