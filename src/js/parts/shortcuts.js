import { $ } from './_utility';

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

    const self = this;

    // Search
    self.key('toggleSearch', () => {
        self.toggleSearch();
    });
    self.key('openSearch', () => {
        self.openSearch();
    });
    self.key('closeSearch', () => {
        self.closeSearch();
    });

    // Share
    self.key('toggleShare', () => {
        self.toggleShare();
    });
    self.key('openShare', () => {
        self.openShare();
    });
    self.key('closeShare', () => {
        self.closeShare();
    });

    // FullScreen Video
    self.key('closeFullscreenVideo', () => {
        if (self.closeFullScreenVideo) {
            self.closeFullScreenVideo();
        }
    });

    // quick view
    self.key('closeQuckView', () => {
        if (self.closeQuickView) {
            self.closeQuickView();
        }
    });

    // audio player
    self.key('audioPlayerPlayPause', () => {
        if (self.audioPlayer) {
            if (self.audioPlayer.playing) {
                self.audioPlayer.pause();
            } else {
                self.audioPlayer.play();
            }
        }
    });
    self.key('audioPlayerPlay', () => {
        if (self.audioPlayer) {
            self.audioPlayer.play();
        }
    });
    self.key('audioPlayerPause', () => {
        if (self.audioPlayer) {
            self.audioPlayer.pause();
        }
    });
    self.key('audioPlayerBackward', () => {
        if (self.audioPlayer) {
            self.audioPlayer.skip('prev');
        }
    });
    self.key('audioPlayerForward', () => {
        if (self.audioPlayer) {
            self.audioPlayer.skip('next');
        }
    });
    self.key('audioPlayerVolumeUp', () => {
        if (self.audioPlayer) {
            self.audioPlayer.setVolume(self.audioPlayer.volume + 10);
        }
    });
    self.key('audioPlayerVolumeDown', () => {
        if (self.audioPlayer) {
            self.audioPlayer.setVolume(self.audioPlayer.volume - 10);
        }
    });
    self.key('audioPlayerMute', () => {
        if (self.audioPlayer) {
            self.audioPlayer.mute(!self.audioPlayer.muted);
        }
    });
    self.key('audioPlayerLoop', () => {
        if (self.audioPlayer) {
            self.audioPlayer.setLoop();
        }
    });
    self.key('audioPlayerShuffle', () => {
        if (self.audioPlayer) {
            self.audioPlayer.setShuffle();
        }
    });
    self.key('audioPlayerPlaylist', () => {
        if (self.audioPlayer) {
            self.audioPlayer.showPlaylist();
        }
    });
    self.key('audioPlayerPin', () => {
        if (self.audioPlayer) {
            self.audioPlayer.pin(!self.audioPlayer.pinned);
        }
    });

    // post / portfolio single
    self.key('postLike', () => {
        $('.nk-portfolio-item-single .nk-portfolio-item-details, .nk-blog-post-single .nk-post-meta').find('.nk-action-heart:not(.liked), .nk-action-like .like-icon').click();
    });
    self.key('postDislike', () => {
        $('.nk-portfolio-item-single .nk-portfolio-item-details, .nk-blog-post-single .nk-post-meta').find('.nk-action-heart.liked, .nk-action-like .dislike-icon').click();
    });
    self.key('postScrollToComments', () => {
        const $comments = $('#comments');
        if ($comments.length) {
            self.scrollTo($comments);
        }
    });

    // Side Left Navbar
    const $leftSide = $('.nk-navbar-left-side');
    self.key('toggleSideLeftNavbar', () => {
        self.toggleSide($leftSide);
    });
    self.key('openSideLeftNavbar', () => {
        self.openSide($leftSide);
    });
    self.key('closeSideLeftNavbar', () => {
        self.closeSide($leftSide);
    });

    // Side Right Navbar
    const $rightSide = $('.nk-navbar-right-side');
    self.key('toggleSideRightNavbar', () => {
        self.toggleSide($rightSide);
    });
    self.key('openSideRightNavbar', () => {
        self.openSide($rightSide);
    });
    self.key('closeSideRightNavbar', () => {
        self.closeSide($rightSide);
    });

    // Fullscreen Navbar
    self.key('toggleFullscreenNavbar', () => {
        self.toggleFullscreenNavbar();
    });
    self.key('openFullscreenNavbar', () => {
        self.openFullscreenNavbar();
    });
    self.key('closeFullscreenNavbar', () => {
        self.closeFullscreenNavbar();
    });

    // ESC - use also inside form elements
    window.key.filter = (event) => {
        const tagName = (event.target || event.srcElement).tagName;
        const isContentEditable = (event.target || event.srcElement).getAttribute('contenteditable');
        const isESC = window.key.isPressed('esc');
        return isESC || !(isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
    };
}

export { key, initShortcuts };
