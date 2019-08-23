var Koa = require('koa'),
    router = require('koa-router')(),
    bodyParser = require('koa-bodyparser'),
    app = new Koa(),
    rNum = 0;

// 首页
router.get('/', async (ctx, next) => {
    ctx.response.body = `
        <h2>There is Index.</h2>
        <form action="/login" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="pass" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>
    `;
})
// 带参数的get请求
router.get('/user/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h2>Welcome to ${name}'s page.</h2>`;
})
// post请求
router.post('/login', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        pass = ctx.request.body.pass || '';
    if(name == 'admin' && pass == '372100'){
        ctx.response.body = `<h2>Welcome the system, ${name}</h2`;
    }else{
        ctx.response.body = `<h3>Wrong user or password.<a href='/'>Please try again.</a></h3>`;
    }
})
app.use(async (ctx, next) => {
    console.log(`第${++rNum}次请求：Address: ${ctx.url}`);
    console.log(``);
    await next();
})
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`加载耗时：${ms}ms`);
})
app.use(bodyParser());
app.use(router.routes());
app.listen(8888);
console.log('app started at 127.0.0.1:8888');