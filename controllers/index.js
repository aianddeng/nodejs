// 首页

var consql = require('../consql');
var fn_index = async (ctx, next) => {
    await ctx.render('index',{
        title:'index',
    })
}

// 登录
var fn_login = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        pass = ctx.request.body.pass || '';
    if(name == 'admin' && pass == '372100'){
        var books = await consql.getAllBook();
        books = books.map((book)=>{
            return book.dataValues;
        })
        await ctx.render('book',{
            name,
            books,
        })
    }else{
        ctx.response.body = `<h3>Wrong user or password.<a href='/'>Please try again.</a></h3>`;
    }
}

module.exports = {
    'GET /': fn_index,
    'POST /login': fn_login
}