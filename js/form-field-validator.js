
(function($) {
  var FieldValidator = {
    validators: [],
    add: function(name, msg, validatorFunc) {
      FieldValidator.validators.push({name: name, msg: msg, do: validatorFunc});
    },
    addArr: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        FieldValidator.validators.push(arr[i]);
      }
    },
    getValidationMsg: function(val, className) {
      for (var i = FieldValidator.validators.length - 1; i >= 0; i--) {
        var validator = FieldValidator.validators[i];
        if (validator.name != className) continue;
        if (!validator.do(val)) return validator.msg;
        return null;
      }
      return null;
    },
    isValid: function(val, className) {
      for (var i = FieldValidator.validators.length - 1; i >= 0; i--) {
        var validator = FieldValidator.validators[i];
        if (validator.name != className) continue;
        return !!validator.do(val);
      }
      return true;
    },
    isEmpty: function(v) {
      return ((v === null) || (v.length === 0)); // || /^\s+$/.test(v));
    }
  };

  /**
   * Define all the default validations
   */
  FieldValidator.addArr([]);


  /**
   * Create the form listener to setup the validation
   */
  $(document).ready(function() {
    $('.form-field-validation').each(function() {
      var $form = $(this);

      var validateField = function($field) {

      };

      var validateAllFields = function() {
        $form.find(':input').each(function() {
          checkField($(this));
        });
      }

      // Disable the submit button if any errors are present
      $form.change(function(e) {
        if($form.find('.has-error').length > 0) {
          $form.find('[type=submit]').addClass('disabled');
        } else {
          $form.find('[type=submit]').removeClass('disabled');
        }
      });

      // Validate all fields upon submit
      $form.on('submit', function() {
        var $submit = $form.find('[type=submit]');
        validateAllFields();
        if($form.find('.has-error').length > 0) {
          $submit.addClass('disabled');
          return false;
        } else {
          $submit.removeClass('disabled');
          return true;
        }
      });
    });
  };

})(jQuery);
