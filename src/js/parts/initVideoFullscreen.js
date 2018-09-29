import { $, $doc, $body, wndW, wndH, isMobile } from './_utility';

/*------------------------------------------------------------------

 Init Fullscreen Video

 -------------------------------------------------------------------*/
function initVideoFullscreen() {
    if (typeof window.VideoWorker === 'undefined') {
        return;
    }
    const self = this;

    // open fullscreen videos
    let openedFSVideo;
    self.openFullScreenVideo = (url) => {
        if (isMobile) {
            window.open(url);
            return;
        }

        if (openedFSVideo) {
            return;
        }
        openedFSVideo = 1;

        // get api for this video
        self.FullScreenVideoApi = new VideoWorker(url, {
            autoplay: 1,
            loop: 0,
            mute: 0,
            controls: 1,
        });

        // set video size
        function setVideoSize() {
            const ratio = 16 / 9;
            let resultW;
            let resultH;

            if (ratio > wndW / wndH) {
                resultW = wndW * 0.9;
                resultH = resultW / ratio;
            } else {
                resultH = wndH * 0.9;
                resultW = resultH * ratio;
            }
            self.FullScreenVideoWrapper.css({
                width: resultW,
                height: resultH,
                top: (wndH - resultH) / 2,
                left: (wndW - resultW) / 2,
            });
        }

        // create fullscreen video wrapper if doesn't exist
        if (!self.FullScreenVideo) {
            self.FullScreenVideo = $('<div class="nk-video-fullscreen"></div>').appendTo($body);

            self.closeFullScreenVideo = () => {
                if (openedFSVideo) {
                    openedFSVideo = 0;

                    self.FullScreenVideoApi.pause();

                    // close fullscreen
                    self.FullScreenVideo.removeClass('active');

                    setTimeout(() => {
                        self.FullScreenVideoWrapper.html('');
                    }, 200);

                    // restore body scrolling
                    self.bodyOverflow(0);
                }
            };

            // close icon
            $(`<div class="nk-video-fullscreen-close">${self.options.templates.fullscreenVideoClose}</div>`)
                .on('click', self.closeFullScreenVideo)
                .appendTo(self.FullScreenVideo);

            // video container
            self.FullScreenVideoWrapper = $('<div class="nk-video-fullscreen-cont"></div>').appendTo(self.FullScreenVideo);

            setVideoSize();
            self.debounceResize(setVideoSize);
        }

        // check api and run fullscreen
        if (self.FullScreenVideoApi && self.FullScreenVideoApi.isValid()) {
            self.FullScreenVideoApi.getIframe((iframe) => {
                const $parent = $(iframe).parent();
                self.FullScreenVideoWrapper.append(iframe);
                $parent.remove();

                // pause audio
                if (typeof soundManager !== 'undefined') {
                    soundManager.pauseAll();
                }

                // show fullscreen video
                self.FullScreenVideo.addClass('active');

                // prevent body scrolling
                self.bodyOverflow(1);
            });
        }
    };
    $doc.on('click', '.nk-video-fullscreen-toggle', function onClickVideoFullscreen(e) {
        e.preventDefault();
        self.openFullScreenVideo($(this).attr('href'));
    });
}

export { initVideoFullscreen };
