var express = require('express');

var router = express.Router();
var db=require('../database');
var app = express();
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login-form.ejs');
});

router.post('/login', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;

    if(emailAddress === 'test@cseds.co' && password === 'test') {
        req.session.loggedinUser= true;
        req.session.emailAddress= emailAddress;
        res.redirect('/'); // Redirect to home page or dashboard
    } else {
        var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
        db.query(sql, [emailAddress, password], function (err, data, fields) {
            if(err) throw err
            if(data.length>0){
                req.session.loggedinUser= true;
                req.session.emailAddress= emailAddress;
                res.redirect('/'); // Redirect to home page or dashboard
            } else {
                res.send('Incorrect Email and/or Password!');
            }
        });
    }
});

module.exports = router;

