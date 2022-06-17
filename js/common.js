$(function() {
  

	// Появление меню

	$('.top-line__menu-toggle--header').click(function(){
     $('.top-line__menu').slideToggle();
		 return false;
	});

	// Трансфрмация гамбургера меню

	$('.menu-toggle').click(function(){
		$(this).toggleClass('menu-toggle--on')
	});



	// Галерея Magnific-popup
	 
	$('.gallery-works').magnificPopup({
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image',
	gallery: {
      enabled: true 
    }
  });

	$('.gallery-certificates').magnificPopup({
  delegate: 'a', // child items selector, by clicking on it popup will open
  type: 'image',
	gallery: {
      enabled: true 
    }
  });

	$(".objects__item").each(function(e) {

		var th = $(this);

		th.attr("href", "#portfolio-img-" + e)
			.find(".objects__popup")
				.attr("id", "portfolio-img-" + e);

	});

	$('.objects__item').magnificPopup();
	$('a[href= "#callback"]').magnificPopup({
		removalDelay: 300,
		type: 'inline',
	});
  
	// Плавная прокрутка при нажатии на Mouse Icon

	$('.mouse-icon').click(function(){
    $('html, body').animate({
			scrollTop: $('.main-advantages').offset().top
		}, 800)
	});

	// Preloader
	$(window).on('load', function() {
		$('.preloader').delay(1000).fadeOut('slow');
	});


  // Счетчик animateNumber + запуск по Scroll
	 $('#advant').waypoint(function() {
    $('.advantages__item span b').each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({
			number: tcount
		});
		});
		this.destroy();
	});

	// EqualHeight колонки одинаковой высоты
	function heightses() {
		$('.services__item-info').height('auto').equalHeights();
		$('.hardware__info').height('auto').equalHeights();
		$('.connect__name').height('auto').equalHeights();
		$('.feedbacks__content').height('auto').equalHeights();
	}

	heightses();

	$(window).resize(function() {
		heightses();
	});

	//Replace all SVG images with inline SVG
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

	});

	// Слайдеры
  
	$(".hardware__list").owlCarousel({
		loop: true,
		margin: 30,
		dots: true,
    responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
    }
	});

	$(".partners__list").owlCarousel({
		loop: true,
		dots: false,
		nav: true,
    responsive: {
			0: {
				items: 1
			},
			520:{
				items:1,
			},
			560: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
    }
	});

	// Selectize - кастомизация поля Select в форме обратной связи

	$('.select-custom').selectize();

	// Замена заголовка во всплывающих формах

	$('a[href="#callback"]').click(function() {
		var dataForm = $(this).data("form");
		var dataText = $(this).data("text");
		$('.callback__main h3').text(dataText);
		$('.callback__main [name = admin-data]').val(dataForm);
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			th.find(".callback__success").addClass("active");
			setTimeout(function() {
				// Done Functions
				th.find(".callback__success").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});

	// Кнопка Наверх
	$('body').append('<div class ="top"><i class= "fa fa-angle-double-up"</i></div>');
  });

	$("body").on('click', ".top", function() {
		$("html, body").animate({scrollTop: 0}, "slow");
	});	

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	})
