import { $, isMobile, $wnd } from './_utility';

/*------------------------------------------------------------------

  Mouse Parallax

-------------------------------------------------------------------*/
let $parallaxMouseList = false;
let parallaxMouseTimeout;
let parallaxMouseFirstRun = 1;
// run parallax animation
function parallaxMouseRun(x, y, deviceOrientation) {
    let data;
    let itemX;
    let itemY;
    $parallaxMouseList.each(function () {
        const $this = $(this);
        data = $this.data('nk-parallax-mouse-data');

        // don't animate if block isn't in viewport
        if (typeof data !== 'object' || !data.is_in_viewport && !(deviceOrientation && parallaxMouseFirstRun)) {
            return;
        }

        // device acceleration calculate
        if (deviceOrientation) {
            itemX = -data.size * x;
            itemY = -data.size * y;

            // mouse calculate
        } else {
            itemX = (data.rect.width - (x - data.rect.left)) / data.rect.width;
            itemY = (data.rect.height - (y - data.rect.top)) / data.rect.height;

            if (itemX > 1 || itemX < 0 || itemY > 1 || itemY < 0) {
                itemX = 0.5;
                itemY = 0.5;
            }

            itemX = data.size * (itemX - 0.5) * 2;
            itemY = data.size * (itemY - 0.5) * 2;
        }

        // if first run orientation on device, set default values without animation
        if (deviceOrientation && parallaxMouseFirstRun) {
            $this.css({
                transform: `translateX(${itemX}px) translateY(${itemY}px) translateZ(0)`,
                willChange: 'transform',
            });
        } else {
            $this.css({
                transition: `transform ${deviceOrientation ? 2 : data.speed}s  cubic-bezier(0.22, 0.63, 0.6, 0.88)`,
                transform: `translateX(${itemX}px) translateY(${itemY}px) translateZ(0)`,
                willChange: 'transform',
            });
        }
    });
    parallaxMouseFirstRun = 0;
}

function parallaxMouseInit() {
    const self = this;
    if (!self.options.enableMouseParallax) {
        return;
    }

    clearTimeout(parallaxMouseTimeout);
    parallaxMouseTimeout = setTimeout(() => {
        const $newParallax = $('.bg-image:not(.bg-parallaxed)').addClass('bg-parallaxed');
        if ($newParallax.length) {
            // add new parallax blocks
            if ($parallaxMouseList) {
                $parallaxMouseList = $parallaxMouseList.add($newParallax);

            // first init parallax
            } else {
                $parallaxMouseList = $newParallax;
                if (isMobile && window.DeviceOrientationEvent) {
                    $wnd.on('deviceorientation', (event) => {
                        parallaxMouseRun(event.gamma / 90, event.beta / 180, true);
                    });

                // no smooth on firefox
                } else {
                    $wnd.on('mousemove', (event) => {
                        parallaxMouseRun(event.clientX, event.clientY);
                    });
                }
            }
        }

        // update data for parallax blocks
        if ($parallaxMouseList) {
            $parallaxMouseList.each(function () {
                const $this = $(this);
                const $parent = $this.parent();
                const size = parseFloat($parent.attr('data-nk-mouse-parallax-size')) || 30;
                const speed = parseFloat($parent.attr('data-nk-mouse-parallax-speed')) || 10000;
                $this.data('nk-parallax-mouse-data', {
                    is_in_viewport: self.isInViewport($parent) ? $parent.is(':visible') : 0,
                    rect: $parent[0].getBoundingClientRect(),
                    size,
                    speed: speed / 1000,
                });
                $this.css({
                    left: -size,
                    right: -size,
                    top: -size,
                    bottom: -size,
                });
            });
        }
    }, 100);
}

export { parallaxMouseInit };
