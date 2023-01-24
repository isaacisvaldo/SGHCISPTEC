const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Historico = require('./Historicos')
const Enfermeiro = require ('./Enfermeiro')
const RelatorioE = connection.define('relatorioE',{
   idRelatorioE:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
      info:{
          type:Sequelize.TEXT,
          allowNull:false
       },
       consultasRealizadas:{
         type:Sequelize.TEXT,
         allowNull:false
      },
      tratamentoRealizadas:{
         type:Sequelize.TEXT,
         allowNull:false
      },
      diagnosticoFeito:{
         type:Sequelize.TEXT,
         allowNull:false
      },
      suspeitaClinica:{
         type:Sequelize.TEXT,
         allowNull:false
      },
      internacoes:{
         type:Sequelize.TEXT,
         allowNull:false
      },
       hora:{
         type:Sequelize.TIME,
         allowNull:false,
         default:0
      },
     estado:{
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

RelatorioE.belongsTo(Enfermeiro);
RelatorioE.belongsTo(Historico);

//RelatorioE.sync({force:true});
module.exports = RelatorioE;