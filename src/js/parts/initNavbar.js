import { $, tween, $wnd, pageBorderSize } from './_utility';

/*------------------------------------------------------------------

  Init Navbar

-------------------------------------------------------------------*/
function initNavbar() {
    const self = this;
    const $navbarTop = $('.nk-navbar-top');
    const $contactsTop = $('.nk-contacts-top');
    const $navbarLeft = $('.nk-navbar-left');

    // add mobile navbar
    const $mobileNavItems = $('[data-nav-mobile]');
    if ($mobileNavItems.length) {
        $mobileNavItems.each(function eachMobileNavItems() {
            const $nav = $($(this).html());
            const $mobileNav = $($(this).attr('data-nav-mobile'));

            // insert into mobile nav
            $mobileNav.find('.nk-navbar-mobile-content > ul.nk-nav').append($nav);
        });

        const $nav = $('.nk-navbar-mobile-content > ul.nk-nav');

        // remove background images
        $nav.find('.bg-image, .bg-video').remove();

        // remove mega menus
        $nav.find('.nk-mega-item > .dropdown').each(function eachMegaMenus() {
            const $drop = $(this).children('ul').addClass('dropdown');

            // fix mega menu columns
            $drop.find('> li > label').each(function eachMegaMenuLabels() {
                $(this).next().addClass('dropdown');
                $(this).parent().addClass('nk-drop-item');
                $(this).replaceWith($('<a href="#"></a>').html($(this).html()));
            });

            $(this).replaceWith($drop);
        });
        $nav.find('.nk-mega-item').removeClass('nk-mega-item');
    }

    // sticky navbar
    const navbarTop = $navbarTop.length ? $navbarTop.offset().top - pageBorderSize : 0;
    // fake hidden navbar to prevent page jumping on stick
    const $navbarFake = $('<div>').hide();
    function onScrollNav() {
        const stickyOn = $wnd.scrollTop() >= navbarTop;

        if (stickyOn) {
            $navbarTop.addClass('nk-navbar-fixed');
            $navbarFake.show();
        } else {
            $navbarTop.removeClass('nk-navbar-fixed');
            $navbarFake.hide();
        }
    }
    if ($navbarTop.hasClass('nk-navbar-sticky')) {
        $wnd.on('scroll resize', onScrollNav);
        onScrollNav();

        $navbarTop.after($navbarFake);
        self.debounceResize(() => {
            $navbarFake.height($navbarTop.innerHeight());
        });
    }

    // correct dropdown position
    function correctDropdown($item) {
        if ($item.parent().is('.nk-nav')) {
            const $dropdown = $item.children('.dropdown');
            const $parent = $item.parents('.nk-navbar:eq(0)');
            let $parentContainer = $parent.children('.container');
            $parentContainer = $parentContainer.length ? $parentContainer : $parent;

            // fix right value when sub menu is not hidden
            $dropdown.css('display', 'none');
            const isRight = $dropdown.css('right') !== 'auto';
            const $contacts = $item.parents('.nk-contacts-top:eq(0)');
            const css = {
                marginLeft: '',
                marginRight: '',
                marginTop: 0,
                display: 'block',
            };

            $dropdown.css(css);

            let rect = $dropdown[0].getBoundingClientRect();
            const rectContainer = $parentContainer[0].getBoundingClientRect();
            const itemRect = $item[0].getBoundingClientRect();

            // move dropdown from right corner (right corner will check in nav container)
            if (rect.right > rectContainer.right) {
                css.marginLeft = rectContainer.right - rect.right;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // move dropdown from left corner
            if (rect.left - pageBorderSize < 0) {
                css.marginLeft = pageBorderSize - rect.left;
                $dropdown.css(css);
                rect = $dropdown[0].getBoundingClientRect();
            }

            // check if dropdown not under item
            const currentLeftPost = rect.left + (css.marginLeft || 0);
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
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 0,
                display: 'none',
                onComplete() {
                    self.parallaxMouseInit();
                },
            });
            $wnd.trigger('nk-closed-submenu', [$item]);
        }
    }
    function openSubmenu($item) {
        if (!$item.hasClass('open')) {
            correctDropdown($item);
            tween.to($item.children('.dropdown'), 0.3, {
                opacity: 1,
                display: 'block',
            });
            $item.addClass('open');
            self.parallaxMouseInit();
            $wnd.trigger('nk-opened-submenu', [$item]);
        }
    }

    let dropdownTimeout;

    // show dropdowns in left menu icons
    $navbarLeft.find('.nk-nav-icons').on('click', 'li.nk-drop-item', function onClickLeftNavDropdown(e) {
        e.preventDefault();

        const $item = $(this);
        const $openedSiblings = $item.siblings('.open')
            .add($item.siblings().find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    });
    $navbarLeft.on('mouseenter', 'li.nk-drop-item', () => {
        clearTimeout(dropdownTimeout);
    });

    // show dropdowns in main menu
    $navbarTop.add($contactsTop).on('mouseenter', 'li.nk-drop-item', function onMouseEnterNavDropdown() {
        const $item = $(this);
        const $otherDropdown = $item.closest($contactsTop).length ? $navbarTop : $contactsTop;
        const $openedSiblings = $item.siblings('.open')
            .add($item.siblings().find('.open'))
            .add($item.parents('.nk-nav:eq(0)').siblings().find('.open'))
            .add($item.parents('.nk-nav:eq(0)').siblings('.open'))
            .add($item.parents('.nk-nav:eq(0)').parent().siblings().find('.open'))
            .add($otherDropdown.find('.open'));

        clearTimeout(dropdownTimeout);
        closeSubmenu($openedSiblings);
        openSubmenu($item);
    }).on('mouseleave', 'li.nk-drop-item', function onMouseLeaveNavDropdown() {
        const $item = $(this);
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            closeSubmenu($item);
        }, 200);
    });

    // hide dropdowns
    $navbarTop.add($contactsTop).add($navbarLeft).on('mouseleave', () => {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            closeSubmenu($navbarTop.add($contactsTop).add($navbarLeft.find('.nk-nav-icons')).find('.open'));
        }, 400);
    });

    // hide / show
    // add / remove solid color
    const $autohideNav = $navbarTop.filter('.nk-navbar-autohide');
    self.throttleScroll((type, scroll) => {
        const start = 400;
        const hideClass = 'nk-onscroll-hide';
        const showClass = 'nk-onscroll-show';

        // hide / show
        if (type === 'down' && scroll > start) {
            $autohideNav.removeClass(showClass).addClass(hideClass);
        } else if (type === 'up' || type === 'end' || type === 'start') {
            $autohideNav.removeClass(hideClass).addClass(showClass);
        }

        // add solid color
        if ($navbarTop.hasClass('nk-navbar-transparent')) {
            $navbarTop[`${scroll > 70 ? 'add' : 'remove'}Class`]('nk-navbar-solid');
        }
    });
}

export { initNavbar };
