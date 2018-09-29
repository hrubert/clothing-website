import { $, $wnd, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Search Block

-------------------------------------------------------------------*/
function initSearchBlock() {
    const self = this;
    const $search = $('.nk-search');
    const $nav = $('.nk-navbar-top');
    let navRect;
    let isOpened;

    self.toggleSearch = () => {
        self[`${isOpened ? 'close' : 'open'}Search`]();
    };

    self.openSearch = () => {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        // active all togglers
        $('.nk-search-toggle').addClass('active');

        // add search top position
        navRect = $nav[0] ? $nav[0].getBoundingClientRect() : 0;

        // set top position and animate
        $search.css({
            paddingTop: navRect ? navRect.bottom : 0,
        });

        // open search block
        $search.addClass('open');

        // focus search input
        if (self.options.enableSearchAutofocus) {
            setTimeout(() => {
                $search.find('.nk-search-field input').focus();
            }, 100);
        }

        // trigger event
        $wnd.trigger('nk-open-search-block', [$search]);
    };

    self.closeSearch = () => {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        // disactive all togglers
        $('.nk-search-toggle').removeClass('active');

        // close search block
        $search.removeClass('open');

        // trigger event
        $wnd.trigger('nk-close-search-block', [$search]);
    };

    $doc.on('click', '.nk-search-toggle', (e) => {
        self.toggleSearch();

        e.preventDefault();
    });
    $wnd.on('nk-open-full-navbar', () => {
        self.closeSearch();
    });
    $wnd.on('nk-open-share-place', () => {
        self.closeSearch();
    });
    $wnd.on('scroll', () => {
        self.closeSearch();
    });
}

export { initSearchBlock };
