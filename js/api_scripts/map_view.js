
var map
var markers = []
function init(type) {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 3,
                    minZoom: 2,

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(40.6700, -73.9400), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);

                // Let's also add a marker while we're at it
                var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
    kumulos_init.call('mapviewfilter',{jwt_token:localStorage['ooh-jwt-token'],type:type},function(res){
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
    //    var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(res[i].latitude, res[i].longitude),
    //     map: map,
    //     title: res[i].siteAddress
    // });
       marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    // icon: '3.png',
                    title: res[i].siteAddress,
                    position: new google.maps.LatLng(res[i].latitude, res[i].longitude),
                });
       marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
       // locations.push(location_element)

   }

    // Add a layer showing the places.
    
    

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.

    console.log(locations)

})


                

            }
$(document).ready(function(){
    google.maps.event.addDomListener(window, 'load', init('Static'));
    $("#buttons input[type='radio']").on("change",function(){
    google.maps.event.addDomListener(window, 'load', init($(this).val()));

})

    
        })

$("#show-static").on("click",function(){

})

$("#show-digital")










