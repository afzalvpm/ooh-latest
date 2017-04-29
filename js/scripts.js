// common variable
var windowWidth =  $(window).width();

// sidebar script
$("#sidebar").addClass("inactive");
$(".hamburger-menu").on("click",function () {
	if ($("#sidebar").hasClass("inactive")) {
		$(".black-opc").removeClass("hide").addClass("active");
		$("#sidebar").addClass("active").removeClass("inactive");
		$(".overflow-scroll").addClass("active");
	}
});
// sidebar close on click opacity
$(document).on('click','.black-opc.active', function() {
	if ($("#sidebar").hasClass("active")) {
		$(".black-opc").addClass("hide").removeClass("active");
		$("#sidebar").removeClass("active");
		$("#sidebar").addClass("inactive");
		$(".overflow-scroll").removeClass("active");
	}
});

// sidebar nicescroll script
// $(".sidebar-list").niceScroll({
// 	cursorcolor:"#2e3458",
// 	cursorborder:"1px solid #2e3458",
// 	cursorborderradius:"0px;",
// 	cursoropacitymin:"1",
// 	cursoropacitymax:"1",
// 	cursorwidth:"5",
// });