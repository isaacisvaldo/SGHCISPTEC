const Sequelize = require("sequelize");
const connection = require("../database/database");
const Histor = require('./Historicos') 
const TrasferenciaExterna = connection.define('transferenciaexterna',{
   idTrasferencia:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
         },
      detalheTrasferencia:{
          type:Sequelize.TEXT,
          allowNull:false
       },local:{
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
Histor.hasMany(TrasferenciaExterna,{
   onDelete:'Cascade'  
  });


//TrasferenciaExterna.sync({force:true});
module.exports = TrasferenciaExterna;