import express from 'express';

const router = express.Router();
import db from '../database';

express.static('public');
express.static(__dirname + 'public/css');

/* GET users listing. */
router.get('/adlogin', function(req, res) {
  res.render('admin_login.ejs');
});

router.post('/adlogin', function(req, res){
    const emailAddress = req.body.email_address;
    const password = req.body.password;

    if(emailAddress === 'admin@cseds.co' && password === 'admin') {
        req.session.isAdmin = true;
        res.redirect('/adminDashboard');
        return;
    }

    const sql='SELECT * FROM registration WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data) {
        if(err) throw err
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/addCandidate');
        }else{
            res.render('admin_login.ejs',{alertMsg:"Your Email Address or password is wrong"});
        }
    })

})

module.exports = router;

