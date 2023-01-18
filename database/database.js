const Sequelize = require("sequelize");

const connection = new Sequelize('historico_clinico','root','Isvaldo123',{
    host:'localhost',
    dialect:'mysql',
    timezone:"+01:00"
});





module.exports = connection;