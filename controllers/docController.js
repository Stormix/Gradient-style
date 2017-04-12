module.exports = function(app, cheerio, phantom) {
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/doc', function(req, res) {
        res.render('doc');
    });
    app.get('/about', function(req, res) {
        res.render('about');
    });
    app.get('/fetch', function(req, res) {
        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open('https://uigradients.com/').then(function(status) {
                    console.log("Fetching from https://uigradients.com/ , status: "+status);
                    page.property('content').then(function(content) {
                        var html = content;
                        var $ = cheerio.load(html);
                        var palletes = {};
                        var data = [];
                        $('li[class="palette__item"]').each(function(index, element) {
                            var style = $(element).children('.palette__gradient').attr('style'),
                                name = $(element).children('.palette__gradient').children('.palette__name').text();
                            palletes[name] = style;
                            data.push({
                                name: name,
                                style: style
                            });
                            //return index < 4;
                        });
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        res.write(JSON.stringify(data));
                        res.end();
                        page.close();
                        ph.exit();
                    });
                });
            });
        });
    });
};
