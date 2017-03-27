/**
 * VStore session class
 * A userinfo object is required to instantiate the class
 */
window.VStore = function() {
    this.access_token = false;
    this.user         = false;

    this.setToken    = function(access_token){
        this.access_token = access_token;
    };

    this.setUser      = function(user){
        this.user = user;
    };
};

VStore.prototype.hasUserLoggedIn = function() {
    return (
            typeof this.user !== false &&
            typeof this.access_token === 'string' &&
            this.access_token.length > 10
        );
};