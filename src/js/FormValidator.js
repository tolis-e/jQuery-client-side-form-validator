(function(global) {

    /**
     FormValidator is used to validate client side forms. It receives as input an object containing regular expressions which can be used to validate 'text' fields. It can also validate 'radio', 'checkbox' and 'select' elements. The library depends on jQuery.
     @status Experimental
     @memberOf app.util
     @constructor
     @param {Object} [settings={}] - the settings to configure the validator
     @param {Object} [settings.regex] - the regular expressions used to validate text based elements
     @returns {Object} The created form validator instance
     @example
     // example without using new
     var formValidator = app.util.FormValidator({
        regex: {
            numeric: /^[0-9]+$/,
            notEmpty: /\S+/
        }
     });

     // example using new
     var formValidator = new app.util.FormValidator({
        regex: {
            numeric: /^[0-9]+$/,
            notEmpty: /\S+/
        }
     });
     */
    function FormValidator(settings) {
        if (!(this instanceof FormValidator)) {
            return new FormValidator(settings);
        }

        settings = settings || {};

        this.getSettings = function() {
            return settings;
        };
    }

    /**
     Validates the passed specifications. All form specifications defining the validation rules, must have unique element selectors as property names e.g #email-field. Specification referring to text fields must contain the 'type' and 'rules' properties. The type property must have value equal to 'text'. The 'rules' property is an array of validation rules and each validation rule consists of 'type' and 'errMsg' properties. The type property should match the name of a regex property name set in the FormValidator constructor. In cases of checkboxes and radio buttons validation the 'rules' property is not used. 'type' and 'errMsg' properties are used instead. The 'type' property must have value equal to 'radio' in case of radio buttons and 'checkbox' in case of checkboxes. In case of select boxes the type property must have value equal to 'select'. Additionally, the specification must contain the 'defaultValue' property which defines the default value of the select box so that the library can understand whether the value has been changed or not. A detailed example can be found below, as well as inside the integration tests file. 
     @param {Object} [specs={}] - the specifications to be validated
     @returns {Object} A jQuery Promise having as promise value the whole spec object in case of successful validation or the failed specs otherwise.
     @example
     var formValidator = app.util.FormValidator({
                    regex: {
                        numeric: /^[0-9]+$/,
                        notEmpty: /\S+/
                    }
                });
     var specs = {
        '#postcode': {
            type: 'text',
            rules: [{
                    type: 'notEmpty',
                    errMsg: 'Empty text!'
                },{
                    type: 'numeric',
                    errMsg: 'Wrong numeric format!'
                },
            ]
        },
        '.streetNumber': {
            type: 'text',
            rules: [{
                type: 'numeric',
                errMsg: 'Wrong street number'
            }]
        },
        '.text-area': {
            type: 'text',
            rule: [{
                type: 'notEmpty',
                errMsg: 'Empty text!'
            }]
        },
        '.customer-type': {
            type: 'radio',
            errMsg: 'Not selected radio button!'
        },
        '.terms-of-use': {
            type: 'checkbox',
            errMsg: 'Not selected checkbox!'
        },
        '.gender': {
            type: 'select',
            defaultValue: 'test',
            errMsg: 'Not selected selectbox!'
        }
     };

     var promise = formValidator.validate( specs );

     */
    FormValidator.prototype.validate = function(specs) {
        specs = specs || {};

        var self = this,
            deferred = $.Deferred(),
            failedRules = [],
            $element, spec, rules,
            _isValidText = function(val, type) {
                var regex = self.getSettings().regex[type];
                return val && regex && regex.test(val);
            },
            _reportFailedSpec = function(selector, errorMsg) {
                failedRules.push({
                    selector: selector,
                    errMsg: errorMsg
                });
            };

        Object
            .keys(specs)
            .forEach(function(elementSelector) {
                $element = $(elementSelector);
                spec = specs[elementSelector];
                if ($element.length) {
                    if (spec.type === 'text' && spec.rules.length > 0) {
                        $(spec.rules).each(function(index, rule) {
                            if (!(_isValidText($element.val(), rule.type))) {
                                _reportFailedSpec(elementSelector, rule.errMsg);
                                return false;
                            }
                        });
                    } else if (spec.type === 'checkbox' || spec.type === 'radio') {
                        if (!($element.is(':checked'))) {
                            _reportFailedSpec(elementSelector, spec.errMsg);
                        }
                    } else if (spec.type === 'select') {
                        if ($element.val() === spec.defaultValue) {
                            _reportFailedSpec(elementSelector, spec.errMsg);
                        }
                    }
                }
            });

        if (failedRules.length) {
            deferred.reject(failedRules);
        } else {
            deferred.resolve(specs);
        }

        return deferred.promise();
    };

    global.app = global.app || {};
    global.app.util = global.app.util || {};
    global.app.util.FormValidator = FormValidator;

})(window);