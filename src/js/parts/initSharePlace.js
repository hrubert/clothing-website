import { $, $wnd, $doc, $body } from './_utility';

/*------------------------------------------------------------------

  Init Share Place

-------------------------------------------------------------------*/
function initSharePlace() {
    const self = this;
    const $sharePlace = $('.nk-share-place');
    let isOpened;

    // add overlay
    $('<div class="nk-share-place-overlay">').appendTo($body);

    // thanks http://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k/10600491
    function abbreviateNumber(number, decPlaces) {
        decPlaces = 10 ** decPlaces;
        const abbrev = ['k', 'm', 'b', 't'];
        for (let i = abbrev.length - 1; i >= 0; i--) {
            const size = 10 ** ((i + 1) * 3);
            if (size <= number) {
                number = Math.round(number * decPlaces / size) / decPlaces;
                if (number === 1000 && i < abbrev.length - 1) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];
                break;
            }
        }
        return number;
    }

    /* SocialityShare and SocialLikes support */
    if (typeof $.fn.socialityShare !== 'undefined') {
        $('.nk-share-icons').socialityShare().on('counter.sociality-share', function onCountSocialityShare(event, service, number) {
            $(this).find(`[data-share="${service}"] .sociality-share-counter`).html(abbreviateNumber(number, 1) || '');
        });
    } else if (typeof $.fn.socialLikes !== 'undefined') {
        $('.nk-share-icons').socialLikes().on('counter.social-likes', function onCountSocialLikes(event, service, number) {
            $(this).find(`.social-likes__counter_${service}`).html(abbreviateNumber(number, 1) || '');
        });
    }

    self.toggleShare = () => {
        if (isOpened) {
            self.closeShare();
        } else {
            self.openShare();
        }
    };

    self.openShare = () => {
        if (isOpened) {
            return;
        }
        isOpened = 1;

        $sharePlace.addClass('open');

        // trigger event
        $wnd.trigger('nk-open-share-place', [$sharePlace]);
    };

    self.closeShare = () => {
        if (!isOpened) {
            return;
        }
        isOpened = 0;

        $sharePlace.removeClass('open');

        // trigger event
        $wnd.trigger('nk-close-share-place', [$sharePlace]);
    };

    $doc.on('click', '.nk-share-toggle', (e) => {
        self.toggleShare();
        e.preventDefault();
    });
    $doc.on('click', '.nk-share-place-overlay', () => {
        self.closeShare();
    });

    $wnd.on('scroll resize', () => {
        self.closeShare();
    });
}

export { initSharePlace };
