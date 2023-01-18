const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Trasferencia = require('./TranferenciaInterna')
const RelatorioM = connection.define('relatorioM',{
   idRelatorioM:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
      info:{
          type:Sequelize.TEXT,
          allowNull:false
       },
     estado:{
      type:Sequelize.INTEGER,
      allowNull:false,
      default:0
   },hora:{
      type:Sequelize.TIME,
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
RelatorioM.belongsTo(Trasferencia);

//RelatorioM.sync({force:true});
module.exports = RelatorioM;