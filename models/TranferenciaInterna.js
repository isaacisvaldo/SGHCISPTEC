const Sequelize = require("sequelize");
const connection = require("../database/database");
const Medico = require('./Medico')
const Histor = require('./Historicos') 
const TrasferenciaInterna = connection.define('transferenciainterna',{
   idTrasferencia:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
      detalheTrasferencia:{
          type:Sequelize.TEXT,
          allowNull:false
       },
      estado:{
        type:Sequelize.INTEGER,
        allowNull:false,
        default:0
     },
     horaTrasferencia:{
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
 Medico.hasMany(TrasferenciaInterna,{
   onDelete:'Cascade'  
  });
  TrasferenciaInterna.belongsTo(Histor);

//TrasferenciaInterna.sync({force:true});
module.exports = TrasferenciaInterna;