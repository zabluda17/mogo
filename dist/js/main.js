$(function() {
	var header = $("#header"),
		 introH = $("#intro").innerHeight(),
		 scrollOffset = $(window).scrollTop();


	/* Fixed Header */
	checkScroll(scrollOffset);

	$(window).on("scroll", function() {
		scrollOffset = $(this).scrollTop();
		
		checkScroll(scrollOffset);
	});

	function checkScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass("fixed");
		} else {
			header.removeClass("fixed");
		}
	}

	/* Smoth Scroll */

	$("[data-scroll]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this), 
			 elId = $this.data('scroll'),
			 blockOffset = $(elId).offset().top;

		$("#nav a").removeClass("active");
		$this.addClass("active");

		$("html, body").animate({
			scrollTop: blockOffset
		}, 1000)
	});

	/* Nav-Toggle */

	$("#nav_toggle").on("click", function(event) {
		event.preventDefault();

		$(this).toggleClass('active');
		$("nav").toggleClass("active");
	})	

	/* Collapse */

	$("[data-collapse]").on("click", function(event) {
		event.preventDefault();

		var $this = $(this),
			 colID = $this.data('collapse');

		$this.toggleClass("active");
	});

	/* Slider */

	$("[data-slider]").slick({
		infinite: true,
		fade: false,
		slidesToShow: 1,
		slidesToScroll: 1

	});
});
