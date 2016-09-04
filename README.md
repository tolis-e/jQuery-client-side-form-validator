# jQuery-client-side-form-validator 
[![Build Status](https://travis-ci.org/tolis-e/jQuery-client-side-form-validator.png?branch=master)](https://travis-ci.org/tolis-e/jQuery-client-side-form-validator)
> This project contains a lightweight (~1KB minified) jQuery based form validator which:

* Allows validation of text (regular expression based), radio, checkbox and select fields
* Allows to configure regular expressions to be used in validation
* Is based on form specifications which define the form elements to be validated as well as the validation rules

## Supported features

* Regular expression based text fields validation
* Radio buttons validation
* Checkbox fields validation
* Select fields validation
* Configuration of regular expressions to be used in validation
* jQuery element selectors based validation

## How it works

### Step 1

> Define the regular expressions needed to validate your text fields and create a validator instance which will be used to validate forms.

```js
var settings = {
        regex: {
            email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
            notEmpty: /\S+/
        }
    },
    // create a form validator instance while passing the regular expressions to be used
    formValidator = new app.util.FormValidator( settings );
```
> Alternatively, you can create a validator instance without using the ‘new’ keyword.

```js
var settings = {
        regex: {
            email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
            notEmpty: /\S+/
        }
    },
    // create a form validator instance without using 'new'
    formValidator = app.util.FormValidator( settings );
```

### Step 2

> Create the form validation specs object. Specs describe your validation rules and specify the elements to be validated. All form specifications must have unique element selectors as property names e.g #email-field.

#### Text Field Specs

> Specification referring to text fields must contain the ‘type’ and ‘rules’ properties. The ‘type’ property must have value equal to ‘text’. The ‘rules’ property is an array of validation rules and each validation rule consists of ‘type’ and ‘errMsg’ properties. The rules ‘type’ property should match the name of a regex property set in the FormValidator constructor.

```js
'#email-field': {
    type: 'text',
    rules: [{
            type: 'notEmpty',
            errMsg: 'Empty text!'
        },{
            type: 'email',
            errMsg: 'Wrong email format!'
        }
    ]
}
```

#### Checkbox & Radio button Field specs

> The ‘rules’ property is not used. ‘type’ and ‘errMsg’ properties are used instead. The ‘type’ property must have value equal to ‘radio’ when validating radio buttons and ‘checkbox’ to validate checkboxes.

```js
'input[name=radio-button-gender]:not(:eq(1))': {
    type: 'radio',
    errMsg: 'Not selected radio!'
},
'#checkbox-terms': {
    type: 'checkbox',
    errMsg: 'Not selected checkbox!'
}
```

#### Select Field specs

> The ‘type’ property must have value equal to ‘select’. Additionally, the specification must contain the ‘defaultValue’ property which defines the default value of the select box so that the library can understand whether the default value has been changed or not.

```js
'#selectbox-car': {
    type: 'select',
    defaultValue: 'default',
    errMsg: 'Not selected selectbox!'
}
```

### Step 3

> Validate your form. The ‘validate’ function’s return object is a [jQuery promise](https://api.jquery.com/promise/). This means that you can use its fluent API.

```js
var jQueryPromise = formValidator.validate( formSpecs );
```

### Sample Example

```js
// validator regular experssions needed to validate text fields
var settings = {
		regex: {
			email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
			notEmpty: /\S+/
		}
	},
	formValidator = new app.util.FormValidator( settings ),
	//describes form validation specifications
	formSpecs = {
		'#register-email': {
			type: 'text',
			rules: [{
					type: 'notEmpty',
					errMsg: 'Empty text!'
				},{
					type: 'email',
					errMsg: 'Wrong email format!'
				}
			]
		},
		'#register-terms': {
			type: 'checkbox',
			errMsg: 'Not selected checkbox!'
		},
		'input[name=radio-button-gender]:not(:eq(0))': {
            type: 'radio',
            errMsg: 'Not selected gender!'
        }
	},
	successHandler = function ( formSpecs ) {
		//do something
	},
	errorHandler = function ( failedFormSpecs ) {
		//do something
	};
	
// validate form based on passsed form specs
formValidator.validate( formSpecs ).done( successHandler ).fail( errorHandler );
```

## How to build

### Grunt
> [Grunt](http://gruntjs.com/) is used as the build tool which requires [Node.js](http://nodejs.org/) version >= 0.8.0. Please refer to [nodejs.org](http://nodejs.org) for details regarding installing Node.js. Please refer to Grunt's [getting started](http://gruntjs.com/getting-started) guide for details regarding installing Grunt.

### Installing Build Dependencies
To install the dependencies of the project, navigate to the project's root folder and run the following command:

    $ npm install

This will install the versions of the dependencies declared in package.json. This is only required to be done once before building the first time, or if the dependencies in package.json have been updated.

### Building the project

    $ grunt

The produced JavaScript files will be inside the __dist__ directory.

### Documentation

After building the project, the README & API documentation will be produced inside the __docs__ folder.