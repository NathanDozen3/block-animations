import { InspectorControls, } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
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
			animationDirection: { type: 'string' }
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
		const { animation, animationDirection } = attributes;

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Block Animations' ) }
					>
						<SelectControl
							label={ __( 'Animation' ) }
							value={ animation }
							options={ [
								{
									label: __( 'None' ),
									value: ''
								},
								{
									label: __( 'Fade' ),
									value: 'fade'
								},
								{
									label: __( 'Zoom' ),
									value: 'zoom'
								}
							] }
							onChange={ ( value ) => {
								setAttributes( {
									animation: value,
								} );
							} }
						/>
						{ (animation && animation === 'fade')&& (
							<SelectControl
								label={ __( 'Direction' ) }
								value={ animationDirection }
								options={ [
									{
										label: __( 'None' ),
										value: ''
									},
									{
										label: __( 'Up' ),
										value: 'up'
									},
									{
										label: __( 'Down' ),
										value: 'down'
									},
									{
										label: __( 'Left' ),
										value: 'left'
									},
									{
										label: __( 'Right' ),
										value: 'right'
									}
								] }
								onChange={ ( value ) => {
									setAttributes( {
										animationDirection: value,
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
	const { animation, animationDirection } = attributes;

	let dataBa = null;
	if ( animation ) {
		dataBa = animation;

		if ( animationDirection ) {
			dataBa += '-';
			dataBa += animationDirection;
		}

		extraProps[ 'data-ba' ] = dataBa;
	}

    return extraProps;

};
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'block-animations/save-attributes',
	blockAnimationsSaveAttributes
);
