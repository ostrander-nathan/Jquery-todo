'use strict';
// same file everytime
var FbAPI = (function(oldFirebase) {

    oldFirebase.registerUser = function(credentials) {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then((authData) => {
                    resolve(authData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    oldFirebase.loginUser = function(credentials) {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
                .then((authData) => {
                    resolve(authData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    oldFirebase.credentialsCurrentUser = function() {
        return firebase.auth().currentUser;
    };

    oldFirebase.logoutUser = function() {
        firebase.auth().signOut();
    };


    return oldFirebase;

})(FbAPI || {});
