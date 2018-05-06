(function ($) {
    /**
     * Easy Validator.
     *
     * Here you can add your own validations, or set up your own methods to work.
     * You can determine whether or not fields are valid and code specific actions to your needs.
     *
     * Or you can use the base functionality, which still provides tons.
     */
    this.EasyValidator = {
        validators: [],

        /**
         * Add a validation to the validator.
         *
         * @param name {String} The validation name. To use this validation, add the given to the input class.
         * @param msg {String} The message to be displayed if the input is not valid.
         * @param validatorFunc {Function} takes one parameter - the value of the input. Determine if the value if valid.
         */
        add: function (name, msg, validatorFunc) {
            EasyValidator.validators.push({name: name, msg: msg, do: validatorFunc});
        },

        /**
         * Add a list of validations to the validator.
         *
         * @param arr {Array} of validations.
         */
        addValidations: function (arr) {
            for (var i = 0; i < arr.length; i++) {
                EasyValidator.add(arr[i][0], arr[i][1], arr[i][2]);
            }
        },

        /**
         * Get the validation message of val against the validation of className.
         *
         * @param val {*} the value of the input.
         * @param className {String} the validation name.
         * @returns {String || null} will be a string if the value is invalid, null if valid.
         */
        getValidationMsg: function (val, className) {
            for (var i = EasyValidator.validators.length - 1; i >= 0; i--) {
                var validator = EasyValidator.validators[i];
                if (validator.name != className) continue;
                if (!validator.do(val)) return validator.msg;
                return null;
            }
            return null;
        },
        /**
         * Determine if the value of the input is valid against the validation of className.
         *
         * @param val {*} the value of the input.
         * @param className {String} the validation name.
         * @returns {boolean} if the input value is valid or not
         */
        isValid: function (val, className) {
            for (var i = EasyValidator.validators.length - 1; i >= 0; i--) {
                var validator = EasyValidator.validators[i];
                if (validator.name != className) continue;
                return !!validator.do(val);
            }
            return true;
        },

        /**
         * Determine if value is null or empty.
         *
         * @param v {*} The value
         * @returns {boolean}
         */
        isEmpty: function (v) {
            return ((v === null) || (v.length === 0));
        }
    };

    /**
     * Define all the default validations
     */
    EasyValidator.addValidations([
        ['required', 'This field is required.',
            function (v) {
                return !EasyValidator.isEmpty(v);
            }
        ],
        ['validate-number', 'Please enter a valid number.',
            function(v) {
                return EasyValidator.isEmpty(v) || (!isNaN(v) && !/^\s+$/.test(v));
            }
        ],
        ['validate-digits', 'Please use numbers only in this field. Avoid spaces or other characters such as dots or commas.',
            function(v) {
                return EasyValidator.isEmpty(v) || !/[^\d]/.test(v);
            }
        ],
        ['validate-currency-dollar', 'Please enter a valid $ amount. For example $100.00.',
            function(v) {
                return EasyValidator.isEmpty(v) || /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/.test(v);
            }
        ],
        ['validate-url', 'Please enter a valid URL.',
            function(v) {
                return EasyValidator.isEmpty(v) || /^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(v);
            }
        ],
        ['validate-email', 'Please enter a valid email address. For example test@example.com.',
            function(v) {
                return EasyValidator.isEmpty(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v);
            }
        ],
        ['validate-date', 'Please use this date format: dd/mm/yyyy. For example 17-03-2006 for the 17th of March, 2006.',
            function(v) {
                if (EasyValidator.isEmpty(v)) return true;
                var regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
                if (!regex.test(v)) return false;
                var d = new Date(v);
                return (parseInt(RegExp.$2, 10) == (1 + d.getMonth())) &&
                    (parseInt(RegExp.$1, 10) == d.getDate()) &&
                    (parseInt(RegExp.$3, 10) == d.getFullYear());
            }
        ],
        ['validate-alphanum', 'Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.',
            function(v) {
                return EasyValidator.isEmpty(v) || !/\W/.test(v);
            }
        ],
        ['validate-alpha', 'Please use letters only (a-z) in this field.',
            function(v) {
                return EasyValidator.isEmpty(v) || /^[a-zA-Z]+$/.test(v);
            }
        ]
    ]);


    /**
     * Create the form listener to setup the validation
     */
    $(document).ready(function () {
        $('.form-field-validation').each(function () {
            var $form = $(this);

            var createInvalidCss = function () {
                $('body').append("<style> .validation-msg { color: red; margin-left: 7px; font-size: 80%; text-align: left; } </style>");
            };

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
                    validateField($(this));
                });
            };

            var addInputValidators = function () {
                $form.find(':input').each(function () {
                    var $input = $(this);
                    $input.change(function (e) {
                        validateField($input);
                    });
                });
            };

            /**
             * Disable the submit button if any errors are present
             */
            var enableOrDisableSubmit = function () {
                $form.change(function (e) {
                    if ($form.find('.has-error').length > 0) {
                        $form.find('[type=submit]').addClass('disabled');
                    } else {
                        $form.find('[type=submit]').removeClass('disabled');
                    }
                });
            };

            /**
             * Validate all fields upon submit
             */
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

            createInvalidCss();
            addInputValidators();
            enableOrDisableSubmit();
            validateFieldsOnSubmit();
        });
    });

})(jQuery);
