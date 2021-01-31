<?php

add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
    wp_register_style('login_style', get_stylesheet_directory_uri() . "login_style.css", array('style-heisengard-all'));
    wp_enqueue_style( 'login_style');
}

?>