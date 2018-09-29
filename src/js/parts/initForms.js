import { $, $doc, tween } from './_utility';

/*------------------------------------------------------------------

  Init Forms

-------------------------------------------------------------------*/
function initForms() {
    const self = this;

    // Create Spinners in input number
    $('<span class="nk-form-control-number-up"></span>').insertAfter('.nk-form-control-number input');
    $('<span class="nk-form-control-number-down"></span>').insertAfter('.nk-form-control-number input');
    $doc.on('click', '.nk-form-control-number-up', function onSpinnerClickUp() {
        const $input = $(this).siblings('input');
        const max = $input.attr('max') || 9999999;
        let newVal;

        const oldValue = parseFloat($input.val());
        if (oldValue >= max) {
            newVal = oldValue;
        } else {
            newVal = oldValue + 1;
        }
        $input.val(newVal);
        $input.trigger('change');
    });
    $doc.on('click', '.nk-form-control-number-down', function onSpinnerClickDown() {
        const $input = $(this).siblings('input');
        const min = $input.attr('min') || -9999999;
        let newVal;

        const oldValue = parseFloat($input.val());
        if (oldValue <= min) {
            newVal = oldValue;
        } else {
            newVal = oldValue - 1;
        }
        $input.val(newVal);
        $input.trigger('change');
    });


    // Sign Forms
    const $signForm = $('.nk-sign-form');
    const $formLost = $signForm.find('.nk-sign-form-lost');
    const $formLogin = $signForm.find('.nk-sign-form-login');
    const $formRegister = $signForm.find('.nk-sign-form-register');
    const $toggleLost = $signForm.find('.nk-sign-form-lost-toggle');
    const $toggleLogin = $signForm.find('.nk-sign-form-login-toggle');
    const $toggleRegister = $signForm.find('.nk-sign-form-register-toggle');

    function animateForms($showItems, inverse = false) {
        tween.set($signForm, {
            height: 'auto',
        });
        tween.set($signForm, {
            height: $signForm.outerHeight(true),
        });

        const $hideItems = $formLost.filter('.active').add($formRegister.filter('.active')).add($formLogin.filter('.active'));
        tween.set($hideItems, {
            position: 'absolute',
            display: 'block',
            x: 0,
        });
        tween.set($showItems, {
            position: 'absolute',
            display: 'none',
            x: inverse ? '-60%' : '60%',
        });
        tween.to($hideItems, 0.2, {
            opacity: 0,
            x: inverse ? '60%' : '-60%',
            display: 'none',
            force3D: true,
        });
        tween.to($showItems, 0.2, {
            opacity: 1,
            display: 'block',
            x: '0%',
            force3D: true,
            onComplete() {
                tween.set($showItems, {
                    position: 'relative',
                });

                const formHeight = $signForm.outerHeight(true);
                tween.set($signForm, {
                    height: 'auto',
                });
                const formNewHeight = $signForm.outerHeight(true);
                tween.set($signForm, {
                    height: formHeight,
                });
                tween.to($signForm, 0.2, {
                    height: formNewHeight,
                });
            },
        });
        $hideItems.removeClass('active');
        $showItems.addClass('active');
    }
    function showLoginForm() {
        animateForms($formLogin, true);
        $toggleLost.removeClass('active');
        $toggleLogin.addClass('active');
        $toggleRegister.removeClass('active');
    }
    function showLostForm() {
        animateForms($formLost);
        $toggleLost.addClass('active');
        $toggleLogin.removeClass('active');
        $toggleRegister.removeClass('active');
    }
    function showRegisterForm() {
        animateForms($formRegister);
        $toggleLost.removeClass('active');
        $toggleLogin.removeClass('active');
        $toggleRegister.addClass('active');
    }

    $signForm.on('click', '.nk-sign-form-login-toggle:not(.active)', (e) => {
        e.preventDefault();
        showLoginForm();
    });
    $signForm.on('click', '.nk-sign-form-lost-toggle:not(.active)', (e) => {
        e.preventDefault();
        showLostForm();
    });
    $signForm.on('click', '.nk-sign-form-register-toggle:not(.active)', (e) => {
        e.preventDefault();
        showRegisterForm();
    });


    if (typeof $.fn.ajaxSubmit === 'undefined' || typeof $.validator === 'undefined') {
        return;
    }

    // Validate Khaki Forms
    $('form:not(.nk-form-ajax):not(.nk-mchimp):not([novalidate])').each(function eachValidateForms() {
        $(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement(error, element) {
                const $parent = element.parent('.input-group');
                const $parentNumber = element.parent('.nk-form-control-number');
                if ($parent.length) {
                    $parent.after(error);
                } else if ($parentNumber.length) {
                    $parentNumber.parent().after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },
        });
    });

    // ajax form
    $('form.nk-form-ajax:not([novalidate])').each(function eachAjaxForms() {
        $(this).validate({
            errorClass: 'nk-error',
            errorElement: 'div',
            errorPlacement(error, element) {
                const $parent = element.parent('.input-group');
                if ($parent.length) {
                    $parent.after(error);
                } else {
                    element.after(error);
                }
                self.debounceResize();
            },
            // Submit the form via ajax (see: jQuery Form plugin)
            submitHandler(form) {
                const $responseSuccess = $(form).find('.nk-form-response-success');
                const $responseError = $(form).find('.nk-form-response-error');
                $(form).ajaxSubmit({
                    type: 'POST',
                    success(response) {
                        response = JSON.parse(response);
                        if (response.type && response.type === 'success') {
                            $responseError.hide();
                            $responseSuccess.html(response.response).show();
                            form.reset();
                        } else {
                            $responseSuccess.hide();
                            $responseError.html(response.response).show();
                        }
                        self.debounceResize();
                    },
                    error(response) {
                        $responseSuccess.hide();
                        $responseError.html(response.responseText).show();
                        self.debounceResize();
                    },
                });
            },
        });
    });
}

export { initForms };
