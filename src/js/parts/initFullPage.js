import { $, wndH, $body, $wnd, isBodyOverflowed } from './_utility';

/*------------------------------------------------------------------

  Init Fullpage

-------------------------------------------------------------------*/
function initFullPage() {
    const $fullPage = $('.nk-fullpage:eq(0)');
    const $eachItems = $fullPage.find('.nk-fullpage-item');
    if (!$fullPage.length || !$eachItems.length) {
        return;
    }

    const self = this;

    // set items height
    function resizeItems() {
        $eachItems.css('height', wndH);
    }
    resizeItems();
    self.debounceResize(resizeItems);

    // add navigation
    let $nav = '<ul class="nk-fullpage-nav">';
    for (let k = 0; k < $eachItems.length; k++) {
        $nav += `<li>${k + 1}</li>`;
    }
    $nav += '</ul>';
    $nav = $($nav);
    const $navItems = $nav.children('li');
    $body.append($nav);

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

    if (self.isInViewport($fullPage) === 1 && $wnd.scrollTop() === 0) {
        setActiveNavItem(0);
        showNav();
    }

    // check for active item
    let isBusy;
    let $activeItem;
    let $nextItem;
    let $prevItem;
    function getActiveItem(sibling) {
        // if no active items - detect it
        const firstCheck = !$activeItem && !$nextItem && !$prevItem;
        if (firstCheck) {
            const inViewport = self.isInViewport($fullPage, 1);
            if (inViewport[0]) {
                let $itemInVP;
                $eachItems.each(function eachItems() {
                    const visible = self.isInViewport($(this));
                    if (visible) {
                        $itemInVP = $(this);
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
            const temp = $activeItem;
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
        let prev = $prevItem && $prevItem.length;
        let next = $nextItem && $nextItem.length;
        if (!prev && !next) {
            getActiveItem();
            prev = $prevItem && $prevItem.length;
            next = $nextItem && $nextItem.length;
        }
        if (prev && next || isBusy) {
            return true;
        }
        const visible = self.isInViewport($fullPage);
        if (visible > 0.5) {
            $activeItem = false;
            $nextItem = false;
            $prevItem = false;

            getActiveItem();
            prev = $prevItem && $prevItem.length;
            next = $nextItem && $nextItem.length;
            if (!prev && delta < 0 && visible === 1 && $wnd.scrollTop() === 0) {
                return true;
            }
            return prev && delta < 0 || next && delta > 0;
        }
        return false;
    }

    // scroll to item
    function scrollToItem($item, callback) {
        if ($item && !isBodyOverflowed()) {
            isBusy = 1;
            self.scrollTo($item, () => {
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
        scrollToItem($eachItems.eq($(this).index()));
    });

    // scroll to next fullscreen item
    function onScroll(delta, callback) {
        // scroll to active item
        if (!isBusy) {
            scrollToItem(getActiveItem(delta), callback);
        }
    }

    let updateDefaultScroll;
    let wheelEvent;
    if ('onwheel' in document.createElement('div')) {
        wheelEvent = 'wheel';
    } else if ('onmousewheel' in document.createElement('div')) {
        wheelEvent = 'mousewheel';
    }
    if (wheelEvent) {
        // mouse wheel scroll
        $wnd.on(wheelEvent, (e) => {
            if (preventScroll(e.originalEvent.deltaY) === true) {
                onScroll(e.originalEvent.deltaY, () => {
                    updateDefaultScroll = 0;
                });
                e.preventDefault();
            } else {
                hideNav();
            }
        });
    }

    // touch swipe
    let touchStart = 0;
    let touchDelta = 0;
    $wnd.on('touchstart', (e) => {
        touchStart = e.originalEvent.touches[0].screenY;
        touchDelta = 0;
    });
    $wnd.on('touchmove touchend', (e) => {
        const y = e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[0].screenY : false;
        touchDelta = y === false ? touchDelta : touchStart - y;

        if (preventScroll(touchDelta) === true) {
            if (e.type === 'touchend') {
                onScroll(touchDelta, () => {
                    updateDefaultScroll = 0;
                });
            }
            e.preventDefault();
        } else {
            hideNav();
        }
    });

    // default scroll
    let defaultScrollTimeout;
    $wnd.on('scroll resize', () => {
        updateDefaultScroll = 1;
        clearTimeout(defaultScrollTimeout);
        defaultScrollTimeout = setTimeout(() => {
            if (updateDefaultScroll) {
                $activeItem = false;
                $nextItem = false;
                $prevItem = false;
                onScroll();
            }
        }, 1000);
    });

    // on resize - save active item position
    self.debounceResize(() => {
        if ($activeItem && $activeItem.length) {
            if (!isBusy) {
                scrollToItem($activeItem);
            }
        }
    });
}

export { initFullPage };
