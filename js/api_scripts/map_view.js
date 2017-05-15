
function initMap() {
mapboxgl.accessToken = 'pk.eyJ1IjoiYWZ6YWwiLCJhIjoiY2oyMGx2dzE0MDA1cTJ3cW1kOGVwcG1wdSJ9.dCq8m2ZL0ZOLH1qynjnUwg';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v9',
	center: [-77.04, 38.907],
	zoom: 11.15
});
var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
kumulos_init.call('mapviewfilter',{jwt_token:localStorage['ooh-jwt-token'],type:'Static'},function(res){
	var locations = []
	console.log(res)

	for(i=0;i<res.length;i++){
		console.log([res[i].siteAddress,res[i].latitude,res[i].longitude,i])
		
		var location_element = {
    				"type": "Feature",
    				"properties": {
    					"description":res[i].siteAddress,
    					"icon": "Point",
    					"iconSize": 1

    				},
    				"geometry": {
    					"type": "Point",
    					"coordinates": [res[i].siteAddress,res[i].latitude, res[i].latitude,res[i].longitude]
    				}
    			}
    	locations.push(location_element)
	}

    // Add a layer showing the places.
    
    map.addLayer({
    	"id": "places",
    	"type": "symbol",
    	"source": {
    		"type": "geojson",
    		"data": {
    			"type": "FeatureCollection",
    			"features":locations
    		}
    	},
    	"layout": {
    		"icon-image": "{icon}-15",
    		"icon-allow-overlap": true
    	}
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.

	console.log(locations)

})



map.on('click', 'places', function (e) {
	new mapboxgl.Popup()
	.setLngLat(e.features[0].geometry.coordinates)
	.setHTML(e.features[0].properties.description)
	.addTo(map);
});

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
    	map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
    	map.getCanvas().style.cursor = '';
    });





}
$(document).ready(function(){
initMap()

})



