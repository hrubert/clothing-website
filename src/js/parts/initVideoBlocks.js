import { $, isMobile } from './_utility';

/*------------------------------------------------------------------

 Init Video Blocks

 -------------------------------------------------------------------*/
function initVideoBlocks() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    const self = this;

    // init plain video
    function addPlainPlayButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoIcon);
    }
    function addPlainLoadButton($plainCont) {
        $plainCont.find('.nk-video-plain-toggle').html(self.options.templates.plainVideoLoadIcon || self.options.templates.plainVideoIcon);
    }
    $('.nk-plain-video[data-video]:not(.nk-plain-video-enabled)').addClass('nk-plain-video-enabled').each(function eachPlainVideo() {
        const $plainCont = $(this);
        let $plainIframe;
        const url = $(this).attr('data-video');
        const thumb = $(this).attr('data-video-thumb');
        const api = new VideoWorker(url, {
            autoplay: 0,
            loop: 0,
            mute: 0,
            controls: 1,
        });

        if (api && api.isValid()) {
            let loaded = 0;
            let clicked = 0;

            // add play event
            $plainCont.on('click', () => {
                if (isMobile) {
                    window.open(api.url);
                    return;
                }

                if (clicked) {
                    return;
                }
                clicked = 1;

                // add loading button
                if (!loaded) {
                    addPlainLoadButton($plainCont);

                    api.getIframe((iframe) => {
                        // add iframe
                        $plainIframe = $(iframe);
                        const $parent = $plainIframe.parent();
                        $plainIframe.appendTo($plainCont);
                        $parent.remove();
                        api.play();
                    });
                } else {
                    api.play();
                }
            });

            // add play button
            $plainCont.append('<span class="nk-video-plain-toggle"></span>');
            addPlainPlayButton($plainCont);

            // set thumb
            if (thumb) {
                $plainCont.css('background-image', `url("${thumb}")`);
            } else {
                api.getImageURL((imgSrc) => {
                    $plainCont.css('background-image', `url("${imgSrc}")`);
                });
            }

            if (isMobile) {
                return;
            }

            api.on('ready', () => {
                api.play();
            });
            api.on('play', () => {
                $plainCont.addClass('active');

                // add play button
                if (!loaded) {
                    addPlainPlayButton($plainCont);
                    loaded = 1;
                }

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }
            });
            api.on('pause', () => {
                $plainCont.removeClass('active');
                clicked = 0;
            });
        }
    });
}

export { initVideoBlocks };
