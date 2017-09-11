// Main JS goes here
var base = {
	init: function() {
		var self = this;

		// ----- FIX IOS CLICK DELAYS ----- //
		FastClick.attach(document.body);

		// ----- MANTLE CAROUSELS ----- //
		$('[data-slider]').each(function() {
			$(this).flexslider({
				animation: 'fade',
				pauseOnHover: true,
				directionNav: true,
				controlNav: true,
				useCSS: false,
				start: function(slider) {
					$(window).trigger('resize');
				}
			});
		});

		// ----- SCROLL MAGIC ----- //
		var controller = new ScrollMagic.Controller();

		// Fade In
		$('.scrollmagic__fade-in').each(function() {
			var fadeInScene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: 0.9,
				reverse: false
			})
			.setClassToggle(this, 'scrollmagic__fade-in--show')
			// .addIndicators()
			.addTo(controller);
		});

		// Fade In Up
		$('.scrollmagic__fade-in-up').each(function() {
			var fadeInUpScene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: 0.9,
				reverse: false
			})
			.setClassToggle(this, 'scrollmagic__fade-in-up--show')
			// .addIndicators()
			.addTo(controller);
		});

		// ----- TWITTER FOLLOW BUTTON ----- //
		window.twttr = (function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0],
				t = window.twttr || {};
			if (d.getElementById(id)) return t;
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://platform.twitter.com/widgets.js';
			fjs.parentNode.insertBefore(js, fjs);
			t._e = [];
			t.ready = function(f) {
				t._e.push(f);
			};
			return t;
		}(document, 'script', 'twitter-wjs'));

		// ----- TWITTER FEED ----- //
		var twitterFeed = {
			"id": '682734924676206592',
			"domId": 'twitter-feed',
			"maxTweets": 20,
			"enableLinks": true,
			"showUser": false,
			"showInteraction": false
		};
		twitterFetcher.fetch(twitterFeed);

		// ----- TOGGLE ----- //
		$('[data-toggle-class]').on('click', function() {
			var element = $(this),
				className = element.data('toggle-class'),
				// You can override by setting data-toggle-class-on='any-element'
				target = typeof(element.data('toggle-class-on')) === 'undefined' ? $('html') : $(element.data('toggle-class-on'));

			// Toggle the class
			target.toggleClass(className);
			return false;
		});

		$('[data-toggle]').on('click', function() {
			// Check if theres a data-toggle-max-width
			if ($(this).data('toggle-max-width')) var toggleMaxWidth = $(this).data('toggle-max-width');

			// Toggle if under the data=toggle-max-width, or if there is no data-toggle-max-width set
			if (toggleMaxWidth && self.getBreakpoint() < toggleMaxWidth || typeof(toggleMaxWidth) === 'undefined') {
				self.dataToggle($(this));
				return false;
			}
		});
	},
	getBreakpoint: function() {
		var breakpoint;
		if (window.getComputedStyle) {
			breakpoint = window.getComputedStyle(
				document.querySelector('body'), ':before'
			).getPropertyValue('content');

			breakpoint = parseInt(breakpoint.replace("'","").replace('"',''));
		} else { // IE8 fallback
			breakpoint = $(window).width();
		}
		return breakpoint;
	},
	dataToggle: function(e) {
		var speed = 400,
			toggleData = e.data('toggle'),
			container = e.closest(':has('+toggleData+')');

		// Toggle siblings (if [data-siblings] is set)
		if (e.data('toggle-siblings')) {
			var siblings = e.closest(e.data('toggle-siblings')).siblings().find(toggleData);
			siblings.slideUp(speed).closest('.active-toggle').removeClass('active-toggle');
		}

		// Toggle element
		e.closest(container).toggleClass('active-toggle').find(toggleData).slideToggle(speed);
	}
};

$(function() {
	base.init();
});
