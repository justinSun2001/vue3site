var express = require('express');
var router = express.Router();

// Require our controllers.
var article_controller = require('../controllers/articleController'); 
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
// var article_instance_controller = require('../controllers/articleinstanceController');


///  ROUTES ///

// GET catalog home page.
router.get('/', article_controller.index);  

router.get('/data', article_controller.indexData);  
// GET request for creating a . NOTE This must come before routes that display  (uses id).
router.get('/article/create', article_controller.article_create_get);

// POST request for creating .
router.post('/article/create', article_controller.article_create_post);

// GET request to delete .
router.get('/article/:id/delete', article_controller.article_delete_get);

// POST request to delete .
router.post('/article/:id/delete', article_controller.article_delete_post);

// GET request to update .
router.get('/article/:id/update', article_controller.article_update_get);

// POST request to update .
router.post('/article/:id/update', article_controller.article_update_post);

// GET request for one .
router.get('/article/:id', article_controller.article_detail);


router.get('/articlesData/:id', article_controller.article_detailData);
// GET request for list of all .
router.get('/articles', article_controller.article_list);

router.get('/articlesData', article_controller.article_listData);
/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);


/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

// POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genre.
router.get('/genres', genre_controller.genre_list);


/// INSTANCE ROUTES ///

// GET request for creating a Instance. NOTE This must come before route that displays Instance (uses id).
// router.get('/articleinstance/create', article_instance_controller.articleinstance_create_get);

// // POST request for creating Instance.
// router.post('/articleinstance/create', article_instance_controller.articleinstance_create_post);

// // GET request to delete Instance.
// router.get('/articleinstance/:id/delete', article_instance_controller.articleinstance_delete_get);

// // POST request to delete Instance.
// router.post('/articleinstance/:id/delete', article_instance_controller.articleinstance_delete_post);

// // GET request to update Instance.
// router.get('/articleinstance/:id/update', article_instance_controller.articleinstance_update_get);

// // POST request to update Instance.
// router.post('/articleinstance/:id/update', article_instance_controller.articleinstance_update_post);

// // GET request for one Instance.
// router.get('/articleinstance/:id', article_instance_controller.articleinstance_detail);

// // GET request for list of all Instance.
// router.get('/articleinstances', article_instance_controller.articleinstance_list);


module.exports = router;