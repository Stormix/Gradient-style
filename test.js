var phantom = require('phantom');

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open('https://uigradients.com/').then(function(status) {
            console.log(status);
            page.property('content').then(function(content) {
                console.log('Scrapped !');
                var cheerio = require("cheerio");
                var html = content;
                var $ = cheerio.load(html);
                var palletes = {};
                $('li[class="palette__item"]').each(function(index, element) {
                    var style = $(element).children(".palette__gradient").attr('style'),
                        name = $(element).children(".palette__gradient").children(".palette__name").text();
                    palletes[name] = style;
                    //return index < 4;
                });
                console.log(palletes);
                page.close();
                ph.exit();
            });
        });
    });
});
