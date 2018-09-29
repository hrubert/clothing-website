import { $, tween, $wnd, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Navbar Fullscreen

-------------------------------------------------------------------*/
function initNavbarFullscreen() {
    const self = this;
    const $navbar = $('.nk-navbar-full');
    const $navbarTop = $('.nk-navbar-top');
    let navRect;
    let isOpened;

    self.toggleFullscreenNavbar = () => {
        self[isOpened ? 'closeFullscreenNavbar' : 'openFullscreenNavbar']();
    };
    self.openFullscreenNavbar = () => {
        if (isOpened || !$navbar.length) {
            return;
        }
        isOpened = 1;

        let $navbarMenuItems = $navbar.find('.nk-nav .nk-drop-item.open > .dropdown:not(.closed) > li > a');
        if (!$navbarMenuItems.length) {
            $navbarMenuItems = $navbar.find('.nk-nav > li > a');
        }

        // active all togglers
        $('.nk-navbar-full-toggle').addClass('active');

        // add navbar top position
        navRect = $navbarTop[0] ? $navbarTop[0].getBoundingClientRect() : 0;

        // set top position
        $navbar.css({
            paddingTop: navRect ? navRect.top + navRect.height : 0,
        });
        tween.set($navbarMenuItems, {
            y: -10,
            opacity: 0,
        });

        // open navbar block
        $navbar.addClass('open');
        self.initPluginNano($navbar);

        tween.staggerTo($navbarMenuItems, 0.3, {
            y: 0,
            opacity: 1,
            delay: 0.1,
        }, 0.05);

        // prevent body scrolling
        self.bodyOverflow(1);

        // trigger event
        $wnd.trigger('nk-open-full-navbar', [$navbar]);
    };

    self.closeFullscreenNavbar = (dontTouchBody) => {
        if (!isOpened || !$navbar.length) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        $('.nk-navbar-full-toggle').removeClass('active');

        // hide navbar block
        $navbar.removeClass('open');

        if (!dontTouchBody) {
            self.bodyOverflow(0);
        }

        // trigger event
        $wnd.trigger('nk-close-full-navbar', [$navbar]);
    };

    $doc.on('click', '.nk-navbar-full-toggle', (e) => {
        self.toggleFullscreenNavbar();
        e.preventDefault();
    });

    $wnd.on('nk-open-search-block', () => {
        self.closeFullscreenNavbar(1);
    });
    $wnd.on('nk-open-share-place', self.closeFullscreenNavbar);
}

export { initNavbarFullscreen };
