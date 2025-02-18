window.onload = function () {
	const BLOCK_ANIMATIONS_SELECTOR = '[data-block-animations]';
	const BLOCK_ANIMATIONS_ANIMATED_CLASS = 'block-animate';

	const DEFAULT_CONFIG = {
		root: null,
		rootMargin: '0px',
		threshold: [ 0.5 ],
	};

	const intersectionObserverCallback = function ( entries ) {
		entries.forEach( ( entry ) => {
			const isIntersecting = entry.isIntersecting;
			const element = entry.target;

			const config = JSON.parse(
				entry.target.dataset.blockAnimationsConfig
			);
			const delay = config.delay ?? 0;

			if ( isIntersecting === true ) {
				setTimeout( function () {
					element.classList.add( BLOCK_ANIMATIONS_ANIMATED_CLASS );
				}, delay );
			} else {
				setTimeout( function () {
					element.classList.remove( BLOCK_ANIMATIONS_ANIMATED_CLASS );
				}, delay );
			}
		} );
	};

	document
		.querySelectorAll( BLOCK_ANIMATIONS_SELECTOR )
		.forEach( function ( el ) {
			let config = JSON.parse( el.dataset.blockAnimationsConfig );

			for ( var key in DEFAULT_CONFIG ) {
				if ( undefined === config[ key ] ) {
					config[ key ] = DEFAULT_CONFIG[ key ];
				}
			}
			for ( var key in config ) {
				let dataAttr = 'data-block-animations';
				if ( key !== 'animation' ) {
					dataAttr += '-' + key;
					el.setAttribute( dataAttr, config[ key ] );
				}
				if ( key === 'duration' ) {
					el.style.setProperty(
						'--blockAnimations-transition-' + key,
						config[ key ] + 'ms'
					);
				}
			}

			let observer = new IntersectionObserver(
				intersectionObserverCallback,
				config
			);
			observer.observe( el );
		} );
};
