var  Article = require('../models/article');
var Author = require('../models/author');
var Genre = require('../models/genre');
var ArticleInstance = require('../models/articleinstance');

const { body,validationResult } = require("express-validator");

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        article_count: function(callback) {
            Article.countDocuments({},callback);
        },
        article_instance_count: function(callback) {
            ArticleInstance.countDocuments({},callback);
        },
        article_instance_available_count: function(callback) {
            ArticleInstance.countDocuments({status:'Available'},callback);
        },
        author_count: function(callback) {
            Author.countDocuments({},callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({},callback);
        },
    }, function(err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

//主页的json数据
exports.indexData = function(req, res) {

    async.parallel({
        article_count: function(callback) {
            Article.countDocuments({},callback);
        },
        article_instance_count: function(callback) {
            ArticleInstance.countDocuments({},callback);
        },
        article_instance_available_count: function(callback) {
            ArticleInstance.countDocuments({status:'Available'},callback);
        },
        author_count: function(callback) {
            Author.countDocuments({},callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({},callback);
        },
    }, function(err, results) {
        res.json(results);
    });
};

// Display list of all s.
exports.article_list = function(req, res, next) {

    Article.find({}, 'title author')
    .populate('author').exec(function (err, list_articles) {
      if (err) {return next(err)} 
      else {
            // Successful, so render
            res.render('article_list', { title: ' List', article_list:  list_articles});
        }
    });
};

//页面的json数据
exports.article_listData = function(req, res, next) {

    Article.find({}, 'title author')
      .populate('author').exec(function (err, list_articles) {
        if (err) {return next(err)} 
        else {
              res.json(list_articles);
          }
      });
  };

// Display detail page for a specific .
exports.article_detail = function(req, res, next) {

    async.parallel({
        article: function(callback) {

            Article.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        article_instance: function(callback) {

            ArticleInstance.find({ 'article': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.article==null) { // No results.
            var err = new Error('Article not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('article_detail', { title: results.article.title, article: results.article, article_instances: results.article_instance } );
    });

};


//获取detail的json数据

exports.article_detailData = function(req, res, next) {

    async.parallel({
        article: function(callback) {

            Article.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        article_instance: function(callback) {

            ArticleInstance.find({ '': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.article==null) { // No results.
            var err = new Error('Article not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.json(results);
    });

};

// Display  create form on GET.
exports.article_create_get = function(req, res, next) {

    // Get all authors and genres, which we can use for adding to our .
    async.parallel({
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('article_create_form', { title: 'Create Article',authors:results.authors, genres:results.genres, article:results.article});
    });

};

// Handle  create on POST.
exports.article_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined')
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },

    // Validate and sanitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('date', 'Date must not be empty').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a  object with escaped and trimmed data.
        var article = new Article(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            text: req.body.text,
            date: req.body.date,
            genre: req.body.genre
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                authors: function(callback) {
                    Author.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (article.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('article_form', { title: 'Create Article',authors:results.authors, genres:results.genres, article: article, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Save .
            article.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new  record.
                   res.redirect(article.url);
                });
        }
    }
];



// Display  delete form on GET.
exports.article_delete_get = function(req, res, next) {

    async.parallel({
        article: function(callback) {
            Article.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        article_instances: function(callback) {
            ArticleInstance.find({ 'article': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.article==null) { // No results.
            res.redirect('/catalog/articles');
        }
        // Successful, so render.
        res.render('article_delete', { title: 'Delete Article', article: results.article, article_instances: results.article_instances } );
    });

};

// Handle  delete on POST.
exports.article_delete_post = function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).

    async.parallel({
        article: function(callback) {
            Article.findById(req.body.id).populate('author').populate('genre').exec(callback);
        },
        article_instances: function(callback) {
            ArticleInstance.find({ 'article': req.body.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.article_instances.length > 0) {
            //  has _instances. Render in same way as for GET route.
            res.render('article_delete', { title: 'Delete Article', article: results.article, article_instances: results.article_instances } );
            return;
        }
        else {
            //  has no Instance objects. Delete object and redirect to the list of s.
            Article.findByIdAndRemove(req.body.id, function deleteArticle(err) {
                if (err) { return next(err); }
                // Success - got to s list.
                res.redirect('/catalog/articles');
            });

        }
    });

};

// Display  update form on GET.
exports.article_update_get = function(req, res, next) {

    // Get , authors and genres for form.
    async.parallel({
        article: function(callback) {
            Article.findById(req.params.id).populate('author').populate('genre').exec(callback);
        },
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.article==null) { // No results.
                var err = new Error('Article not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            // Mark our selected genres as checked.
            for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
                for (var article_g_iter = 0; article_g_iter < results.article.genre.length; article_g_iter++) {
                    if (results.genres[all_g_iter]._id.toString()===results.article.genre[article_g_iter]._id.toString()) {
                        results.genres[all_g_iter].checked='true';
                    }
                }
            }
            res.render('article_form', { title: 'Update Article', authors:results.authors, genres:results.genres, article: results.article });
        });

};


// Handle  update on POST.
exports.article_update_post = [

    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre==='undefined')
            req.body.genre=[];
            else
            req.body.genre=new Array(req.body.genre);
        }
        next();
    },
   
    // Validate and santitize fields.
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a  object with escaped/trimmed data and old id.
        var  article= new Article(
          { title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            text: req.body.text,
            date: req.body.date,
            genre: (typeof req.body.genre==='undefined') ? [] : req.body.genre,
            _id:req.params.id // This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form
            async.parallel({
                authors: function(callback) {
                    Author.find(callback);
                },
                genres: function(callback) {
                    Genre.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if (article.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked='true';
                    }
                }
                res.render('article_form', { title: 'Update Article',authors:results.authors, genres:results.genres, article: article, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Article.findByIdAndUpdate(req.params.id, article, {}, function (err,thearticle) {
                if (err) { return next(err); }
                   // Successful - redirect to  detail page.
                   res.redirect(thearticle.url);
                });
        }
    }
];