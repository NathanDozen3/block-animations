<?php
/**
 * Plugin Name:	      Block Animations
 * Description:	      Add animations to Gutenberg blocks.
 * Requires at least: 6.3
 * Requires PHP:      8.0
 * Version:           0.1.0
 * Author:            Nathan Johnson
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-animations
 */

declare(strict_types=1);
namespace NathanDozen3\blockAnimations;

define( 'BLOCK_ANIMATIONS_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLOCK_ANIMATIONS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Enqueue block animations front-end assets.
 *
 * @return void
 */
function enqueue_assets() : void {
	wp_enqueue_style( 'block-animations', BLOCK_ANIMATIONS_URL . '/block-animations.css' );
	wp_enqueue_script( 'block-animations', BLOCK_ANIMATIONS_URL . '/block-animations.js' );
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets' );

/**
 * Register the block animations editor script.
 *
 * @return void
 */
function editor_script() : void {
	wp_register_script(
		'block-animations',
		BLOCK_ANIMATIONS_URL . 'build/index.js',
		[ 'wp-blocks', 'wp-dom', 'wp-dom-ready', 'wp-edit-post' ],
		filemtime( BLOCK_ANIMATIONS_PATH . 'build/index.js' )
	);
	wp_enqueue_script( 'block-animations' );
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\editor_script' );
