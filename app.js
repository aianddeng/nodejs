// 引入文件
var Koa = require('koa'),
    app = new Koa(),
    path = require('path'),
    bodyParser = require('koa-bodyparser'),
    nunjucks = require('koa-nunjucks-2'),
    static = require('koa-static'),
    controller = require('./controller'),
    consql = require('./consql'),
    consocket = require('./consocket');

// 请求开始
var rNum = 0;
app.use(async (ctx, next) => {
    console.log(`第${++rNum}次请求：Address: ${ctx.url}`);
    await next();
})

// 请求结束
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`加载耗时：${ms}ms`);
})

// 解析请求体 - POST
app.use(bodyParser());

// 加载静态文件
app.use(static(
    path.join(__dirname, './static')
))

// 数据库
consql.getAllBook();

// 模板引擎
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, './views'),
    nunjucksConfig: {
        trimBlocks: true,
        noCache: true,
    }
}))

// 导入router并执行
app.use(controller());

// 监听端口
var server = app.listen(8888);

consocket(server);

console.log('app started at 127.0.0.1:8888');