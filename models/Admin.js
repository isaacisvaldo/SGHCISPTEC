
const Sequelize = require("sequelize");
const connection = require("../database/database");

const Admin = connection.define('admin',{
   idAdmin:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
     },  
   nome:{
          type:Sequelize.STRING,
          allowNull:false
       },
       email:{
        type:Sequelize.STRING,
        allowNull:false
     },
     telefone:{
        type:Sequelize.INTEGER,
        allowNull:false
     },
     username:{
        type:Sequelize.STRING,
        allowNull:false
     },
     image:{
        type:Sequelize.STRING,
        allowNull:false
     },
     senha:{
        type:Sequelize.STRING,
        allowNull:false
     },nif:{
      type:Sequelize.STRING,
      allowNull:false
   },
   role:{
      type:Sequelize.INTEGER,
      allowNull:false,
      default:0
      },
   
     createdAt:{
      type:Sequelize.DATEONLY,
      allowNull:false
   },
   updatedAt:{
    type:Sequelize.DATEONLY,
    allowNull:false
 }
});

//Admin.sync({force:true});
module.exports = Admin;