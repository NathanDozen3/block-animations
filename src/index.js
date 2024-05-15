import { InspectorControls, } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Declare custom attribute
 */
const blockAnimationsAddAttributes = ( settings ) => {
	return Object.assign( {}, settings, {
		attributes: Object.assign( {}, settings.attributes, {
			animation: { type: 'string' },
			animationDelay: { type: 'string' },
			animationDuration: { type: 'string' },
			animationThreshold: { type: 'string' }
		} ),
	} );
};
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'block-animations/add-attributes',
	blockAnimationsAddAttributes
);

/**
 * Add attributes to inspector controls
 */
const blockAnimationsOptions = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const { attributes, setAttributes } = props;
		const { animation, animationDelay, animationDuration, animationThreshold } = attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Block Animations' ) }
					>
						<SelectControl
							label={ __( 'Animation Effect' ) }
							value={ animation }
							options={ [
								{
									label: __( 'None' ),
									value: ''
								},
								{
									label: __( 'Fade In' ),
									value: 'fadeIn'
								},
								{
									label: __( 'Fade In Up Small' ),
									value: 'fadeInUpSmall'
								},
								{
									label: __( 'Fade In Down Small' ),
									value: 'fadeInDownSmall'
								},
								{
									label: __( 'Fade In Left Small' ),
									value: 'fadeInLeftSmall'
								},
								{
									label: __( 'Fade In Right Small' ),
									value: 'fadeInRightSmall'
								},
								{
									label: __( 'Fade In Up' ),
									value: 'fadeInUp'
								},
								{
									label: __( 'Fade In Down' ),
									value: 'fadeInDown'
								},
								{
									label: __( 'Fade In Left' ),
									value: 'fadeInLeft'
								},
								{
									label: __( 'Fade In Right' ),
									value: 'fadeInRight'
								}
								,
								{
									label: __( 'Fade In Up Large' ),
									value: 'fadeInUpLarge'
								},
								{
									label: __( 'Fade In Down Large' ),
									value: 'fadeInDownLarge'
								},
								{
									label: __( 'Fade In Left Large' ),
									value: 'fadeInLeftLarge'
								},
								{
									label: __( 'Fade In Right Large' ),
									value: 'fadeInRightLarge'
								}
							] }
							onChange={ ( value ) => {
								setAttributes( {
									animation: value,
								} );
							} }
						/>
						{animation && (
							<TextControl
								label={ __( 'Animation Threshold' ) }
								value={ animationThreshold }
								onChange={ ( value ) => {
									if (
										( isNaN(value) || isNaN(parseFloat(value)) ) &&
										value !== '.'
									) {
										value = '';
									}
									setAttributes( {
										animationThreshold: value,
									} );
								} }
							/>
						)}
						{animation && (
							<TextControl
								label={ __( 'Animation Delay' ) }
								help={ __( 'In milliseconds' ) }
								value={ animationDelay }
								onChange={ ( value ) => {
									if (
										( isNaN(value) || isNaN(parseFloat(value)) ) &&
										value !== '.'
									) {
										value = '';
									}
									setAttributes( {
										animationDelay: value,
									} );
								} }
							/>
						)}
						{animation && (
							<TextControl
								label={ __( 'Animation Duration' ) }
								help={ __( 'In milliseconds' ) }
								value={ animationDuration }
								onChange={ ( value ) => {
									if (
										( isNaN(value) || isNaN(parseFloat(value)) ) &&
										value !== '.'
									) {
										value = '';
									}
									setAttributes( {
										animationDuration: value,
									} );
								} }
							/>
						)}
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'blockAnimationsOptions' );

wp.hooks.addFilter(
	'editor.BlockEdit',
	'block-animations/options',
	blockAnimationsOptions
);

/**
 * Save custom attribute
 */
const blockAnimationsSaveAttributes = ( extraProps, blockType, attributes ) => {
	const { animation, animationDelay, animationDuration, animationThreshold } = attributes;

	if ( animation ) {
		let config = {
			animation: animation
		}
		if (animationDelay) {
			config.delay = animationDelay;
		}
		if (animationDuration) {
			config.duration = animationDuration;
		}
		if (animationThreshold) {
			config.threshold = [ animationThreshold ];
		}
		extraProps[ 'data-block-animations' ] = animation;
		extraProps[ 'data-block-animations-config' ] = JSON.stringify(config);
	}

    return extraProps;

};
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'block-animations/save-attributes',
	blockAnimationsSaveAttributes
);
