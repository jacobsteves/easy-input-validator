(function ($) {
    this.EasyValidator = {
        validators: [],
        add: function (name, msg, validatorFunc) {
            EasyValidator.validators.push({name: name, msg: msg, do: validatorFunc});
        },
        addValidations: function (arr) {
            for (var i = 0; i < arr.length; i++) {
                EasyValidator.validators.push(arr[i]);
            }
        },
        getValidationMsg: function (val, className) {
            for (var i = EasyValidator.validators.length - 1; i >= 0; i--) {
                var validator = EasyValidator.validators[i];
                if (validator.name != className) continue;
                if (!validator.do(val)) return validator.msg;
                return null;
            }
            return null;
        },
        isValid: function (val, className) {
            for (var i = EasyValidator.validators.length - 1; i >= 0; i--) {
                var validator = EasyValidator.validators[i];
                if (validator.name != className) continue;
                return !!validator.do(val);
            }
            return true;
        },
        isEmpty: function (v) {
            return ((v === null) || (v.length === 0));
        }
    };

    /**
     * Define all the default validations
     */
    EasyValidator.addValidations([
        ['required', 'This is a required field.',
            function (v) {
                return !Valid8.isEmpty(v);
            }
        ]
    ]);


    /**
     * Create the form listener to setup the validation
     */
    $(document).ready(function () {
        $('.form-field-validation').each(function () {
            var $form = $(this);

            var validate = function ($field) {
                $field.addClass('valid-input').removeClass("invalid-input").parent().removeClass('has-error');
            };

            var invalidate = function ($field) {
                $field.removeClass("valid-input").addClass('invalid-input').parent().addClass('has-error');
            };

            var createValidationTag = function ($field) {
                $field.after("<div class='validation-msg' style='display:none;'></div>");
            };

            var runValidations = function ($field) {
                var validationMsg;
                var isValid = true;

                var classes = $field.attr('class') ? $field.attr('class').split(' ') : [];
                $(classes).each(function (i, className) {
                    validationMsg = validationMsg || EasyValidator.getValidationMsg($field.val(), className);
                    if (validationMsg) isValid = false;
                });

                $field.next('.validation-msg').html(validationMsg).toggle(!isValid);
                return isValid;
            };

            var validateField = function ($field) {
                if ($field.next('.validation-msg').length === 0) createValidationTag($field);
                var isValid = runValidations($field);
                (isValid) ? validate($field) : invalidate($field);
            };

            var validateAllFields = function () {
                $form.find(':input').each(function () {
                    checkField($(this));
                });
            };

            var addInputValidators = function () {
                $form.find(':input').each(function () {
                    var $input = $(this);
                    $input.change(function (e) {
                        checkField($input);
                    });
                });
            };

            // Disable the submit button if any errors are present
            var enableOrDisableSubmit = function () {
                $form.change(function (e) {
                    if ($form.find('.has-error').length > 0) {
                        $form.find('[type=submit]').addClass('disabled');
                    } else {
                        $form.find('[type=submit]').removeClass('disabled');
                    }
                });
            };

            // Validate all fields upon submit
            var validateFieldsOnSubmit = function () {
                $form.on('submit', function () {
                    var $submit = $form.find('[type=submit]');
                    validateAllFields();
                    if ($form.find('.has-error').length > 0) {
                        $submit.addClass('disabled');
                        return false;
                    } else {
                        $submit.removeClass('disabled');
                        return true;
                    }
                });
            };

            addInputValidators();
            enableOrDisableSubmit();
            validateFieldsOnSubmit();

        });
    });

})(jQuery);
