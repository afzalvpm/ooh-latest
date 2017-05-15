function load_completed_jobs(){
	var numberofrecs = 9;
	var max_pagination_elements = 5;
	var post_data = {
		status:"completed",
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
			$("#job-list").html("")
			var job_array = res[0]['data']
			var job_array_length = Object.keys(res[0]['data']).length
			var template = _.template($('#job-template').html());
			console.log(job_array)
			for(i=0;i<job_array.length;i++){
				var element = job_array[i]
				element['completeddate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
				$("#job-list").append(template(element));

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
}

$(document).on("click",".pagination-element",function(){
	$(".pagination-element").removeClass("active")
	$(this).addClass("active")
	var post_data = {
		status:"completed",
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
			console.log(job_array)
			var job_array_length = Object.keys(res[0]['data']).length
			if(job_array_length){
				console.log(res)
				$("#job-list").html("");
				var template = _.template($('#job-template').html());
				for(i=0;i<job_array.length;i++){
					var element = job_array[i]
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



$(function(){ 
	load_completed_jobs()
});


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';
    //Set Report title in first row or line
    
    // CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
    	var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
    	var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
        	row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
    	alert("Invalid data");
    	return;
    }   
    
    //Generate a file name
    var fileName = "ooh_job_report";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".xls";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

$(".download-data").on("click",function(){
	var is_checked_all = $("#select-all-jobs").is(":checked")
	var is_selected = $(".job-element").find("input[type='checkbox']").is(":checked")
	alert(is_checked_all)
	var csv_data = []
	var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
	kumulos_init.call('cmptdjobsreport',{jwt_token:localStorage['ooh-jwt-token']},function(res){
		console.log(res)
		for(i=0;i<res.length;i++){
			var csv_element = {
				'Suburb': res[i].suburb,
				'State':res[i].siteId,
				'compaign name':res[i].campaign,
				'Advertiser':res[i].client,
				'Agency primary':res[i].contractor,
				'start date':moment.utc(parseInt(res[i].dateofInspection)).format("DD-MM-YYYY HH:mm A"),
				'end date':moment.utc(parseInt(res[i]['endDate'])).format("DD-MM-YYYY HH:mm A"),
				'app job id':res[i].jobID,
				'job accepted by':res[i].name,
				'App job Geo Code latitude':res[i].applat,
				'App job Geo Code longitude':res[i].applong,
				'App Job Suburb':res[i].appsubrub,
				'App Job Address':res[i].appaddress,
				'App Job Post Code':res[i].zipCode,
				'App job Inspection Type':res[i].jobtype,
				'App job Condition GOOD':true,
				'App job Condition NOT POSTED':false,
				'App job Condition NO PANEL ':true,
				'App job Condition WRONG PANEL SIDE ':false,
				'App job Condition PROXIMITY':res[i].proximityCheck,
				'App job Condition SHARE OF VOICE':res[i].shareofVoiceCheck,
				'App job NOTES':res[i].appnotes,
				'Image url':res[i].imageurl
			}
			if(is_checked_all || is_selected ==false){
				csv_data.push(csv_element)
			}else{
				var selected_checkboxes = $(".job-element[data-jobid='"+res[i].jobID+"']").find("input[type='checkbox']").is(":checked")
				if(selected_checkboxes == true){
					csv_data.push(csv_element)
				}

			}
		}
		// console.log(csv_data)
		JSONToCSVConvertor(csv_data, "", true)


	})
	
})
$("#search-job-by-name").click(function(){
	var numberofrecs = 9;
	var max_pagination_elements = 6;
	var search_content = $("#search-area").val()
	var post_data = {
		nameorid:search_content,
		jwt_token:localStorage['ooh-jwt-token']
	}
	if(typeof(localStorage['ooh-jwt-token'])!=undefined){
		if(search_content.length){
			var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
			kumulos_init.call('viewcmptdjobsbyuser',post_data,function(res){
				$("#job-list").html("")
				var template = _.template($('#job-template').html());
				var job_array = res
				console.log(job_array)
				// var job_array_length = Object.keys(res[0]).length
				for(i=0;i<job_array.length;i++){
					console.log(job_array[i])

					element = job_array[i]
					element['completeddate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
					element['client'] = ''
					element['contractor'] = ''
					element['dateofInspection'] = ''
					element['zipCode'] = ''
					element['proximityCheck'] = ''
					element['shareofVoiceCheck'] = ''
					$("#job-list").append(template(element));
					console.log(element)
				}
				$(".pagination").addClass("hide")
				$("#search-area").attr("disabled","disabled")
							// $("#clear-search").removeClass("hide");
						})
		}
	}
})

$("#clear-search").on("click",function(){
	load_completed_jobs();
	$("#search-area").val("")
	$("#search-area").removeAttr("disabled")
	$(".pagination").removeClass("hide")

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