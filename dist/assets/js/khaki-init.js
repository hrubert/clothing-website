/*!-----------------------------------------------------------------
    Name: Khaki - HTML Multipurpose Bootstrap 4 Template
    Version: 1.5.0
    Author: nK
    Website: https://nkdev.info/
    Purchase: https://themeforest.net/item/khaki-multiconcept-bootstrap-4-html-template/16826910?ref=_nK
    Support: https://nk.ticksy.com/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2018.
-------------------------------------------------------------------*/
    /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
var options = {
    enableSearchAutofocus: true,
    enableActionLikeAnimation: true,
    enableShortcuts: true,
    enableMouseParallax: true,
    scrollToAnchorSpeed: 700,
    parallaxSpeed: 0.8,

    templates: {
        secondaryNavbarBackItem: 'Back',

        likeAnimationLiked: 'Liked!',
        likeAnimationDisliked: 'Disliked!',

        plainVideoIcon: '<span class="nk-video-icon"><span class="fa fa-play pl-5"></span></span>',
        plainVideoLoadIcon: '<span class="nk-loading-spinner"><i></i></span>',
        fullscreenVideoClose: '<span class="nk-icon-close"></span>',
        gifIcon: '<span class="nk-gif-icon"><span class="fa fa-hand-pointer-o"></span></span>',

        quickViewPortfolio: '<div class="nk-page-nav">\n                <a href="javascript:void(0)" class="nk-page-nav-prev">\n                    <div class="icon">\n                        <span class="ion-ios-arrow-left"></span>\n                    </div>\n                    <div class="nk-page-nav-title"></div>\n                    <div class="nk-page-nav-img">\n                        <div style="background-image: url();"></div>\n                    </div>\n                </a>\n                <a href="javascript:void(0)" class="nk-page-nav-next">\n                    <div class="icon">\n                        <span class="ion-ios-arrow-right"></span>\n                    </div>\n                    <div class="nk-page-nav-title"></div>\n                    <div class="nk-page-nav-img">\n                        <div style="background-image: url();"></div>\n                    </div>\n                </a>\n            </div>',
        quickViewStore: '<div class="nk-page-nav-2">\n                <a href="javascript:void(0)" class="nk-page-nav-prev">\n                    <div class="icon">\n                        <span class="ion-ios-arrow-left"></span>\n                    </div>\n                    <div class="nk-page-nav-img">\n                        <img src="" alt="">\n                    </div>\n                    <div class="nk-page-nav-title">\n                        <div class="nk-product-category mt-0"></div>\n                        <h5 class="nk-product-title mb-0"></h5>\n                    </div>\n                </a>\n                <a href="javascript:void(0)" class="nk-page-nav-next">\n                    <div class="icon">\n                        <span class="ion-ios-arrow-right"></span>\n                    </div>\n                    <div class="nk-page-nav-img">\n                        <img src="" alt="">\n                    </div>\n                    <div class="nk-page-nav-title">\n                        <div class="nk-product-category mt-0"></div>\n                        <h5 class="nk-product-title mb-0"></h5>\n                    </div>\n                </a>\n            </div>',
        quickViewCloseIcon: '<span class="nk-icon-close"></span>',

        audioPlaylistButton: '<div class="nk-audio-playlist-play-pause">\n                <span class="nk-audio-playlist-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-playlist-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',
        audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',

        instagram: '<div class="col-4">\n                <a href="{{link}}" target="_blank">\n                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">\n                </a>\n            </div>',
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter: '<div class="nk-twitter">\n                <span class="nk-twitter-icon fa fa-twitter"></span>\n                <div class="nk-twitter-date">\n                    <span>{{date}}</span>\n                </div>\n                <div class="nk-twitter-text">\n                   {{tweet}}\n                </div>\n            </div>',
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown: '<div>\n                <span>%D</span>\n                Days\n            </div>\n            <div>\n                <span>%H</span>\n                Hours\n            </div>\n            <div>\n                <span>%M</span>\n                Minutes\n            </div>\n            <div>\n                <span>%S</span>\n                Seconds\n            </div>'
    },

    shortcuts: {
        toggleSearch: 's',
        showSearch: '',
        closeSearch: 'esc',

        toggleShare: 'n',
        showShare: '',
        closeShare: 'esc',

        closeFullscreenVideo: 'esc',

        closeQuckView: 'esc',

        audioPlayerPlayPause: 'shift+p',
        audioPlayerPlay: '',
        audioPlayerPause: '',
        audioPlayerForward: 'shift+right',
        audioPlayerBackward: 'shift+left',
        audioPlayerVolumeUp: 'shift+up',
        audioPlayerVolumeDown: 'shift+down',
        audioPlayerMute: 'shift+m',
        audioPlayerLoop: 'shift+l',
        audioPlayerShuffle: 'shift+s',
        audioPlayerPlaylist: 'shift+a',
        audioPlayerPin: 'shift+r',

        postLike: 'l',
        postDislike: 'd',
        postScrollToComments: 'c',

        toggleSideLeftNavbar: 'alt+l',
        openSideLeftNavbar: '',
        closeSideLeftNavbar: 'esc',

        toggleSideRightNavbar: 'alt+r',
        openSideRightNavbar: '',
        closeSideRightNavbar: 'esc',

        toggleFullscreenNavbar: 'alt+f',
        openFullscreenNavbar: '',
        closeFullscreenNavbar: 'esc'
    },
    events: {
        actionHeart: function actionHeart(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(function () {
                var result = params.currentNum + (params.type === 'like' ? 1 : -1);
                params.updateNum(result);
            }, 300);
        },
        actionLike: function actionLike(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(function () {
                var additional = 0;
                if (params.type === 'like') {
                    if (params.isLiked) {
                        additional = -2;
                    }
                    if (params.isDisliked) {
                        additional = 1;
                    }
                }
                if (params.type === 'dislike') {
                    if (params.isLiked) {
                        additional = -1;
                    }
                    if (params.isDisliked) {
                        additional = 2;
                    }
                }
                var result = params.currentNum + (params.type === 'like' ? 1 : -1) + additional;
                params.updateNum(result);
            }, 300);
        },


        /* eslint no-unused-vars: 0 */
        quickViewOpen: function quickViewOpen($quickView) {},
        beforeQuickViewClose: function beforeQuickViewClose($quickView) {},
        quickViewClosed: function quickViewClosed($quickView) {},
        beforeQuickViewLoad: function beforeQuickViewLoad($frameDoc) {},
        quickViewLoad: function quickViewLoad($frameDoc) {},
        quickViewLoaded: function quickViewLoaded($frameDoc) {}
    }
};

exports.options = options;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _options = __webpack_require__(1);

if (typeof Khaki !== 'undefined') {
    Khaki.setOptions(_options.options);
    Khaki.init();
}

/***/ })
/******/ ]);