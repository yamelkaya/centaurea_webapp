var hogan = require('hogan');
var fs = require('fs');
var nodemailer = require('nodemailer');

var HomeController = function (){
};

HomeController.prototype = {

    index: function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/index.html',
                pageTitle: 'Centaurea - Software Development, IT Consulting, Managed Services',
                pageDescription: 'Centaureа is a software development and consulting company ' +
                'that specialized in construction of high-load, scalable, distributed and Big Data processing systems.',
                pageKeywords: 'solution development, software development, application development, cloud solutions' +
                'it consulting, technology consulting, database consulting, mongodb consulting, big data consulting, cloud consulting'+
                'corporate training, it training, dedicated team, managed service, virtual cto'
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
                process.stdout.write(mailOptions + '\n');
                process.stdout.write(error.toString() + '\n');

            }else{
                console.log('Message sent: ' + info.response + '\n');
            }
        });

        return "redirect-success";

    },

    'contact-success': function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/contact-success.html',
                pageTitle: 'Thanks for contacting us!'
            },
            this._masterPath);
    },

    _masterPath : './public/master/master.html',

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

module.exports = HomeController;