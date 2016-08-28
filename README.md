# jQuery-client-side-form-validator 
[![Build Status](https://travis-ci.org/tolis-e/jQuery-client-side-form-validator.png?branch=master)](https://travis-ci.org/tolis-e/jQuery-client-side-form-validator)
> This project contains a lightweight (~1KB minified) jQuery based form validator which:

* Allows validation of text (regular expression based), radio, checkbox and select fields
* Allows to configure regular expressions to be used in validation
* Is based on form specifications which define the form elements to be validated as well as the validation rules

## Sample example

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
	'#correct-email': {
		type: 'text',
		rules: [{
				type: 'notEmpty',
				errMsg: 'Empty text!'
			},{
				type: 'email',
				errMsg: 'Wrong email format!'
			},
		]
	},
	'#checkbox-checked': {
		type: 'checkbox',
		errMsg: 'Not selected checkbox!'
	}
},
successHandler = function (formSpecs) {
	//do something
},
errorHandler = function (failedFormSpecs) {
	//do something
};
// validate form based on passsed form specs
formValidator.validate( formSpecs ).done( successHandler ).fail( errorHandler );
```

### Grunt
> [Grunt](http://gruntjs.com/) is used as the build tool which requires [Node.js](http://nodejs.org/) version >= 0.8.0. Please refer to [nodejs.org](http://nodejs.org) for details regarding installing Node.js. Please refer to Grunt's [getting started](http://gruntjs.com/getting-started) guide for details regarding installing Grunt.

### Installing Build Dependencies
To install the dependencies of the project, navigate to the project's root folder and run the following command:

    $ npm install

This will install the versions of the dependencies declared in package.json. This is only required to be done once before building the first time, or if the dependencies in package.json have been updated.

### Building the project

    $ grunt

The produced JavaScript files will be inside the __dist__ directory.