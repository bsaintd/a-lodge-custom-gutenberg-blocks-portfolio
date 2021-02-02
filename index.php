<?php

/**
 * Plugin Name: A-Lodge Blocks
 * Plugin URI: https://github.com/fueledonbacon/alodge-plugin.git
 * Description: Custom gutenberg blocks.
 * Version: 1.0.7
 * Author: Ryan Cwynar
 *
 * @package alodge
 */

defined('ABSPATH') || exit;

define('PLUGIN_FOLDER', 'alodge');
/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 * 
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action('init', 'a_lodge_load_textdomain');

function a_lodge_load_textdomain()
{
  load_plugin_textdomain('alodge', false, basename(__DIR__) . '/languages');;
}

/** 
 * Add custom image size for block featured image.
 * 
 * @link https://developer.wordpress.org/reference/functions/add_image_size/
 */
add_action('init', 'a_lodge_add_image_size');

function a_lodge_add_image_size()
{
  add_image_size('alodgeFeatImg', 250, 250, array('center', 'center'));
}

/** 
 * Register custom image size with sizes list to make it available.
 * 
 * @link https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
 */
add_filter('image_size_names_choose', 'a_lodge_custom_sizes');

function a_lodge_custom_sizes($sizes)
{
  return array_merge($sizes, array(
    'alodgeFeatImg' => __('A-Lodge Featured Image'),
  ));
}

/** 
 * Add custom "Podkit" block category
 * 
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter('block_categories', 'a_lodge_block_categories', 10, 2);

function a_lodge_block_categories($categories, $post)
{
  $array = array_merge(
    $categories,
    array(
      array(
        'slug' => 'alodge',
        'title' => __('A-Lodge', 'alodge'),
        'icon'  => null,
      ),
    )
  );
  return $array;
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action('init', 'a_lodge_register_blocks');
add_action('enqueue_block_editor_assets', 'a_lodge_register_blocks');



function a_lodge_register_blocks()
{

  // If Block Editor is not active, bail.
  if (!function_exists('register_block_type')) {
    return;
  }

  // Retister the block editor script.
  wp_register_script(
    'alodge-editor-script',                      // label
    plugins_url('build/index.js', __FILE__),            // script file
    array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),    // dependencies
    filemtime(plugin_dir_path(__FILE__) . 'build/index.js')    // set version as file last modified time
  );

  // Register the block editor stylesheet.
  wp_register_style(
    'alodge-editor-styles',                      // label
    plugins_url('build/editor.css', __FILE__),          // CSS file
    array('wp-edit-blocks'),                    // dependencies
    null  // set version as file last modified time
  );

  // Register the front-end stylesheet.
  wp_register_style(
    'alodge-front-end-styles',                    // label
    plugins_url('build/style.css', __FILE__),            // CSS file
    array(),    // dependencies
    null  // set version as file last modified time
  );

  // Array of block created in this plugin.
  $blocks = [
    'alodge/alternating-sections',
  ];

  // Loop through $blocks and register each block with the same script and styles.
  foreach ($blocks as $block) {
    register_block_type($block, array(
      'editor_script' => 'alodge-editor-script',          // Calls registered script above
      'editor_style' => 'alodge-editor-styles',          // Calls registered stylesheet above
      'style' => 'alodge-front-end-styles',            // Calls registered stylesheet above
    ));
  }

  $blocks = [
    'alodge/tiles',
  ];

  // Loop through $blocks and register each block with the same script and styles.
  foreach ($blocks as $block) {
    register_block_type($block, array(
      'editor_script' => 'alodge-editor-script',          // Calls registered script above
      'editor_style' => 'alodge-editor-styles',          // Calls registered stylesheet above
      'style' => 'alodge-front-end-styles',
      'attributes' => array(
        'post_type' => array(
          'type' => 'string',
          'default' => 'post',
        ),
      ),
      'render_callback' => 'wp_alodge_render_tiles'
    ));
  }

  if (function_exists('wp_set_script_translations')) {
    /**
     * Adds internationalization support. 
     * 
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
     * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
     */
    wp_set_script_translations('alodge-editor-script', 'alodge', plugin_dir_path(__FILE__) . '/languages');
  }
}

// Custom PHP Below

function wp_alodge_render_tiles($block_attributes, $content)
{
  $arr = get_posts(array("post_type" => $block_attributes['post_type'], "numberposts" => -1));
  $result = '';
  foreach ($arr as $room) {
    $result = $result . sprintf(
      '<div class="room"
			style="background-image: url(%1$s)">
			<h2>%2$s</h2>
			<p class="copy">%3$s</p>
			<div class="cta-wrapper">
					<a
						href="%4$s"
						target=""
						class="cta"
						id="%5$s">
						Learn More
					</a>
			</div>
			</div>
			',
      esc_url(get_the_post_thumbnail_url($room->ID)),
      esc_html(substr($room->post_title, 0, 32)),
      esc_html(substr($room->post_excerpt, 0, 230)),
      esc_url(get_permalink($room->ID)),
      esc_html(hash('crc32', substr($room->post_title, 0, 32)))
    );
  }

  return $result;
}

add_filter('body_class', function ($classes) {
  global $post;
  return array_merge($classes, array($post->post_name));
});

add_filter('storefront_credit_link', '__return_false');

function a_lodge_plugin_scripts()
{
  wp_enqueue_script('fa-kit', 'https://kit.fontawesome.com/8437b8bd96.js', array('jquery'), '5.9.0', true); // -- From an External URL
  wp_enqueue_style('alodge-block-style', plugins_url('alodge/build/style.css'), array('theme-style'), null);

  // slug-specific scripts
  global $post;
  $pagename = $post->post_name;
  if (!empty($pagename)) {
    $relative_path = PLUGIN_FOLDER . "/js/$pagename.js";
    $server_path = plugin_file("js/$pagename.js");
    if (file_exists($server_path)) {
      wp_enqueue_script("alodge-$pagename-script", plugins_url($relative_path), array('jquery', 'jquery-ui', 'vue-cdn', 'vue-datepicker'), null, true);
    }
    wp_enqueue_script("vue-cdn", "https://unpkg.com/vue", array(), null, true);
    wp_enqueue_script("vue-date-range-app", plugins_url(PLUGIN_FOLDER . "/date-range-app/dist/date-range-app.umd.js"), array('vue-cdn'), null, true);
  }
  wp_enqueue_script("alodge-frontend-scripts", plugins_url('build/frontend.js', __FILE__), array('jquery'), null, true);
}

add_action('wp_enqueue_scripts', 'a_lodge_plugin_scripts');

add_theme_support('align-wide', 'align-full');

function plugin_file($str)
{
  return plugin_dir_path(__FILE__) . $str;
}

function register_acf_block_types()
{
}

// Check if function exists and hook into setup.
if (function_exists('acf_register_block_type')) {
  add_action('acf/init', 'register_acf_block_types');
}
