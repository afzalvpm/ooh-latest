function load_user_jobs(){
	var numberofrecs = 9;
	var max_pagination_elements = 5;
	var post_data = {
		status:"completed",
		numberofrec:numberofrecs,
		offset:0,
		username:"ALL",
		email:"ALL",
		userid:13
	}
	var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
	kumulos_init.call('viewalljobsdetails',post_data,function(res){
		$("#job-list").html("")
		var job_array = res[0]['data']
		var job_array_length = Object.keys(res[0]['data']).length
		var template = _.template($('#job-template').html());
		for(i=0;i<job_array.length;i++){
			var element = job_array[i]
			// var date = new Date(parseInt(element.completedDate));
			element['endDate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
			$("#job-list").append(template(element));
			$(".view-data h5").text("View Jobs of "+job_array[i].name)

		}
		var pagination_limit = res[0]['totalcount']/numberofrecs;
		var no_elements = parseInt(pagination_limit);
		if(pagination_limit.toString().indexOf(".")>0 && pagination_limit>0){
			no_elements +=1 ;
		}
		if(no_elements>1){
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

$(document).on("click",".pagination-element",function(){
	$(".pagination-element").removeClass("active")
	$(this).addClass("active")
	var post_data = {
		status:"completed",
		numberofrec:10,
		offset:parseInt($(this).attr("data-index"))*2,
		username:"ALL",
		email:"ALL",
		userid:13
	}
	var template = _.template($('#job-template').html());
	var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
	kumulos_init.call('viewalljobsdetails',post_data,function(res){
		var job_array = res[0]['data']
		var job_array_length = Object.keys(res[0]['data']).length
		if(job_array_length){
			$("#job-list").html("")
			var template = _.template($('#job-template').html());
			for(i=0;i<job_array.length;i++){
				var element = job_array[i]
				element['completeddate'] = moment.utc(parseInt(job_array[i]['completeddate'])).format("DD-MM-YYYY HH:mm A");
				$("#job-list").append(template(element));

			}
		}
	})
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

$("#select-all-jobs").on("change",function(e){
	if($(this).is(':checked')){
		$("#job-list").find(".checkbox input").prop("checked",true)
	}else{
		$("#job-list").find(".checkbox input").prop("checked",false)
	}
})
$("#job-list").on("change",".checkbox input",function(){
	$("#select-all-jobs").prop("checked",false)
})

$("#search-job-by-name").click(function(){
	var numberofrecs = 1000;
	var search_content = $("#search-area").val()
	var max_pagination_elements = 6;
	var search_content = $("#search-area").val()
	var post_data = {
		param:search_content,
		numberofrec:numberofrecs,
		offset:0
	}
	if(search_content.length){
		$(".view-data h5").text("View Jobs of "+search_content)
		var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
		kumulos_init.call('viewcmptdjobsbyuser',post_data,function(res){
			$("#search-area").attr("disabled","disabled")
			$("#job-list").html("")
			if(res[0]['data'].length){
				var template = _.template($('#job-template').html());
				var job_array = res[0]['data']
				var job_array_length = Object.keys(res[0]['data']).length
				for(i=0;i<job_array_length;i++){
					var element = job_array[i]
					element['endDate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
					$("#job-list").append(template(element));
				}
				$(".pagination").addClass("hide")
			}
		})
	}
})
$("#clear-search").on("click",function(){
	load_user_jobs();
	$("#search-area").val("")
	$("#search-area").removeAttr("disabled")
	

})

$(function(){ 
	load_user_jobs();
})

$(".download-data").on("click",function(){
	var checked_jobs = $("#job-list tr input:checked");
	var columns = ["INSPECTION ID", "JOB ID","SIN","JOB TYPE", "Completed date & time"];
	var rows = []
	
	if(checked_jobs.length){
		var rows = [
		// [1, "Shaw", "Tanzania", ...],
		// [2, "Nelson", "Kazakhstan", ...],
		// [3, "Garcia", "Madagascar", ...],
		// ...
		];
		for(i=0;i<checked_jobs.length;i++){
			var element =[];
			var job = $(checked_jobs[i]).closest("tr")
			debugger
			var job_elements = job.find(".job-element")
			for(j=0;j<job_elements.length;j++){
				element.push($(job_elements[j]).text())
			}
			rows.push(element)

			
		}
		console.log(rows)
		var doc = new jsPDF();
		doc.autoTable(columns, rows);
		doc.autoTable(columns, rows);
		doc.save('table.pdf');

	}
})
$("#select-all-jobs").on("change",function(e){
	if($(this).is(':checked')){
		$("#job-list").find(".checkbox input").prop("checked",true)
	}else{
		$("#job-list").find(".checkbox input").prop("checked",false)
	}
})
$("#job-list").on("change",".checkbox input",function(){
	$("#select-all-jobs").prop("checked",false)
})

$(".sorty-by").on("click",function(){
	if($(this).attr("data-type") =="name"){
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".userName").text() > $(b).find(".userName").text() ? 1 : -1;
		});
	}else if($(this).attr("data-type") =="status"){
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".progress-bar").attr("aria-valuenow") >$(b).find(".progress-bar").attr("aria-valuenow") ? 1 : -1;
		});
	}else if($(this).attr("data-type") =="coloumn"){
		$('#job-list tr').sortElements(function(a, b){
			return $(a).find(".coloumn").text() > $(b).find(".coloumn").text() ? 1 : -1;
		});
	}
})