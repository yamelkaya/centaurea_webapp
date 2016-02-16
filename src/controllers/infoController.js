var hogan = require('hogan');
var fs = require('fs');
var nodemailer = require('nodemailer');

var InfoController = function () {
};

InfoController.prototype = {
    'coming-soon': function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/page-coming-soon.html',
                pageTitle: 'Revolutionary productivity application is coming soon'
            },
            this._masterPath);
    },

    email: function(){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'hoboutdev@gmail.com',
                pass: process.env.MAIL_PWD
            }
        });

        var from = this.requestData.queryString.useremail;

        var mailOptions = {
            to: 'contact@centaurea.io',
            subject: "app subscriber",
            text: "email: " + from + '\n'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){

                process.stdout.write("Exception occurred when sending email with options: \n");
                process.stdout.write(mailOptions + '\n');
                process.stdout.write(error.toString() + '\n');

            }else{
                console.log('Message sent: ' + info.response + '\n');
            }
        });

        return "redirect-thank-you";
    },

    "thank-you": function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/page-thanks.html',
                pageTitle: 'Thanks for subscription!'
            },
            this._masterPath);
    },

    _masterPath: './public/master/master-without-menu.html',

    _loadPageAndCompile: function (data, masterPath) {
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml = template.render();

        var master = fs.readFileSync(masterPath, 'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }

};

module.exports = InfoController;
