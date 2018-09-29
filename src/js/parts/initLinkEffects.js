import { $, $doc } from './_utility';

/*------------------------------------------------------------------

  Init Link Effects

-------------------------------------------------------------------*/
function initLinkEffects() {
    // add link effect for navbar
    $('.nk-navbar ul > li > a:not(.btn):not(.nk-btn):not(.no-link-effect)').addClass('link-effect-3');

    // Link Effect 1 (rotate all letters)
    $('.link-effect-1:not(.ready)').each(function eachLinkEffect() {
        $(this).addClass('ready');
        const itemText = $(this).text().replace(/([^\x00-\x80]|\w)/g, '<span>$&</span>');
        $(this).html(itemText);
    });
    function toggleClass($this, $span, type) {
        const $nextSpan = $span[type === 'add' ? 'next' : 'prev']();
        $span[`${type}Class`]('active');

        const timeout = $this.data('timeout');
        clearTimeout(timeout);
        if ($nextSpan.length) {
            $this.data('timeout', setTimeout(() => {
                toggleClass($this, $nextSpan, type);
            }, 40));
        }
    }
    $doc.on('mouseover', '.link-effect-1.ready', function onMouseOverLink() {
        toggleClass($(this), $(this).children('span:not(.active):first'), 'add');
    }).on('mouseleave', '.link-effect-1.ready', function onMousLeaveLink() {
        toggleClass($(this), $(this).children('span.active:last'), 'remove');
    });

    // Link Effect 2 and 3 (color for letters from left to right and top to bottom)
    $('.link-effect-2:not(.ready), .link-effect-3:not(.ready)').each(function eachLinkEffect2() {
        $(this).addClass('ready');
        $(this).html((i, letters) => $('<span>').html(letters).prepend($('<span class="link-effect-shade">').html(letters)));
    });
}

export { initLinkEffects };
