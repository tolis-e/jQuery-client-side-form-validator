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

})( jQuery );
