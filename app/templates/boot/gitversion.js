const git = require('git-rev-sync');

module.exports = app => {

    app.use((req, res, next) => {
        try {
            res.locals.gitversion = git.long();
        }
        catch(e) { 
            // console.log(e); 
        }
        
        next();
    });

    return true;

};

