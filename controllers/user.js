// 带参数的get请求
// router.get('/user/:name', 
var fn_user = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h2>Welcome to ${name}'s page.</h2>`;
}

module.exports = {
    'GET /user/:name': fn_user
}