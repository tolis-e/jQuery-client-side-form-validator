(function( $ ) {

    QUnit.module( "FormValidator Instantiation" );

    QUnit.test( "Create empty validator without 'new' keyword", function( assert  ) {
        assert.expect( 2 );

        var formValidator = app.util.FormValidator();

        assert.ok( formValidator, "FormValidator exists" );
        assert.deepEqual( formValidator.getSettings(), {}, "Settings are empty" );
    });

    QUnit.test( "Create empty validator with 'new' keyword", function( assert  ) {
        assert.expect( 2 );
        // create validator using new keyword
        var formValidator = new app.util.FormValidator();

        assert.ok( formValidator, "FormValidator exists" );
        assert.deepEqual( formValidator.getSettings(), {}, "Settings are empty" );
    });

    QUnit.test( "Create validator with regex and without 'new' keyword", function( assert  ) {
        assert.expect( 3 );

        var settings = {
            regex: {
                email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
                numeric: /^[0-9]+$/
            }
        },
        formValidator = app.util.FormValidator( settings );

        assert.ok( formValidator, "FormValidator exists" );
        assert.deepEqual( formValidator.getSettings(), settings, "Settings are applied" );
        assert.deepEqual( formValidator.getSettings().regex, settings.regex, "Regex are applied" );
    });

    QUnit.test( "Create validator with regex and 'new' keyword", function( assert  ) {
        assert.expect( 3 );

        var settings = {
            regex: {
                email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
                numeric: /^[0-9]+$/
            }
        },
        formValidator = new app.util.FormValidator( settings );

        assert.ok( formValidator, "FormValidator exists" );
        assert.deepEqual( formValidator.getSettings(), settings, "Settings are applied" );
        assert.deepEqual( formValidator.getSettings().regex, settings.regex, "Regex are applied" );
    });

    QUnit.module( "FormValidator Validation" );

    QUnit.test( "Validate prototype function exists", function( assert  ) {
        assert.expect( 1 );

        var formValidator = new app.util.FormValidator();

        assert.equal( typeof formValidator.validate, "function", "Validate prototype function exists" );
    });

    QUnit.test( "Validate with errors", function( assert  ) {
        assert.expect( 8 );

        var settings = {
            regex: {
                email: /^[\w-]+([^@,\s<\>\(\)]*[\w-]+)?\@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i,
                notEmpty: /\S+/
            }
        },
        formValidator = new app.util.FormValidator( settings ),
        //describes form validation specifications 
        formSpecs = {
            '#empty-email': {
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
            '#wrong-email': {
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
            },
            '#checkbox-unchecked': {
                type: 'checkbox',
                errMsg: 'Not selected checkbox!'
            },
            'input[name=radio-button-test]': {
                type: 'radio',
                errMsg: 'Not selected radio!'
            },
            'input[name=radio-button-test]:not(:eq(1))': {
                type: 'radio',
                errMsg: 'Not selected radio!'
            },
            '#selectbox-option-selected': {
                type: 'select',
                defaultValue: 'default',
                errMsg: 'Not selected selectbox!'
            },
            '#selectbox-default-selected': {
                type: 'select',
                defaultValue: 'default',
                errMsg: 'Not selected selectbox!'
            }
        },
        specsWhichShouldBeReportedAsFailed = ['#empty-email', '#wrong-email', '#checkbox-unchecked', 'input[name=radio-button-test]:not(:eq(1))', '#selectbox-default-selected'],
        specSelectorExistsInArray = function (selector, specsArray) {
            return $.grep(specsArray, function (e) { return e.selector === selector; } ).length === 1;
        },
        errorHandler = function (failedSpecs) {
            assert.ok(true, 'Error handler called');
            assert.ok(failedSpecs, "validation errors exist");
            assert.equal(failedSpecs.length, 5, 'number of reported errors');
            for (var spec, i=0; i<specsWhichShouldBeReportedAsFailed.length; i++) {
                spec = specsWhichShouldBeReportedAsFailed[i];
                assert.ok(specSelectorExistsInArray(spec, failedSpecs), spec + ' failed spec reported');
            }
        };
        formValidator.validate( formSpecs ).fail( errorHandler );
    });

    QUnit.test( "Successful validation", function( assert  ) {
        assert.expect( 2 );

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
        specsWhichShouldBeReportedAsPassed = ['#correct-email', '#checkbox-checked'],
        successHandler = function (passedSpecs) {
            assert.ok(true, 'Success handler called');
            assert.deepEqual(passedSpecs, formSpecs, 'Successful specs reported');
        };
        formValidator.validate( formSpecs ).done( successHandler );
    });

})( jQuery );
