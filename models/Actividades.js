
const Sequelize = require("sequelize");
const connection = require("../database/database");

const Actividades = connection.define('actividades',{
   idActividades:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
     },  
     info:{
      type:Sequelize.TEXT,
      allowNull:false
   },
   nome:{
      type:Sequelize.STRING,
      allowNull:false
   },
  estado:{
  type:Sequelize.INTEGER,
  allowNull:false,
  default:0
},hora:{
  type:Sequelize.TIME,
  allowNull:false,
  default:'12:00:00'
},
 createdAt:{
  type:Sequelize.DATEONLY,
  allowNull:false
},
updatedAt:{
type:Sequelize.DATEONLY,
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

//Actividades.sync({force:true});
module.exports = Actividades;