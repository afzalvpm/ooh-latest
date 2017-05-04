var csv_data = []
function handleFiles(files) {
  if (window.FileReader) {
   getAsText(files[0]);
} else {
   alert('FileReader are not supported in this browser.');
}
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
}

function loadHandler(event) {
  var csv = event.target.result;
  processData(csv);
}

function processData(csv) {
  csv_data = []
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  for (var i=0; i<allTextLines.length; i++) {
   var data = allTextLines[i].split(';');
   var tarr = [];
   for (var j=0; j<data.length; j++) {
    				// tarr.push(data[j]);
    				if(data[j].split(",").length == 8)
    					csv_data.push(data[j])
    			}
    			// if(tarr.length>1){
    			// 	csv_data.push(tarr)
    			// 	lines.push(tarr);

    			// }
    		}
    		$('#new-inception').validate();
    	}

    	function errorHandler(evt) {
    		if(evt.target.error.name == "NotReadableError") {
    			alert("Canno't read file !");
    		}
    	}
    	$('#new-inception').validate({
    		rules: {
    			client:{
    				required:true,
    			},
    			inception_type:{
    				required:true
    			},
    			campaign:{
    				required:true
    			},
    			contractor:{
    				required:true
    			},
    			format:{
    				required:true
    			},
    			condition:{
    				required:true
    			},
    			proximity_check:{
    				required:true
    			},
    			voice_check:{
    				required:true
    			},
    			zipcode:{
    				required:true
    			},
    			job_file:{
    				required:true,
    				extension: "csv",
    				is_csv_format_correct:true
    			}

    		},

    		messages: {
    			client:"Please Enter client name",
    			inception_type:"Please Choose Inspection Type",
    			campaign:"Please Enter Campaign",
    			contractor:"Please Enter contractor",
    			format:"Please Enter format",
    			proximity_check:"Please Choose proximity check",
    			voice_check:"Please Enter Share of voice check",
    			condition:"Please Enter condition check",
    			contractor:"Please Enter contractor",
    			zipcode:"Please Enter zipcode",
    			job_file:"Please pick a csv file"
    		},


    		submitHandler: function(form) {
    			var job_list = csv_data
    			job_list.shift()
    			var post_data = {
    				client:$(form).find("#client").val(),
    				dateofInspection:$(form).find("#inception_date").val(),
    				type:$(form).find("#inception_type").val(),
    				campaign:$(form).find("#campaign").val(),
    				contractor:$(form).find("#contractor").val(),
    				format:$(form).find("#format").val(),
    				conditionCheck:$(form).find("#condition").val(),
    				proximityCheck:$(form).find("#proximity_check").val(),
    				shareofVoiceCheck:$(form).find("#voice_check").val(),
    				zipCode:$(form).find("#zipcode").val(),
    				job_list:job_list,
                    jwt_token:localStorage['ooh-jwt-token']
                }
                if(typeof(localStorage['ooh-jwt-token'])!=undefined){
                   var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
                   kumulos_init.call('insertInspectiondata',post_data,function(res){

                   })
               }
               console.log(post_data)
           }
       });
    	$('#new-inception').submit(function(e){
    		e.preventDefault();
    		// csv_data.splice(0,1)


    	})
    	$("#upload-job-file").on("click",function(e){
    		e.preventDefault();
    		$("#job_file").click()
    	})
    	$.validator.addMethod('is_csv_format_correct', function (value, element, param) {
    		var files = element.files
    		handleFiles(files)
    		if(csv_data.length){
    			return true
    		}
    		else
    			return false;
    //Your Validation Here
}, '');