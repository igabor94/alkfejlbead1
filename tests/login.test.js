var Browser = require('zombie');

Browser.localhost(process.env.IP, process.env.PORT);

describe('User visits new error page', function (argument) {

    var browser = new Browser();
    
    before(function() {
        return browser.visit('/todos/new');
    });
    
    it('should go to the authentication page', function () {
        browser.assert.redirected();
        browser.assert.success();
        browser.assert.url({ pathname: '/login' });
    });
    
    it('should be able to login with correct credentials', function (done) {
        browser
            .fill('forename', 'admin')
            .fill('password', 'admin')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/todos/list' });
                done();
            });
    });
    
    it('should be able to logout', function (done) {
        browser
            .clickLink('Kilépés',function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/' });
                done();
            });
    });
    
    it('should go to the login page', function (done) {
        browser
            .clickLink('Bejelentkezés',function () {
                browser.assert.success();
                browser.assert.url({ pathname: '/login' });
                done();
            });
    });
    
    it('should not be able to login with uncorrect credentials', function (done) {
        browser
            .fill('forename', 'aadmin')
            .fill('password', 'admin')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/login' });
                done();
            });
    });
    
    it('should be able to login with correct credentials', function (done) {
        browser
            .fill('forename', 'admin')
            .fill('password', 'admin')
            .pressButton('button[type=submit]')
            .then(function () {
                browser.assert.redirected();
                browser.assert.success();
                browser.assert.url({ pathname: '/todos/list' });
                done();
            });
    });
});