var express = require('express');
var router = express.Router();
var request = require('request');

var config = {
   baseUrl: 'http://api.themoviedb.org/3/',
   imageBase: 'http://image.tmdb.org/t/p/w300',
   imageBaseFull: 'http://image.tmdb.org/t/p/original',
   nowPlayingEP: 'movie/now_playing?',
   bpMovies11: 'discover/movie?with_people=287&primary_release_year=2011&sort_by=vote_average.desc',
   api_key: '&api_key=23be68845111f4be987d7f9ff11c950a'
};

/* GET home page. */
router.get('/', function(req, res, next) {
	request.get(config.baseUrl + config.nowPlayingEP + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		// console.log(typeof(movieData));
		// res.json(movieData);
		res.render('index', { 
			movieData: movieData,
			imageUrl: config.imageBase
		})
	});
  // res.render('index', { title: 'Express' });
});

router.get('/search', (req, res, next)=>{
	res.render('search', {});
})

router.get('/searchMovie', (req, res, next)=>{
	res.send("I'm a get route")
})

router.post('/searchMovie', (req, res, next)=>{
	var searchString = encodeURI(req.body.movieSearch)
	var queryUrl = config.baseUrl + 'search/movie?' + config.api_key + '&query=' + searchString;
	// res.send(queryUrl);
	request.get(queryUrl, (error, response, searchData)=>{
		searchData = JSON.parse(searchData);
		res.render('index',{
			movieData: searchData,
			imageUrl: config.imageBase
		})
	})
})

router.get('/bradPitt', function(req, res, next) {
	request.get(config.baseUrl + config.bpMovies11 + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		res.render('bradPitt', { 
			movieData: movieData,
			imageUrl: config.imageBase
		})
	});
});

module.exports = router;
