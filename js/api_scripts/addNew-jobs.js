$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var url = "http://mysite.com/stuff/index.php?search=my+search";
url = url.substring(0, url.lastIndexOf("/") + 1);
$(document).on("click",".pagination .last-element",function(e){
	e.preventDefault();
	$('.pagination > .pagination-element').addClass("hide");
	$('.pagination > .pagination-element').slice(-5).removeClass("hide");
	$('.pagination > .pagination-element').not("hide").last().click()

})
$(document).on("click",".pagination .first-element",function(e){
	e.preventDefault();
	$('.pagination > .pagination-element').addClass("hide");
	$('.pagination > .pagination-element').slice(0,5).removeClass("hide");
	$('.pagination > .pagination-element').not("hide").first().click()
})
$(document).on("click",".pagination .previous-element",function(e){
	e.preventDefault();
	var current_element = $(".pagination-element.active")
	if(current_element.prev().hasClass("pagination-element")){
		$(".pagination-element").not("hide").last("hide");
		current_element.prev().removeClass("hide").addClass("active").click()
	}
})
$(document).on("click",".pagination .next-element",function(e){
	e.preventDefault();
	var current_element = $(".pagination-element.active")
	if(current_element.next().hasClass("pagination-element")){
		$(".pagination-element").not("hide").first("hide");
		current_element.next().removeClass("hide").addClass("active").click()
	}
})
$(document).on("click",".pagination-element",function(){
	var numberofrecs = 5;
	$(".pagination-element").removeClass("active")
	$(this).addClass("active")
	var post_data = {
		campaign:window.location.href.split("inspectionid=")[1],
		numberofrec:numberofrecs,
		offset:parseInt($(this).attr("data-index"))*2,
		jwt_token:localStorage['ooh-jwt-token']
	}
	if(typeof(localStorage['ooh-jwt-token'])!=undefined && window.location.href.split("inspectionid=")[1]!=undefined){
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('getjoblistDetails',post_data,function(res){
			console.log(res)
			$("#job-list").html("")
			var template = _.template($('#job-template').html());
			var job_array = res[0]['data']
			var job_array_length = Object.keys(res[0]['data']).length
			for(i=0;i<job_array_length;i++){
				var element = job_array[i]
				newdate =moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
				var item = {
					siteId:job_array[i].siteId,
					panalId:job_array[i].panalId,
					location:job_array[i].location,
					suburb:job_array[i].suburb,
					jobID:job_array[i].jobID,
					endDate:newdate,
					latitude:job_array[i].latitude,
					longitude:job_array[i].longitude,
					index:i


				}
				$("#job-list").append(template(item));
				$("#date-time-picker"+i).datetimepicker({format: 'dd-mm-yyyy HH:ii P',showMeridian: true,autoclose: true}).on('changeDate', function(ev){
					$(ev.currentTarget).closest(".job-parent").find(".job-element[data-type='location']").blur();

				});
			}
		})
	}
})
$(document).on("click",".view-map",function(){
	var latlon = $(this).closest(".job-parent").find(".job-element[data-type='latlon']").text().split(",")
	var latitude = latlon[0]
	var longitude = latlon[1]
	$("#map-area").locationpicker({
		location: {
			latitude: latitude,
			longitude:longitude
		},
		locationName: "",
		radius: 500,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [],
		mapOptions: {},
		scrollwheel: true,
		inputBinding: {
			latitudeInput: null,
			longitudeInput: null,
			radiusInput: null,
			locationNameInput: null
		},
		enableAutocomplete: false,
		enableAutocompleteBlur: false,
		autocompleteOptions: null,
		addressFormat: 'postal_code',
		enableReverseGeocode: true,
		draggable: true,
		onchanged: function(currentLocation, radius, isMarkerDropped) {
			$(".job-parent.selected").find(".job-element[data-type='latlon']").text(currentLocation['latitude']+","+currentLocation['longitude'])
			$("#map-modal").modal('hide');
			$(".job-parent.selected").find(".job-element[data-type='latlon']").blur()
		},
		onlocationnotfound: function(locationName) {},
		oninitialized: function (component) {},
		markerIcon: undefined,
		markerDraggable: true,
		markerVisible : true
	})
	$("#map-modal").modal('show');

})
$(document).on("click",".job-parent",function(){
	if($(".job-parent.selected").attr("data-id") == $(this).attr("data-id")){
		return
	}else{
		$(".job-parent.selected").removeClass("selected")
		$(this).addClass("selected")
	}
})
$(document).on("blur",".job-element",function(){
	var job_element = $(this).closest(".job-parent").find(".job-element")
	var post_data = {
		jobID:$(this).closest(".job-parent").attr("data-id"),
		endDate:moment($(this).closest(".job-parent").find(".form_datetime input").val(), "DD-MM-YYYY HH:mm A").valueOf(),
		jwt_token:localStorage['ooh-jwt-token']
	}
	for(i=0;i<job_element.length;i++){

		post_data[$(job_element[i]).attr("data-type")] = $(job_element[i]).text()
	}
	jwt_token=localStorage['ooh-jwt-token']
	if(typeof(localStorage['ooh-jwt-token'])!=undefined){
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('updatejobs',{data:post_data,jwt_token:jwt_token},function(res){

		})
	}
})



// 
$(function(){ 
	var numberofrecs =5
	var max_pagination_elements = 6;
	var post_data ={
		campaign:window.location.href.split("=")[1],
		offset:0,
		numberofrec:numberofrecs,
		jwt_token:localStorage['ooh-jwt-token']
	}
	if(typeof(localStorage['ooh-jwt-token'])!=undefined){
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('getInspectionDetails',{inspection_DetailID:window.location.href.split("=")[1],jwt_token:localStorage['ooh-jwt-token']},function(res){
			if(res){
				$("#inspection-id").text(res[0].inspection_DetailID)
				$("#contractor-name").text(res[0].contractor)
				$("#condition_check").text(res[0].conditionCheck)
				$("#contractor").text(res[0].contractor)
				$("#client-name").text(res[0].client)
				$("#condition-check").text(res[0].conditionCheck)
				$("#date-of-inspection").text(res[0].dateofInspection)
				$("#proximity-check").text(res[0].proximityCheck)
				$("#inspection-format").text(res[0].format)
				$("#share-of-voice").text(res[0].shareofVoiceCheck)
				$("#campaign").text(res[0].campaign)
			}

		})
		var template = _.template($('#job-template').html());
		kumulos_init.call('getjoblistDetails',post_data,function(res){
			console.log(res)
			$("#job-list").html("")
			var job_array = res[0]['data']
			var job_array_length = Object.keys(res[0]['data']).length
			for(i=0;i<job_array_length;i++){
				newdate =moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
				var item = {
					jobID:job_array[i].jobID,
					siteId:job_array[i].siteId,
					panalId:job_array[i].panalId,
					location:job_array[i].location,
					suburb:job_array[i].suburb,
					endDate:newdate,
					latitude:job_array[i].latitude,
					longitude:job_array[i].longitude,
					index:i
				}
				$("#job-list").append(template(item));
				$("#date-time-picker"+i).datetimepicker({format: 'dd-mm-yyyy HH:ii P',showMeridian: true,autoclose: true}).on('changeDate', function(ev){
					$(ev.currentTarget).closest(".job-parent").find(".job-element[data-type='location']").blur();

				});

			}
			var values = numberofrecs
			var pagination_limit = res[0]['totalrecs']/numberofrecs;
			var no_elements = parseInt(pagination_limit);
			if(pagination_limit.toString().indexOf(".")>0 && pagination_limit>1){
				no_elements +=1 ;
			}

			if(no_elements>1){
				var element_array = [];
				for(i=0;i<no_elements;i++){
					var is_hidden = max_pagination_elements > i ? false : true;
					element_array.push({label:i+1,index:i,is_hidden:is_hidden});
				}
				var pagination_template = _.template($('#pagination-template').html());
				$(".pagination").html(pagination_template({items:element_array}));


			}

		})
	}

})