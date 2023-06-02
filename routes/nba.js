const express = require('express');
const router = express.Router();

const news_controller = require('../controllers/newsController');
const player_controller = require('../controllers/playerController');
const team_controller = require('../controllers/teamController');
const crawl_controller = require('../controllers/crawlController');

//前端获取球员数据
router.get('/playerdata', player_controller.playerdata);

//后台功能
router.get('/',player_controller.index);//主页
router.post('/',player_controller.searchTeam);//搜索

router.get('/player/create',player_controller.create_player_get);
router.post('/player/create', player_controller.create_player_post);
router.get('/playerList', player_controller.player_list_get);
router.post('/playerList', player_controller.searchPlayer);
router.get('/player/:id/createGame', player_controller.create_game_get);
router.post('/player/:id/createGame', player_controller.create_game_post);
router.get('/player/:id', player_controller.player_page);
router.get('/player/:id/update', player_controller.player_update_get);
router.post('/player/:id/update', player_controller.player_update_post);
router.get('/player/:id/delete', player_controller.player_delete_get);
router.post('/player/:id/delete', player_controller.player_delete_post);
router.get('/player/:id/update/:game', player_controller.game_update_get);
router.post('/player/:id/update/:game', player_controller.game_update_post);
router.get('/player/:id/delete/:game', player_controller.game_delete_get);
router.post('/player/:id/delete/:game', player_controller.game_delete_post);

//球队板块
router.get('/team/create', team_controller.create_team_get);
router.post('/team/create', team_controller.create_team_post);
router.get('/teamList', team_controller.team_list_get);
router.get('/team/:id', team_controller.team_detail);

//新闻版块
router.get('/news/create', news_controller.create_news_get);
router.post('/news/create', news_controller.create_news_post);
router.get('/newsList', news_controller.news_list_get);

//爬虫板块
router.get('/hupu/create', crawl_controller.hupu_data_get);
router.post('/hupu/create', crawl_controller.hupu_data_post);
router.get('/hupu/:id', crawl_controller.hupu_data_show);
router.post('/hupu/:id', crawl_controller.hupu_data_commit);

router.get('/wallhaven/create', crawl_controller.wallhaven_data_get);
router.post('/wallhaven/create', crawl_controller.wallhaven_data_post);
router.get('/wallhaven/upload', crawl_controller.wallhaven_data_show);
router.post('/wallhaven/upload', crawl_controller.wallhaven_data_commit);

module.exports = router;