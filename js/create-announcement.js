	$('.select-type').selectize();

// add group
var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
	'(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

var formatName = function(item) {
	return $.trim((item.name));
};

$('#select-to').selectize({
	plugins: ['remove_button'],
	persist: false,
	maxItems: null,
	valueField: 'name',
	labelField: 'name',
	options: [
		{
			name: 'Tesla'
		},
		{
			name: 'Reavis'
		},
		{
			name: 'Tesla'
		},
		{
			name: 'Reavis'
		}
	],
	render: {
		item: function(item, escape) {
			var name = formatName(item);
			return '<div>' +
				('<span class="name">' + escape(name) + '</span>') +
			'</div>';
		},
		option: function(item, escape) {
			var name = formatName(item);
			return '<div>' +
				('<span class="caption">' + escape(name) + '</span>') +
			'</div>';
		}
	}
});