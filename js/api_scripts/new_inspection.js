var result;
var is_headers_correct = false;
function get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    // console.log(headers)
    if(headers.indexOf("Site_Id")>-1 && headers.indexOf("Panal_id")>-1 && headers.indexOf("Location")>-1 && headers.indexOf("Suburb")>-1 && headers.indexOf("Latitude")>-1 && headers.indexOf("Longitude")>-1 && headers.indexOf("End_Date")>-1  && headers.indexOf("Job_Type"))
        return true;
    else
        return false;
    // return headers;
}
function handleFile(e) {
     //Get the files from Upload control
     var files = $("#job_file").prop('files')[0];
     var i, f;
     // var f = 


     //Loop through files
        var reader = new FileReader();
        var name = files.name;
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });

            var sheet_name_list = workbook.SheetNames;

            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                    //Convert the cell value to Json
                    is_headers_correct = get_header_row(workbook.Sheets[y])
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                    result = roa;
                    if (roa.length > 0) {
                        result = roa;
                    }
                    console.log(roa)
                });
            // console.log(result)

               //Get the first column first cell value
           };
           reader.readAsArrayBuffer(files);
       // console.log({result:result,is_headers_correct:is_headers_correct})
       return true
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
        extension: "xlsx",
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
   job_file:"Please pick a xlsx file"
},


submitHandler: function(form) {
   // var job_list = csv_data
   // job_list.shift()
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
    job_list:result,
    jwt_token:localStorage['ooh-jwt-token']
}
if(typeof(localStorage['ooh-jwt-token'])!=undefined){
   var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
    kumulos_init.call('insertdata',{'data':post_data,jwt_token:localStorage['ooh-jwt-token']},function(res){
    console.log(res)
    if(res[0].status=="success"){
        // window.location="/add-new-jobs/?inspectionid="+res[0].id
    }

})
}
console.log(post_data)
}
});
   $('#job_file').change(handleFile);
   $('#new-inception').submit(function(e){
      e.preventDefault();
    		// csv_data.splice(0,1)


    	})
   $("#upload-job-file").on("click",function(e){
      e.preventDefault();
      $("#job_file").click()
  })
   $.validator.addMethod('is_csv_format_correct', function (value, element, param) {
      // var aaa = $('#job_file').trigger("change")
      // console.log(aaa)
      // if(csv_data.length){
        if(result.length && is_headers_correct ==true)
          return true
        else false
   // }
   // else
       // return false;
    //Your Validation Here
}, '');