function initMap() {
var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
kumulos_init.call('mapviewdata',{jwt_token:localStorage['ooh-jwt-token']},function(res){
	var locations = []
	console.log(res.length)

	for(i=0;i<res.length;i++){
		console.log([res[i].siteAddress,res[i].latitude,res[i].longitude,i])
		locations.push([res[i].siteAddress,res[i].latitude,res[i].longitude,i])
	}
	console.log(locations)
    var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(41.976816, -87.659916),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
})
}

