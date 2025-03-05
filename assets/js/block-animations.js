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

			const config = JSON.parse( element.dataset.blockAnimationsConfig );
			const delay = config.delay ?? 0;

			if ( isIntersecting ) {
				setTimeout( () => {
					window.requestAnimationFrame( () => {
						element.classList.add(
							BLOCK_ANIMATIONS_ANIMATED_CLASS
						);
					} );
				}, delay );
			} else {
				setTimeout( () => {
					window.requestAnimationFrame( () => {
						element.classList.remove(
							BLOCK_ANIMATIONS_ANIMATED_CLASS
						);
					} );
				}, delay );
			}
		} );
	};

	document.querySelectorAll( BLOCK_ANIMATIONS_SELECTOR ).forEach( ( el ) => {
		const config = Object.assign(
			{},
			DEFAULT_CONFIG,
			JSON.parse( el.dataset.blockAnimationsConfig )
		);

		Object.keys( config ).forEach( ( key ) => {
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
		} );
	} );

	const observer = new window.IntersectionObserver(
		intersectionObserverCallback,
		DEFAULT_CONFIG
	);
	document.querySelectorAll( BLOCK_ANIMATIONS_SELECTOR ).forEach( ( el ) => {
		observer.observe( el );
	} );
};
