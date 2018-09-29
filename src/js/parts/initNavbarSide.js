import { $, $doc, $body } from './_utility';

/*------------------------------------------------------------------

  Init Navbar Side

-------------------------------------------------------------------*/
function initNavbarSide() {
    const self = this;
    const $overlay = $('<div class="nk-navbar-overlay">').appendTo($body);

    // side navbars
    const $sideNavs = $('.nk-navbar-side');

    // toggle navbars
    function updateTogglers() {
        $('[data-nav-toggle]').each(function eachNavTogglers() {
            const active = $($(this).attr('data-nav-toggle')).hasClass('open');
            $(this)[`${active ? 'add' : 'remove'}Class`]('active');
        });
    }
    self.toggleSide = ($side, speed) => {
        self[$side.hasClass('open') ? 'closeSide' : 'openSide']($side, speed);
    };
    self.openSide = ($side) => {
        $side.addClass('open');

        self.parallaxMouseInit();

        updateTogglers();
    };
    self.closeSide = ($side) => {
        $side.each(function eachSideNavs() {
            $(this).removeClass('open');

            self.parallaxMouseInit();

            updateTogglers();
        });
    };
    $doc.on('click', '[data-nav-toggle]', function onClickNavToggler(e) {
        const $nav = $($(this).attr('data-nav-toggle'));
        if ($nav.hasClass('open')) {
            self.closeSide($nav);
        } else {
            // hide another navigations
            $('[data-nav-toggle]').each(function eachNavToggle() {
                self.closeSide($($(this).attr('data-nav-toggle')));
            });

            self.openSide($nav);
        }
        e.preventDefault();
    });

    // overlay
    $overlay.on('click', () => {
        self.closeSide($sideNavs);
    });

    // hide sidebar if it invisible
    self.debounceResize(() => {
        $sideNavs.filter('.open').each(function eachOpenedSideNav() {
            if (!$(this).is(':visible')) {
                self.closeSide($(this));
            }
        });
    });
}

export { initNavbarSide };
