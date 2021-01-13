const { NotExtended } = require("http-errors")

module.exports = function(res, req, next) {
    if (req.body.title.length < 3) {
        let alert = true;
        res.redirect('/', {alert});
    }
    next();
}