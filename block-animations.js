window.onload = function(){
	const BLOCK_ANIMATIONS_SELECTOR = '[data-block-animations]';
	const BLOCK_ANIMATIONS_ANIMATED_CLASS = 'block-animate';

	const DEFAULT_CONFIG = {
		root: null,
		rootMargin: '0px',
		threshold: [0.5]
	};

	const intersectionObserverCallback = function( entries ) {
		entries.forEach(entry => {
			const isIntersecting = entry.isIntersecting
			const element = entry.target;

			if (isIntersecting === true){
				element.classList.add(BLOCK_ANIMATIONS_ANIMATED_CLASS);
			} else {
				element.classList.remove(BLOCK_ANIMATIONS_ANIMATED_CLASS);
			}
		})
	}

	document.querySelectorAll(BLOCK_ANIMATIONS_SELECTOR).forEach(function(el){
		let config = JSON.parse(el.dataset.blockAnimationsConfig);
		for (var key in DEFAULT_CONFIG) {
			if(undefined === config[key]) {
				config[key] = DEFAULT_CONFIG[key];
			}
		}
		let observer = new IntersectionObserver(intersectionObserverCallback, config);
		observer.observe(el);
	});

}
