import { $, $doc, tween } from './_utility';

/*------------------------------------------------------------------

  Init Image Boxes

-------------------------------------------------------------------*/
function initImageBoxes() {
    let $imgBox;
    let $img;
    let rect;
    let fromCenter;
    let run;
    let scaleFrom;
    let scaleTo;
    const allBoxesSelector = '.nk-image-box-1:not(.nk-no-effect), .nk-image-box-1-a:not(.nk-no-effect), .nk-image-box-2:not(.nk-no-effect), .nk-image-box-3:not(.nk-no-effect), .nk-image-box-4:not(.nk-no-effect), .nk-image-box-5:not(.nk-no-effect)';

    // image animation
    $(allBoxesSelector).each(function eachImageBoxes() {
        $img = $(this).find('img, div.nk-portfolio-image');
        if ($img.attr('data-from')) {
            tween.to($img, 2, {
                scale: $img.attr('data-from'),
            });
        }
    });
    $doc.on('mouseenter', allBoxesSelector, function onMouseEnterImageBoxes() {
        $imgBox = $(this);
        $img = $imgBox.find('img, div.nk-portfolio-image');
        scaleFrom = $img.attr('data-from') || 1;
        scaleTo = $img.attr('data-to') || 1.05;
        tween.to($img, 1, {
            scale: scaleTo,
        });
        run = 1;
    })
        .on('mouseleave', allBoxesSelector, () => {
            run = 0;
            tween.to($img, 1, {
                scale: scaleFrom,
                x: 0,
                y: 0,
            });
        })
        .on('mousemove', allBoxesSelector, (e) => {
            window.requestAnimationFrame(() => {
                if (run) {
                    rect = $imgBox[0].getBoundingClientRect();
                    fromCenter = [
                        (rect.width / 2 - e.clientX + rect.left) / (rect.width / 2),
                        (rect.height / 2 - e.clientY + rect.top) / (rect.height / 2),
                    ];
                    tween.to($img, 7, {
                        x: rect.width * (scaleTo - 1) * fromCenter[0] / 2,
                        y: rect.height * (scaleTo - 1) * fromCenter[1] / 2,
                    });
                }
            });
        });

    // overlay smart show
    $doc.on('mouseenter mouseleave', '.nk-image-box-5', function onMouseEnterImageBoxe5(e) {
        const $overlay = $(this).find('.nk-image-box-overlay');
        const itemRect = $imgBox[0].getBoundingClientRect();

        // detect mouse enter or leave
        const x = (itemRect.width / 2 - e.clientX + itemRect.left) / (itemRect.width / 2);
        const y = (itemRect.height / 2 - e.clientY + itemRect.top) / (itemRect.height / 2);
        const enter = e.type === 'mouseenter';
        let endX = '0%';
        let endY = '0%';
        if (Math.abs(x) > Math.abs(y)) {
            endX = (x > 0 ? '-10' : '10') + endX;
        } else {
            endY = (y > 0 ? '-10' : '10') + endY;
        }

        if (enter) {
            tween.set($overlay, {
                x: endX,
                y: endY,
            });
        }
        tween.to($overlay, 0.25, {
            x: enter ? '0%' : endX,
            y: enter ? '0%' : endY,
            display: enter ? 'flex' : 'none',
            ease: Power1.easeInOut,
        });
    });
}

export { initImageBoxes };
