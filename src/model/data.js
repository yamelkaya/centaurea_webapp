var blogModel = require('./blog');
var BlogRepository = blogModel.BlogRepository;
var BlogPost = blogModel.BlogPost;

var data = {
    blog : new BlogRepository([
        new BlogPost(
            1,
            'Introduction to MongoDB indexing: How MongoDB indexes depend on memory and I/O operations',
            'how-mongodb-indexes-depends-on-ram-and-io-operations',
            new Date(2014,11,18),
            ['MongoDB','Database indexing','NoSQL databases','Database optimization'],
            [2,3]
        ),
        new BlogPost(
            2,
            'Introduction to MongoDB memory allocation and cache management',
            'mongodb-memory-allocation-and-cache-management',
            new Date(2014,11,18),
            ['MongoDB','Database indexing','NoSQL databases','Database optimization'],
            [1,3]
        ),
        new BlogPost(
            3,
            'Dynamic CRM vs. Salesforce: Customization. Part1 - Security model',
            'dynamicscrm-vs-salesforce-customization-security-model',
            new Date(2014,11,24),
            ['Dynamics CRM', 'Salesforce', 'CRM customization', 'Security model'],
            [1,2]
        )
    ])
};

module.exports = data;