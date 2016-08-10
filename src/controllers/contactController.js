var hogan = require('hogan');
var fs = require('fs');
var nodemailer = require('nodemailer');

var ContactController = function (){
};

ContactController.prototype = {
    email: function(){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'hoboutdev@gmail.com',
                pass: process.env.MAIL_PWD
            }
        });

        var from = this.requestData.queryString.useremail;
        var subject = this.requestData.queryString.mailsubject;
        var text = this.requestData.queryString.messsagebody;

        var mailOptions = {
            to: 'contact@centaurea.io',
            subject: subject,
            text: "email from: " + from + '\n' + text
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){

                process.stdout.write("Exception occurred when sending email with options: \n");
                process.stdout.write(JSON.stringify(mailOptions) + '\n');
                process.stdout.write("Error information: \n");
                process.stdout.write(JSON.stringify(error) + '\n');

            }else{
                console.log('Message sent: ' + info.response + '\n');
            }
        });

        return "redirect-success";

    },

    "thank-you": function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/contact-success.html',
                pageTitle: 'Thanks for contacting us!'
            },
            this._masterWithContactPath);
    },

    _masterPath : './public/master/master.html',
    _masterWithContactPath: './public/master/master-with-contact-footer.html',

    _loadPageAndCompile: function(data,masterPath){
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml= template.render();

        var master = fs.readFileSync(masterPath,'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }
};

module.exports = ContactController;