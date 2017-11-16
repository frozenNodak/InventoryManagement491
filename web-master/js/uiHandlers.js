/**
 * The uiHandler handles elements of the user interface
 * including the menu button and its animation classes, as well
 * as the mask overlay when navigation is displayed on smaller screens
 */
$( document ).ready(function() {
	var menuOpen = false;
	$('#menu').click(function() { // when the menu button is clicked, animate it
		if (menuOpen) {
			menuOpen = false;
			$(this).removeClass("click");
			$("nav, #navMask").removeClass("open");
		} else {
			menuOpen = true;
			$(this).addClass("click");
			$("nav, #navMask").addClass("open");
		}
	});
	
	$('#navMask').click(function() { // When the nav mask is clicked, hide the menu and display the main content
		if (menuOpen) {
			menuOpen = false;
			$("#menu").removeClass("click");
			$("nav, #navMask").removeClass("open");
		} else {
			menuOpen = true;
			$("menu").addClass("click");
			$("nav, #navMask").addClass("open");
		}
	});
	
	$('.nav-link').click(function() { // when a navigational link is clicked, hide the menu to display the view
		if (menuOpen) {
			menuOpen = false;
			$("#menu").removeClass("click");
			$("nav, #navMask").removeClass("open");
		}
	});
	
});