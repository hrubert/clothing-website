import { $, $wnd } from './_utility';

/*------------------------------------------------------------------

  Init Background Images Parallax

-------------------------------------------------------------------*/
function initBackgroundImages() {
    const self = this;

    if (!self.options.enableMouseParallax) {
        return;
    }

    const $parallaxImages = $('.nk-main .bg-image').parent().add($('.nk-main .bg-image'));

    // fix for Jarallax
    $parallaxImages.css('transform', 'translate3d(0,0,0)');

    self.parallaxMouseInit();
    $wnd.on('resize scroll load', () => {
        self.parallaxMouseInit();
    });
}

export { initBackgroundImages };
