const i18n = require('i18n');

module.exports = app => {

    i18n.configure({
        locales:['en'],
        directory: __dirname+'/locales',
        defaultLocale: 'en',
        cookie: 'lang',
        objectNotation: true
    });

    app.use(i18n.init);

    return true;

};



