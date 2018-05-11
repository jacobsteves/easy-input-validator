# Easy Validator
A jQuery module that validates form fields. You can create your own validations with validator functions, or you can use the ones that are built in.

## Prerequisities
- Jquery >= 1.11.1

## Installation
### Cloning the File
1. Clone this repository or simply download either `js/easy-validator.js` or `js/easy-validator.min.js`.
    - Note: `easy-validator.min.js` is a minified version of `js/easy-validator.js`. This means that it is a smaller file. If you want to update the scripts contents, then copy `js/easy-validator.js`. Otherwise, download the minified version.
2. Include the file in your project
```html
<script src="your/path/to/easy-validator.min.js"></script>
```

### Using Alternative Hosting
If you do not want to clone the file, the file is also hosted on my website. To import the script using this hosting, include this within your project:

```html
<script src="http://jacobsteves.ca/software/easy-validator/js/easy-validator.min.js"></script>
```

## Usage
You must simply add the validation name to the class of the input you want to validate.

### Custom Validations
![Custom Validation Demo](demo/images/selectDemo.gif)

```html
<script>
    EasyValidator.add("validate-selection", "That is impossible.", function(val) {
        return val !== "Other";
    })
</script>
```

You can create custom validations by using the easy-validator api. 

#### API
| EasyValidator Method | Parameters |
|----------------------|------------|
| add(name, message, func) | <b>name</b>: The class name that the validation affects. <br> <b>message</b>: The message to be displayed if the input is invalid. <br> <b>func</b>: The validation function. Takes in one parameter - the value of the input. |
| addValidations(arr)  | <b>arr</b>: Array of validations to be added to the validator. |
| getValidationMsg(val, name)  | <b>val</b>: Input value to be validated. <br> <b>name</b>: Validation class name to be validating. <br><br> <b>RETURNS</b>: NULL - if the val is valid. <br> <b>RETURNS</b>: String - the validation message if val is invalid. |
| isValid(val, name)  | <b>val</b>: Input value to be validated. <br> <b>name</b>: Validation class name to be validating. <br><br> <b>RETURNS</b>: Boolean - if the val is valid against the validation. |
| isEmpty(val)  | <b>val</b>: Input value to be determined if empty. <br><br> <b>RETURNS</b>: Boolean - if the val is empty. |

### Built-in Validations
| Validation           | Validates            | Message            |
|----------------------|----------------------|--------------------|
| required             | Any field.           | This field is required. |
| validate-number      | Float only fields.   | Please enter a valid number. |
| validate-digits      | Integer only fields. | Please use numbers only in this field. Avoid spaces or other characters such as dots or commas. |
| validate-currency-dollar | Dollar only fields. | Please enter a valid $ amount. For example $100.00. |
| validate-url             | Url only fields. | Please enter a valid URL. |
| validate-email           | Email only fields. | Please enter a valid email address. For example test@example.com. |
| validate-date            | Date only fields.  | Please use this date format: dd/mm/yyyy. For example 17-03-2006 for the 17th of March, 2006. |
| validate-alphanum        | Alphanumeric fields. | Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.|
| validate-alpha           | Letters only field.           | Please use letters only (a-z) in this field. |

## Demo
Click [here](http://jacobsteves.ca/easy-validator) for a live demo.

![Demo gif](demo/images/signupPage.png)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jacobsteves/easy-validator/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
