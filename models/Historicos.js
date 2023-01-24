const Sequelize = require("sequelize");
const connection = require("../database/database");
const Historico = connection.define('historico',{
   idHistorico:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
         nomePaciente:{
            type:Sequelize.TEXT,
            allowNull:false
         },
         sexoPaciente:{
            type:Sequelize.TEXT,
            allowNull:false
         },
         nascimentoPaciente:{
            type:Sequelize.DATEONLY,
            allowNull:false
         },
         profissaoPaciente:{
            type:Sequelize.TEXT,
            allowNull:false
         },
         enderecoPaciente:{
           
               type:Sequelize.TEXT,
               allowNull:false
           
         },
         provincia:{
            type:Sequelize.STRING,
            allowNull:false
           },municipio:{
            type:Sequelize.STRING,
            allowNull:false
           },
         telefonePaciente:{
            type:Sequelize.INTEGER,
            allowNull:false
         },
         biPaciente:{
            type:Sequelize.TEXT,
            allowNull:false
         },
         alturaPaciente:{
            type:Sequelize.FLOAT,
            allowNull:false
         },
         pesoPaciente:{
            type:Sequelize.FLOAT,
            allowNull:false
         },
         remediosPaciente:{
            type:Sequelize.TEXT,
            allowNull:false
         },
         substToxicaPaciente:{
            type:Sequelize.TEXT,
            allowNull:false
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