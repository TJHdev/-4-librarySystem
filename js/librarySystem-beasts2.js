(function(){
    var libraryStorage = {};
    
    // clears the libraryStorage variable for testing purposes
    function clearLibraryStorage(){
        libraryStorage = {};
        return 'libraryStorage cleared';
    }
    
    function librarySystem(libraryName, dependencies, callback) {
        if(arguments.length > 1){
    
            //Creating a new library
            libraryStorage[libraryName] = {};
            libraryStorage[libraryName].cb = callback;
            libraryStorage[libraryName].dependencies = dependencies;
            libraryStorage[libraryName].hasBeenInvoked = false;
        } else {
            //Fetch an existing library
            var returnedLibrary = libraryStorage[libraryName];
            

            //if the library has dependencies, invoke them and store the results back into an array.
            if(returnedLibrary.dependencies[0]){
                var storedDependancies = returnedLibrary.dependencies;
                var arrayOfDependencyResults = storedDependancies.map(function(elem){
                    return librarySystem(elem);
                });
            }
    
            //prevents dependancies callbacks being invoked multiple times.
            if(!returnedLibrary.hasBeenInvoked){
                returnedLibrary.hasBeenInvoked = true;
                returnedLibrary.invokedCBresult = returnedLibrary.cb.apply(this, arrayOfDependencyResults);
            } 

            return returnedLibrary.invokedCBresult;
        }
    }

window.librarySystem = librarySystem;
window.clearLibraryStorage = clearLibraryStorage;
})();


