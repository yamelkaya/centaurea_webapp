var _ = require("./../infrastructure/jsUtilHelper");

function BlogPost(id,title,requestUrl,date,catgories,linkedPosts){
    this.id = id;
    this.title = title;
    this.requestUrl = requestUrl
    this.date = date;
    var day = date.getDate(),
        month = date.getMonth()+1,
        year = date.getFullYear();
    this.dateString = (day>9 ? day : '0'+day) + '.' + (month>9? month: '0' + month) + '.' + year;
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

BlogRepository.prototype.getPostsOrderedByDate = function(){
    return _.sortBy(this.blogPosts,'date').reverse();
}

module.exports = {
    BlogPost: BlogPost,
    BlogRepository: BlogRepository
};

