import { $ } from './_utility';

/*------------------------------------------------------------------

  Init Line For Boxes
  <div class="nk-box nk-box-line"></div>

-------------------------------------------------------------------*/
function initLinesForBoxes() {
    const self = this;
    let $rowsWithBoxes;

    $('.row').each(function eachRows() {
        if ($(this).find('> * > .nk-box-line').length) {
            $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add($(this)) : $(this);
        }
    });

    // support for VC
    $('.vc_row').each(function eachVCRows() {
        if ($(this).find('> div > div > div > .nk-box-line').length) {
            $rowsWithBoxes = $rowsWithBoxes ? $rowsWithBoxes.add($(this)) : $(this);
        }
    });

    if (!$rowsWithBoxes) {
        return;
    }

    function calculate() {
        $rowsWithBoxes.each(function eachRowsWithBoxes() {
            let currentRowStart = 0;
            const rowDivs = [];
            let topPosition = 0;
            const $this = $(this);

            // check all rows and add in array
            $this.children('*').each(function eachRowChildrens() {
                topPosition = $(this).position().top;
                if (currentRowStart !== topPosition) {
                    currentRowStart = topPosition;
                    rowDivs.push($(this));
                } else if (rowDivs[rowDivs.length - 1]) {
                    rowDivs[rowDivs.length - 1] = rowDivs[rowDivs.length - 1].add($(this));
                } else {
                    rowDivs[(rowDivs.length || 1) - 1] = $(this);
                }
            });

            // support for VC
            if ($this.hasClass('vc_row')) {
                // remove additional classnames
                $(this).find('> div > div > div > .nk-box-line').removeClass('nk-box-line-top nk-box-last');

                // add new classnames
                for (let k = 0; k < rowDivs.length; k++) {
                    rowDivs[k].last().find('> div > div > .nk-box-line').addClass('nk-box-last');
                    if (k > 0) {
                        rowDivs[k].find('> div > div > .nk-box-line').addClass('nk-box-line-top');
                    }
                }

            // bootstrap
            } else {
                // remove additional classnames
                $this.find('> * > .nk-box-line').removeClass('nk-box-line-top nk-box-last');

                // add new classnames
                for (let k = 0; k < rowDivs.length; k++) {
                    rowDivs[k].last().children('.nk-box-line').addClass('nk-box-last');
                    if (k > 0) {
                        rowDivs[k].children('.nk-box-line').addClass('nk-box-line-top');
                    }
                }
            }
        });
    }

    calculate();
    self.debounceResize(calculate);
}

export { initLinesForBoxes };
