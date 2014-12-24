var hogan = require('hogan');
var fs = require('fs');
var data = require('./../model/data');

var BlogController = function (){
};

BlogController.prototype = {

    index: function () {
        var postName = this.requestData.queryString.name;
        if (!postName){
            var blogPosts = data.blog.blogPosts;
            var allCategories = data.blog.getAllCategories();
            return this._loadBlogAndCompile(
                {
                    blogPosts: blogPosts,
                    allCategories : allCategories,
                    pagePath: './public/partials/blog.html',
                    pageTitle: 'Centaurea Blog - MongoDB, Big Data, Cloud services, Apache Kafka'
                },
                this._masterPath);
        }
        else {
            var blogPost = data.blog.findByActionName(postName);
            if (blogPost){
                var linkedBlogPosts = data.blog.loadLinkedPosts(blogPost);
                return this._loadBlogPostAndCompile(
                    {
                        pagePath: './public/partials/blog-post/'+postName+'.html',
                        blogPost: blogPost,
                        linkedBlogPosts:linkedBlogPosts
                    },
                    this._masterPathPost);
            }
            else {
                throw new Error("Blog not found");
            }
        }
    },


    _masterPath : './public/master/master-blog.html',
    _masterPathPost : './public/master/master-blog-post.html',

    _loadBlogPostAndCompile: function(data, masterPath){
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml= template.render();

        var master = fs.readFileSync(masterPath,'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    },

    _loadBlogAndCompile: function(data, masterPath){
        this._loadPostsPreview(data);
        var model = data;

        var master = fs.readFileSync(masterPath,'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    },

    _loadPostsPreview: function(data){
        for (var i in data.blogPosts){
            var post = data.blogPosts[i];
            var file = fs.readFileSync('./public/partials/blog-post-preview/' +post.requestUrl+'.html', 'utf-8');
            var template = hogan.compile(file);
            post.previewHtml = template.render();
        }
    }
};

module.exports = BlogController;
