	$('.select-type').selectize();

// add group
var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
'(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

var formatName = function(item) {
	return $.trim((item.name));
};
var formatId = function(item) {
	return $.trim((item.userDataID));
};

var kumulos_init= Kumulos.initWithAPIKeyAndSecretKey('05a0cda2-401b-4a58-9336-69cc54452eba', 'EKGTFyZG5/RQe7QuRridgjc0K8TIaKX3wLxC');
kumulos_init.call('auditordetails',{jwt_token:localStorage['ooh-jwt-token']},function(res){
	console.log(res)
	debugger
	var list = []
	$('#select-to').selectize({
		plugins: ['remove_button'],
		persist: false,
		maxItems: null,
		valueField: 'name',
		labelField: 'name',
		options: res,
		render: {
			item: function(item, escape) {
				console.log(item)
				var name = formatName(item);
				var user_id = formatId(item)
				return '<div>' +
				('<span class="name" data-id="'+user_id+'">' + escape(name) + '</span>') +
				'</div>';
			},
			option: function(item, escape) {
				var name = formatName(item);
				var user_id = formatId(item)
				return '<div>' +
				('<span class="caption" data-id="'+user_id+'">' + escape(name) + '</span>') +
				'</div>';
			}
		}
	});

})
