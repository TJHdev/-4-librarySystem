QUnit.test( "It can create libraries with arrays of dependancies", function( assert ) {
    assert.ok( librarySystem('name', [], function() {return 'Gordon';}) === undefined , "Created 'name' library" );
    assert.ok( librarySystem('company', [], function() {return 'Watch and Code';}) === undefined, "Created 'company' library" );
    assert.ok( librarySystem('workBlurb', ['name', 'company'], function(name, company) {return name + ' works at ' + company;}) === undefined, "Created 'workBlurb' library" );
});

QUnit.test( "It can fetch libraries without any dependencies", function( assert ) {
    assert.ok( librarySystem('name') === "Gordon", "Fetched 'name' library" );
    assert.ok( librarySystem('company') === "Watch and Code", "Fetched 'company' library" );
});


QUnit.test( "It can fetch libraries with dependancies", function( assert ) {
    assert.ok( librarySystem('workBlurb') === "Gordon works at Watch and Code", "Fetched 'workBlurb' library" );
});

QUnit.test( "It can fetch libraries with dependencies called in the incorrect sequential order", function( assert ) {

    clearLibraryStorage();
    librarySystem('workBlurb', ['name', 'company'], function(name, company) {
    return name + ' works at ' + company;
    });
    librarySystem('name', [], function() {
    return 'Gordon';
    });
    librarySystem('company', [], function() {
    return 'Watch and Code';
    });


    assert.ok( librarySystem('workBlurb') === "Gordon works at Watch and Code", "Fetched 'workBlurb' library" );
});

QUnit.test( "Callbacks are limited to only running once", function( assert ) {
    clearLibraryStorage();
    var timesCallbackHasRun = 0;
    librarySystem('cat', [], function () {
        timesCallbackHasRun++;
        return 'meow';
    })
    librarySystem('cat');
    librarySystem('cat');

    assert.ok( timesCallbackHasRun === 1, "Callback ran " + timesCallbackHasRun  + " times." );
    
});
