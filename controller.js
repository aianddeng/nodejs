var fs = require('fs'),
    router = require('koa-router')();

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`ERROR URL: ${url}`);
        }
    }
}

function addControllers(router,dir) {
    var files = fs.readdirSync(`${__dirname}\\${dir}`)
                .filter(f => {
                    return f.endsWith('.js');
                });
    for (var file of files) {
        console.log(`process controller: ${file}...`);
        let mapping = require(`${__dirname}\\controllers\\${file}`);
        addMapping(router, mapping);
    }
}

module.exports = (dir) => {
    var dir = dir || 'controllers';
    addControllers(router,dir);
    return router.routes();
}