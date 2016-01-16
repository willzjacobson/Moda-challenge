var express = require('express');
var router = express.Router();
var request = require('request');


// Amazon product id's (couldn't figure out how to properly query Amazon's database)
var productIds = ['B00DD0B0BM', '0385376715', '0374300216', '0385376715', 'B00MFDNRQO', 'B00F91SCXC', '143914995X', 'B00DC7G0GG', '143914995X', '1885167776', 'B016Q1NTR2', 'B00YI7OR4G', 'B00OOKXTFU', 'B011XO54MA', 'B00DC7G0GG', 'B00DC7G2W8', '0439738199', '0399173927', '1580895255',  '0374300216', '0385376715', '0553538756', 'B00MUY0OFU', 'B00KWG4HG0'];

// Components for uilding query urls
var prepend = 'http://www.amazon.com/gp/gw/ajax/pdb.html?swn=productdb-ajax&sa=%7B%22asins%22%3A+%5B%22';
var append = '%5D%7D';


// For getting one product
router.get('/product/:productId', function(req, res, next) {
	// Build query string for one products
	var url = prepend + req.params.productId + '%22' + append;
	// Query Amazon product database and send response to client
	request(url, function (err, response, body) {
  		if (!err && response.statusCode == 200) {
    		res.json(JSON.parse(body)); 
  		}
	});
});

// For loading 12 initial products, and subsequently fetching more in groups of 3
router.post('/products', function(req, res, next) {
	var start = req.body.start;
	var end = req.body.end;
	// Query Amazon product database and send response to client
	requestProducts(res, start, end);
});

// Queries tha Amazon product database for multiple products
function requestProducts(mainRes, start, end) {
	request(buildQuery(start, end), function (err, res, body) {
  		if (!err && res.statusCode == 200) {
    		mainRes.json(JSON.parse(body)); 
  		}
	});
}

// Builds the query string for multiple products
function buildQuery(start, end) {
	return prepend + encodeURIComponent(productIds.slice(start, end+1).join('","')) + '%22' + append;
}

module.exports = router;
