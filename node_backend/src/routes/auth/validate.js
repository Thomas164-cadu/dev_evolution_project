const passport = require('../../auth/passport');

function validate() {
    return passport.authenticate('token', {session: false})
}

module.exports = validate