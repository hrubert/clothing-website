import { $, $body } from './_utility';

/*------------------------------------------------------------------

  Init Quick View for Portfolio

-------------------------------------------------------------------*/
function initQuickView() {
    const $quickViewLinks = $('.nk-portfolio-quick-view, .nk-product-quick-view');
    if (!$quickViewLinks.length) {
        return;
    }

    const self = this;

    const portfolioNavTemplate = self.options.templates.quickViewPortfolio;
    const storeNavTemplate = self.options.templates.quickViewStore;

    const isStoreClass = 'is-store-qv-nav';
    const isProductClass = 'is-portfolio-qv-nav';

    let opened = false;
    let siblingsLinks = false;

    // create quick view container
    const $quickView = $('<div class="nk-quick-view"></div>').appendTo($body);

    // content
    const $quickViewCont = $('<div class="nk-quick-view-cont"></div>').appendTo($quickView);

    // nav
    const $quickViewNav = $('<div class="nk-quick-view-nav"></div>').appendTo($quickView);

    // load quick view content
    function loadQuickViewCont(url) {
        // add loading spinner
        $quickViewCont.html('<div class="nk-loading-spinner mauto"><i></i></div>');
        $quickView.removeClass('loaded');

        const $iframe = $('<iframe>').appendTo($quickViewCont);
        $iframe.on('load', function onQuickViewIframeLoad() {
            const $frameDoc = $(this.contentDocument);

            self.options.events.beforeQuickViewLoad($frameDoc);

            // remove all layout items
            $frameDoc.find('.nk-portfolio-item-single').siblings('*:not(.nk-header-title)').remove();
            $frameDoc.find('.nk-product-quick-view, .nk-portfolio-quick-view, .nk-share-place, .nk-share-place-overlay, .nk-header,' +
                '.nk-navbar, .nk-navbar-overlay, .nk-page-nav, .nk-page-nav-2, .nk-page-nav-3, .nk-side-buttons, .nk-search, .nk-footer').remove();

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
            let prevItem;
            let nextItem;
            let tempPrev;
            for (let k = 0; k < siblingsLinks.length; k++) {
                if (siblingsLinks[k].url === url) {
                    prevItem = tempPrev;
                    nextItem = siblingsLinks[k + 1];
                }
                tempPrev = siblingsLinks[k];
            }

            const $prev = $quickViewNav.find('.nk-page-nav-prev');
            const $next = $quickViewNav.find('.nk-page-nav-next');
            const withCategory = $next.find('.nk-page-nav-title > .nk-product-category').length;

            $prev[`${prevItem ? 'remove' : 'add'}Class`]('disabled');
            $prev.attr('href', prevItem && prevItem.url || 'javascript:void(0)');
            $prev.find('.nk-page-nav-img > div').css('background-image', `url("${prevItem && prevItem.image || ''}")`);
            $prev.find('.nk-page-nav-img > img').attr('src', prevItem && prevItem.image || '');
            if (withCategory) {
                $prev.find('.nk-page-nav-title > .nk-product-title').html(prevItem && prevItem.title || '');
                $prev.find('.nk-page-nav-title > .nk-product-category').html(prevItem && prevItem.category || '');
            } else {
                $prev.find('.nk-page-nav-title').html(prevItem && prevItem.title || '');
            }

            $next[`${nextItem ? 'remove' : 'add'}Class`]('disabled');
            $next.attr('href', nextItem && nextItem.url || 'javascript:void(0)');
            $next.find('.nk-page-nav-img > div').css('background-image', `url("${nextItem && nextItem.image || ''}")`);
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
    self.openQuickView = (item) => {
        if (opened || !item || !item.href) {
            return;
        }
        opened = true;

        const url = item.href;
        const isStore = $(item).hasClass('nk-product-quick-view');

        self.options.events.quickViewOpen($quickView);

        if (!siblingsLinks) {
            let $siblings;
            if (isStore) {
                $siblings = $(item).parents('.nk-store:eq(0)').find('.nk-product').find('.nk-product-quick-view:eq(0)');
            } else {
                $siblings = $(item)
                    .parents('.nk-isotope, [class*="nk-carousel"]').eq(0)
                    .find('.nk-isotope-item')
                    .find('.nk-portfolio-quick-view:eq(0)');
            }
            siblingsLinks = [];

            $siblings.each(function eachSiblings() {
                const $qvItem = $(this).parents(isStore ? '.nk-product:eq(0)' : '.nk-isotope-item:eq(0)');
                let title = '';
                let category = '';
                let image = '';
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
                    title,
                    category,
                    image,
                    item: this,
                });
            });
        }

        // show quick view
        $quickView.addClass('active');

        // add navigation skeleton
        $quickViewNav.html(isStore ? storeNavTemplate : portfolioNavTemplate)
            .removeClass(`${isStoreClass} ${isProductClass}`)
            .addClass(isStore ? isStoreClass : isProductClass);

        // prevent body scrolling
        self.bodyOverflow(1);

        // load content
        loadQuickViewCont(url);
    };

    // close quick view
    self.closeQuickView = () => {
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
    $(`<div class="nk-quick-view-close">${self.options.templates.quickViewCloseIcon}</div>`)
        .on('click', self.closeQuickView)
        .appendTo($quickView);

    // prev / next quick view click
    $quickViewNav.on('click', '.nk-page-nav .nk-page-nav-prev:not(.disabled), .nk-page-nav .nk-page-nav-next:not(.disabled),' +
        '.nk-page-nav-2 .nk-page-nav-prev:not(.disabled), .nk-page-nav-2 .nk-page-nav-next:not(.disabled)', function onClickQuickViewNav(e) {
        e.preventDefault();
        loadQuickViewCont(this.href);
    });

    // open quick view event
    $body.on('click', '.nk-portfolio-quick-view, .nk-product-quick-view', function onClickQuickViewItem(e) {
        e.preventDefault();
        self.openQuickView(this);
    });
}

export { initQuickView };
