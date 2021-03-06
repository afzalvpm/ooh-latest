$(document).on("click",".pagination-element",function(){
	$(".pagination-element").removeClass("active")
	$(this).addClass("active")
	var post_data = {
		status:"WIP",
		numberofrec:9,
		offset:parseInt($(this).attr("data-index"))*2,
		username:"ALL",
		email:"ALL",
		userid:0,
		jwt_token:localStorage['ooh-jwt-token']
	}
	if(typeof(localStorage['ooh-jwt-token'])!=undefined){
		var template = _.template($('#job-template').html());
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('viewalljobsdetails',post_data,function(res){
			var job_array = res[0]['data']
			var job_array_length = Object.keys(res[0]['data']).length
			if(job_array_length){
				console.log(res)
				$("#job-list").html("")				
				var template = _.template($('#job-template').html());
				for(i=0;i<job_array.length;i++){
					var element = job_array[i]
					var date = new Date(parseInt(element.completedDate));
					element['completeddate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");

					$("#job-list").append(template(element));

				}
			}
		})
	}
})
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

$(".sorty-by").on("click",function(){
	$(this).toggleClass("asc");
	if($(this).attr("data-type") =="name"){
		if($(this).hasClass("asc")){
			var start = -1;
			var end = 1;
		}else{
			var start = 1;
			var end = -1;
		}
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".userName").text() > $(b).find(".userName").text() ? start:end;
		});
	}else if($(this).attr("data-type") =="status"){
		if($(this).hasClass("asc")){
			var start = -1;
			var end = 1;
		}else{
			var start = 1;
			var end = -1;
		}
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".progress-bar").attr("aria-valuenow") >$(b).find(".progress-bar").attr("aria-valuenow") ? start:end;
		});
	}else if($(this).attr("data-type") =="coloumn"){
		if($(this).hasClass("asc")){
			var start = -1;
			var end = 1;
		}else{
			var start = 1;
			var end = -1;
		}
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".coloumn").text() > $(b).find(".coloumn").text() ?start:end;
		});
	}
})

$(function(){ 
	var numberofrecs = 9;
	var max_pagination_elements = 5;
	var post_data = {
		status:"WIP",
		numberofrec:numberofrecs,
		offset:0,
		username:"ALL",
		email:"ALL",
		userid:0,
		jwt_token:localStorage['ooh-jwt-token']
	}
	if(typeof(localStorage['ooh-jwt-token'])!=undefined){
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('viewalljobsdetails',post_data,function(res){
			console.log(res)
			$("#job-list").html("")
			var job_array = res[0]['data']
			var job_array_length = Object.keys(res[0]['data']).length
			var template = _.template($('#job-template').html());
			for(i=0;i<job_array.length;i++){
				var element = job_array[i]
				var date = new Date(parseInt(element.completedDate));
				element['completeddate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
				$("#job-list").append(template(element));
			}
			debugger
			var pagination_limit = res[0]['totalcount']/numberofrecs;
			var no_elements = parseInt(pagination_limit);
			if(pagination_limit.toString().indexOf(".")>0 && pagination_limit>0){
				no_elements +=1 ;
			}
			if(no_elements>1 && job_array.length){
				var element_array = [];
				var template = _.template($('#pagination-template').html());
				for(i=0;i<no_elements;i++){
					var is_hidden = max_pagination_elements > i ? false : true;
					element_array.push({label:i+1,index:i,is_hidden:is_hidden});
				}
				$(".pagination").html(template({items:element_array}));


			}
		})
	}
});