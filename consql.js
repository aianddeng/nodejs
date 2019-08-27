var config = require('./config'),
    Sequelize = require('sequelize');

// 数据库连接
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
)

// ORM
var Book = sequelize.define('book',{
    id:{
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING(60),
    year: Sequelize.STRING(4),
},{
    timestamps: false
})

// 插入列
var createBook = async () =>{
    var date = Date.now();
    var book = await Book.create({
        title: 'Can you help me'+date,
        year: '2012'
    })
    console.log('created: '+JSON.stringify(book));
}
// 查询列
var getBook = async (title) => {
    var books = await Book.findAll({
        where: {
            title: title || 'My Neighbor Totoro'
        }
    });
    console.log(`find ${books.length} books:`);
    for (let book of books) {
        console.log(JSON.stringify(book));
    }
    return books;
};
var getAllBook = async () => {
    var books = await Book.findAll();
    console.log(`find ${books.length} books:`);
    // for (let book of books) {
    //     console.log(JSON.stringify(book));
    // }
    return books;
}
// 改动列
var updataBook = async () => {
    var books = await getBook('Can you help me');
    for (let book of books){
        book.title = 'Hello world';
        await book.save();
    }
}
// 删除列
var delBook = async () => {
    var books = await getBook('Can you help mes');
    for (let book of books){
        await book.destroy();
    }
}

module.exports = {
    createBook,
    getBook,
    updataBook,
    delBook,
    getAllBook
}