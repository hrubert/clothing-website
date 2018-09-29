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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*------------------------------------------------------------------

  Utility

-------------------------------------------------------------------*/
var $ = jQuery;
var tween = window.TweenMax;
var isIOs = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/g.test(navigator.userAgent || navigator.vendor || window.opera);
var isFireFox = typeof InstallTrigger !== 'undefined';
var isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;

// add 'is-mobile' or 'is-desktop' classname to html tag
$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

/**
 * window size
 */
var $wnd = $(window);
var $doc = $(document);
var $body = $('body');
var wndW = 0;
var wndH = 0;
var docH = 0;
function getWndSize() {
    exports.wndW = wndW = $wnd.width();
    exports.wndH = wndH = $wnd.height();
    exports.docH = docH = $doc.height();
}
getWndSize();
$wnd.on('resize load orientationchange', getWndSize);

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout = void 0;
function debounceResized() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (resizeArr.length) {
            for (var k = 0; k < resizeArr.length; k++) {
                resizeArr[k]();
            }
        }
    }, 50);
}
$wnd.on('ready load resize orientationchange', debounceResized);
debounceResized();

function debounceResize(func) {
    if (typeof func === 'function') {
        resizeArr.push(func);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

/**
 * page border size
 */
var $pageBorder = $('.nk-page-border .nk-page-border-t');
var pageBorderSize = $pageBorder.height() || 0;
debounceResize(function () {
    exports.pageBorderSize = pageBorderSize = $pageBorder.height() || 0;
});

/**
 * Throttle scroll
 * thanks: https://jsfiddle.net/mariusc23/s6mLJ/31/
 */
var hideOnScrollList = [];
var didScroll = void 0;
var lastST = 0;

$wnd.on('scroll load resize orientationchange', function () {
    if (hideOnScrollList.length) {
        didScroll = true;
    }
});

function hasScrolled() {
    var ST = $wnd.scrollTop();

    var type = ''; // [up, down, end, start]

    if (ST > lastST) {
        type = 'down';
    } else if (ST < lastST) {
        type = 'up';
    } else {
        type = 'none';
    }

    if (ST === 0) {
        type = 'start';
    } else if (ST >= docH - wndH) {
        type = 'end';
    }

    hideOnScrollList.forEach(function (value) {
        if (typeof value === 'function') {
            value(type, ST, lastST, $wnd);
        }
    });

    lastST = ST;
}

setInterval(function () {
    if (didScroll) {
        didScroll = false;
        window.requestAnimationFrame(hasScrolled);
    }
}, 250);

function throttleScroll(callback) {
    hideOnScrollList.push(callback);
}

/**
 * Body Overflow
 * Thanks https://jsfiddle.net/mariusc23/s6mLJ/31/
 * Usage:
 *    // enable
 *    bodyOverflow(1);
 *
 *    // disable
 *    bodyOverflow(0);
 */
var bodyOverflowEnabled = void 0;
var isBodyOverflowing = void 0;
var scrollbarWidth = void 0;
var originalBodyPadding = void 0;
var $headerContent = $('.nk-header > *');
function isBodyOverflowed() {
    return bodyOverflowEnabled;
}
function bodyGetScrollbarWidth() {
    // thx d.walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'nk-body-scrollbar-measure';
    $body[0].appendChild(scrollDiv);
    var result = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    $body[0].removeChild(scrollDiv);
    return result;
}
function bodyCheckScrollbar() {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    isBodyOverflowing = $body[0].clientWidth < fullWindowWidth;
    scrollbarWidth = bodyGetScrollbarWidth();
}
function bodySetScrollbar() {
    if (typeof originalBodyPadding === 'undefined') {
        originalBodyPadding = $body.css('padding-right') || '';
    }

    if (isBodyOverflowing) {
        $body.add($headerContent).css('paddingRight', scrollbarWidth + 'px');
    }
}
function bodyResetScrollbar() {
    $body.css('paddingRight', originalBodyPadding);
    $headerContent.css('paddingRight', '');
}
function bodyOverflow(enable) {
    if (enable && !bodyOverflowEnabled) {
        bodyOverflowEnabled = 1;
        bodyCheckScrollbar();
        bodySetScrollbar();
        $body.css('overflow', 'hidden');
    } else if (!enable && bodyOverflowEnabled) {
        bodyOverflowEnabled = 0;
        $body.css('overflow', '');
        bodyResetScrollbar();
    }
}

/**
 * In Viewport checker
 * return visible percent from 0 to 1
 */
function isInViewport($item, returnRect) {
    var rect = $item[0].getBoundingClientRect();
    var result = 1;

    if (rect.right <= 0 || rect.left >= wndW) {
        result = 0;
    } else if (rect.bottom < 0 && rect.top <= wndH) {
        result = 0;
    } else {
        var beforeTopEnd = Math.max(0, rect.height + rect.top);
        var beforeBottomEnd = Math.max(0, rect.height - (rect.top + rect.height - wndH));
        var afterTop = Math.max(0, -rect.top);
        var beforeBottom = Math.max(0, rect.top + rect.height - wndH);
        if (rect.height < wndH) {
            result = 1 - (afterTop || beforeBottom) / rect.height;
        } else if (beforeTopEnd <= wndH) {
            result = beforeTopEnd / wndH;
        } else if (beforeBottomEnd <= wndH) {
            result = beforeBottomEnd / wndH;
        }
        result = result < 0 ? 0 : result;
    }
    if (returnRect) {
        return [result, rect];
    }
    return result;
}

/**
 * Scroll To
 */
function scrollTo($to, callback) {
    var scrollPos = false;
    var speed = this.options.scrollToAnchorSpeed / 1000;

    if ($to === 'top') {
        scrollPos = 0;
    } else if ($to === 'bottom') {
        scrollPos = Math.max(0, docH - wndH);
    } else if (typeof $to === 'number') {
        scrollPos = $to;
    } else {
        scrollPos = $to.offset ? $to.offset().top : false;
    }

    if (scrollPos !== false && $wnd.scrollTop() !== scrollPos) {
        tween.to($wnd, speed, {
            scrollTo: {
                y: scrollPos,

                // disable autokill on iOs (buggy scrolling)
                autoKill: !isIOs
            },
            ease: Power2.easeOut,
            overwrite: 5
        });
        if (callback) {
            tween.delayedCall(speed, callback);
        }
    } else if (typeof callback === 'function') {
        callback();
    }
}

exports.$ = $;
exports.tween = tween;
exports.isIOs = isIOs;
exports.isMobile = isMobile;
exports.isFireFox = isFireFox;
exports.isTouch = isTouch;
exports.$wnd = $wnd;
exports.$doc = $doc;
exports.$body = $body;
exports.wndW = wndW;
exports.wndH = wndH;
exports.docH = docH;
exports.debounceResize = debounceResize;
exports.throttleScroll = throttleScroll;
exports.pageBorderSize = pageBorderSize;
exports.bodyOverflow = bodyOverflow;
exports.isBodyOverflowed = isBodyOverflowed;
exports.isInViewport = isInViewport;
exports.scrollTo = scrollTo;

/***/ }),
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
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Plugins */


var _options = __webpack_require__(1);

var _utility = __webpack_require__(0);

var _setOptions2 = __webpack_require__(6);

var _shortcuts = __webpack_require__(7);

var _initLinkEffects2 = __webpack_require__(8);

var _initSharePlace2 = __webpack_require__(9);

var _initNavbar2 = __webpack_require__(10);

var _initNavbarSide2 = __webpack_require__(11);

var _initNavbarFullscreen2 = __webpack_require__(12);

var _initNavbarDropEffect2 = __webpack_require__(13);

var _initSearchBlock2 = __webpack_require__(14);

var _initHeaderTitle2 = __webpack_require__(15);

var _initCounters2 = __webpack_require__(16);

var _initSideButtons2 = __webpack_require__(17);

var _initActionsLike2 = __webpack_require__(18);

var _initStore2 = __webpack_require__(19);

var _initBackgroundImages2 = __webpack_require__(20);

var _parallaxMouseInit2 = __webpack_require__(21);

var _initAnchors2 = __webpack_require__(22);

var _initLinesForBoxes2 = __webpack_require__(23);

var _initImageBoxes2 = __webpack_require__(24);

var _initVideoFullscreen2 = __webpack_require__(25);

var _initVideoBlocks2 = __webpack_require__(26);

var _initGIF2 = __webpack_require__(27);

var _initFullPage2 = __webpack_require__(28);

var _initQuickView2 = __webpack_require__(29);

var _initInfoBoxes2 = __webpack_require__(30);

var _initForms2 = __webpack_require__(31);

var _initFormsMailChimp2 = __webpack_require__(32);

var _initAudioPlayer2 = __webpack_require__(33);

var _initFacebook2 = __webpack_require__(34);

var _initInstagram2 = __webpack_require__(35);

var _initTwitter2 = __webpack_require__(36);

var _initPluginObjectFitImages2 = __webpack_require__(37);

var _initPluginStickySidebar2 = __webpack_require__(38);

var _initPluginFastClick2 = __webpack_require__(39);

var _initPluginNano2 = __webpack_require__(40);

var _initPluginJarallax2 = __webpack_require__(41);

var _initPluginFlickity2 = __webpack_require__(42);

var _initPluginIsotope2 = __webpack_require__(43);

var _initPluginPhotoswipe2 = __webpack_require__(44);

var _initPluginTabs2 = __webpack_require__(45);

var _initPluginAccordions2 = __webpack_require__(46);

var _initPluginCountdown2 = __webpack_require__(47);

var _initPluginTypedjs2 = __webpack_require__(48);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------------------------------------

  Khaki Class

-------------------------------------------------------------------*/
var KHAKI = function () {
    function KHAKI() {
        _classCallCheck(this, KHAKI);

        this.options = _options.options;
    }

    _createClass(KHAKI, [{
        key: 'init',
        value: function init() {
            // prt:sc:dm

            var self = this;
            self.initSharePlace();
            self.initNavbar();
            self.initNavbarSide();
            self.initNavbarFullscreen();
            self.initNavbarDropEffect1();
            self.initSearchBlock();
            self.initHeaderTitle();
            self.initSideButtons();
            self.initStore();
            self.initActionsLike();
            self.initBackgroundImages();
            self.initLinkEffects();
            self.initCounters();
            self.initAnchors();
            self.initLinesForBoxes();
            self.initImageBoxes();
            self.initVideoFullscreen();
            self.initVideoBlocks();
            self.initGIF();
            self.initFullPage();
            self.initQuickView();
            self.initInfoBoxes();
            self.initForms();
            self.initFormsMailChimp();
            self.initAudioPlayer();
            self.initFacebook();
            self.initInstagram();
            self.initTwitter();
            self.initShortcuts();

            // init plugins
            self.initPluginObjectFitImages();
            self.initPluginStickySidebar();
            self.initPluginFastClick();
            self.initPluginNano();
            self.initPluginJarallax();
            self.initPluginFlickity();
            self.initPluginIsotope();
            self.initPluginPhotoswipe();
            self.initPluginTabs();
            self.initPluginAccordions();
            self.initPluginCountdown();
            self.initPluginTypedjs();

            return self;
        }
    }, {
        key: 'setOptions',
        value: function setOptions(newOpts) {
            return _setOptions2.setOptions.call(this, newOpts);
        }
    }, {
        key: 'debounceResize',
        value: function debounceResize(func) {
            return _utility.debounceResize.call(this, func);
        }
    }, {
        key: 'throttleScroll',
        value: function throttleScroll(callback) {
            return _utility.throttleScroll.call(this, callback);
        }
    }, {
        key: 'bodyOverflow',
        value: function bodyOverflow(type) {
            return _utility.bodyOverflow.call(this, type);
        }
    }, {
        key: 'isInViewport',
        value: function isInViewport($item, returnRect) {
            return _utility.isInViewport.call(this, $item, returnRect);
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo($to, callback) {
            return _utility.scrollTo.call(this, $to, callback);
        }
    }, {
        key: 'key',
        value: function key(name, callback) {
            return _shortcuts.key.call(this, name, callback);
        }
    }, {
        key: 'initShortcuts',
        value: function initShortcuts() {
            return _shortcuts.initShortcuts.call(this);
        }
    }, {
        key: 'initLinkEffects',
        value: function initLinkEffects() {
            return _initLinkEffects2.initLinkEffects.call(this);
        }
    }, {
        key: 'initSharePlace',
        value: function initSharePlace() {
            return _initSharePlace2.initSharePlace.call(this);
        }
    }, {
        key: 'initHeaderTitle',
        value: function initHeaderTitle() {
            return _initHeaderTitle2.initHeaderTitle.call(this);
        }
    }, {
        key: 'initNavbar',
        value: function initNavbar() {
            return _initNavbar2.initNavbar.call(this);
        }
    }, {
        key: 'initNavbarSide',
        value: function initNavbarSide() {
            return _initNavbarSide2.initNavbarSide.call(this);
        }
    }, {
        key: 'initNavbarFullscreen',
        value: function initNavbarFullscreen() {
            return _initNavbarFullscreen2.initNavbarFullscreen.call(this);
        }
    }, {
        key: 'initNavbarDropEffect1',
        value: function initNavbarDropEffect1() {
            return _initNavbarDropEffect2.initNavbarDropEffect1.call(this);
        }
    }, {
        key: 'initSearchBlock',
        value: function initSearchBlock() {
            return _initSearchBlock2.initSearchBlock.call(this);
        }
    }, {
        key: 'initCounters',
        value: function initCounters() {
            return _initCounters2.initCounters.call(this);
        }
    }, {
        key: 'initSideButtons',
        value: function initSideButtons() {
            return _initSideButtons2.initSideButtons.call(this);
        }
    }, {
        key: 'initActionsLike',
        value: function initActionsLike() {
            return _initActionsLike2.initActionsLike.call(this);
        }
    }, {
        key: 'initStore',
        value: function initStore() {
            return _initStore2.initStore.call(this);
        }
    }, {
        key: 'initBackgroundImages',
        value: function initBackgroundImages() {
            return _initBackgroundImages2.initBackgroundImages.call(this);
        }
    }, {
        key: 'parallaxMouseInit',
        value: function parallaxMouseInit() {
            return _parallaxMouseInit2.parallaxMouseInit.call(this);
        }
    }, {
        key: 'initAnchors',
        value: function initAnchors() {
            return _initAnchors2.initAnchors.call(this);
        }
    }, {
        key: 'initLinesForBoxes',
        value: function initLinesForBoxes() {
            return _initLinesForBoxes2.initLinesForBoxes.call(this);
        }
    }, {
        key: 'initImageBoxes',
        value: function initImageBoxes() {
            return _initImageBoxes2.initImageBoxes.call(this);
        }
    }, {
        key: 'initVideoFullscreen',
        value: function initVideoFullscreen() {
            return _initVideoFullscreen2.initVideoFullscreen.call(this);
        }
    }, {
        key: 'initVideoBlocks',
        value: function initVideoBlocks() {
            return _initVideoBlocks2.initVideoBlocks.call(this);
        }
    }, {
        key: 'initGIF',
        value: function initGIF() {
            return _initGIF2.initGIF.call(this);
        }
    }, {
        key: 'initFullPage',
        value: function initFullPage() {
            return _initFullPage2.initFullPage.call(this);
        }
    }, {
        key: 'initQuickView',
        value: function initQuickView() {
            return _initQuickView2.initQuickView.call(this);
        }
    }, {
        key: 'initInfoBoxes',
        value: function initInfoBoxes() {
            return _initInfoBoxes2.initInfoBoxes.call(this);
        }
    }, {
        key: 'initForms',
        value: function initForms() {
            return _initForms2.initForms.call(this);
        }
    }, {
        key: 'initFormsMailChimp',
        value: function initFormsMailChimp() {
            return _initFormsMailChimp2.initFormsMailChimp.call(this);
        }
    }, {
        key: 'initAudioPlayer',
        value: function initAudioPlayer() {
            return _initAudioPlayer2.initAudioPlayer.call(this);
        }
    }, {
        key: 'initFacebook',
        value: function initFacebook() {
            return _initFacebook2.initFacebook.call(this);
        }
    }, {
        key: 'initInstagram',
        value: function initInstagram() {
            return _initInstagram2.initInstagram.call(this);
        }
    }, {
        key: 'initTwitter',
        value: function initTwitter() {
            return _initTwitter2.initTwitter.call(this);
        }
    }, {
        key: 'initPluginObjectFitImages',
        value: function initPluginObjectFitImages() {
            return _initPluginObjectFitImages2.initPluginObjectFitImages.call(this);
        }
    }, {
        key: 'initPluginStickySidebar',
        value: function initPluginStickySidebar() {
            return _initPluginStickySidebar2.initPluginStickySidebar.call(this);
        }
    }, {
        key: 'initPluginFastClick',
        value: function initPluginFastClick() {
            return _initPluginFastClick2.initPluginFastClick.call(this);
        }
    }, {
        key: 'initPluginNano',
        value: function initPluginNano($context) {
            return _initPluginNano2.initPluginNano.call(this, $context);
        }
    }, {
        key: 'initPluginJarallax',
        value: function initPluginJarallax($context) {
            return _initPluginJarallax2.initPluginJarallax.call(this, $context);
        }
    }, {
        key: 'initPluginFlickity',
        value: function initPluginFlickity($context) {
            return _initPluginFlickity2.initPluginFlickity.call(this, $context);
        }
    }, {
        key: 'initPluginIsotope',
        value: function initPluginIsotope($context) {
            return _initPluginIsotope2.initPluginIsotope.call(this, $context);
        }
    }, {
        key: 'initPluginPhotoswipe',
        value: function initPluginPhotoswipe($context) {
            return _initPluginPhotoswipe2.initPluginPhotoswipe.call(this, $context);
        }
    }, {
        key: 'initPluginTabs',
        value: function initPluginTabs($context) {
            return _initPluginTabs2.initPluginTabs.call(this, $context);
        }
    }, {
        key: 'initPluginAccordions',
        value: function initPluginAccordions($context) {
            return _initPluginAccordions2.initPluginAccordions.call(this, $context);
        }
    }, {
        key: 'initPluginCountdown',
        value: function initPluginCountdown($context) {
            return _initPluginCountdown2.initPluginCountdown.call(this, $context);
        }
    }, {
        key: 'initPluginTypedjs',
        value: function initPluginTypedjs($context) {
            return _initPluginTypedjs2.initPluginTypedjs.call(this, $context);
        }
    }]);

    return KHAKI;
}();

/*------------------------------------------------------------------

  Init Khaki

-------------------------------------------------------------------*/


window.Khaki = new KHAKI();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setOptions = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Set Custom Options

-------------------------------------------------------------------*/
function setOptions(newOpts) {
    var self = this;

    var optsTemplates = _utility.$.extend({}, this.options.templates, newOpts && newOpts.templates || {});
    var optsShortcuts = _utility.$.extend({}, this.options.shortcuts, newOpts && newOpts.shortcuts || {});
    var optsEvents = _utility.$.extend({}, this.options.events, newOpts && newOpts.events || {});

    self.options = _utility.$.extend({}, self.options, newOpts);
    self.options.templates = optsTemplates;
    self.options.shortcuts = optsShortcuts;
    self.options.events = optsEvents;
}

exports.setOptions = setOptions;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initShortcuts = exports.key = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Shortcuts
  https://github.com/madrobby/keymaster

-------------------------------------------------------------------*/
function key(name, fn) {
    if (typeof window.key === 'undefined') {
        return;
    }
    name = this.options && this.options.shortcuts && this.options.shortcuts[name];

    if (name) {
        window.key(name, fn);
    }
}
function initShortcuts() {
    if (typeof window.key === 'undefined' || !this.options.enableShortcuts) {
        return;
    }

    var self = this;

    // Search
    self.key('toggleSearch', function () {
        self.toggleSearch();
    });
    self.key('openSearch', function () {
        self.openSearch();
    });
    self.key('closeSearch', function () {
        self.closeSearch();
    });

    // Share
    self.key('toggleShare', function () {
        self.toggleShare();
    });
    self.key('openShare', function () {
        self.openShare();
    });
    self.key('closeShare', function () {
        self.closeShare();
    });

    // FullScreen Video
    self.key('closeFullscreenVideo', function () {
        if (self.closeFullScreenVideo) {
            self.closeFullScreenVideo();
        }
    });

    // quick view
    self.key('closeQuckView', function () {
        if (self.closeQuickView) {
            self.closeQuickView();
        }
    });

    // audio player
    self.key('audioPlayerPlayPause', function () {
        if (self.audioPlayer) {
            if (self.audioPlayer.playing) {
                self.audioPlayer.pause();
            } else {
                self.audioPlayer.play();
            }
        }
    });
    self.key('audioPlayerPlay', function () {
        if (self.audioPlayer) {
            self.audioPlayer.play();
        }
    });
    self.key('audioPlayerPause', function () {
        if (self.audioPlayer) {
            self.audioPlayer.pause();
        }
    });
    self.key('audioPlayerBackward', function () {
        if (self.audioPlayer) {
            self.audioPlayer.skip('prev');
        }
    });
    self.key('audioPlayerForward', function () {
        if (self.audioPlayer) {
            self.audioPlayer.skip('next');
        }
    });
    self.key('audioPlayerVolumeUp', function () {
        if (self.audioPlayer) {
            self.audioPlayer.setVolume(self.audioPlayer.volume + 10);
        }
    });
    self.key('audioPlayerVolumeDown', function () {
        if (self.audioPlayer) {
            self.audioPlayer.setVolume(self.audioPlayer.volume - 10);
        }
    });
    self.key('audioPlayerMute', function () {
        if (self.audioPlayer) {
            self.audioPlayer.mute(!self.audioPlayer.muted);
        }
    });
    self.key('audioPlayerLoop', function () {
        if (self.audioPlayer) {
            self.audioPlayer.setLoop();
        }
    });
    self.key('audioPlayerShuffle', function () {
        if (self.audioPlayer) {
            self.audioPlayer.setShuffle();
        }
    });
    self.key('audioPlayerPlaylist', function () {
        if (self.audioPlayer) {
            self.audioPlayer.showPlaylist();
        }
    });
    self.key('audioPlayerPin', function () {
        if (self.audioPlayer) {
            self.audioPlayer.pin(!self.audioPlayer.pinned);
        }
    });

    // post / portfolio single
    self.key('postLike', function () {
        (0, _utility.$)('.nk-portfolio-item-single .nk-portfolio-item-details, .nk-blog-post-single .nk-post-meta').find('.nk-action-heart:not(.liked), .nk-action-like .like-icon').click();
    });
    self.key('postDislike', function () {
        (0, _utility.$)('.nk-portfolio-item-single .nk-portfolio-item-details, .nk-blog-post-single .nk-post-meta').find('.nk-action-heart.liked, .nk-action-like .dislike-icon').click();
    });
    self.key('postScrollToComments', function () {
        var $comments = (0, _utility.$)('#comments');
        if ($comments.length) {
            self.scrollTo($comments);
        }
    });

    // Side Left Navbar
    var $leftSide = (0, _utility.$)('.nk-navbar-left-side');
    self.key('toggleSideLeftNavbar', function () {
        self.toggleSide($leftSide);
    });
    self.key('openSideLeftNavbar', function () {
        self.openSide($leftSide);
    });
    self.key('closeSideLeftNavbar', function () {
        self.closeSide($leftSide);
    });

    // Side Right Navbar
    var $rightSide = (0, _utility.$)('.nk-navbar-right-side');
    self.key('toggleSideRightNavbar', function () {
        self.toggleSide($rightSide);
    });
    self.key('openSideRightNavbar', function () {
        self.openSide($rightSide);
    });
    self.key('closeSideRightNavbar', function () {
        self.closeSide($rightSide);
    });

    // Fullscreen Navbar
    self.key('toggleFullscreenNavbar', function () {
        self.toggleFullscreenNavbar();
    });
    self.key('openFullscreenNavbar', function () {
        self.openFullscreenNavbar();
    });
    self.key('closeFullscreenNavbar', function () {
        self.closeFullscreenNavbar();
    });

    // ESC - use also inside form elements
    window.key.filter = function (event) {
        var tagName = (event.target || event.srcElement).tagName;
        var isContentEditable = (event.target || event.srcElement).getAttribute('contenteditable');
        var isESC = window.key.isPressed('esc');
        return isESC || !(isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
    };
}

exports.key = key;
exports.initShortcuts = initShortcuts;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initLinkEffects = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Link Effects

-------------------------------------------------------------------*/
function initLinkEffects() {
    // add link effect for navbar
    (0, _utility.$)('.nk-navbar ul > li > a:not(.btn):not(.nk-btn):not(.no-link-effect)').addClass('link-effect-3');

    // Link Effect 1 (rotate all letters)
    (0, _utility.$)('.link-effect-1:not(.ready)').each(function eachLinkEffect() {
        (0, _utility.$)(this).addClass('ready');
        var itemText = (0, _utility.$)(this).text().replace(/([^\x00-\x80]|\w)/g, '<span>$&</span>');
        (0, _utility.$)(this).html(itemText);
    });
    function toggleClass($this, $span, type) {
        var $nextSpan = $span[type === 'add' ? 'next' : 'prev']();
        $span[type + 'Class']('active');

        var timeout = $this.data('timeout');
        clearTimeout(timeout);
        if ($nextSpan.length) {
            $this.data('timeout', setTimeout(function () {
                toggleClass($this, $nextSpan, type);
            }, 40));
        }
    }
    _utility.$doc.on('mouseover', '.link-effect-1.ready', function onMouseOverLink() {
        toggleClass((0, _utility.$)(this), (0, _utility.$)(this).children('span:not(.active):first'), 'add');
    }).on('mouseleave', '.link-effect-1.ready', function onMousLeaveLink() {
        toggleClass((0, _utility.$)(this), (0, _utility.$)(this).children('span.active:last'), 'remove');
    });

    // Link Effect 2 and 3 (color for letters from left to right and top to bottom)
    (0, _utility.$)('.link-effect-2:not(.ready), .link-effect-3:not(.ready)').each(function eachLinkEffect2() {
        (0, _utility.$)(this).addClass('ready');
        (0, _utility.$)(this).html(function (i, letters) {
            return (0, _utility.$)('<span>').html(letters).prepend((0, _utility.$)('<span class="link-effect-shade">').html(letters));
        });
    });
}

exports.initLinkEffects = initLinkEffects;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initSharePlace = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Share Place

-------------------------------------------------------------------*/
function initSharePlace() {
    var self = this;
    var $sharePlace = (0, _utility.$)('.nk-share-place');
    var isOpened = void 0;

    // add overlay
    (0, _utility.$)('<div class="nk-share-place-overlay">').appendTo(_utility.$body);

    // thanks http://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k/10600491
    function abbreviateNumber(number, decPlaces) {
        decPlaces = Math.pow(10, decPlaces);
        var abbrev = ['k', 'm', 'b', 't'];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if (number === 1000 && i < abbrev.length - 1) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }
        return number;
    }

    /* SocialityShare and SocialLikes support */
    if (typeof _utility.$.fn.socialityShare !== 'undefined') {
        (0, _utility.$)('.nk-share-icons').socialityShare().on('counter.sociality-share', function onCountSocialityShare(event, service, number) {
            (0, _utility.$)(this).find('[data-share="' + service + '"] .sociality-share-counter').html(abbreviateNumber(number, 1) || '');
        });
    } else if (typeof _utility.$.fn.socialLikes !== 'undefined') {
        (0, _utility.$)('.nk-share-icons').socialLikes().on('counter.social-likes', function onCountSocialLikes(event, service, number) {
            (0, _utility.$)(this).find('.social-likes__counter_' + service).html(abbreviateNumber(number, 1) || '');
        });
    }

    self.toggleShare = function () {
        if (isOpened) {
            self.closeShare();
        } else {
            self.openShare();
        }
    };

    self.openShare = function () {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        $sharePlace.addClass('open');

        // trigger event
        _utility.$wnd.trigger('nk-open-share-place', [$sharePlace]);
    };

    self.closeShare = function () {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        $sharePlace.removeClass('open');

        // trigger event
        _utility.$wnd.trigger('nk-close-share-place', [$sharePlace]);
    };

    _utility.$doc.on('click', '.nk-share-toggle', function (e) {
        self.toggleShare();
        e.preventDefault();
    });
    _utility.$doc.on('click', '.nk-share-place-overlay', function () {
        self.closeShare();
    });

    _utility.$wnd.on('scroll resize', function () {
        self.closeShare();
    });
}

exports.initSharePlace = initSharePlace;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    var self = this;
    var $navbarTop = (0, _utility.$)('.nk-navbar-top');
    var $contactsTop = (0, _utility.$)('.nk-contacts-top');
    var $navbarLeft = (0, _utility.$)('.nk-navbar-left');

    // add mobile navbar
    var $mobileNavItems = (0, _utility.$)('[data-nav-mobile]');
    if ($mobileNavItems.length) {
        $mobileNavItems.each(function eachMobileNavItems() {
            var $nav = (0, _utility.$)((0, _utility.$)(this).html());
            var $mobileNav = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-mobile'));

            // insert into mobile nav
            $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').append($nav);
        });

        var $nav = (0, _utility.$)('.nk-navbar-mobile-content > ul.nk-nav');

        // remove background images
        $nav.find('.bg-image, .bg-video').remove();

        // remove mega menus
        $nav.find('.nk-mega-item > .dropdown').each(function eachMegaMenus() {
            var $drop = (0, _utility.$)(this).children('ul').addClass('dropdown');

            // fix mega menu columns
            $drop.find('> li > label').each(function eachMegaMenuLabels() {
                (0, _utility.$)(this).next().addClass('dropdown');
                (0, _utility.$)(this).parent().addClass('nk-drop-item');
                (0, _utility.$)(this).replaceWith((0, _utility.$)('<a href="#"></a>').html((0, _utility.$)(this).html()));
            });

            (0, _utility.$)(this).replaceWith($drop);
        });
        $nav.find('.nk-mega-item').removeClass('nk-mega-item');
    }

    // sticky navbar
    var navbarTop = $navbarTop.length ? $navbarTop.offset().top - _utility.pageBorderSize : 0;
    // fake hidden navbar to prevent page jumping on stick
    var $navbarFake = (0, _utility.$)('<div>').hide();
    function onScrollNav() {
        var stickyOn = _utility.$wnd.scrollTop() >= navbarTop;

        if (stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        } else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if ($navbarTop.hasClass('nk-navbar-sticky')) {
        _utility.$wnd.on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(function () {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown($item) {
        if ($item.parent().is('.nk-nav')) {
            var $dropdown = $item.children('.dropdown');
            var $parent = $item.parents('.nk-navbar:eq(0)');
            var $parentContainer = $parent.children('.container');
            $parentContainer = $parentContainer.length ? $parentContainer : $parent;

            // fix right value when sub menu is not hidden
            $dropdown.css('display', 'none');
            var isRight = $dropdown.css('right') !== 'auto';
            var $contacts = $item.parents('.nk-contacts-top:eq(0)');
            var css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block'
            };

            $dropdown.css(css);

            var rect = $dropdown[0].getBoundingClientRect();
            var rectContainer = $parentContainer[0].getBoundingClientRect();
            var itemRect = $item[0].getBoundingClientRect();

            // move dropdown from right corner (right corner will check in nav container)
            if (rect.right > rectContainer.right) {
                css.marginLeft = rectContainer.right - rect.right;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // move dropdown from left corner
            if (rect.left - _utility.pageBorderSize < 0) {
                css.marginLeft = _utility.pageBorderSize - rect.left;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // check if dropdown not under item
            var currentLeftPost = rect.left + (css.marginLeft || 0);
            if (currentLeftPost > itemRect.left) {
                css.marginLeft = (css.marginLeft || 0) - (currentLeftPost - itemRect.left);
            }

            // change to margin-right. In some cases left margin isn't working, for ex. in mega menu
            if (isRight) {
                css.marginRight = -1 * css.marginLeft;
                css.marginLeft = '';
            }

            // correct top position
            css.marginTop = $parent.innerHeight() - $dropdown.offset().top + $parent.offset().top;

            // add offset if contacts
            if ($contacts.length) {
                css.marginTop += parseFloat($contacts.css('padding-bottom') || 0);
            }

            // hide menu
            css.display = 'none';

            $dropdown.css(css);
        }
    }

    // toggle dropdown
    function closeSubmenu($item) {
        if ($item.length) {
            $item.removeClass('open');
            _utility.tween.to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none',
                onComplete: function onComplete() {
                    self.parallaxMouseInit();
                }
            });
            _utility.$wnd.trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu($item) {
        if (!$item.hasClass('open')) {
            correctDropdown($item);
            _utility.tween.to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block'
            });
            $item.addClass('open');
            self.parallaxMouseInit();
            _utility.$wnd.trigger('nk-opened-submenu', [$item]);
        }
    }

    var dropdownTimeout = void 0;

    // show dropdowns in left menu icons
    $navbarLeft.find('.nk-nav-icons').on('click', 'li.nk-drop-item', function onClickLeftNavDropdown(e) {
        e.preventDefault();

        var $item = (0, _utility.$)(this);
        var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    });
    $navbarLeft.on('mouseenter', 'li.nk-drop-item', function () {
        clearTimeout(dropdownTimeout);
    });

    // show dropdowns in main menu
    $navbarTop.add($contactsTop).on('mouseenter', 'li.nk-drop-item', function onMouseEnterNavDropdown() {
        var $item = (0, _utility.$)(this);
        var $otherDropdown = $item.closest($contactsTop).length ? $navbarTop : $contactsTop;
        var $openedSiblings = $item.siblings('.open').add($item.siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings().find('.open')).add($item.parents('.nk-nav:eq(0)').siblings('.open')).add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open')).add($otherDropdown.find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function onMouseLeaveNavDropdown() {
        var $item = (0, _utility.$)(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($item);
        }, 200);
    });

    // hide dropdowns
    $navbarTop.add($contactsTop).add($navbarLeft).on('mouseleave', function () {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(function () {
            closeSubmenu($navbarTop.add($contactsTop).add($navbarLeft.find('.nk-nav-icons')).find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    var $autohideNav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll(function (type, scroll) {
        var start = 400;
        var hideClass = 'nk-onscroll-hide';
        var showClass = 'nk-onscroll-show';

        // hide / show
        if (type === 'down' && scroll > start) {
            $autohideNav.removeClass(showClass).addClass(hideClass);
        } else if (type === 'up' || type === 'end' || type === 'start') {
            $autohideNav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if ($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[(scroll > 70 ? 'add' : 'remove') + 'Class']('nk-navbar-solid');
        }
    });
}

exports.initNavbar = initNavbar;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbarSide = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function initNavbarSide() {
    var self = this;
    var $overlay = (0, _utility.$)('<div class="nk-navbar-overlay">').appendTo(_utility.$body);

    // side navbars
    var $sideNavs = (0, _utility.$)('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        (0, _utility.$)('[data-nav-toggle]').each(function eachNavTogglers() {
            var active = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle')).hasClass('open');
            (0, _utility.$)(this)[(active ? 'add' : 'remove') + 'Class']('active');
        });
    }
    self.toggleSide = function ($side, speed) {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = function ($side) {
        $side.addClass('open');

        self.parallaxMouseInit();

        updateTogglers();
    };
    self.closeSide = function ($side) {
        $side.each(function eachSideNavs() {
            (0, _utility.$)(this).removeClass('open');

            self.parallaxMouseInit();

            updateTogglers();
        });
    };
    _utility.$doc.on('click', '[data-nav-toggle]', function onClickNavToggler(e) {
        var $nav = (0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            (0, _utility.$)('[data-nav-toggle]').each(function eachNavToggle() {
                self.closeSide((0, _utility.$)((0, _utility.$)(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    $overlay.on('click', function () {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(function () {
        $sideNavs.filter('.open').each(function eachOpenedSideNav() {
            if (!(0, _utility.$)(this).is(':visible')) {
                self.closeSide((0, _utility.$)(this));
            }
        });
    });
}

exports.initNavbarSide = initNavbarSide;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbarFullscreen = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Navbar Fullscreen

-------------------------------------------------------------------*/
function initNavbarFullscreen() {
    var self = this;
    var $navbar = (0, _utility.$)('.nk-navbar-full');
    var $navbarTop = (0, _utility.$)('.nk-navbar-top');
    var navRect = void 0;
    var isOpened = void 0;

    self.toggleFullscreenNavbar = function () {
        self[isOpened ? 'closeFullscreenNavbar' : 'openFullscreenNavbar']();
    };
    self.openFullscreenNavbar = function () {
        if (isOpened || !$navbar.length) {
            return;
        }
        isOpened = 1;

        var $navbarMenuItems = $navbar.find('.nk-nav .nk-drop-item.open > .dropdown:not(.closed) > li > a');
        if (!$navbarMenuItems.length) {
            $navbarMenuItems = $navbar.find('.nk-nav > li > a');
        }

        // active all togglers
        (0, _utility.$)('.nk-navbar-full-toggle').addClass('active');

        // add navbar top position
        navRect = $navbarTop[0] ? $navbarTop[0].getBoundingClientRect() : 0;

        // set top position
        $navbar.css({
            paddingTop: navRect ? navRect.top + navRect.height : 0
        });
        _utility.tween.set($navbarMenuItems, {
            y: -10,
            opacity: 0
        });

        // open navbar block
        $navbar.addClass('open');
        self.initPluginNano($navbar);

        _utility.tween.staggerTo($navbarMenuItems, 0.3, {
            y: 0,
            opacity: 1,
            delay: 0.1
        }, 0.05);

        // prevent body scrolling
        self.bodyOverflow(1);

        // trigger event
        _utility.$wnd.trigger('nk-open-full-navbar', [$navbar]);
    };

    self.closeFullscreenNavbar = function (dontTouchBody) {
        if (!isOpened || !$navbar.length) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        (0, _utility.$)('.nk-navbar-full-toggle').removeClass('active');

        // hide navbar block
        $navbar.removeClass('open');

        if (!dontTouchBody) {
            self.bodyOverflow(0);
        }

        // trigger event
        _utility.$wnd.trigger('nk-close-full-navbar', [$navbar]);
    };

    _utility.$doc.on('click', '.nk-navbar-full-toggle', function (e) {
        self.toggleFullscreenNavbar();
        e.preventDefault();
    });

    _utility.$wnd.on('nk-open-search-block', function () {
        self.closeFullscreenNavbar(1);
    });
    _utility.$wnd.on('nk-open-share-place', self.closeFullscreenNavbar);
}

exports.initNavbarFullscreen = initNavbarFullscreen;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initNavbarDropEffect1 = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Dropdown Effect 1 for side navbars and fullscreen

-------------------------------------------------------------------*/
function initNavbarDropEffect1() {
    var self = this;
    var $navbars = (0, _utility.$)('.nk-navbar-side, .nk-navbar-full').find('.nk-nav');

    // add back item for dropdowns
    $navbars.find('.dropdown').prepend('<li class="bropdown-back"><a href="#">' + self.options.templates.secondaryNavbarBackItem + '</a></li>');

    // change height of opened dropdown
    function updateSideNavDropdown($item) {
        var $nav = $item.parents('.nk-navbar:eq(0)');
        var $khNav = $nav.find('.nk-nav');
        var $nanoCont = $khNav.children('.nano-content');
        var $khNavRow = $khNav.parent();
        var $drop = $nav.find('.nk-nav .nk-drop-item.open > .dropdown:not(.closed)');

        if ($drop.length) {
            var dropHeight = $drop.innerHeight();

            // vertical center for dropdown
            if ($khNavRow.hasClass('nk-nav-row-center')) {
                $drop.css({
                    top: 0
                });

                $khNav.hide();
                var nanoHeight = $khNavRow.innerHeight();
                $khNav.show();
                var nanoNavRowHeight = nanoHeight;
                var nanoTop = $khNavRow.offset().top;
                var dropTop = $drop.offset().top;

                var top = nanoTop - dropTop;
                if (dropHeight < nanoNavRowHeight) {
                    top += (nanoHeight - dropHeight) / 2;
                }

                $drop.css({
                    top: top
                });
            }

            $khNav.css('height', dropHeight);
            self.initPluginNano($nav);

            // scroll to top
            _utility.tween.to($nanoCont, 0.3, {
                scrollTo: { y: 0 },
                delay: 0.2
            });
        } else {
            $khNav.css('height', '');
        }
        self.initPluginNano($nav);
    }

    // open / close submenu
    function toggleSubmenu(open, $drop) {
        var $newItems = $drop.find('> .dropdown > li > a');
        var $oldItems = $drop.parent().find('> li > a');

        if (open) {
            $drop.addClass('open').parent().addClass('closed');
        } else {
            $drop.removeClass('open').parent().removeClass('closed');

            var tmp = $newItems;
            $newItems = $oldItems;
            $oldItems = tmp;
        }

        // show items
        _utility.tween.set($newItems, {
            x: open ? '20%' : '-20%',
            opacity: 0,
            display: 'block'
        }, 0.1);
        _utility.tween.staggerTo($newItems, 0.2, {
            x: '0%',
            opacity: 1,
            delay: 0.1
        }, 0.05);

        // hide items
        _utility.tween.staggerTo($oldItems, 0.2, {
            x: open ? '-20%' : '20%',
            opacity: 0
        }, 0.05, function () {
            $oldItems.css('display', 'none');
        });
    }

    $navbars.on('click', '.nk-drop-item > a', function onClickDropItem(e) {
        toggleSubmenu(true, (0, _utility.$)(this).parent());
        updateSideNavDropdown((0, _utility.$)(this));
        e.preventDefault();
    });
    $navbars.on('click', '.bropdown-back > a', function onClickDropItemBack(e) {
        toggleSubmenu(false, (0, _utility.$)(this).parent().parent().parent());
        updateSideNavDropdown((0, _utility.$)(this));
        e.preventDefault();
    });
}

exports.initNavbarDropEffect1 = initNavbarDropEffect1;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initSearchBlock = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Search Block

-------------------------------------------------------------------*/
function initSearchBlock() {
    var self = this;
    var $search = (0, _utility.$)('.nk-search');
    var $nav = (0, _utility.$)('.nk-navbar-top');
    var navRect = void 0;
    var isOpened = void 0;

    self.toggleSearch = function () {
        self[(isOpened ? 'close' : 'open') + 'Search']();
    };

    self.openSearch = function () {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        // active all togglers
        (0, _utility.$)('.nk-search-toggle').addClass('active');

        // add search top position
        navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0;

        // set top position and animate
        $search.css({
            paddingTop: navRect ? navRect.bottom : 0
        });

        // open search block
        $search.addClass('open');

        // focus search input
        if (self.options.enableSearchAutofocus) {
            setTimeout(function () {
                $search.find('.nk-search-field input').focus();
            }, 100);
        }

        // trigger event
        _utility.$wnd.trigger('nk-open-search-block', [$search]);
    };

    self.closeSearch = function () {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        (0, _utility.$)('.nk-search-toggle').removeClass('active');

        // close search block
        $search.removeClass('open');

        // trigger event
        _utility.$wnd.trigger('nk-close-search-block', [$search]);
    };

    _utility.$doc.on('click', '.nk-search-toggle', function (e) {
        self.toggleSearch();

        e.preventDefault();
    });
    _utility.$wnd.on('nk-open-full-navbar', function () {
        self.closeSearch();
    });
    _utility.$wnd.on('nk-open-share-place', function () {
        self.closeSearch();
    });
    _utility.$wnd.on('scroll', function () {
        self.closeSearch();
    });
}

exports.initSearchBlock = initSearchBlock;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initHeaderTitle = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Header Title

-------------------------------------------------------------------*/
function initHeaderTitle() {
    var self = this;
    var $navbarHeader = (0, _utility.$)('.nk-header');
    var isNavbarOpaque = $navbarHeader.hasClass('nk-header-opaque');
    var isNavbarTransparent = (0, _utility.$)('.nk-navbar-top').hasClass('nk-header-transparent');
    var $headerTitle = (0, _utility.$)('.nk-header-title > .nk-header-table');
    var $fullHeaderTitle = (0, _utility.$)('.nk-header-title-full > .nk-header-table');

    // remove header title padding if navbar opaque
    if (isNavbarOpaque) {
        $headerTitle.css('padding-top', 0);
    }

    self.debounceResize(function () {
        if ((isNavbarTransparent || isNavbarOpaque) && (!$fullHeaderTitle.length || !isNavbarOpaque)) {
            return;
        }

        var navH = $navbarHeader.outerHeight() || 0;

        // add header title padding
        if (!isNavbarTransparent && !isNavbarOpaque) {
            $headerTitle.css('padding-top', navH);
        }

        // fix header title height
        if ($fullHeaderTitle.length) {
            var headerH = '100vh';

            if (isNavbarOpaque) {
                headerH = 'calc(100vh - ' + navH + 'px)';
            }

            $fullHeaderTitle.css('min-height', headerH);
        }
    });
}

exports.initHeaderTitle = initHeaderTitle;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initCounters = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Counters

-------------------------------------------------------------------*/
function initCounters() {
    var self = this;
    var $progressCount = (0, _utility.$)('.nk-progress.nk-count');
    var $numberCount = (0, _utility.$)('.nk-count:not(.nk-progress)');

    // set default progress
    $progressCount.each(function eachProgressCount() {
        (0, _utility.$)(this).attr('data-nk-count', (0, _utility.$)(this).attr('data-progress')).attr('data-nk-mask', (0, _utility.$)(this).attr('data-progress-mask')).find('.nk-progress-line > div').css('width', ((0, _utility.$)(this).attr('data-nk-count-from') || '0') + '%').find('.nk-progress-percent').html('');
    });

    // set default numbers
    $numberCount.each(function eachNumberCount() {
        (0, _utility.$)(this).attr('data-nk-count', (0, _utility.$)(this).attr('data-nk-count') || parseInt((0, _utility.$)(this).text(), 10)).html((0, _utility.$)(this).attr('data-nk-count-from') || '0');
    });

    var countersNum = 1;
    function runCounters() {
        if (!countersNum) {
            return;
        }

        var progress = $progressCount.filter('[data-nk-count]');
        var numbers = $numberCount.filter('[data-nk-count]');
        countersNum = progress.length + numbers.length;

        // progress
        $progressCount.filter('[data-nk-count]').each(function eachProgressCount() {
            var $item = (0, _utility.$)(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.attr('data-nk-count-from') || '0',
                    to: $item.attr('data-nk-count'),
                    mask: $item.attr('data-nk-mask') || '{$}%'
                };
                var $itemLine = $item.find('.nk-progress-line > div');
                var $itemLabel = $item.find('.nk-progress-percent');

                _utility.tween.to($itemLine, 1, {
                    width: count.to + '%'
                });
                _utility.tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $itemLabel.text(count.mask.replace('{$}', count.curr));
                    }
                });
                $item.removeAttr('data-nk-count');
            }
        });

        // number
        $numberCount.filter('[data-nk-count]').each(function eachNumberCount() {
            var $item = (0, _utility.$)(this);
            if (self.isInViewport($item)) {
                var count = {
                    curr: $item.text(),
                    to: $item.attr('data-nk-count')
                };
                $item.removeAttr('data-nk-count data-nk-count-from');
                _utility.tween.to(count, 1, {
                    curr: count.to,
                    roundProps: 'curr',
                    ease: Circ.easeIn,
                    onUpdate: function onUpdate() {
                        $item.text(count.curr);
                    }
                });
            }
        });
    }

    self.throttleScroll(runCounters);
    runCounters();
}

exports.initCounters = initCounters;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initSideButtons = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Side Buttons

-------------------------------------------------------------------*/
function initSideButtons() {
    var self = this;
    var $sideButtons = (0, _utility.$)('.nk-side-buttons');

    // hide on scroll
    self.throttleScroll(function (type, scroll) {
        var start = 400;

        if (scroll > start) {
            $sideButtons.addClass('nk-side-buttons-show-scroll-top');
        } else {
            $sideButtons.removeClass('nk-side-buttons-show-scroll-top');
        }
    });

    // scroll top
    _utility.$doc.on('click', '.nk-scroll-top', function (e) {
        e.preventDefault();
        self.scrollTo('top');
    });
}

exports.initSideButtons = initSideButtons;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initActionsLike = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Actions Like and Heart

-------------------------------------------------------------------*/
function initActionsLike() {
    var self = this;

    // like / dislike animation init
    var $likeAnimation = void 0;
    var $dislikeAnimation = void 0;
    if (self.options.enableActionLikeAnimation) {
        $likeAnimation = (0, _utility.$)('<div class="nk-like-animation">' + self.options.templates.likeAnimationLiked + '</div>').appendTo(_utility.$body);
        $dislikeAnimation = (0, _utility.$)('<div class="nk-dislike-animation">' + self.options.templates.likeAnimationDisliked + '</div>').appendTo(_utility.$body);
    }
    function runLikeAnimation(type) {
        var $animateItem = type === 'like' ? $likeAnimation : $dislikeAnimation;
        $animateItem.removeClass('active');

        // Trigger a reflow, flushing the CSS changes. This need to fix some glithes in Safari and Firefox. Info here - https://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily
        $animateItem[0].offsetHeight; // eslint-disable-line

        $animateItem.addClass('active');
    }

    // heart action
    _utility.$doc.on('click', '.nk-action-heart', function heartClick(e) {
        e.preventDefault();
        var $like = (0, _utility.$)(this);

        if ($like.hasClass('busy')) {
            return;
        }

        var $num = $like.find('.num');
        var type = $like.hasClass('liked') ? 'dislike' : 'like';
        var $parent = $like.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
        var updatedNum = void 0;
        var updatedIcon = void 0;
        $like.addClass('busy');
        self.options.events.actionHeart({
            $dom: $like,
            $parent: $parent,
            type: type,
            currentNum: parseInt($num.text(), 10),
            updateNum: function updateNum(num) {
                $num.text(num);
                updatedNum = 1;
                if (updatedNum && updatedIcon) {
                    $like.removeClass('busy');
                }
            },
            updateIcon: function updateIcon() {
                $like[type === 'like' ? 'addClass' : 'removeClass']('liked');
                updatedIcon = 1;
                if (updatedNum && updatedIcon) {
                    $like.removeClass('busy');
                }

                // like / dislike animation
                if (self.options.enableActionLikeAnimation) {
                    runLikeAnimation(type);
                }
            }
        });
    });

    // like action
    _utility.$doc.on('click', '.nk-action-like .like-icon, .nk-action-like .dislike-icon', function likeClick(e) {
        e.preventDefault();
        var $like = (0, _utility.$)(this);
        var $parentLike = $like.parent();

        if ($parentLike.hasClass('busy')) {
            return;
        }

        var isLiked = $parentLike.hasClass('liked');
        var isDisliked = $parentLike.hasClass('disliked');
        var isDislike = $like.hasClass('dislike-icon');

        var $num = $parentLike.find('.num');
        var $parent = $parentLike.parents('.nk-comment:eq(0), .nk-blog-post:eq(0)').eq(0);
        var type = isDislike ? 'dislike' : 'like';
        var updatedNum = void 0;
        var updatedIcon = void 0;
        $parentLike.addClass('busy');
        self.options.events.actionLike({
            $dom: $like,
            $parent: $parent,
            type: type,
            isLiked: isLiked,
            isDisliked: isDisliked,
            currentNum: parseInt($num.text(), 10),
            updateNum: function updateNum(num) {
                $num.text((num > 0 ? '+' : '') + num);
                updatedNum = 1;
                if (updatedNum && updatedIcon) {
                    $parentLike.removeClass('busy');
                }
            },
            updateIcon: function updateIcon() {
                $parentLike.removeClass('liked disliked');
                if (!(isLiked && !isDislike || isDisliked && isDislike)) {
                    $parentLike.addClass(type === 'like' ? 'liked' : 'disliked');
                }
                updatedIcon = 1;
                if (updatedNum && updatedIcon) {
                    $parentLike.removeClass('busy');
                }

                // like / dislike animation
                if (self.options.enableActionLikeAnimation) {
                    if (type === 'like' && !isLiked || type === 'dislike' && !isDisliked) {
                        runLikeAnimation(type);
                    }
                }
            }
        });
    });
}

exports.initActionsLike = initActionsLike;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initStore = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Store

-------------------------------------------------------------------*/
function initStore() {
    var self = this;

    // scroll to ratings
    _utility.$doc.on('click', 'a.nk-product-rating', function onClickProductRating(e) {
        var isHash = this.hash;
        if (isHash) {
            var $hashBlock = (0, _utility.$)(isHash).parents('.nk-tabs:eq(0)');
            if ($hashBlock.length) {
                self.scrollTo($hashBlock);
            }
            (0, _utility.$)('.nk-tabs').find('[data-toggle="tab"][href="' + isHash + '"]').click();
        }
        e.preventDefault();
    });

    // carousel for products
    (0, _utility.$)('.nk-product-carousel').each(function eachProductCarousel() {
        var $carousel = (0, _utility.$)(this).find('.nk-carousel-inner');
        var $thumbs = (0, _utility.$)(this).find('.nk-product-carousel-thumbs');
        var $thumbsCont = $thumbs.children();
        var curY = 0;
        var thumbsH = 0;
        var thumbsContH = 0;
        var thumbsBusy = false;

        function updateValues() {
            if ($thumbsCont[0]._gsTransform && $thumbsCont[0]._gsTransform.y) {
                curY = $thumbsCont[0]._gsTransform.y;
            } else {
                curY = 0;
            }
            thumbsH = $thumbs.height();
            thumbsContH = $thumbsCont.height();
        }

        $thumbsCont.on('click', '> div', function () {
            if (thumbsBusy) {
                return;
            }

            var index = (0, _utility.$)(this).index();
            $carousel.flickity('select', index);
        });

        $carousel.on('select.flickity', function () {
            var api = $carousel.data('flickity');
            if (!api) {
                return;
            }
            // set selected nav cell
            var $selected = $thumbsCont.children().removeClass('active').eq(api.selectedIndex).addClass('active');

            // scroll nav
            updateValues();
            var selectedTop = $selected.position().top + curY;
            if (selectedTop < 0) {
                _utility.tween.to($thumbsCont, 0.2, {
                    y: curY - selectedTop
                });
            } else {
                var selectedH = $selected.outerHeight(true);
                if (selectedTop + selectedH > thumbsH) {
                    _utility.tween.to($thumbsCont, 0.2, {
                        y: curY - (selectedTop + selectedH - thumbsH)
                    });
                }
            }
        });

        var startY = false;
        var mc = new Hammer.Manager($thumbs[0]);
        mc.add(new Hammer.Pan({
            pointers: 1,
            threshold: 0
        }));
        mc.on('pan press', function (e) {
            e.preventDefault();

            // init
            if (startY === false) {
                updateValues();
                startY = curY;
            }

            // move
            thumbsBusy = true;
            if (thumbsContH > thumbsH) {
                curY = Math.min(0, Math.max(e.deltaY + startY, thumbsH - thumbsContH));
                _utility.tween.set($thumbsCont, {
                    y: curY
                });
            }
            if (e.isFinal) {
                startY = false;

                setTimeout(function () {
                    thumbsBusy = false;
                }, 0);
            }
        });
    });
}

exports.initStore = initStore;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initBackgroundImages = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Background Images Parallax

-------------------------------------------------------------------*/
function initBackgroundImages() {
    var self = this;

    if (!self.options.enableMouseParallax) {
        return;
    }

    var $parallaxImages = (0, _utility.$)('.nk-main .bg-image').parent().add((0, _utility.$)('.nk-main .bg-image'));

    // fix for Jarallax
    $parallaxImages.css('transform', 'translate3d(0,0,0)');

    self.parallaxMouseInit();
    _utility.$wnd.on('resize scroll load', function () {
        self.parallaxMouseInit();
    });
}

exports.initBackgroundImages = initBackgroundImages;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parallaxMouseInit = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Mouse Parallax

-------------------------------------------------------------------*/
var $parallaxMouseList = false;
var parallaxMouseTimeout = void 0;
var parallaxMouseFirstRun = 1;
// run parallax animation
function parallaxMouseRun(x, y, deviceOrientation) {
    var data = void 0;
    var itemX = void 0;
    var itemY = void 0;
    $parallaxMouseList.each(function () {
        var $this = (0, _utility.$)(this);
        data = $this.data('nk-parallax-mouse-data');

        // don't animate if block isn't in viewport
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' || !data.is_in_viewport && !(deviceOrientation && parallaxMouseFirstRun)) {
            return;
        }

        // device acceleration calculate
        if (deviceOrientation) {
            itemX = -data.size * x;
            itemY = -data.size * y;

            // mouse calculate
        } else {
            itemX = (data.rect.width - (x - data.rect.left)) / data.rect.width;
            itemY = (data.rect.height - (y - data.rect.top)) / data.rect.height;

            if (itemX > 1 || itemX < 0 || itemY > 1 || itemY < 0) {
                itemX = 0.5;
                itemY = 0.5;
            }

            itemX = data.size * (itemX - 0.5) * 2;
            itemY = data.size * (itemY - 0.5) * 2;
        }

        // if first run orientation on device, set default values without animation
        if (deviceOrientation && parallaxMouseFirstRun) {
            $this.css({
                transform: 'translateX(' + itemX + 'px) translateY(' + itemY + 'px) translateZ(0)',
                willChange: 'transform'
            });
        } else {
            $this.css({
                transition: 'transform ' + (deviceOrientation ? 2 : data.speed) + 's  cubic-bezier(0.22, 0.63, 0.6, 0.88)',
                transform: 'translateX(' + itemX + 'px) translateY(' + itemY + 'px) translateZ(0)',
                willChange: 'transform'
            });
        }
    });
    parallaxMouseFirstRun = 0;
}

function parallaxMouseInit() {
    var self = this;
    if (!self.options.enableMouseParallax) {
        return;
    }

    clearTimeout(parallaxMouseTimeout);
    parallaxMouseTimeout = setTimeout(function () {
        var $newParallax = (0, _utility.$)('.bg-image:not(.bg-parallaxed)').addClass('bg-parallaxed');
        if ($newParallax.length) {
            // add new parallax blocks
            if ($parallaxMouseList) {
                $parallaxMouseList = $parallaxMouseList.add($newParallax);

                // first init parallax
            } else {
                $parallaxMouseList = $newParallax;
                if (_utility.isMobile && window.DeviceOrientationEvent) {
                    _utility.$wnd.on('deviceorientation', function (event) {
                        parallaxMouseRun(event.gamma / 90, event.beta / 180, true);
                    });

                    // no smooth on firefox
                } else {
                    _utility.$wnd.on('mousemove', function (event) {
                        parallaxMouseRun(event.clientX, event.clientY);
                    });
                }
            }
        }

        // update data for parallax blocks
        if ($parallaxMouseList) {
            $parallaxMouseList.each(function () {
                var $this = (0, _utility.$)(this);
                var $parent = $this.parent();
                var size = parseFloat($parent.attr('data-nk-mouse-parallax-size')) || 30;
                var speed = parseFloat($parent.attr('data-nk-mouse-parallax-speed')) || 10000;
                $this.data('nk-parallax-mouse-data', {
                    is_in_viewport: self.isInViewport($parent) ? $parent.is(':visible') : 0,
                    rect: $parent[0].getBoundingClientRect(),
                    size: size,
                    speed: speed / 1000
                });
                $this.css({
                    left: -size,
                    right: -size,
                    top: -size,
                    bottom: -size
                });
            });
        }
    }, 100);
}

exports.parallaxMouseInit = parallaxMouseInit;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAnchors = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Anchors

-------------------------------------------------------------------*/
function initAnchors() {
    var self = this;

    // click on anchors
    var $leftSideNav = (0, _utility.$)('.nk-navbar-left-side');
    var $rightSideNav = (0, _utility.$)('.nk-navbar-right-side');
    function closeNavs() {
        self.closeSide($leftSideNav);
        self.closeSide($rightSideNav);
        self.closeFullscreenNavbar();
    }
    _utility.$doc.on('click', '.navbar a, .nk-navbar a, a.btn, a.nk-btn, a.nk-anchor', function clickAnchor(e) {
        var isHash = this.hash;
        var isURIsame = this.baseURI === window.location.href;

        if (isHash && isURIsame) {
            // sometimes hashs have no valid selector like ##hash, it will throw errors
            try {
                var $hashBlock = (0, _utility.$)(isHash);
                var hash = isHash.replace(/^#/, '');
                if ($hashBlock.length || hash === 'top' || hash === 'bottom') {
                    // close navigations
                    closeNavs();

                    // scroll to block
                    self.scrollTo($hashBlock.length ? $hashBlock : hash);

                    e.preventDefault();
                }
            } catch (ev) {
                // console.error(e);
            }
        }
    });

    // add active class on navbar items
    var $anchorItems = (0, _utility.$)('.nk-navbar .nk-nav > li > a[href*="#"]');
    var anchorBlocks = [];
    function hashInArray(item) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            if (anchorBlocks[k].hash === item) {
                return k;
            }
        }
        return false;
    }
    // get all anchors + blocks on the page
    $anchorItems.each(function eachAnchorItems() {
        var hash = this.hash.replace(/^#/, '');
        if (!hash) {
            return;
        }

        var $item = (0, _utility.$)(this).parent();
        var $block = (0, _utility.$)('#' + hash);

        if (hash && $block.length || hash === 'top') {
            var inArray = hashInArray(hash);
            if (inArray === false) {
                anchorBlocks.push({
                    hash: hash,
                    $item: $item,
                    $block: $block
                });
            } else {
                anchorBlocks[inArray].$item = anchorBlocks[inArray].$item.add($item);
            }
        }
    });
    // prepare anchor list and listen for scroll to activate items in navbar
    function updateAnchorItemsPositions() {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var blockTop = 0;
            var blockH = _utility.wndH;
            if (item.$block.length) {
                blockTop = item.$block.offset().top;
                blockH = item.$block.innerHeight();
            }
            item.activate = blockTop - _utility.wndH / 2;
            item.deactivate = blockTop + blockH - _utility.wndH / 2;
        }
    }
    function setAnchorActiveItem(type, ST) {
        for (var k = 0; k < anchorBlocks.length; k++) {
            var item = anchorBlocks[k];
            var active = ST >= item.activate && ST < item.deactivate;
            item.$item[active ? 'addClass' : 'removeClass']('active');
        }
    }
    if (anchorBlocks.length) {
        updateAnchorItemsPositions();
        setAnchorActiveItem('static', _utility.$wnd.scrollTop());
        self.throttleScroll(setAnchorActiveItem);
        self.debounceResize(updateAnchorItemsPositions);
    }
}

exports.initAnchors = initAnchors;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initLinesForBoxes = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Line For Boxes
  <div class="nk-box nk-box-line"></div>

-------------------------------------------------------------------*/
function initLinesForBoxes() {
    var self = this;
    var $rowsWithBoxes = void 0;

    (0, _utility.$)('.row').each(function eachRows() {
        if ((0, _utility.$)(this).find('> * > .nk-box-line').length) {
            $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add((0, _utility.$)(this)) : (0, _utility.$)(this);
        }
    });

    // support for VC
    (0, _utility.$)('.vc_row').each(function eachVCRows() {
        if ((0, _utility.$)(this).find('> div > div > div > .nk-box-line').length) {
            $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add((0, _utility.$)(this)) : (0, _utility.$)(this);
        }
    });

    if (!$rowsWithBoxes) {
        return;
    }

    function calculate() {
        $rowsWithBoxes.each(function eachRowsWithBoxes() {
            var currentRowStart = 0;
            var rowDivs = [];
            var topPosition = 0;
            var $this = (0, _utility.$)(this);

            // check all rows and add in array
            $this.children('*').each(function eachRowChildrens() {
                topPosition = (0, _utility.$)(this).position().top;
                if (currentRowStart !== topPosition) {
                    currentRowStart = topPosition;
                    rowDivs.push((0, _utility.$)(this));
                } else if (rowDivs[rowDivs.length - 1]) {
                    rowDivs[rowDivs.length - 1] = rowDivs[rowDivs.length - 1].add((0, _utility.$)(this));
                } else {
                    rowDivs[(rowDivs.length || 1) - 1] = (0, _utility.$)(this);
                }
            });

            // support for VC
            if ($this.hasClass('vc_row')) {
                // remove additional classnames
                (0, _utility.$)(this).find('> div > div > div > .nk-box-line').removeClass('nk-box-line-top nk-box-last');

                // add new classnames
                for (var k = 0; k < rowDivs.length; k++) {
                    rowDivs[k].last().find('> div > div > .nk-box-line').addClass('nk-box-last');
                    if (k > 0) {
                        rowDivs[k].find('> div > div > .nk-box-line').addClass('nk-box-line-top');
                    }
                }

                // bootstrap
            } else {
                // remove additional classnames
                $this.find('> * > .nk-box-line').removeClass('nk-box-line-top nk-box-last');

                // add new classnames
                for (var _k = 0; _k < rowDivs.length; _k++) {
                    rowDivs[_k].last().children('.nk-box-line').addClass('nk-box-last');
                    if (_k > 0) {
                        rowDivs[_k].children('.nk-box-line').addClass('nk-box-line-top');
                    }
                }
            }
        });
    }

    calculate();
    self.debounceResize(calculate);
}

exports.initLinesForBoxes = initLinesForBoxes;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initImageBoxes = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Image Boxes

-------------------------------------------------------------------*/
function initImageBoxes() {
    var $imgBox = void 0;
    var $img = void 0;
    var rect = void 0;
    var fromCenter = void 0;
    var run = void 0;
    var scaleFrom = void 0;
    var scaleTo = void 0;
    var allBoxesSelector = '.nk-image-box-1:not(.nk-no-effect), .nk-image-box-1-a:not(.nk-no-effect), .nk-image-box-2:not(.nk-no-effect), .nk-image-box-3:not(.nk-no-effect), .nk-image-box-4:not(.nk-no-effect), .nk-image-box-5:not(.nk-no-effect)';

    // image animation
    (0, _utility.$)(allBoxesSelector).each(function eachImageBoxes() {
        $img = (0, _utility.$)(this).find('img, div.nk-portfolio-image');
        if ($img.attr('data-from')) {
            _utility.tween.to($img, 2, {
                scale: $img.attr('data-from')
            });
        }
    });
    _utility.$doc.on('mouseenter', allBoxesSelector, function onMouseEnterImageBoxes() {
        $imgBox = (0, _utility.$)(this);
        $img = $imgBox.find('img, div.nk-portfolio-image');
        scaleFrom = $img.attr('data-from') || 1;
        scaleTo = $img.attr('data-to') || 1.05;
        _utility.tween.to($img, 1, {
            scale: scaleTo
        });
        run = 1;
    }).on('mouseleave', allBoxesSelector, function () {
        run = 0;
        _utility.tween.to($img, 1, {
            scale: scaleFrom,
            x: 0,
            y: 0
        });
    }).on('mousemove', allBoxesSelector, function (e) {
        window.requestAnimationFrame(function () {
            if (run) {
                rect = $imgBox[0].getBoundingClientRect();
                fromCenter = [(rect.width / 2 - e.clientX + rect.left) / (rect.width / 2), (rect.height / 2 - e.clientY + rect.top) / (rect.height / 2)];
                _utility.tween.to($img, 7, {
                    x: rect.width * (scaleTo - 1) * fromCenter[0] / 2,
                    y: rect.height * (scaleTo - 1) * fromCenter[1] / 2
                });
            }
        });
    });

    // overlay smart show
    _utility.$doc.on('mouseenter mouseleave', '.nk-image-box-5', function onMouseEnterImageBoxe5(e) {
        var $overlay = (0, _utility.$)(this).find('.nk-image-box-overlay');
        var itemRect = $imgBox[0].getBoundingClientRect();

        // detect mouse enter or leave
        var x = (itemRect.width / 2 - e.clientX + itemRect.left) / (itemRect.width / 2);
        var y = (itemRect.height / 2 - e.clientY + itemRect.top) / (itemRect.height / 2);
        var enter = e.type === 'mouseenter';
        var endX = '0%';
        var endY = '0%';
        if (Math.abs(x) > Math.abs(y)) {
            endX = (x > 0 ? '-10' : '10') + endX;
        } else {
            endY = (y > 0 ? '-10' : '10') + endY;
        }

        if (enter) {
            _utility.tween.set($overlay, {
                x: endX,
                y: endY
            });
        }
        _utility.tween.to($overlay, 0.25, {
            x: enter ? '0%' : endX,
            y: enter ? '0%' : endY,
            display: enter ? 'flex' : 'none',
            ease: Power1.easeInOut
        });
    });
}

exports.initImageBoxes = initImageBoxes;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initVideoFullscreen = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

 Init Fullscreen Video

 -------------------------------------------------------------------*/
function initVideoFullscreen() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    var self = this;

    // open fullscreen videos
    var openedFSVideo = void 0;
    self.openFullScreenVideo = function (url) {
        if (_utility.isMobile) {
            window.open(url);
            return;
        }

        if (openedFSVideo) {
            return;
        }
        openedFSVideo = 1;

        // get api for this video
        self.FullScreenVideoApi = new VideoWorker(url, {
            autoplay: 1,
            loop: 0,
            mute: 0,
            controls: 1
        });

        // set video size
        function setVideoSize() {
            var ratio = 16 / 9;
            var resultW = void 0;
            var resultH = void 0;

            if (ratio > _utility.wndW / _utility.wndH) {
                resultW = _utility.wndW * 0.9;
                resultH = resultW / ratio;
            } else {
                resultH = _utility.wndH * 0.9;
                resultW = resultH * ratio;
            }
            self.FullScreenVideoWrapper.css({
                width: resultW,
                height: resultH,
                top: (_utility.wndH - resultH) / 2,
                left: (_utility.wndW - resultW) / 2
            });
        }

        // create fullscreen video wrapper if doesn't exist
        if (!self.FullScreenVideo) {
            self.FullScreenVideo = (0, _utility.$)('<div class="nk-video-fullscreen"></div>').appendTo(_utility.$body);

            self.closeFullScreenVideo = function () {
                if (openedFSVideo) {
                    openedFSVideo = 0;

                    self.FullScreenVideoApi.pause();

                    // close fullscreen
                    self.FullScreenVideo.removeClass('active');

                    setTimeout(function () {
                        self.FullScreenVideoWrapper.html('');
                    }, 200);

                    // restore body scrolling
                    self.bodyOverflow(0);
                }
            };

            // close icon
            (0, _utility.$)('<div class="nk-video-fullscreen-close">' + self.options.templates.fullscreenVideoClose + '</div>').on('click', self.closeFullScreenVideo).appendTo(self.FullScreenVideo);

            // video container
            self.FullScreenVideoWrapper = (0, _utility.$)('<div class="nk-video-fullscreen-cont"></div>').appendTo(self.FullScreenVideo);

            setVideoSize();
            self.debounceResize(setVideoSize);
        }

        // check api and run fullscreen
        if (self.FullScreenVideoApi && self.FullScreenVideoApi.isValid()) {
            self.FullScreenVideoApi.getIframe(function (iframe) {
                var $parent = (0, _utility.$)(iframe).parent();
                self.FullScreenVideoWrapper.append(iframe);
                $parent.remove();

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }

                // show fullscreen video
                self.FullScreenVideo.addClass('active');

                // prevent body scrolling
                self.bodyOverflow(1);
            });
        }
    };
    _utility.$doc.on('click', '.nk-video-fullscreen-toggle', function onClickVideoFullscreen(e) {
        e.preventDefault();
        self.openFullScreenVideo((0, _utility.$)(this).attr('href'));
    });
}

exports.initVideoFullscreen = initVideoFullscreen;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initVideoBlocks = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

 Init Video Blocks

 -------------------------------------------------------------------*/
function initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    var self = this;

    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon || self.options.templates.plainVideoIcon);
    }
    (0, _utility.$)('.nk-plain-video[data-video]:not(.nk-plain-video-enabled)').addClass('nk-plain-video-enabled').each(function eachPlainVideo() {
        var $plainCont = (0, _utility.$)(this);
        var $plainIframe = void 0;
        var url = (0, _utility.$)(this).attr('data-video');
        var thumb = (0, _utility.$)(this).attr('data-video-thumb');
        var api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1
        });

        if (api && api.isValid()) {
            var loaded = 0;
            var clicked = 0;

            // add play event
            $plainCont.on('click', function () {
                if (_utility.isMobile) {
                    window.open(api.url);
                    return;
                }

                if (clicked) {
                    return;
                }
                clicked = 1;

                // add loading button
                if (!loaded) {
                    addPlainLoadButton($plainCont);

                    api.getIframe(function (iframe) {
                        // add iframe
                        $plainIframe = (0, _utility.$)(iframe);
                        var $parent = $plainIframe.parent();
                        $plainIframe.appendTo($plainCont);
                        $parent.remove();
                        api.play();
                    });
                } else {
                    api.play();
                }
            });

            // add play button
            $plainCont.append('<span class="nk-video-plain-toggle"></span>');
            addPlainPlayButton($plainCont);

            // set thumb
            if (thumb) {
                $plainCont.css('background-image', 'url("' + thumb + '")');
            } else {
                api.getImageURL(function (imgSrc) {
                    $plainCont.css('background-image', 'url("' + imgSrc + '")');
                });
            }

            if (_utility.isMobile) {
                return;
            }

            api.on('ready', function () {
                api.play();
            });
            api.on('play', function () {
                $plainCont.addClass('active');

                // add play button
                if (!loaded) {
                    addPlainPlayButton($plainCont);
                    loaded = 1;
                }

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', function () {
                $plainCont.removeClass('active');
                clicked = 0;
            });
        }
    });
}

exports.initVideoBlocks = initVideoBlocks;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initGIF = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init GIFs

-------------------------------------------------------------------*/
function initGIF() {
    var self = this;

    // load gif in background
    function loadGif(url, cb) {
        var temp = new Image();
        temp.onload = function () {
            cb();
        };
        temp.src = url;
    }

    // play gif
    function playGif(item) {
        var $item = (0, _utility.$)(item);
        if (!item.gifPlaying) {
            item.gifPlaying = true;
            if (item.khGifLoaded) {
                $item.addClass('nk-gif-playing');
                $item.find('img').attr('src', $item.find('img').attr('data-gif'));
            } else if (!item.khGifLoading) {
                item.khGifLoading = 1;
                $item.addClass('nk-gif-loading');
                loadGif($item.find('img').attr('data-gif'), function () {
                    item.khGifLoaded = 1;
                    $item.removeClass('nk-gif-loading');
                    if (item.gifPlaying) {
                        item.gifPlaying = false;
                        playGif(item);
                    }
                });
            }
        }
    }

    // stop playing gif
    function stopGif(item) {
        var $item = (0, _utility.$)(item);
        if (item.gifPlaying) {
            item.gifPlaying = false;
            $item.removeClass('nk-gif-playing');
            $item.find('img').attr('src', $item.find('img').attr('data-gif-static'));
        }
    }

    // prepare gif containers
    (0, _utility.$)('.nk-gif').each(function eachGif() {
        var $this = (0, _utility.$)(this);
        // add toggle button
        $this.append('<a class="nk-gif-toggle">' + self.options.templates.gifIcon + '</a>');

        // add loading circle
        $this.append('<div class="nk-loading-spinner"><i></i></div>');

        $this.find('img').attr('data-gif-static', $this.find('img').attr('src'));
    });

    // hover gif
    (0, _utility.$)('.nk-gif-hover').on('mouseenter', function onMouseEnterGif() {
        (0, _utility.$)(this).addClass('hover');
        playGif(this);
    }).on('mouseleave', function onMouseLeaveGif() {
        (0, _utility.$)(this).removeClass('hover');
        stopGif(this);
    });

    // click gif
    (0, _utility.$)('.nk-gif-click').on('click', function onGifClick() {
        if (this.gifPlaying) {
            (0, _utility.$)(this).removeClass('hover');
            stopGif(this);
        } else {
            (0, _utility.$)(this).addClass('hover');
            playGif(this);
        }
    });

    // autoplay in viewport
    var $gifVP = (0, _utility.$)('.nk-gif-viewport');
    if ($gifVP.length) {
        self.throttleScroll(function () {
            $gifVP.each(function eachFifVP() {
                var inVP = self.isInViewport((0, _utility.$)(this), 1);
                if (inVP[0]) {
                    if (inVP[1].height / _utility.wndH < 0.7) {
                        if (inVP[0] === 1) {
                            playGif(this);
                        } else {
                            stopGif(this);
                        }
                    } else if (inVP[0] >= 0.7) {
                        playGif(this);
                    } else {
                        stopGif(this);
                    }
                } else {
                    stopGif(this);
                }
            });
        });
    }

    // autoplay gif
    (0, _utility.$)('.nk-gif:not(.nk-gif-click):not(.nk-gif-hover):not(.nk-gif-viewport)').each(function eachGifAutoplay() {
        playGif(this);
    });
}

exports.initGIF = initGIF;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFullPage = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Fullpage

-------------------------------------------------------------------*/
function initFullPage() {
    var $fullPage = (0, _utility.$)('.nk-fullpage:eq(0)');
    var $eachItems = $fullPage.find('.nk-fullpage-item');
    if (!$fullPage.length || !$eachItems.length) {
        return;
    }

    var self = this;

    // set items height
    function resizeItems() {
        $eachItems.css('height', _utility.wndH);
    }
    resizeItems();
    self.debounceResize(resizeItems);

    // add navigation
    var $nav = '<ul class="nk-fullpage-nav">';
    for (var k = 0; k < $eachItems.length; k++) {
        $nav += '<li>' + (k + 1) + '</li>';
    }
    $nav += '</ul>';
    $nav = (0, _utility.$)($nav);
    var $navItems = $nav.children('li');
    _utility.$body.append($nav);

    function setActiveNavItem(num) {
        $navItems.removeClass('active');
        $navItems.eq(num).addClass('active');
    }
    function showNav() {
        $nav.addClass('active');
    }
    function hideNav() {
        $nav.removeClass('active');
    }

    if (self.isInViewport($fullPage) === 1 && _utility.$wnd.scrollTop() === 0) {
        setActiveNavItem(0);
        showNav();
    }

    // check for active item
    var isBusy = void 0;
    var $activeItem = void 0;
    var $nextItem = void 0;
    var $prevItem = void 0;
    function getActiveItem(sibling) {
        // if no active items - detect it
        var firstCheck = !$activeItem && !$nextItem && !$prevItem;
        if (firstCheck) {
            var inViewport = self.isInViewport($fullPage, 1);
            if (inViewport[0]) {
                var $itemInVP = void 0;
                $eachItems.each(function eachItems() {
                    var visible = self.isInViewport((0, _utility.$)(this));
                    if (visible) {
                        $itemInVP = (0, _utility.$)(this);
                        if (visible < 0.5 && $itemInVP.next('.nk-fullpage-item').length) {
                            $itemInVP = $itemInVP.next('.nk-fullpage-item');
                        }
                        return false;
                    }
                    return true;
                });

                // center
                if (inViewport[0] === 1) {
                    $activeItem = $itemInVP;
                    $nextItem = $activeItem.next('.nk-fullpage-item');
                    $prevItem = $activeItem.prev('.nk-fullpage-item');

                    // top
                } else if (inViewport[1].top > 0) {
                    $nextItem = $itemInVP;

                    // bottom
                } else {
                    $prevItem = $itemInVP;
                }
            }
        }

        if (!firstCheck) {
            var temp = $activeItem;
            if (sibling > 0) {
                $activeItem = $nextItem;
                $prevItem = temp;
                $nextItem = $activeItem.next('.nk-fullpage-item');
            } else if (sibling < 0) {
                $activeItem = $prevItem;
                $nextItem = temp;
                $prevItem = $activeItem.prev('.nk-fullpage-item');
            }
        }

        return $activeItem && $activeItem.length ? $activeItem : false;
    }

    // Check for prevent default scroll
    function preventScroll(delta) {
        var prev = $prevItem && $prevItem.length;
        var next = $nextItem && $nextItem.length;
        if (!prev && !next) {
            getActiveItem();
            prev = $prevItem && $prevItem.length;
            next = $nextItem && $nextItem.length;
        }
        if (prev && next || isBusy) {
            return true;
        }
        var visible = self.isInViewport($fullPage);
        if (visible > 0.5) {
            $activeItem = false;
            $nextItem = false;
            $prevItem = false;

            getActiveItem();
            prev = $prevItem && $prevItem.length;
            next = $nextItem && $nextItem.length;
            if (!prev && delta < 0 && visible === 1 && _utility.$wnd.scrollTop() === 0) {
                return true;
            }
            return prev && delta < 0 || next && delta > 0;
        }
        return false;
    }

    // scroll to item
    function scrollToItem($item, callback) {
        if ($item && !(0, _utility.isBodyOverflowed)()) {
            isBusy = 1;
            self.scrollTo($item, function () {
                isBusy = 0;

                if (callback) {
                    callback();
                }
            });
            setActiveNavItem($item.index());
            showNav();
        }
    }
    $nav.on('click', '> li', function onItemClick() {
        $activeItem = false;
        $nextItem = false;
        $prevItem = false;
        scrollToItem($eachItems.eq((0, _utility.$)(this).index()));
    });

    // scroll to next fullscreen item
    function onScroll(delta, callback) {
        // scroll to active item
        if (!isBusy) {
            scrollToItem(getActiveItem(delta), callback);
        }
    }

    var updateDefaultScroll = void 0;
    var wheelEvent = void 0;
    if ('onwheel' in document.createElement('div')) {
        wheelEvent = 'wheel';
    } else if ('onmousewheel' in document.createElement('div')) {
        wheelEvent = 'mousewheel';
    }
    if (wheelEvent) {
        // mouse wheel scroll
        _utility.$wnd.on(wheelEvent, function (e) {
            if (preventScroll(e.originalEvent.deltaY) === true) {
                onScroll(e.originalEvent.deltaY, function () {
                    updateDefaultScroll = 0;
                });
                e.preventDefault();
            } else {
                hideNav();
            }
        });
    }

    // touch swipe
    var touchStart = 0;
    var touchDelta = 0;
    _utility.$wnd.on('touchstart', function (e) {
        touchStart = e.originalEvent.touches[0].screenY;
        touchDelta = 0;
    });
    _utility.$wnd.on('touchmove touchend', function (e) {
        var y = e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[0].screenY : false;
        touchDelta = y === false ? touchDelta : touchStart - y;

        if (preventScroll(touchDelta) === true) {
            if (e.type === 'touchend') {
                onScroll(touchDelta, function () {
                    updateDefaultScroll = 0;
                });
            }
            e.preventDefault();
        } else {
            hideNav();
        }
    });

    // default scroll
    var defaultScrollTimeout = void 0;
    _utility.$wnd.on('scroll resize', function () {
        updateDefaultScroll = 1;
        clearTimeout(defaultScrollTimeout);
        defaultScrollTimeout = setTimeout(function () {
            if (updateDefaultScroll) {
                $activeItem = false;
                $nextItem = false;
                $prevItem = false;
                onScroll();
            }
        }, 1000);
    });

    // on resize - save active item position
    self.debounceResize(function () {
        if ($activeItem && $activeItem.length) {
            if (!isBusy) {
                scrollToItem($activeItem);
            }
        }
    });
}

exports.initFullPage = initFullPage;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initQuickView = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Quick View for Portfolio

-------------------------------------------------------------------*/
function initQuickView() {
    var $quickViewLinks = (0, _utility.$)('.nk-portfolio-quick-view, .nk-product-quick-view');
    if (!$quickViewLinks.length) {
        return;
    }

    var self = this;

    var portfolioNavTemplate = self.options.templates.quickViewPortfolio;
    var storeNavTemplate = self.options.templates.quickViewStore;

    var isStoreClass = 'is-store-qv-nav';
    var isProductClass = 'is-portfolio-qv-nav';

    var opened = false;
    var siblingsLinks = false;

    // create quick view container
    var $quickView = (0, _utility.$)('<div class="nk-quick-view"></div>').appendTo(_utility.$body);

    // content
    var $quickViewCont = (0, _utility.$)('<div class="nk-quick-view-cont"></div>').appendTo($quickView);

    // nav
    var $quickViewNav = (0, _utility.$)('<div class="nk-quick-view-nav"></div>').appendTo($quickView);

    // load quick view content
    function loadQuickViewCont(url) {
        // add loading spinner
        $quickViewCont.html('<div class="nk-loading-spinner mauto"><i></i></div>');
        $quickView.removeClass('loaded');

        var $iframe = (0, _utility.$)('<iframe>').appendTo($quickViewCont);
        $iframe.on('load', function onQuickViewIframeLoad() {
            var $frameDoc = (0, _utility.$)(this.contentDocument);

            self.options.events.beforeQuickViewLoad($frameDoc);

            // remove all layout items
            $frameDoc.find('.nk-portfolio-item-single').siblings('*:not(.nk-header-title)').remove();
            $frameDoc.find('.nk-product-quick-view, .nk-portfolio-quick-view, .nk-share-place, .nk-share-place-overlay, .nk-header,' + '.nk-navbar, .nk-navbar-overlay, .nk-page-nav, .nk-page-nav-2, .nk-page-nav-3, .nk-side-buttons, .nk-search, .nk-footer').remove();

            // change all links to target _parent
            $frameDoc.find('a').each(function eachQuickViewLinks() {
                if (this.target !== '_blank') {
                    this.target = '_parent';
                }
            });

            self.options.events.quickViewLoad($frameDoc);

            // show iframe
            $quickView.addClass('loaded');
        });
        $iframe.attr('src', url);

        // navigation
        if (siblingsLinks) {
            var prevItem = void 0;
            var nextItem = void 0;
            var tempPrev = void 0;
            for (var k = 0; k < siblingsLinks.length; k++) {
                if (siblingsLinks[k].url === url) {
                    prevItem = tempPrev;
                    nextItem = siblingsLinks[k + 1];
                }
                tempPrev = siblingsLinks[k];
            }

            var $prev = $quickViewNav.find('.nk-page-nav-prev');
            var $next = $quickViewNav.find('.nk-page-nav-next');
            var withCategory = $next.find('.nk-page-nav-title > .nk-product-category').length;

            $prev[(prevItem ? 'remove' : 'add') + 'Class']('disabled');
            $prev.attr('href', prevItem && prevItem.url || 'javascript:void(0)');
            $prev.find('.nk-page-nav-img > div').css('background-image', 'url("' + (prevItem && prevItem.image || '') + '")');
            $prev.find('.nk-page-nav-img > img').attr('src', prevItem && prevItem.image || '');
            if (withCategory) {
                $prev.find('.nk-page-nav-title > .nk-product-title').html(prevItem && prevItem.title || '');
                $prev.find('.nk-page-nav-title > .nk-product-category').html(prevItem && prevItem.category || '');
            } else {
                $prev.find('.nk-page-nav-title').html(prevItem && prevItem.title || '');
            }

            $next[(nextItem ? 'remove' : 'add') + 'Class']('disabled');
            $next.attr('href', nextItem && nextItem.url || 'javascript:void(0)');
            $next.find('.nk-page-nav-img > div').css('background-image', 'url("' + (nextItem && nextItem.image || '') + '")');
            $next.find('.nk-page-nav-img > img').attr('src', nextItem && nextItem.image || '');
            if (withCategory) {
                $next.find('.nk-page-nav-title > .nk-product-title').html(nextItem && nextItem.title || '');
                $next.find('.nk-page-nav-title > .nk-product-category').html(nextItem && nextItem.category || '');
            } else {
                $next.find('.nk-page-nav-title').html(nextItem && nextItem.title || '');
            }
        }
    }

    // open quick view
    self.openQuickView = function (item) {
        if (opened || !item || !item.href) {
            return;
        }
        opened = true;

        var url = item.href;
        var isStore = (0, _utility.$)(item).hasClass('nk-product-quick-view');

        self.options.events.quickViewOpen($quickView);

        if (!siblingsLinks) {
            var $siblings = void 0;
            if (isStore) {
                $siblings = (0, _utility.$)(item).parents('.nk-store:eq(0)').find('.nk-product').find('.nk-product-quick-view:eq(0)');
            } else {
                $siblings = (0, _utility.$)(item).parents('.nk-isotope, [class*="nk-carousel"]').eq(0).find('.nk-isotope-item').find('.nk-portfolio-quick-view:eq(0)');
            }
            siblingsLinks = [];

            $siblings.each(function eachSiblings() {
                var $qvItem = (0, _utility.$)(this).parents(isStore ? '.nk-product:eq(0)' : '.nk-isotope-item:eq(0)');
                var title = '';
                var category = '';
                var image = '';
                if (isStore) {
                    title = $qvItem.find('.nk-product-title').text() || '';
                    category = $qvItem.find('.nk-product-category').html() || '';
                    image = $qvItem.find('.nk-product-image > img').attr('src') || '';
                } else {
                    title = $qvItem.find('.nk-portfolio-title').text() || '';
                    category = $qvItem.find('.nk-portfolio-category').html() || '';
                    image = $qvItem.find('img.nk-portfolio-image').attr('src') || '';
                }
                siblingsLinks.push({
                    url: this.href,
                    title: title,
                    category: category,
                    image: image,
                    item: this
                });
            });
        }

        // show quick view
        $quickView.addClass('active');

        // add navigation skeleton
        $quickViewNav.html(isStore ? storeNavTemplate : portfolioNavTemplate).removeClass(isStoreClass + ' ' + isProductClass).addClass(isStore ? isStoreClass : isProductClass);

        // prevent body scrolling
        self.bodyOverflow(1);

        // load content
        loadQuickViewCont(url);
    };

    // close quick view
    self.closeQuickView = function () {
        self.options.events.beforeQuickViewClose($quickView);

        // hide animation
        $quickView.removeClass('active');
        $quickViewCont.html('');
        self.options.events.quickViewClosed($quickView);

        // restore body scrolling
        self.bodyOverflow(0);

        siblingsLinks = false;
        opened = false;
    };

    // close icon
    (0, _utility.$)('<div class="nk-quick-view-close">' + self.options.templates.quickViewCloseIcon + '</div>').on('click', self.closeQuickView).appendTo($quickView);

    // prev / next quick view click
    $quickViewNav.on('click', '.nk-page-nav .nk-page-nav-prev:not(.disabled), .nk-page-nav .nk-page-nav-next:not(.disabled),' + '.nk-page-nav-2 .nk-page-nav-prev:not(.disabled), .nk-page-nav-2 .nk-page-nav-next:not(.disabled)', function onClickQuickViewNav(e) {
        e.preventDefault();
        loadQuickViewCont(this.href);
    });

    // open quick view event
    _utility.$body.on('click', '.nk-portfolio-quick-view, .nk-product-quick-view', function onClickQuickViewItem(e) {
        e.preventDefault();
        self.openQuickView(this);
    });
}

exports.initQuickView = initQuickView;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initInfoBoxes = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Info Boxes / Alerts

-------------------------------------------------------------------*/
function initInfoBoxes() {
    var self = this;

    // close
    _utility.$doc.on('click', '.nk-info-box .nk-info-box-close', function onClickInfoboxClose(e) {
        e.preventDefault();
        var $box = (0, _utility.$)(this).parents('.nk-info-box:eq(0)');
        _utility.tween.to($box, 0.3, {
            opacity: 0,
            onComplete: function onComplete() {
                _utility.tween.to($box, 0.3, {
                    height: 0,
                    padding: 0,
                    margin: 0,
                    display: 'none',
                    onComplete: function onComplete() {
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

exports.initInfoBoxes = initInfoBoxes;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initForms = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Forms

-------------------------------------------------------------------*/
function initForms() {
    var self = this;

    // Create Spinners in input number
    (0, _utility.$)('<span class="nk-form-control-number-up"></span>').insertAfter('.nk-form-control-number input');
    (0, _utility.$)('<span class="nk-form-control-number-down"></span>').insertAfter('.nk-form-control-number input');
    _utility.$doc.on('click', '.nk-form-control-number-up', function onSpinnerClickUp() {
        var $input = (0, _utility.$)(this).siblings('input');
        var max = $input.attr('max') || 9999999;
        var newVal = void 0;

        var oldValue = parseFloat($input.val());
        if (oldValue >= max) {
            newVal = oldValue;
        } else {
            newVal = oldValue + 1;
        }
        $input.val(newVal);
        $input.trigger('change');
    });
    _utility.$doc.on('click', '.nk-form-control-number-down', function onSpinnerClickDown() {
        var $input = (0, _utility.$)(this).siblings('input');
        var min = $input.attr('min') || -9999999;
        var newVal = void 0;

        var oldValue = parseFloat($input.val());
        if (oldValue <= min) {
            newVal = oldValue;
        } else {
            newVal = oldValue - 1;
        }
        $input.val(newVal);
        $input.trigger('change');
    });

    // Sign Forms
    var $signForm = (0, _utility.$)('.nk-sign-form');
    var $formLost = $signForm.find('.nk-sign-form-lost');
    var $formLogin = $signForm.find('.nk-sign-form-login');
    var $formRegister = $signForm.find('.nk-sign-form-register');
    var $toggleLost = $signForm.find('.nk-sign-form-lost-toggle');
    var $toggleLogin = $signForm.find('.nk-sign-form-login-toggle');
    var $toggleRegister = $signForm.find('.nk-sign-form-register-toggle');

    function animateForms($showItems) {
        var inverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _utility.tween.set($signForm, {
            height: 'auto'
        });
        _utility.tween.set($signForm, {
            height: $signForm.outerHeight(true)
        });

        var $hideItems = $formLost.filter('.active').add($formRegister.filter('.active')).add($formLogin.filter('.active'));
        _utility.tween.set($hideItems, {
            position: 'absolute',
            display: 'block',
            x: 0
        });
        _utility.tween.set($showItems, {
            position: 'absolute',
            display: 'none',
            x: inverse ? '-60%' : '60%'
        });
        _utility.tween.to($hideItems, 0.2, {
            opacity: 0,
            x: inverse ? '60%' : '-60%',
            display: 'none',
            force3D: true
        });
        _utility.tween.to($showItems, 0.2, {
            opacity: 1,
            display: 'block',
            x: '0%',
            force3D: true,
            onComplete: function onComplete() {
                _utility.tween.set($showItems, {
                    position: 'relative'
                });

                var formHeight = $signForm.outerHeight(true);
                _utility.tween.set($signForm, {
                    height: 'auto'
                });
                var formNewHeight = $signForm.outerHeight(true);
                _utility.tween.set($signForm, {
                    height: formHeight
                });
                _utility.tween.to($signForm, 0.2, {
                    height: formNewHeight
                });
            }
        });
        $hideItems.removeClass('active');
        $showItems.addClass('active');
    }
    function showLoginForm() {
        animateForms($formLogin, true);
        $toggleLost.removeClass('active');
        $toggleLogin.addClass('active');
        $toggleRegister.removeClass('active');
    }
    function showLostForm() {
        animateForms($formLost);
        $toggleLost.addClass('active');
        $toggleLogin.removeClass('active');
        $toggleRegister.removeClass('active');
    }
    function showRegisterForm() {
        animateForms($formRegister);
        $toggleLost.removeClass('active');
        $toggleLogin.removeClass('active');
        $toggleRegister.addClass('active');
    }

    $signForm.on('click', '.nk-sign-form-login-toggle:not(.active)', function (e) {
        e.preventDefault();
        showLoginForm();
    });
    $signForm.on('click', '.nk-sign-form-lost-toggle:not(.active)', function (e) {
        e.preventDefault();
        showLostForm();
    });
    $signForm.on('click', '.nk-sign-form-register-toggle:not(.active)', function (e) {
        e.preventDefault();
        showRegisterForm();
    });

    if (typeof _utility.$.fn.ajaxSubmit === 'undefined' || typeof _utility.$.validator === 'undefined') {
        return;
    }

    // Validate Khaki Forms
    (0, _utility.$)('form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])').each(function eachValidateForms() {
        (0, _utility.$)(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                var $parentNumber = element.parent('.nk-form-control-number');
                if ($parent.length) {
                    $parent.after(error);
                } else if ($parentNumber.length) {
                    $parentNumber.parent().after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            }
        });
    });

    // ajax form
    (0, _utility.$)('form.nk-form-ajax:not([novalidate])').each(function eachAjaxForms() {
        (0, _utility.$)(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement: function errorPlacement(error, element) {
                var $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler(form) {
                var $responseSuccess = (0, _utility.$)(form).find('.nk-form-response-success');
                var $responseError = (0, _utility.$)(form).find('.nk-form-response-error');
                (0, _utility.$)(form).ajaxSubmit({
                    type: 'POST',
                    success: function success(response) {
                        response = JSON.parse(response);
                        if (response.type && response.type === 'success') {
                            $responseError.hide();
                            $responseSuccess.html(response.response).show();
                            form.reset();
                        } else {
                            $responseSuccess.hide();
                            $responseError.html(response.response).show();
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });
}

exports.initForms = initForms;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFormsMailChimp = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init MailChimp

-------------------------------------------------------------------*/
function initFormsMailChimp() {
    var $mchimp = (0, _utility.$)('form.nk-mchimp');
    if (typeof _utility.$.fn.ajaxSubmit === 'undefined' || typeof _utility.$.validator === 'undefined' || !$mchimp.length) {
        return;
    }
    var self = this;

    // Additional Validate Methods From MailChimp
    // Validate a multifield birthday
    _utility.$.validator.addMethod('mc_birthday', function (date, element, grouping_class) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();

            // correct month value
            dateArray.month -= 1;

            var testDate = new Date(1970, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid month and day.');

    // Validate a multifield date
    _utility.$.validator.addMethod('mc_date', function (date, element, grouping_class) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(grouping_class));
        if ($fields.filter(':filled').length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            var dateArray = [];
            dateArray.month = $fields.filter('input[name*="[month]"]').val();
            dateArray.day = $fields.filter('input[name*="[day]"]').val();
            dateArray.year = $fields.filter('input[name*="[year]"]').val();

            // correct month value
            dateArray.month -= 1;

            // correct year value
            if (dateArray.year.length < 4) {
                dateArray.year = parseInt(dateArray.year, 10) < 50 ? 2000 + parseInt(dateArray.year, 10) : 1900 + parseInt(dateArray.year, 10);
            }

            var testDate = new Date(dateArray.year, dateArray.month, dateArray.day);
            if (testDate.getDate() !== dateArray.day || testDate.getMonth() !== dateArray.month || testDate.getFullYear() !== dateArray.year) {
                isValid = false;
            } else {
                isValid = true;
            }
        }
        return isValid;
    }, 'Please enter a valid date');

    // Validate a multifield phone number
    _utility.$.validator.addMethod('mc_phone', function (phone_number, element, grouping_class) {
        var isValid = false;
        var $fields = (0, _utility.$)('input:filled:not(:hidden)', (0, _utility.$)(element).closest(grouping_class));
        if ($fields.length === 0 && this.optional(element)) {
            isValid = true; // None have been filled out, so no error
        } else {
            phone_number = $fields.eq(0).val() + $fields.eq(1).val() + $fields.eq(2).val();
            isValid = phone_number.length === 10 && phone_number.match(/[0-9]{9}/);
        }
        return isValid;
    }, 'Please specify a valid phone number');

    _utility.$.validator.addMethod('skip_or_complete_group', function (value, element, grouping_class) {
        var $fields = (0, _utility.$)('input:not(:hidden)', (0, _utility.$)(element).closest(grouping_class)),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility.$.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled === $fields.length;

        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each field's validation rules
        if (!(0, _utility.$)(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, _utility.$.validator.format('Please supply missing fields.'));

    _utility.$.validator.addMethod('skip_or_fill_minimum', function (value, element, options) {
        var $fields = (0, _utility.$)(options[1], element.form),
            $fieldsFirst = $fields.eq(0),
            validator = $fieldsFirst.data('valid_skip') ? $fieldsFirst.data('valid_skip') : _utility.$.extend({}, this),
            numberFilled = $fields.filter(function () {
            return validator.elementValue(this);
        }).length,
            isValid = numberFilled === 0 || numberFilled >= options[0];
        // Store the cloned validator for future validation
        $fieldsFirst.data('valid_skip', validator);

        // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
        if (!(0, _utility.$)(element).data('being_validated')) {
            $fields.data('being_validated', true);
            $fields.each(function () {
                validator.element(this);
            });
            $fields.data('being_validated', false);
        }
        return isValid;
    }, _utility.$.validator.format('Please either skip these fields or fill at least {0} of them.'));

    _utility.$.validator.addMethod('zipcodeUS', function (value, element) {
        return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
    }, 'The specified US ZIP Code is invalid');

    $mchimp.each(function () {
        var $form = (0, _utility.$)(this);
        if (!$form.length) {
            return;
        }

        var validator = $form.validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            // Grouping fields makes jQuery Validation display one error for all the fields in the group
            // It doesn't have anything to do with how the fields are validated (together or separately),
            // it's strictly for visual display of errors
            groups: function groups() {
                var groups = {};
                $form.find('.input-group').each(function () {
                    var inputs = (0, _utility.$)(this).find('input:text:not(:hidden)'); // TODO: What about non-text inputs like number?
                    if (inputs.length > 1) {
                        var mergeName = inputs.first().attr('name');
                        var fieldNames = _utility.$.map(inputs, function (f) {
                            return f.name;
                        });
                        groups[mergeName.substring(0, mergeName.indexOf('['))] = fieldNames.join(' ');
                    }
                });
                return groups;
            },

            // Place a field's inline error HTML just before the div.input-group closing tag
            errorPlacement: function errorPlacement(error, element) {
                element.closest('.input-group').after(error);
                self.debounceResize();
            },

            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler: function submitHandler() {
                var $responseSuccess = $form.find('.nk-form-response-success');
                var $responseError = $form.find('.nk-form-response-error');
                var url = $form.attr('action');
                url = url.replace('/post?u=', '/post-json?u=');
                url += '&c=?';

                $form.ajaxSubmit({
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    url: url,
                    success: function success(resp) {
                        $responseSuccess.hide();
                        $responseError.hide();

                        // On successful form submission, display a success message and reset the form
                        if (resp.result === 'success') {
                            $responseSuccess.show().html(resp.msg);
                            $form[0].reset();

                            // If the form has errors, display them, inline if possible, or appended to #mce-error-response
                        } else {
                            // Example errors - Note: You only get one back at a time even if you submit several that are bad.
                            // Error structure - number indicates the index of the merge field that was invalid, then details
                            // Object {result: "error", msg: "6 - Please enter the date"}
                            // Object {result: "error", msg: "4 - Please enter a value"}
                            // Object {result: "error", msg: "9 - Please enter a complete address"}

                            // Try to parse the error into a field index and a message.
                            // On failure, just put the dump thing into in the msg letiable.
                            var index = -1;
                            var msg = void 0;
                            try {
                                var parts = resp.msg.split(' - ', 2);
                                if (typeof parts[1] === 'undefined') {
                                    msg = resp.msg;
                                } else {
                                    i = parseInt(parts[0], 10);
                                    if (i.toString() === parts[0]) {
                                        index = parts[0];
                                        msg = parts[1];
                                    } else {
                                        index = -1;
                                        msg = resp.msg;
                                    }
                                }
                            } catch (e) {
                                index = -1;
                                msg = resp.msg;
                            }

                            try {
                                // If index is -1 if means we don't have data on specifically which field was invalid.
                                // Just lump the error message into the generic response div.
                                if (index === -1) {
                                    $responseError.show().html(msg);
                                } else {
                                    var fieldName = $form.find('input[name]:eq(' + index + ')').attr('name'); // Make sure this exists
                                    var data = {};
                                    data[fieldName] = msg;
                                    validator.showErrors(data);
                                }
                            } catch (e) {
                                $responseError.show().html(msg);
                            }
                        }
                        self.debounceResize();
                    },
                    error: function error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    }
                });
            }
        });
    });

    // Custom validation methods for fields with certain css classes
    _utility.$.validator.addClassRules('birthday', { digits: true, mc_birthday: '.datefield' });
    _utility.$.validator.addClassRules('datepart', { digits: true, mc_date: '.datefield' });
    _utility.$.validator.addClassRules('phonepart', { digits: true, mc_phone: '.phonefield' });
} /* eslint-disable */

exports.initFormsMailChimp = initFormsMailChimp;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAudioPlayer = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Audio Player

-------------------------------------------------------------------*/
function initAudioPlayerProgressBar() {
    if (typeof Hammer !== 'undefined') {
        var $progresses = (0, _utility.$)('.nk-audio-plain:not(.nk-audio-plain-enabled), .nk-audio-player-main:not(.nk-audio-player-main-enabled)').find('.nk-audio-progress');
        $progresses.each(function eachProgresses() {
            var $curProgressCont = (0, _utility.$)(this);
            var $curProgres = $curProgressCont.children();
            var curApi = void 0;
            var progressW = void 0;
            var progressCurW = void 0;
            var progressStart = false;
            var HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1
            }));
            HammerProgress.on('pan press pressup', function (e) {
                // start
                if (e.type === 'press' || progressStart === false) {
                    $curProgressCont.data('busy', true);
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = progressCurW * 100 + '%';

                // end
                if (e.isFinal || e.type === 'pressup') {
                    if (!curApi) {
                        curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
                    }
                    if (curApi) {
                        curApi.seek(progressCurW);
                    }

                    $curProgressCont.removeClass('hover');
                    $curProgressCont.data('busy', false);
                    progressStart = false;
                }

                e.preventDefault();
            });
        });
    }
}
function initAudioPlayer() {
    if (typeof soundManager === 'undefined') {
        return;
    }

    /* Global Audio Player */
    var _self = this;
    var $player = (0, _utility.$)('.nk-audio-player-main:not(.nk-audio-player-main-enabled)');
    var api = void 0;
    var player = void 0;
    var $title = $player.find('.nk-audio-title > div');
    var $timer = $player.find('.nk-audio-time');
    var $playBtn = $player.find('.nk-audio-play-pause .nk-audio-play');
    var $pauseBtn = $player.find('.nk-audio-play-pause .nk-audio-pause');
    var $prevBtn = $player.find('.nk-audio-prev');
    var $nextBtn = $player.find('.nk-audio-next');
    var $progressCont = $player.find('.nk-audio-progress');
    var $progress = $progressCont.find('.nk-audio-progress-current');
    var $volumeBtn = $player.find('.nk-audio-volume-icon');
    var $volumeCont = $player.find('.nk-audio-volume .nk-audio-volume-inner');
    var $volume = $volumeCont.find('.nk-audio-volume-current');
    var $playlist = $player.find('.nk-audio-player-playlist-inner');

    // Volume controller will be automatically removed on iOs devices, because of limitation of volume control
    if (_utility.isIOs) {
        $player.find('.nk-audio-volume').remove();
    }

    /**
    * Player class containing the state of our playlist and where we are in it.
    * Includes all methods for playing, skipping, updating the display, etc.
    * @param {Array} options Array of objects with playlist song details ({title, file, howl}).
    */
    function Player(options) {
        var self = this;

        self.options = options;
        self.playlist = options.playlist;
        self.index = options.start || 0;
        self.volume = typeof options.volume !== 'undefined' ? options.volume : 100;
        self.pinned = options.pinned || false;
        self.loop = false;
        self.shuffle = false;
        self.progress = 0;
        self.muted = false;
        self.playing = false;

        // restore player data
        if (localStorage && typeof localStorage.khakiAudioPlayer !== 'undefined') {
            var storedData = JSON.parse(localStorage.khakiAudioPlayer);
            self.playlist = storedData.playlist || self.options.playlist;
            self.index = storedData.index;
            self.volume = storedData.volume;
            self.pinned = storedData.pinned;
            self.loop = storedData.loop;
            self.shuffle = storedData.shuffle;
            self.progress = storedData.progress;
            self.muted = storedData.muted;
            self.playing = storedData.playing;
        }

        // create playlist
        self.createPlaylist(self.playlist);

        // set api
        var firstLoad = true;
        function onPlay() {
            self.playing = true;
            $player.addClass('nk-audio-player-playing');

            // update playlist
            $playlist.find('.nk-playlist-item-playing, .nk-playlist-item-active').removeClass('nk-playlist-item-playing nk-playlist-item-active');
            $playlist.find('[data-index=' + self.index + ']').addClass('nk-playlist-item-playing nk-playlist-item-active');

            // update playlist on the page
            if (self.$pagePlaylist) {
                self.$pagePlaylist.find('[data-index]').removeClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
                self.$pagePlaylist.find('[data-index=' + self.index + ']').addClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
            }
        }
        function onStop() {
            self.playing = false;
            $player.removeClass('nk-audio-player-playing');

            // update playlist
            $playlist.find('.nk-playlist-item-playing').removeClass('nk-playlist-item-playing');

            // update playlist on the page
            if (self.$pagePlaylist) {
                self.$pagePlaylist.find('[data-index].nk-audio-playlist-item-playing').removeClass('nk-audio-playlist-item-playing');
            }
        }
        api = soundManager.createSound({
            volume: self.volume,
            whileplaying: function whileplaying() {
                self.step();
            },

            onplay: onPlay,
            onresume: onPlay,
            onpause: onStop,
            onstop: onStop,
            onload: function onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            },
            onerror: function onerror() {},
            onfinish: function onfinish() {
                if (self.loop) {
                    self.play();
                } else {
                    self.skip('right');
                }
            },
            onbufferchange: function onbufferchange() {
                if (firstLoad && api.duration) {
                    firstLoad = false;
                    // seek
                    self.seek(self.progress);
                }
            }
        });

        // autoplay
        if (self.playlist && self.playlist.list && self.playlist.list.length) {
            if (self.options.autoplay || self.playing) {
                self.play();
            } else {
                self.play();
                self.pause();
            }
        }

        // mute
        self.updateVolumeBar();

        // pin
        $player.css('transition', 'none');
        self.pin(self.pinned, true);
        setTimeout(function () {
            $player.css('transition', '');
        }, 1);

        // loop
        self.setLoop(self.loop);

        // shuffle
        self.setShuffle(self.shuffle);

        // save player data
        function saveData() {
            if (localStorage) {
                localStorage.khakiAudioPlayer = JSON.stringify({
                    playlist: self.playlist,
                    index: self.index,
                    volume: self.volume,
                    pinned: self.pinned,
                    loop: self.loop,
                    shuffle: self.shuffle,
                    progress: self.progress,
                    muted: self.muted,
                    playing: self.playing
                });
            }
        }
        if (localStorage) {
            // save on close window and every 20 seconds
            (0, _utility.$)(window).on('unload', saveData);
            setInterval(saveData, 20000);
        }

        // Events to control player
        // play, pause, next, prev
        $playBtn.on('click', function () {
            self.play();
        });
        $pauseBtn.on('click', function () {
            self.pause();
        });
        $prevBtn.on('click', function () {
            self.skip('prev');
        });
        $nextBtn.on('click', function () {
            self.skip('next');
        });

        // volume
        $volumeBtn.on('click', function () {
            self.mute();
        });
        if (typeof Hammer !== 'undefined') {
            var volumeW = void 0;
            var volumeCurW = void 0;
            var volumeStart = false;
            var HammerVol = new Hammer.Manager($volumeCont[0]);
            HammerVol.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0
            }));
            HammerVol.add(new Hammer.Press({
                time: 1
            }));
            HammerVol.on('pan press pressup', function (e) {
                // start
                if (e.type === 'press' || volumeStart === false) {
                    volumeW = $volumeCont.width();
                    volumeStart = e.pointers[0].clientX - $volumeCont[0].getBoundingClientRect().left;
                    $volumeCont.addClass('hover');
                }

                // each
                volumeCurW = Math.min(1, Math.max(0, (volumeStart + e.deltaX) / volumeW)) * 100;
                self.setVolume(volumeCurW);

                // end
                if (e.isFinal || e.type === 'pressup') {
                    $volumeCont.removeClass('hover');
                    volumeStart = false;
                }

                e.preventDefault();
            });
        }

        // playlist
        $playlist.on('click', '> [data-index]', function eachPlylists() {
            var idx = parseInt((0, _utility.$)(this).attr('data-index'), 10);
            if (self.index === idx) {
                if (self.playing) {
                    self.pause();
                } else {
                    self.play();
                }
            } else {
                self.skipTo(idx);
            }
        });
        $playlist.on('click', '.nk-playlist-right a', function (e) {
            e.stopPropagation();
        });

        // pin player
        (0, _utility.$)('.nk-audio-pin').on('click', function (e) {
            self.pin();
            e.preventDefault();
        });

        // loop
        $player.on('click', '.nk-audio-settings .nk-audio-loop', function () {
            self.setLoop();
        });

        // shuffle
        $player.on('click', '.nk-audio-settings .nk-audio-shuffle', function () {
            self.setShuffle();
        });

        // show playlist
        $player.on('click', '.nk-audio-settings .nk-audio-playlist', function () {
            self.showPlaylist();
        });
    }
    Player.prototype = {
        /**
         * Create playlist and show player
         */
        createPlaylist: function createPlaylist(playlist, skipTo) {
            if (!playlist || !playlist.list || !playlist.list.length) {
                return;
            }
            var self = this;
            var oldPlaylist = _utility.$.extend(true, {}, self.playlist);

            self.playlist = _utility.$.extend(true, {}, playlist);
            self.playlistShuffle = [];

            // Setup the playlist display.
            var playlistInner = '';
            var playListBtn = '\n                <div class="nk-playlist-play-pause">\n                    <span class="nk-playlist-play"><span class="ion-play ml-3"></span></span>\n                    <span class="nk-playlist-pause"><span class="ion-pause"></span></span>\n                </div>';
            var song = void 0;
            for (var k = 0; k < self.playlist.list.length; k++) {
                song = self.playlist.list[k];
                self.playlistShuffle.push(k);
                playlistInner += '\n                    <li data-index="' + k + '">\n                        <div class="container nk-playlist-item-cont">\n                            <div>' + playListBtn + '</div>\n                            <div class="nk-playlist-title"><div>' + song.title + '</div></div>\n                            <div class="nk-playlist-right">\n                                ' + (song.buttons || '') + '\n                                ' + (song.duration ? ' <span class="nk-playlist-item-duration">' + song.duration + '</span>' : '') + '\n                            </div>\n                        </div>\n                    </li>';
            }
            $playlist.html(playlistInner);

            // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            function shuffleArr(a, b, c, d) {
                c = a.length;while (c) {
                    b = Math.random() * (--c + 1) || 0;
                    d = a[c];
                    a[c] = a[b];
                    a[b] = d;
                }
            }
            shuffleArr(self.playlistShuffle);

            // add page playlist dom item
            // $(this).data('nk-playlist-data', result);
            if (self.playlist.id) {
                var $newPagePlaylist = (0, _utility.$)('#' + self.playlist.id);
                if (JSON.stringify($newPagePlaylist.data('nk-playlist-data')) === JSON.stringify(self.playlist)) {
                    self.$pagePlaylist = $newPagePlaylist;
                } else {
                    self.$pagePlaylist = null;
                }
            } else {
                self.$pagePlaylist = null;
            }

            // prevent if new playlist the same as current
            if (JSON.stringify(oldPlaylist) === JSON.stringify(self.playlist)) {
                if (skipTo === self.index) {
                    if (self.playing) {
                        self.pause();
                    } else {
                        self.play();
                    }
                } else if (typeof skipTo !== 'undefined') {
                    self.skipTo(skipTo);
                }
            } else {
                // remove active items from old playlist
                // update playlist on the page
                if (oldPlaylist.id) {
                    (0, _utility.$)('#' + oldPlaylist.id).find('[data-index]').removeClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
                }
                if (typeof skipTo !== 'undefined') {
                    self.skipTo(skipTo);
                }
            }
            oldPlaylist = null;

            // show player
            $player.addClass('show');

            _self.initPluginNano();
        },


        /**
        * Play a song in the playlist.
        * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
        */
        play: function play(index) {
            var self = this;

            index = typeof index === 'number' ? index : self.index;
            if (!self.playlist.list[index]) {
                index = 0;
            }
            var data = self.playlist.list[index];

            self.index = index;

            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            api.play({
                url: data.src
            });

            // Update the track display.
            $title.html(data.title);
        },


        /**
        * Pause the currently playing track.
        */
        pause: function pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },


        /**
        * Skip to the next or previous track.
        * @param  {String} direction 'next' or 'prev'.
        */
        skip: function skip(direction) {
            var self = this;
            var index = 0;

            // shuffle
            if (self.shuffle) {
                var key = self.playlistShuffle.indexOf(self.index);
                key = parseInt(key, 10);

                // Get the next track based on the direction of the track.
                if (direction === 'prev') {
                    index = key - 1;
                    if (index < 0) {
                        index = self.playlistShuffle.length - 1;
                    }
                } else {
                    index = key + 1;
                    if (index >= self.playlistShuffle.length) {
                        index = 0;
                    }
                }
                index = self.playlistShuffle[index];

                // Get the next track based on the direction of the track.
            } else if (direction === 'prev') {
                index = self.index - 1;
                if (index < 0) {
                    index = self.playlist.list.length - 1;
                }
            } else {
                index = self.index + 1;
                if (index >= self.playlist.list.length) {
                    index = 0;
                }
            }

            self.skipTo(index);
        },


        /**
        * Skip to a specific track based on its playlist index.
        * @param  {Number} index Index in the playlist.
        */
        skipTo: function skipTo(index) {
            var self = this;

            // Stop the current track.
            api.stop();

            // Reset progress.
            if (!$progressCont.data('busy')) {
                $progress[0].style.width = '0%';
            }
            self.progress = 0;

            // Play the new track.
            self.play(index);
        },


        /**
        * Set the volume and update the volume slider display.
        * @param  {Number} val Volume between 0 and 1.
        */
        setVolume: function setVolume(val, noTouchMute) {
            var self = this;

            val = Math.min(100, Math.max(0, val));

            // Update the volume to the new value.
            api.setVolume(val);

            // unmute
            if (!api.muted && !noTouchMute) {
                self.mute(false);
            }

            self.volume = val;
            self.updateVolumeBar();
        },


        /**
        * Mute / Unmute sound
        */
        mute: function mute(val) {
            var self = this;

            // Update the volume to the new value.
            self.muted = typeof val !== 'undefined' ? val : !api.muted;
            if (self.muted) {
                api.mute();
            } else {
                api.unmute();
            }

            self.updateVolumeBar();
        },


        /**
        * Update volume bar icons
        */
        updateVolumeBar: function updateVolumeBar() {
            var self = this;

            // Volume controller will be automatically removed on iOs devices, because of limitation of volume control
            if (_utility.isIOs) {
                return;
            }

            $player.removeClass('volume-muted volume-half volume-small');

            // Update the display on the slider.
            $volume[0].style.width = self.volume + '%';

            if (self.muted || self.volume === 0) {
                $player.addClass('volume-muted');

                // change icons
            } else if (self.volume < 20) {
                $player.addClass('volume-small');
            } else if (self.volume < 70) {
                $player.addClass('volume-half');
            }
        },


        /**
        * Seek to a new position in the currently playing track.
        * @param  {Number} per Percentage through the song to skip.
        */
        seek: function seek(per) {
            api.setPosition(api.duration * per);
        },


        /**
        * The step called within requestAnimationFrame to update the playback position.
        */
        step: function step() {
            var self = this;
            // Determine our current seek position.
            var seek = api.position || 0;
            self.progress = seek / api.duration;
            $timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!$progressCont.data('busy')) {
                $progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },


        /**
        * Format the time from seconds to M:SS.
        * @param  {Number} secs Seconds to format.
        * @return {String}      Formatted time.
        */
        formatTime: function formatTime(msec) {
            var secs = Math.round(msec / 1000) || 0;
            var minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            var seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        },


        /**
        * Loop track
        * @param  {Number} true or false. If nothing - toggle loop
        */
        setLoop: function setLoop(val) {
            var self = this;

            if (typeof val !== 'undefined') {
                $player[(val ? 'add' : 'remove') + 'Class']('nk-audio-player-loop');
            } else {
                $player.toggleClass('nk-audio-player-loop');
            }
            self.loop = $player.hasClass('nk-audio-player-loop');
        },


        /**
        * Shuffle playlist
        * @param  {Number} true or false. If nothing - toggle shuffle
        */
        setShuffle: function setShuffle(val) {
            var self = this;

            if (typeof val !== 'undefined') {
                $player[(val ? 'add' : 'remove') + 'Class']('nk-audio-player-shuffle');
            } else {
                $player.toggleClass('nk-audio-player-shuffle');
            }
            self.shuffle = $player.hasClass('nk-audio-player-shuffle');
        },


        /**
        * Pin player
        * @param  {Number} true or false. If nothing - toggle pin
        */
        pin: function pin(val) {
            var self = this;

            if (typeof val !== 'undefined') {
                $player[(val ? 'add' : 'remove') + 'Class']('nk-audio-player-pin');
            } else {
                $player.toggleClass('nk-audio-player-pin');
            }
            self.pinned = $player.hasClass('nk-audio-player-pin');
        },


        /**
        * Show / Hide playlist
        * @param  {Number} true or false. If nothing - toggle pin
        */
        showPlaylist: function showPlaylist(val) {
            var self = this;

            if (typeof val !== 'undefined') {
                $player[(val ? 'add' : 'remove') + 'Class']('nk-audio-player-playlist-opened');
            } else {
                $player.toggleClass('nk-audio-player-playlist-opened');
            }
            self.pinned = $player.hasClass('nk-audio-player-playlist-opened');
        }
    };

    // Setup all playlists on the page
    var playlist = [];
    (0, _utility.$)('ul.nk-audio-playlist:not(.nk-audio-playlist-enabled)').addClass('nk-audio-playlist-enabled').each(function eachAudioPlaylists() {
        var ID = (0, _utility.$)(this).attr('id') || false;
        var isHidden = (0, _utility.$)(this).hasClass('nk-audio-playlist-hidden');
        var isActive = (0, _utility.$)(this).hasClass('active');
        var list = [];
        (0, _utility.$)(this).find('> li').each(function eachPlylistItems() {
            var src = (0, _utility.$)(this).attr('data-src');
            if (!src) {
                return;
            }

            // add index attribute
            (0, _utility.$)(this).attr('data-index', list.length);

            // add to list
            list.push({
                title: (0, _utility.$)(this).find('.nk-audio-playlist-title').html() || '',
                src: src,
                duration: (0, _utility.$)(this).find('.nk-audio-playlist-duration').text() || '',
                buttons: (0, _utility.$)(this).find('.nk-audio-playlist-buttons').html() || ''
            });

            // add play and pause buttons
            if (!isHidden) {
                (0, _utility.$)(this).prepend(_self.options.templates.audioPlaylistButton);
            }
        });
        if (list.length) {
            var result = {
                id: ID,
                isHidden: isHidden,
                isActive: isActive,
                list: list
            };
            playlist.push(result);

            // add playlist data to the dom element
            (0, _utility.$)(this).data('nk-playlist-data', result);

            // add playlist to player
            (0, _utility.$)(this).on('click', 'li[data-index]', function onClickPlylistItem() {
                player.createPlaylist(result, parseInt((0, _utility.$)(this).attr('data-index'), 10));
            });
        }
    });

    /* Plain audio players */
    var $playersPlain = (0, _utility.$)('.nk-audio-plain:not(.nk-audio-plain-enabled)');

    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);

    function PlayersPlain($item) {
        var self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay() {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop() {
            self.seek(0);
            self.step();
            self.$item.removeClass('nk-audio-plain-playing');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying: function whileplaying() {
                self.step();
            },

            onplay: onPlay,
            onresume: onPlay,
            onpause: function onpause() {
                self.$item.removeClass('nk-audio-plain-playing');
                self.$timer.text(self.$timer.attr('data-duration'));
            },

            onstop: onStop,
            onfinish: onStop,
            onload: function onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            }
        });

        self.$playPauseBtn.on('click', function () {
            if (!self.api.paused && self.api.playState && self.api.url) {
                self.pause();
            } else {
                self.play();
            }
        });
    }
    PlayersPlain.prototype = {
        /**
        * Play a song in the playlist.
        * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
        */
        play: function play() {
            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            this.api.play({
                url: this.url
            });
        },


        /**
        * Pause the currently playing track.
        */
        pause: function pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },

        /**
        * Seek to a new position in the currently playing track.
        * @param  {Number} per Percentage through the song to skip.
        */
        seek: function seek(per) {
            this.api.setPosition(this.api.duration * per);
        },

        /**
        * The step called within requestAnimationFrame to update the playback position.
        */
        step: function step() {
            var self = this;
            // Determine our current seek position.
            var seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!$progressCont.data('busy')) {
                self.$progress[0].style.width = (self.progress * 100 || 0) + '%';
            }
        },


        /**
        * Format the time from seconds to M:SS.
        * @param  {Number} secs Seconds to format.
        * @return {String}      Formatted time.
        */
        formatTime: function formatTime(msec) {
            var secs = Math.round(msec / 1000) || 0;
            var minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            var seconds = secs - minutes * 60;
            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    };

    // progress bar
    initAudioPlayerProgressBar();

    // add Enabled classes
    $player.addClass('nk-audio-player-main-enabled');
    $playersPlain.addClass('nk-audio-plain-enabled');

    var self = this;
    soundManager.onready(function () {
        if (playlist.length) {
            // find active playlist
            var activePlaylist = playlist.find(function (x) {
                return x.isActive;
            });

            player = new Player({
                playlist: activePlaylist,
                start: 0,
                volume: 100,
                autoplay: $player.hasClass('nk-audio-player-autoplay'),
                pinned: $player.hasClass('nk-audio-player-pin')
            });

            $player[0].audioAPI = player;
            self.audioPlayer = player;
        }

        if ($playersPlain.length) {
            $playersPlain.each(function eachPlayersPlain() {
                this.audioAPI = new PlayersPlain((0, _utility.$)(this));
            });
        }
    });
}

exports.initAudioPlayer = initAudioPlayer;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFacebook = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Facebook

-------------------------------------------------------------------*/
function initFacebook() {
    if (!(0, _utility.$)('.fb-page').length) {
        return;
    }

    _utility.$body.append('<div id="fb-root"></div>');

    (function loadFBScript(d, s, id) {
        if (window.location.protocol === 'file:') {
            return;
        }
        var fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        var js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
}

exports.initFacebook = initFacebook;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initInstagram = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Instagram

-------------------------------------------------------------------*/
function initInstagram() {
    var self = this;
    var $instagram = (0, _utility.$)('.nk-instagram');
    if (!$instagram.length || !self.options.templates.instagram) {
        return;
    }

    /**
     * Templating a instagram item using '{{ }}' braces
     * @param  {Object} data Instagram item details are passed
     * @return {String} Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['link', 'image', 'caption'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $instagram.each(function eachInstagram() {
        var $this = (0, _utility.$)(this);
        var options = {
            userID: $this.attr('data-instagram-user-id') || null,
            count: $this.attr('data-instagram-count') || 6,
            template: $this.attr('data-instagram-template') || self.options.templates.instagram,
            quality: $this.attr('data-instagram-quality') || 'sm', // sm, md, lg
            loadingText: self.options.templates.instagramLoadingText,
            failText: self.options.templates.instagramFailText,
            apiPath: self.options.templates.instagramApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            console.error('You should run your website on the server with PHP to get working Instagram');
            return;
        }

        $this.html('<div class="col-12">' + options.loadingText + '</div>');

        // Fetch instagram images
        _utility.$.getJSON(options.apiPath, {
            userID: options.userID,
            count: options.count
        }, function (response) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var instaItem = false;
                if (response[i]) {
                    instaItem = response[i];
                } else if (response.statuses && response.statuses[i]) {
                    instaItem = response.statuses[i];
                } else {
                    break;
                }

                var resolution = 'thumbnail';
                if (options.quality === 'md') {
                    resolution = 'low_resolution';
                }
                if (options.quality === 'lg') {
                    resolution = 'standard_resolution';
                }

                var tempData = {
                    link: instaItem.link,
                    image: instaItem.images[resolution].url,
                    caption: instaItem.caption
                };

                $this.append(templating(tempData, options.template));
            }
        }).fail(function (a) {
            $this.html('<div class="col-12">' + options.failText + '</div>');
            _utility.$.error(a.responseText);
        });
    });
} /* eslint-disable no-console */
exports.initInstagram = initInstagram;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTwitter = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Twitter

-------------------------------------------------------------------*/
function initTwitter() {
    var self = this;
    var $twtFeeds = (0, _utility.$)('.nk-twitter-list');
    if (!$twtFeeds.length || !self.options.templates.twitter) {
        return;
    }

    /**
     * Templating a tweet using '{{ }}' braces
     * @param  {Object} data Tweet details are passed
     * @return {String}      Templated string
     */
    function templating(data, temp) {
        var tempVariables = ['date', 'tweet', 'avatar', 'url', 'retweeted', 'screen_name', 'user_name'];

        for (var i = 0, len = tempVariables.length; i < len; i++) {
            temp = temp.replace(new RegExp('{{' + tempVariables[i] + '}}', 'gi'), data[tempVariables[i]]);
        }

        return temp;
    }

    $twtFeeds.each(function eachTweets() {
        var $this = (0, _utility.$)(this);
        var options = {
            username: $this.attr('data-twitter-user-name') || null,
            list: null,
            hashtag: $this.attr('data-twitter-hashtag') || null,
            count: $this.attr('data-twitter-count') || 2,
            hideReplies: $this.attr('data-twitter-hide-replies') === 'true',
            template: $this.attr('data-twitter-template') || self.options.templates.twitter,
            loadingText: self.options.templates.twitterLoadingText,
            failText: self.options.templates.twitterFailText,
            apiPath: self.options.templates.twitterApiPath
        };

        // stop if running in file protocol
        if (window.location.protocol === 'file:') {
            $this.html(options.failText);
            console.error('You should run you website on webserver with PHP to get working Twitter');
            return;
        }

        // Set loading
        $this.html('<span>' + options.loadingText + '</span>');

        // Fetch tweets
        _utility.$.getJSON(options.apiPath, {
            username: options.username,
            list: options.list,
            hashtag: options.hashtag,
            count: options.count,
            exclude_replies: options.hideReplies
        }, function (twt) {
            $this.html('');

            for (var i = 0; i < options.count; i++) {
                var tweet = false;
                if (twt[i]) {
                    tweet = twt[i];
                } else if (twt.statuses && twt.statuses[i]) {
                    tweet = twt.statuses[i];
                } else {
                    break;
                }

                var tempData = {
                    user_name: tweet.user.name,
                    date: tweet.date_formatted,
                    tweet: tweet.text_entitled,
                    avatar: '<img src="' + tweet.user.profile_image_url + '" />',
                    url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
                    retweeted: tweet.retweeted,
                    screen_name: '@' + tweet.user.screen_name
                };

                $this.append(templating(tempData, options.template));
            }
        }).fail(function (a) {
            $this.html(options.failText);
            _utility.$.error(a.responseText);
        });
    });
} /* eslint-disable no-console */
exports.initTwitter = initTwitter;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* Object Fit Images */
function initPluginObjectFitImages() {
    if (typeof objectFitImages !== 'undefined') {
        objectFitImages();
    }
}

exports.initPluginObjectFitImages = initPluginObjectFitImages;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginStickySidebar = undefined;

var _utility = __webpack_require__(0);

/*------------------------------------------------------------------

  Init Plugin Sticky Sidebar

-------------------------------------------------------------------*/
function initPluginStickySidebar() {
    if (typeof _utility.$.fn.stick_in_parent === 'undefined') {
        return;
    }

    (0, _utility.$)('.nk-sidebar-sticky').each(function eachStickySidebar() {
        var $this = (0, _utility.$)(this);
        var $parent = $this.parent();

        $parent.addClass('nk-sidebar-sticky-parent');

        $this.wrapInner('<div>').children().stick_in_parent({
            parent: $parent,
            recalc_every: 50,
            offset_top: parseInt($this.attr('data-offset-top'), 10) || 0,

            // fixed ADS reloading issue https://github.com/leafo/sticky-kit/issues/45
            spacer: false
        })

        // we need to set min height on parent block (in theme it is equal height column) to prevent sidebar content jumping
        .on('sticky_kit:unbottom sticky_kit:stick sticky_kit:bottom', function onStickyKitStick() {
            $parent.css('min-height', (0, _utility.$)(this).height());
        }).on('sticky_kit:unstick', function () {
            $parent.css('min-height', '');
        });
    });
}

exports.initPluginStickySidebar = initPluginStickySidebar;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/* FastClick */
function initPluginFastClick() {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
    }
}

exports.initPluginFastClick = initPluginFastClick;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginNano = undefined;

var _utility = __webpack_require__(0);

/* Nano Scroller */
function initPluginNano($context) {
    if (typeof _utility.$.fn.nanoScroller !== 'undefined') {
        ($context || _utility.$doc).find('.nano').nanoScroller();
    }
}

exports.initPluginNano = initPluginNano;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginJarallax = undefined;

var _utility = __webpack_require__(0);

/* Jarallax */
function initPluginJarallax() {
    if (typeof _utility.$.fn.jarallax === 'undefined') {
        return;
    }
    var self = this;

    // header parallax
    var $parallaxHeader = (0, _utility.$)('.nk-header-title-parallax, .nk-header-title-parallax-opacity, .nk-header-title-parallax-blur').eq(0);
    if ($parallaxHeader.length) {
        var $headerImageOrVideo = $parallaxHeader.find('> .bg-image, > .bg-video').eq(0);
        var $headerContent = $headerImageOrVideo.find('~ *');
        var headerParallaxScroll = $parallaxHeader.hasClass('nk-header-title-parallax');
        var headerParallaxOpacity = $parallaxHeader.hasClass('nk-header-title-parallax-opacity');
        var headerParallaxBlur = $parallaxHeader.hasClass('nk-header-title-parallax-blur');
        var options = {
            speed: self.options.parallaxSpeed
        };

        $headerImageOrVideo.addClass('bg-image-parallax');

        options.onScroll = function (calc) {
            var percentScroll = Math.max(0, Math.min(1, (calc.afterTop - 30) / (calc.section.height - 60))); // 30 - is additional offset for mouse parallax
            var scrollContent = Math.max(0, Math.min(50, 50 * percentScroll));

            if (headerParallaxScroll) {
                $headerContent.css({
                    transform: 'translateY(' + scrollContent + 'px) translateZ(0)'
                });
            }
            if (headerParallaxOpacity) {
                $headerContent.css({
                    opacity: 1 - percentScroll
                });
            }
            if (headerParallaxBlur) {
                $headerImageOrVideo.css({
                    filter: 'blur(' + 10 * percentScroll + 'px)'
                });
            }
        };

        $headerImageOrVideo.jarallax(options);
    }

    // footer parallax
    var $parallaxFooter = (0, _utility.$)('.nk-footer-parallax, .nk-footer-parallax-opacity').eq(0);
    if ($parallaxFooter.length) {
        var $footerImageOrVideo = $parallaxFooter.find('> .bg-image, > .bg-video').eq(0);
        var $footerContent = $footerImageOrVideo.find('~ *');
        var footerParallaxScroll = $parallaxFooter.hasClass('nk-footer-parallax');
        var footerParallaxOpacity = $parallaxFooter.hasClass('nk-footer-parallax-opacity');
        var footerParallaxBlur = $parallaxFooter.hasClass('nk-footer-parallax-blur');
        var _options = {
            speed: self.options.parallaxSpeed
        };

        $footerImageOrVideo.addClass('bg-image-parallax');

        _options.onScroll = function (calc) {
            var percentScroll = Math.max(0, Math.min(1, (calc.beforeBottom - 30) / (calc.section.height - 60))); // 30 - is additional offset for mouse parallax
            var scrollContent = Math.max(0, Math.min(50, 50 * percentScroll));

            if (footerParallaxScroll) {
                $footerContent.css({
                    transform: 'translateY(-' + scrollContent + 'px) translateZ(0)'
                });
            }
            if (footerParallaxOpacity) {
                $footerContent.css({
                    opacity: 1 - percentScroll
                });
            }
            if (footerParallaxBlur) {
                $footerImageOrVideo.css({
                    filter: 'blur(' + 10 * percentScroll + 'px)'
                });
            }
        };

        $footerImageOrVideo.jarallax(_options);
    }

    // video backgrounds
    (0, _utility.$)('.bg-video[data-video]').each(function eachBgVideo() {
        (0, _utility.$)(this).attr('data-jarallax-video', (0, _utility.$)(this).attr('data-video'));
        (0, _utility.$)(this).removeAttr('data-video');
    });

    // primary parallax
    (0, _utility.$)('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed
    });

    // video without parallax
    (0, _utility.$)('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1
    });
}

exports.initPluginJarallax = initPluginJarallax;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginFlickity = undefined;

var _utility = __webpack_require__(0);

function addDefaultArrows($carousel) {
    (0, _utility.$)('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="nk-icon-arrow-left"></span></div>').on('click', function () {
        $carousel.flickity('previous');
    }).appendTo($carousel);

    (0, _utility.$)('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="nk-icon-arrow-right"></span></div>').on('click', function () {
        $carousel.flickity('next');
    }).appendTo($carousel);
}

function updateCustomArrows($carousel) {
    var data = $carousel.children('.nk-carousel-inner').data('flickity');
    var currIndex = data.selectedIndex;
    var nextIndex = void 0;
    var prevIndex = void 0;

    // get next and prev cells
    if (currIndex === 0) {
        nextIndex = 1;
        prevIndex = data.cells.length - 1;
    } else if (currIndex === data.cells.length - 1) {
        nextIndex = 0;
        prevIndex = data.cells.length - 2;
    } else {
        nextIndex = currIndex + 1;
        prevIndex = currIndex - 1;
    }
    var $nextCell = (0, _utility.$)(data.cells[nextIndex].element);
    var $prevCell = (0, _utility.$)(data.cells[prevIndex].element);
    var $currCell = (0, _utility.$)(data.cells[currIndex].element);

    // get name and sources
    var nextName = $nextCell.find('.nk-carousel-item-name').text();
    var prevName = $prevCell.find('.nk-carousel-item-name').text();
    var currName = $currCell.find('.nk-carousel-item-name').html();
    var currLinks = $currCell.find('.nk-carousel-item-links').html();

    // add info to buttons
    $carousel.find('.nk-carousel-next > .nk-carousel-arrow-name').html(nextName);
    $carousel.find('.nk-carousel-prev > .nk-carousel-arrow-name').html(prevName);
    $carousel.find('.nk-carousel-current > .nk-carousel-name').html(currName);
    $carousel.find('.nk-carousel-current > .nk-carousel-links').html(currLinks);
}

// prevent click event fire when drag carousel
function noClickEventOnDrag($carousel) {
    $carousel.on('dragStart.flickity', function onDragStartFlickity() {
        (0, _utility.$)(this).find('.flickity-viewport').addClass('is-dragging');
    });
    $carousel.on('dragEnd.flickity', function onDragEndFlickity() {
        (0, _utility.$)(this).find('.flickity-viewport').removeClass('is-dragging');
    });
}

/* Flickity */
function initPluginFlickity() {
    if (typeof window.Flickity === 'undefined') {
        return;
    }

    /*
     * Hack to add imagesLoaded event
     * https://github.com/metafizzy/flickity/issues/328
     */
    Flickity.prototype.imagesLoaded = function imagesLoadedProtoFunc() {
        if (!this.options.imagesLoaded) {
            return;
        }
        var _this = this;
        var timeout = false;

        imagesLoaded(this.slider).on('progress', function (instance, image) {
            var cell = _this.getParentCell(image.img);
            _this.cellSizeChange(cell && cell.element);
            if (!_this.options.freeScroll) {
                _this.positionSliderAtSelected();
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                _this.dispatchEvent('imagesLoadedTimeout', null, [image.img, cell.element]);
            }, 100);
        });
    };

    var self = this;

    // carousel 1
    var $carousel1 = (0, _utility.$)('.nk-carousel > .nk-carousel-inner:not(.flickity-enabled)').parent();
    if ($carousel1.length) {
        $carousel1.children('.nk-carousel-inner').each(function eachCarouselInner() {
            (0, _utility.$)(this).flickity({
                pageDots: (0, _utility.$)(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat((0, _utility.$)(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                cellAlign: (0, _utility.$)(this).parent().attr('data-cell-align') || 'center'
            });
            if ((0, _utility.$)(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows((0, _utility.$)(this));
            }
            updateCustomArrows((0, _utility.$)(this).parent());
        }).on('select.flickity', function onSelectFlickity() {
            updateCustomArrows((0, _utility.$)(this).parent());
        });
        $carousel1.on('click', '.nk-carousel-next', function onClickCarouselNext() {
            (0, _utility.$)(this).parent().children('.nk-carousel-inner').flickity('next');
        });
        $carousel1.on('click', '.nk-carousel-prev', function onClickCarouselPrev() {
            (0, _utility.$)(this).parent().children('.nk-carousel-inner').flickity('previous');
        });
        noClickEventOnDrag($carousel1.children('.nk-carousel-inner'));
    }

    // carousel 2
    (0, _utility.$)('.nk-carousel-2 > .nk-carousel-inner:not(.flickity-enabled)').each(function eachCarouselInner() {
        (0, _utility.$)(this).flickity({
            pageDots: (0, _utility.$)(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat((0, _utility.$)(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: (0, _utility.$)(this).parent().attr('data-cell-align') || 'center'
        });
        if ((0, _utility.$)(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows((0, _utility.$)(this));
        }
        noClickEventOnDrag((0, _utility.$)(this));
    });

    // carousel 3
    var $carousel3 = (0, _utility.$)('.nk-carousel-3 > .nk-carousel-inner:not(.flickity-enabled)').parent();
    // set height for items
    function setHeightCarousel3() {
        $carousel3.each(function eachCarousel() {
            var $allImages = (0, _utility.$)(this).find('img');
            var size = (0, _utility.$)(this).attr('data-size') || 0.8;
            var resultH = _utility.wndH * size;
            var maxItemW = Math.min((0, _utility.$)(this).parent().width(), _utility.wndW) * size;
            $allImages.each(function eachCarouselImages() {
                if (this.naturalWidth && this.naturalHeight && resultH * this.naturalWidth / this.naturalHeight > maxItemW) {
                    resultH = maxItemW * this.naturalHeight / this.naturalWidth;
                }
            });
            $allImages.css('height', resultH);
            (0, _utility.$)(this).children('.nk-carousel-inner').flickity('reposition');
        });
    }
    if ($carousel3.length) {
        $carousel3.children('.nk-carousel-inner').each(function eachCarouselInner() {
            (0, _utility.$)(this).flickity({
                pageDots: (0, _utility.$)(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat((0, _utility.$)(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                imagesLoaded: true,
                cellAlign: (0, _utility.$)(this).parent().attr('data-cell-align') || 'center'
            });
            updateCustomArrows((0, _utility.$)(this).parent());
            if ((0, _utility.$)(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows((0, _utility.$)(this));
            }
        }).on('select.flickity', function onSelectFlickity() {
            updateCustomArrows((0, _utility.$)(this).parent());
        }).on('imagesLoadedTimeout.flickity', function () {
            // fix items height when images loaded
            setHeightCarousel3();
        });
        $carousel3.on('click', '.nk-carousel-next', function onClickCarouselNext() {
            (0, _utility.$)(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('next');
        });
        $carousel3.on('click', '.nk-carousel-prev', function onClickCarouselPrev() {
            (0, _utility.$)(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('previous');
        });
        setHeightCarousel3();
        self.debounceResize(setHeightCarousel3);
        noClickEventOnDrag($carousel3.children('.nk-carousel-inner'));
    }

    // update products carousel
    var $storeCarousel = (0, _utility.$)('.nk-carousel-1, .nk-carousel-1, .nk-carousel-2, .nk-carousel-3').filter('.nk-store:not(.nk-store-carousel-enabled)').addClass('.nk-store-carousel-enabled');
    function updateStoreProducts() {
        $storeCarousel.each(function eachCarousel() {
            var currentTallest = 0;
            var currentRowStart = 0;
            var rowDivs = [];
            var topPosition = 0;
            var currentDiv = 0;
            var $el = void 0;
            (0, _utility.$)(this).find('.nk-product').each(function eachCarouselProduct() {
                $el = (0, _utility.$)(this);
                $el.css('height', '');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].css('height', currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.innerHeight();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].css('height', currentTallest);
                }
            });
        });
    }
    if ($storeCarousel.length) {
        $storeCarousel.children('.nk-carousel-inner').on('imagesLoadedTimeout.flickity', function () {
            // fix items height when images loaded
            setHeightCarousel3();
        });
        self.debounceResize(updateStoreProducts);
        updateStoreProducts();
    }
}

exports.initPluginFlickity = initPluginFlickity;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginIsotope = undefined;

var _utility = __webpack_require__(0);

/* Isotope */
function initPluginIsotope() {
    if (typeof window.Isotope === 'undefined') {
        return;
    }
    var self = this;

    (0, _utility.$)('.nk-isotope').each(function eachIsotope() {
        var $grid = (0, _utility.$)(this).isotope({
            itemSelector: '.nk-isotope-item'
        });
        if (typeof _utility.$.fn.imagesLoaded !== 'undefined') {
            $grid.imagesLoaded().progress(function () {
                $grid.isotope('layout');
            });
        }
        $grid.on('arrangeComplete', function () {
            self.debounceResize();
        });

        // filter
        var $filter = (0, _utility.$)(this).prev('.nk-isotope-filter');
        if ($filter.length) {
            $filter.on('click', '[data-filter]', function eachIsotopeFilter(e) {
                e.preventDefault();
                var filter = (0, _utility.$)(this).attr('data-filter');

                (0, _utility.$)(this).addClass('active').siblings().removeClass('active');

                $grid.isotope({
                    filter: filter === '*' ? '' : '[data-filter*=' + filter + ']'
                });
            });
        }
    });
}

exports.initPluginIsotope = initPluginIsotope;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginPhotoswipe = undefined;

var _utility = __webpack_require__(0);

/* PhotoSwipe */
function initPluginPhotoswipe() {
    var $gallery = (0, _utility.$)('.nk-popup-gallery');
    if (typeof PhotoSwipe === 'undefined' || !$gallery.length) {
        return;
    }

    // prepare photoswipe markup
    var markup = '<div id="gallery" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">\n          <div class="pswp__bg"></div>\n          <div class="pswp__scroll-wrap">\n            <div class="pswp__container">\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n              <div class="pswp__item"></div>\n            </div>\n            <div class="pswp__ui pswp__ui--hidden">\n              <div class="pswp__top-bar">\n                <div class="pswp__counter"></div>\n                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\n                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\n                <div class="pswp__preloader">\n                  <div class="pswp__preloader__icn">\n                    <div class="pswp__preloader__cut">\n                      <div class="pswp__preloader__donut"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div>\n              <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\n              <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\n              <div class="pswp__caption">\n                <div class="pswp__caption__center">\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>';
    _utility.$body.append(markup);

    // init code
    function parseThumbnailElements(el) {
        var thumbElements = (0, _utility.$)(el).find('a.nk-gallery-item');
        var items = [];
        var childElements = void 0;
        var size = void 0;
        var item = void 0;

        thumbElements.each(function eachThumbs() {
            childElements = (0, _utility.$)(this).find('img');
            size = (this.getAttribute('data-size') || '1920x1080').split('x');

            // create slide object
            item = {
                src: this.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                author: this.getAttribute('data-author')
            };

            // save link to element for getThumbBoundsFn
            item.el = this;

            if (childElements.length > 0) {
                // thumbnail url
                item.msrc = childElements[0].getAttribute('src');
                if (childElements.length > 1) {
                    item.title = (0, _utility.$)(childElements).filter('.photoswipe-description').html();
                }
            }

            var mediumSrc = this.getAttribute('data-med') || item.src;
            if (mediumSrc) {
                size = (this.getAttribute('data-med-size') || this.getAttribute('data-size') || '1920x1080').split('x');
                // "medium-sized" image
                item.m = {
                    src: mediumSrc,
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
            }
            // original image
            item.o = {
                src: item.src,
                w: item.w,
                h: item.h
            };
            items.push(item);
        });

        return items;
    }

    function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = (0, _utility.$)('.pswp')[0];
        var items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        var options = {
            captionAndToolbarShowEmptyCaptions: false,
            mainClass: 'pswp--minimal--dark',
            barsSize: { top: 0, bottom: 0 },
            captionEl: true,
            fullscreenEl: false,
            shareEl: false,
            bgOpacity: 0.85,
            tapToClose: true,
            tapToToggleControls: false,

            // Function builds caption markup
            addCaptionHTMLFn: function addCaptionHTMLFn(item, captionEl) {
                // item      - slide object
                // captionEl - caption DOM element
                // isFake    - true when content is added to fake caption container
                //             (used to get size of next or previous caption)

                if (!item.title && !item.author) {
                    captionEl.children[0].innerHTML = '';
                    return false;
                }
                var caption = '';
                if (item.title) {
                    caption += item.title;
                }
                if (item.author) {
                    if (item.title) {
                        caption += '<br>';
                    }
                    caption += '<small>' + item.author + '</small>';
                }
                captionEl.children[0].innerHTML = caption;
                return true;
            },


            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function getThumbBoundsFn(idx) {
                // See Options->getThumbBoundsFn section of docs for more info
                var thumbnail = items[idx].el.children[0];
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }
        };

        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid === index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (Number.isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

        // see: http://photoswipe.com/documentation/responsive-images.html
        var realViewportWidth = void 0;
        var useLargeImages = false;
        var firstResize = true;
        var imageSrcWillChange = void 0;

        gallery.listen('beforeResize', function () {
            var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if (realViewportWidth >= 1200 || !gallery.likelyTouchDevice && realViewportWidth > 800 || window.screen.width > 1200) {
                if (!useLargeImages) {
                    useLargeImages = true;
                    imageSrcWillChange = true;
                }
            } else if (useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
            }

            if (imageSrcWillChange && !firstResize) {
                gallery.invalidateCurrItems();
            }

            if (firstResize) {
                firstResize = false;
            }

            imageSrcWillChange = false;
        });

        gallery.listen('gettingData', function (idx, item) {
            if (useLargeImages) {
                item.src = item.o.src;
                item.w = item.o.w;
                item.h = item.o.h;
            } else {
                item.src = item.m.src;
                item.w = item.m.w;
                item.h = item.m.h;
            }
        });

        gallery.init();
    }

    function photoswipeParseHash() {
        var hash = window.location.hash.substring(1);
        var params = {};

        if (hash.length < 5) {
            // pid=1
            return params;
        }

        var vars = hash.split('&');
        for (var _i = 0; _i < vars.length; _i++) {
            if (!vars[_i]) {
                continue;
            }
            var pair = vars[_i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    }

    // select all gallery elements
    var i = 0;
    $gallery.each(function eachGallery() {
        var $thisGallery = (0, _utility.$)(this);
        $thisGallery.attr('data-pswp-uid', i + 1);

        $thisGallery.on('click', 'a.nk-gallery-item', function onClickGalleryItem(e) {
            e.preventDefault();
            var index = 0;
            var clicked = this;
            $thisGallery.find('a.nk-gallery-item').each(function eachGalleryItem(idx) {
                if (this === clicked) {
                    index = idx;
                    return false;
                }
                return true;
            });
            openPhotoSwipe(index, $thisGallery[0]);
        });
        i++;
    });

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, $gallery.get(hashData.gid - 1), true, true);
    }
}

exports.initPluginPhotoswipe = initPluginPhotoswipe;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginTabs = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Tabs */
function initPluginTabs() {
    var self = this;
    _utility.$wnd.on('shown.bs.tab', function () {
        self.debounceResize();
    });
}

exports.initPluginTabs = initPluginTabs;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginAccordions = undefined;

var _utility = __webpack_require__(0);

/* Bootstrap Accordions */
function initPluginAccordions() {
    var self = this;
    _utility.$wnd.on('shown.bs.collapse', function () {
        self.debounceResize();
    });
}

exports.initPluginAccordions = initPluginAccordions;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginCountdown = undefined;

var _utility = __webpack_require__(0);

/* Countdown */
function initPluginCountdown() {
    if (typeof _utility.$.fn.countdown === 'undefined' || typeof moment === 'undefined' || typeof moment.tz === 'undefined') {
        return;
    }
    var self = this;

    (0, _utility.$)('.nk-countdown').each(function eachCountdown() {
        var tz = (0, _utility.$)(this).attr('data-timezone');
        var end = (0, _utility.$)(this).attr('data-end');
        end = moment.tz(end, tz).toDate();

        (0, _utility.$)(this).countdown(end, function onCountTick(event) {
            (0, _utility.$)(this).html(event.strftime(self.options.templates.countdown));
        });
    });
}

exports.initPluginCountdown = initPluginCountdown;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPluginTypedjs = undefined;

var _utility = __webpack_require__(0);

/* Typed.js */
function initPluginTypedjs() {
    (0, _utility.$)('.nk-typed').each(function eachTyped() {
        var $this = (0, _utility.$)(this);
        var strings = [];
        $this.children('span').each(function eachTypedSpan() {
            strings.push((0, _utility.$)(this).html());
        });
        if (!strings.length) {
            return;
        }
        $this.html('');

        var loop = $this.attr('data-loop') ? $this.attr('data-loop') === 'true' : true;
        var shuffle = $this.attr('data-shuffle') ? $this.attr('data-shuffle') === 'true' : false;
        var typeSpeed = $this.attr('data-type-speed') ? parseInt($this.attr('data-type-speed'), 10) : 30;
        var startDelay = $this.attr('data-start-delay') ? parseInt($this.attr('data-start-delay'), 10) : 0;
        var backSpeed = $this.attr('data-back-speed') ? parseInt($this.attr('data-back-speed'), 10) : 0;
        var backDelay = $this.attr('data-back-delay') ? parseInt($this.attr('data-back-delay'), 10) : 1000;
        var cursor = $this.attr('data-cursor');

        if (!cursor) {
            cursor = '|';
        } else if (cursor === 'false') {
            cursor = false;
        }

        // eslint-disable-next-line
        new Typed((0, _utility.$)('<span>').appendTo($this)[0], {
            strings: strings,
            typeSpeed: typeSpeed,
            startDelay: startDelay,
            backSpeed: backSpeed,
            backDelay: backDelay,
            shuffle: shuffle,
            loop: loop,
            loopCount: false,
            showCursor: !!cursor,
            cursorChar: cursor
        });

        // typed js used timeout from startDelay option
        setTimeout(function () {
            $this.addClass('ready');
        }, 0);
    });
}

exports.initPluginTypedjs = initPluginTypedjs;

/***/ })
/******/ ]);