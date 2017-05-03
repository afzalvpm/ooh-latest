function load_user_jobs(email,name,type,offset){
	var numberofrecs = 9;
	var max_pagination_elements = 5;
	var post_data = {
		status:type,
		numberofrec:numberofrecs,
		offset:offset,
		username:name,
		email:email,
		userid:0
	}
	console.log(post_data)
	var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
	kumulos_init.call('viewalljobsdetails',post_data,function(res){
		console.log(res)
				// $("#job-list").append(_.template(template,{items:res}));
				$("table.table[data-type='"+type+"'] .job-list").html("")
				var job_array = res[0]['data']
				var job_array_length = Object.keys(res[0]['data']).length
				var template = _.template($('.job-template[data-type="'+type+'"]').html());
				for(i=0;i<job_array.length;i++){
					var element = job_array[i]
					var date = new Date(parseInt(element.completedDate));
					element['completeddate'] = moment.utc(parseInt(job_array[i]['endDate'])).format("DD-MM-YYYY HH:mm A");
					$("table.table[data-type='"+type+"'] .job-list").append(template(element));

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
					$("table.table[data-type='"+type+"'] .pagination").html(template({items:element_array}));


				}
			})
}

$(function(){ 
	load_user_jobs("aru.raval@gmail.com","Arundhati","WIP",0)
	load_user_jobs("aru.raval@gmail.com","Arundhati","completed",0)
	load_user_jobs("aru.raval@gmail.com","Arundhati","canceled",0)
	$("#search-name").val("Arundhati").attr("disabled","disabled");
	$("#search-email").val("aru.raval@gmail.com").attr("disabled","disabled");





})

$("#search-job-button").on("click",function(e){
	e.preventDefault();
	var user_name = $("#search-name").val()
	var user_email = $("#search-email").val()
	if(user_name.length && user_email.length){
		load_user_jobs(user_email,user_name,"WIP",0)
		load_user_jobs(user_email,user_name,"completed",0)
		load_user_jobs(user_email,user_name,"canceled",0)
		// load_user_jobs("aru.raval@gmail.com","Arundhati","WIP",0)
	}
})