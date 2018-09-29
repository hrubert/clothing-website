/*------------------------------------------------------------------

  Theme Options

-------------------------------------------------------------------*/
const options = {
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

        quickViewPortfolio:
            `<div class="nk-page-nav">
                <a href="javascript:void(0)" class="nk-page-nav-prev">
                    <div class="icon">
                        <span class="ion-ios-arrow-left"></span>
                    </div>
                    <div class="nk-page-nav-title"></div>
                    <div class="nk-page-nav-img">
                        <div style="background-image: url();"></div>
                    </div>
                </a>
                <a href="javascript:void(0)" class="nk-page-nav-next">
                    <div class="icon">
                        <span class="ion-ios-arrow-right"></span>
                    </div>
                    <div class="nk-page-nav-title"></div>
                    <div class="nk-page-nav-img">
                        <div style="background-image: url();"></div>
                    </div>
                </a>
            </div>`,
        quickViewStore:
            `<div class="nk-page-nav-2">
                <a href="javascript:void(0)" class="nk-page-nav-prev">
                    <div class="icon">
                        <span class="ion-ios-arrow-left"></span>
                    </div>
                    <div class="nk-page-nav-img">
                        <img src="" alt="">
                    </div>
                    <div class="nk-page-nav-title">
                        <div class="nk-product-category mt-0"></div>
                        <h5 class="nk-product-title mb-0"></h5>
                    </div>
                </a>
                <a href="javascript:void(0)" class="nk-page-nav-next">
                    <div class="icon">
                        <span class="ion-ios-arrow-right"></span>
                    </div>
                    <div class="nk-page-nav-img">
                        <img src="" alt="">
                    </div>
                    <div class="nk-page-nav-title">
                        <div class="nk-product-category mt-0"></div>
                        <h5 class="nk-product-title mb-0"></h5>
                    </div>
                </a>
            </div>`,
        quickViewCloseIcon: '<span class="nk-icon-close"></span>',

        audioPlaylistButton:
            `<div class="nk-audio-playlist-play-pause">
                <span class="nk-audio-playlist-play">
                    <span class="ion-play ml-3"></span>
                </span>
                <span class="nk-audio-playlist-pause">
                    <span class="ion-pause"></span>
                </span>
            </div>`,
        audioPlainButton:
            `<div class="nk-audio-plain-play-pause">
                <span class="nk-audio-plain-play">
                    <span class="ion-play ml-3"></span>
                </span>
                <span class="nk-audio-plain-pause">
                    <span class="ion-pause"></span>
                </span>
            </div>`,

        instagram:
            `<div class="col-4">
                <a href="{{link}}" target="_blank">
                    <img src="{{image}}" alt="{{caption}}" class="nk-img-stretch">
                </a>
            </div>`,
        instagramLoadingText: 'Loading...',
        instagramFailText: 'Failed to fetch data',
        instagramApiPath: 'php/instagram/instagram.php',

        twitter:
            `<div class="nk-twitter">
                <span class="nk-twitter-icon fa fa-twitter"></span>
                <div class="nk-twitter-date">
                    <span>{{date}}</span>
                </div>
                <div class="nk-twitter-text">
                   {{tweet}}
                </div>
            </div>`,
        twitterLoadingText: 'Loading...',
        twitterFailText: 'Failed to fetch data',
        twitterApiPath: 'php/twitter/tweet.php',

        countdown:
            `<div>
                <span>%D</span>
                Days
            </div>
            <div>
                <span>%H</span>
                Hours
            </div>
            <div>
                <span>%M</span>
                Minutes
            </div>
            <div>
                <span>%S</span>
                Seconds
            </div>`,
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
        closeFullscreenNavbar: 'esc',
    },
    events: {
        actionHeart(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(() => {
                const result = params.currentNum + (params.type === 'like' ? 1 : -1);
                params.updateNum(result);
            }, 300);
        },
        actionLike(params) {
            params.updateIcon();

            // fake timeout for demonstration
            // Change on AJAX request or something
            setTimeout(() => {
                let additional = 0;
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
                const result = params.currentNum + (params.type === 'like' ? 1 : -1) + additional;
                params.updateNum(result);
            }, 300);
        },

        /* eslint no-unused-vars: 0 */
        quickViewOpen($quickView) { },
        beforeQuickViewClose($quickView) { },
        quickViewClosed($quickView) { },
        beforeQuickViewLoad($frameDoc) { },
        quickViewLoad($frameDoc) { },
        quickViewLoaded($frameDoc) { },
    },
};

export { options };
