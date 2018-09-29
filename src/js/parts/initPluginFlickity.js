import { $, wndW, wndH } from './_utility';

function addDefaultArrows($carousel) {
    $('<div class="nk-flickity-arrow nk-flickity-arrow-prev"><span class="nk-icon-arrow-left"></span></div>').on('click', () => {
        $carousel.flickity('previous');
    }).appendTo($carousel);

    $('<div class="nk-flickity-arrow nk-flickity-arrow-next"><span class="nk-icon-arrow-right"></span></div>').on('click', () => {
        $carousel.flickity('next');
    }).appendTo($carousel);
}

function updateCustomArrows($carousel) {
    const data = $carousel.children('.nk-carousel-inner').data('flickity');
    const currIndex = data.selectedIndex;
    let nextIndex;
    let prevIndex;

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
    const $nextCell = $(data.cells[nextIndex].element);
    const $prevCell = $(data.cells[prevIndex].element);
    const $currCell = $(data.cells[currIndex].element);

    // get name and sources
    const nextName = $nextCell.find('.nk-carousel-item-name').text();
    const prevName = $prevCell.find('.nk-carousel-item-name').text();
    const currName = $currCell.find('.nk-carousel-item-name').html();
    const currLinks = $currCell.find('.nk-carousel-item-links').html();

    // add info to buttons
    $carousel.find('.nk-carousel-next > .nk-carousel-arrow-name').html(nextName);
    $carousel.find('.nk-carousel-prev > .nk-carousel-arrow-name').html(prevName);
    $carousel.find('.nk-carousel-current > .nk-carousel-name').html(currName);
    $carousel.find('.nk-carousel-current > .nk-carousel-links').html(currLinks);
}

// prevent click event fire when drag carousel
function noClickEventOnDrag($carousel) {
    $carousel.on('dragStart.flickity', function onDragStartFlickity() {
        $(this).find('.flickity-viewport').addClass('is-dragging');
    });
    $carousel.on('dragEnd.flickity', function onDragEndFlickity() {
        $(this).find('.flickity-viewport').removeClass('is-dragging');
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
        const _this = this;
        let timeout = false;

        imagesLoaded(this.slider).on('progress', (instance, image) => {
            const cell = _this.getParentCell(image.img);
            _this.cellSizeChange(cell && cell.element);
            if (!_this.options.freeScroll) {
                _this.positionSliderAtSelected();
            }
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                _this.dispatchEvent('imagesLoadedTimeout', null, [image.img, cell.element]);
            }, 100);
        });
    };

    const self = this;

    // carousel 1
    const $carousel1 = $('.nk-carousel > .nk-carousel-inner:not(.flickity-enabled)').parent();
    if ($carousel1.length) {
        $carousel1.children('.nk-carousel-inner').each(function eachCarouselInner() {
            $(this).flickity({
                pageDots: $(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                cellAlign: $(this).parent().attr('data-cell-align') || 'center',
            });
            if ($(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows($(this));
            }
            updateCustomArrows($(this).parent());
        }).on('select.flickity', function onSelectFlickity() {
            updateCustomArrows($(this).parent());
        });
        $carousel1.on('click', '.nk-carousel-next', function onClickCarouselNext() {
            $(this).parent().children('.nk-carousel-inner').flickity('next');
        });
        $carousel1.on('click', '.nk-carousel-prev', function onClickCarouselPrev() {
            $(this).parent().children('.nk-carousel-inner').flickity('previous');
        });
        noClickEventOnDrag($carousel1.children('.nk-carousel-inner'));
    }

    // carousel 2
    $('.nk-carousel-2 > .nk-carousel-inner:not(.flickity-enabled)').each(function eachCarouselInner() {
        $(this).flickity({
            pageDots: $(this).parent().attr('data-dots') === 'true' || false,
            autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
            prevNextButtons: false,
            wrapAround: true,
            imagesLoaded: true,
            cellAlign: $(this).parent().attr('data-cell-align') || 'center',
        });
        if ($(this).parent().attr('data-arrows') === 'true') {
            addDefaultArrows($(this));
        }
        noClickEventOnDrag($(this));
    });

    // carousel 3
    const $carousel3 = $('.nk-carousel-3 > .nk-carousel-inner:not(.flickity-enabled)').parent();
    // set height for items
    function setHeightCarousel3() {
        $carousel3.each(function eachCarousel() {
            const $allImages = $(this).find('img');
            const size = $(this).attr('data-size') || 0.8;
            let resultH = wndH * size;
            const maxItemW = Math.min($(this).parent().width(), wndW) * size;
            $allImages.each(function eachCarouselImages() {
                if (this.naturalWidth && this.naturalHeight && resultH * this.naturalWidth / this.naturalHeight > maxItemW) {
                    resultH = maxItemW * this.naturalHeight / this.naturalWidth;
                }
            });
            $allImages.css('height', resultH);
            $(this).children('.nk-carousel-inner').flickity('reposition');
        });
    }
    if ($carousel3.length) {
        $carousel3.children('.nk-carousel-inner').each(function eachCarouselInner() {
            $(this).flickity({
                pageDots: $(this).parent().attr('data-dots') === 'true' || false,
                autoPlay: parseFloat($(this).parent().attr('data-autoplay')) || false,
                prevNextButtons: false,
                wrapAround: true,
                imagesLoaded: true,
                cellAlign: $(this).parent().attr('data-cell-align') || 'center',
            });
            updateCustomArrows($(this).parent());
            if ($(this).parent().attr('data-arrows') === 'true') {
                addDefaultArrows($(this));
            }
        }).on('select.flickity', function onSelectFlickity() {
            updateCustomArrows($(this).parent());
        }).on('imagesLoadedTimeout.flickity', () => {
            // fix items height when images loaded
            setHeightCarousel3();
        });
        $carousel3.on('click', '.nk-carousel-next', function onClickCarouselNext() {
            $(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('next');
        });
        $carousel3.on('click', '.nk-carousel-prev', function onClickCarouselPrev() {
            $(this).parents('.nk-carousel-3:eq(0)').children('.nk-carousel-inner').flickity('previous');
        });
        setHeightCarousel3();
        self.debounceResize(setHeightCarousel3);
        noClickEventOnDrag($carousel3.children('.nk-carousel-inner'));
    }

    // update products carousel
    const $storeCarousel = $('.nk-carousel-1, .nk-carousel-1, .nk-carousel-2, .nk-carousel-3').filter('.nk-store:not(.nk-store-carousel-enabled)').addClass('.nk-store-carousel-enabled');
    function updateStoreProducts() {
        $storeCarousel.each(function eachCarousel() {
            let currentTallest = 0;
            let currentRowStart = 0;
            const rowDivs = [];
            let topPosition = 0;
            let currentDiv = 0;
            let $el;
            $(this).find('.nk-product').each(function eachCarouselProduct() {
                $el = $(this);
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
        $storeCarousel.children('.nk-carousel-inner').on('imagesLoadedTimeout.flickity', () => {
            // fix items height when images loaded
            setHeightCarousel3();
        });
        self.debounceResize(updateStoreProducts);
        updateStoreProducts();
    }
}

export { initPluginFlickity };
