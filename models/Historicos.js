const Sequelize = require("sequelize");
const connection = require("../database/database");
const Historico = connection.define('historico',{
   idHistorico:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
      detalheHistorico:{
          type:Sequelize.TEXT,
          allowNull:false
       },
      estadoHistorico:{
        type:Sequelize.INTEGER,
        allowNull:false,
        default:0
     },
     horaHistorico:{
      type:Sequelize.TIME,
      allowNull:false
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

//Historico.sync({force:true});
module.exports = Historico;