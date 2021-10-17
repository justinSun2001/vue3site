var ArticleInstance = require('../models/articleinstance')
var  Article= require('../models/article')
var async = require('async')

const { body,validationResult } = require("express-validator");

// Display list of all Instances.
exports.articleinstance_list = function(req, res, next) {

    ArticleInstance.find()
    .populate('')
    .exec(function (err, list_articleinstances) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('articleinstance_list', { title: 'Article Instance List', articleinstance_list:  list_articleinstances});
    })

};

// Display detail page for a specific Instance.
exports.articleinstance_detail = function(req, res, next) {

    ArticleInstance.findById(req.params.id)
    .populate('')
    .exec(function (err, articleinstance) {
      if (err) { return next(err); }
      if (articleinstance==null) { // No results.
          var err = new Error('Article copy not found');
          err.status = 404;
          return next(err);
        }
      // Successful, so render.
      res.render('articleinstance_detail', { title: 'Article:', articleinstance:  articleinstance});
    })

};

// Display Instance create form on GET.
exports.articleinstance_create_get = function(req, res, next) {

    Article.find({},'title')
    .exec(function (err, articles) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('articleinstance_form', {title: 'Create ArticleInstance', article_list:articles } );
    });

};

// Handle Instance create on POST.
exports.articleinstance_create_post = [

    // Validate and sanitize fields.
    body('article', 'article must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Instance object with escaped and trimmed data.
        var articleinstance = new ArticleInstance(
          { article: req.body.article,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Article.find({},'title')
                .exec(function (err, s) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('articleinstance_form', { title: 'Create ArticleInstance', article_list : articles, selected_article : articleinstance.article._id , errors: errors.array(), articleinstance:articleinstance });
            });
            return;
        }
        else {
            // Data from form is valid
            articleinstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(articleinstance.url);
                });
        }
    }
];



// Display Instance delete form on GET.
exports.articleinstance_delete_get = function(req, res, next) {

    ArticleInstance.findById(req.params.id)
    .populate('')
    .exec(function (err, articleinstance) {
        if (err) { return next(err); }
        if (articleinstance==null) { // No results.
            res.redirect('/catalog/articleinstances');
        }
        // Successful, so render.
        res.render('articleinstance_delete', { title: 'Delete ArticleInstance', articleinstance:  articleinstance});
    })

};

// Handle Instance delete on POST.
exports.articleinstance_delete_post = function(req, res, next) {
    
    // Assume valid Instance id in field.
    ArticleInstance.findByIdAndRemove(req.body.id, function deletearticleInstance(err) {
        if (err) { return next(err); }
        // Success, so redirect to list of Instance items.
        res.redirect('/catalog/articleinstances');
        });

};

// Display Instance update form on GET.
exports.articleinstance_update_get = function(req, res, next) {

    // Get , authors and genres for form.
    async.parallel({
        articleinstance: function(callback) {
            ArticleInstance.findById(req.params.id).populate('').exec(callback)
        },
        articles: function(callback) {
            Article.find(callback)
        },

        }, function(err, results) {
            if (err) { return next(err); }
            if (results.articleinstance==null) { // No results.
                var err = new Error('Article copy not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('articleinstance_form', { title: 'Update  ArticleInstance', article_list : results.articles, selected_article : results.articleinstance.article._id, articleinstance:results.articleinstance });
        });

};

// Handle Instance update on POST.
exports.articleinstance_update_post = [

    // Validate and sanitize fields.
    body('article', 'Article must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Instance object with escaped/trimmed data and current id.
        var articleinstance = new ArticleInstance(
          { article: req.body.article,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id
           });

        if (!errors.isEmpty()) {
            // There are errors so render the form again, passing sanitized values and errors.
            Article.find({},'title')
                .exec(function (err, articles) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('articleinstance_form', { title: 'Update ArticleInstance', article_list : articles, selected_article : articleinstance.article._id , errors: errors.array(), articleinstance:articleinstance });
            });
            return;
        }
        else {
            // Data from form is valid.
            ArticleInstance.findByIdAndUpdate(req.params.id, articleinstance, {}, function (err,thearticleinstance) {
                if (err) { return next(err); }
                   // Successful - redirect to detail page.
                   res.redirect(thearticleinstance.url);
                });
        }
    }
];