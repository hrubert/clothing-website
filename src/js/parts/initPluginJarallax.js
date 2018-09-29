import { $ } from './_utility';

/* Jarallax */
function initPluginJarallax() {
    if (typeof $.fn.jarallax === 'undefined') {
        return;
    }
    const self = this;

    // header parallax
    const $parallaxHeader = $('.nk-header-title-parallax, .nk-header-title-parallax-opacity, .nk-header-title-parallax-blur').eq(0);
    if ($parallaxHeader.length) {
        const $headerImageOrVideo = $parallaxHeader.find('> .bg-image, > .bg-video').eq(0);
        const $headerContent = $headerImageOrVideo.find('~ *');
        const headerParallaxScroll = $parallaxHeader.hasClass('nk-header-title-parallax');
        const headerParallaxOpacity = $parallaxHeader.hasClass('nk-header-title-parallax-opacity');
        const headerParallaxBlur = $parallaxHeader.hasClass('nk-header-title-parallax-blur');
        const options = {
            speed: self.options.parallaxSpeed,
        };

        $headerImageOrVideo.addClass('bg-image-parallax');

        options.onScroll = (calc) => {
            const percentScroll = Math.max(0, Math.min(1, (calc.afterTop - 30) / (calc.section.height - 60))); // 30 - is additional offset for mouse parallax
            const scrollContent = Math.max(0, Math.min(50, 50 * percentScroll));

            if (headerParallaxScroll) {
                $headerContent.css({
                    transform: `translateY(${scrollContent}px) translateZ(0)`,
                });
            }
            if (headerParallaxOpacity) {
                $headerContent.css({
                    opacity: 1 - percentScroll,
                });
            }
            if (headerParallaxBlur) {
                $headerImageOrVideo.css({
                    filter: `blur(${10 * percentScroll}px)`,
                });
            }
        };

        $headerImageOrVideo.jarallax(options);
    }

    // footer parallax
    const $parallaxFooter = $('.nk-footer-parallax, .nk-footer-parallax-opacity').eq(0);
    if ($parallaxFooter.length) {
        const $footerImageOrVideo = $parallaxFooter.find('> .bg-image, > .bg-video').eq(0);
        const $footerContent = $footerImageOrVideo.find('~ *');
        const footerParallaxScroll = $parallaxFooter.hasClass('nk-footer-parallax');
        const footerParallaxOpacity = $parallaxFooter.hasClass('nk-footer-parallax-opacity');
        const footerParallaxBlur = $parallaxFooter.hasClass('nk-footer-parallax-blur');
        const options = {
            speed: self.options.parallaxSpeed,
        };

        $footerImageOrVideo.addClass('bg-image-parallax');

        options.onScroll = (calc) => {
            const percentScroll = Math.max(0, Math.min(1, (calc.beforeBottom - 30) / (calc.section.height - 60))); // 30 - is additional offset for mouse parallax
            const scrollContent = Math.max(0, Math.min(50, 50 * percentScroll));

            if (footerParallaxScroll) {
                $footerContent.css({
                    transform: `translateY(-${scrollContent}px) translateZ(0)`,
                });
            }
            if (footerParallaxOpacity) {
                $footerContent.css({
                    opacity: 1 - percentScroll,
                });
            }
            if (footerParallaxBlur) {
                $footerImageOrVideo.css({
                    filter: `blur(${10 * percentScroll}px)`,
                });
            }
        };

        $footerImageOrVideo.jarallax(options);
    }

    // video backgrounds
    $('.bg-video[data-video]').each(function eachBgVideo() {
        $(this).attr('data-jarallax-video', $(this).attr('data-video'));
        $(this).removeAttr('data-video');
    });

    // primary parallax
    $('.bg-image-parallax, .bg-video-parallax').jarallax({
        speed: self.options.parallaxSpeed,
    });

    // video without parallax
    $('.bg-video:not(.bg-video-parallax)').jarallax({
        speed: 1,
    });
}

export { initPluginJarallax };
