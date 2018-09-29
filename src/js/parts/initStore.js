import { $, $doc, tween } from './_utility';

/*------------------------------------------------------------------

  Init Store

-------------------------------------------------------------------*/
function initStore() {
    const self = this;

    // scroll to ratings
    $doc.on('click', 'a.nk-product-rating', function onClickProductRating(e) {
        const isHash = this.hash;
        if (isHash) {
            const $hashBlock = $(isHash).parents('.nk-tabs:eq(0)');
            if ($hashBlock.length) {
                self.scrollTo($hashBlock);
            }
            $('.nk-tabs').find(`[data-toggle="tab"][href="${isHash}"]`).click();
        }
        e.preventDefault();
    });

    // carousel for products
    $('.nk-product-carousel').each(function eachProductCarousel() {
        const $carousel = $(this).find('.nk-carousel-inner');
        const $thumbs = $(this).find('.nk-product-carousel-thumbs');
        const $thumbsCont = $thumbs.children();
        let curY = 0;
        let thumbsH = 0;
        let thumbsContH = 0;
        let thumbsBusy = false;

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

            const index = $(this).index();
            $carousel.flickity('select', index);
        });

        $carousel.on('select.flickity', () => {
            const api = $carousel.data('flickity');
            if (!api) {
                return;
            }
            // set selected nav cell
            const $selected = $thumbsCont.children().removeClass('active').eq(api.selectedIndex).addClass('active');

            // scroll nav
            updateValues();
            const selectedTop = $selected.position().top + curY;
            if (selectedTop < 0) {
                tween.to($thumbsCont, 0.2, {
                    y: curY - selectedTop,
                });
            } else {
                const selectedH = $selected.outerHeight(true);
                if (selectedTop + selectedH > thumbsH) {
                    tween.to($thumbsCont, 0.2, {
                        y: curY - (selectedTop + selectedH - thumbsH),
                    });
                }
            }
        });

        let startY = false;
        const mc = new Hammer.Manager($thumbs[0]);
        mc.add(new Hammer.Pan({
            pointers: 1,
            threshold: 0,
        }));
        mc.on('pan press', (e) => {
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
                tween.set($thumbsCont, {
                    y: curY,
                });
            }
            if (e.isFinal) {
                startY = false;

                setTimeout(() => {
                    thumbsBusy = false;
                }, 0);
            }
        });
    });
}

export { initStore };
