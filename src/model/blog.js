var _ = require("./../infrastructure/jsUtilHelper");

function BlogPost(id,title,requestUrl,date,catgories,linkedPosts){
    this.id = id;
    this.title = title;
    this.requestUrl = requestUrl
    this.date = date;
    this.dateString = date.getDate() + '.' + (date.getMonth()+1)+'.' + date.getFullYear();
    this.categories = catgories;
    this.linkedPosts = linkedPosts;
}


function BlogRepository(blogPosts){
    this.blogPosts = blogPosts;
}

BlogRepository.prototype.findByActionName = function (actionName){
    return _.find(this.blogPosts,function(blogPost){return blogPost.requestUrl == actionName;});
}

BlogRepository.prototype.loadLinkedPosts = function(blogPost){
    if (blogPost && blogPost.linkedPosts){
        return _.filter(this.blogPosts, function(post){
            return _.contains(blogPost.linkedPosts,post.id);
        })
    }
}

BlogRepository.prototype.getAllCategories = function(){
    return _.uniq(_.flatten(this.blogPosts, 'categories'));
}

module.exports = {
    BlogPost: BlogPost,
    BlogRepository: BlogRepository
};

