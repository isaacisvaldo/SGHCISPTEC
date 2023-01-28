
const Admin = require('../models/Admin')
const Enfermeiro = require('../models/Enfermeiro')
const Medico = require('../models/Medico')


//Dependencias
const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;
const jwt = require("jsonwebtoken");
//Sercret JWT
const JWTSecret = "djkshahjksdajksdhasISAACISVALDOPIMENTELBUNGA123jkdhasjkdhasjkdhasjkdkkkkklllllbbbnn";
class Conta{ 

 async Autenticar(req,res){
        try {
            var {email, senha} = req.body;
            console.log(email,senha)
            if(email.length !=0 || !( /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))){
                const enfermeiro = await Enfermeiro.findOne({ where: { [Op.or]: [{ email: email }, { username: email }] }}).catch(err => { console.log(err) })
                const admin = await Admin.findOne({ where: { [Op.or]: [{ email: email }, { username: email }] } }).catch(err => { console.log(err) })
                const medico = await Medico.findOne({ where: { [Op.or]: [{ email: email }, { username: email }] } }).catch(err => { console.log(err) })
                if(enfermeiro != undefined){
                    var correct = bcrypt.compareSync(senha, enfermeiro.senha);
                    if(correct){
                     
    
                        req.session.Enfermeiro = {
                            
                            idEnfermeiro: enfermeiro.idEnfermeiro,
                            
                         }
                        res.redirect('/DashboardEnfermeiro')
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/')
                    }
                }else if(admin != undefined){
                    var correct = bcrypt.compareSync(senha, admin.senha);
                    if(correct){
                        req.session.admin = {
                            
                            idAdmin:admin.idAdmin
                            
                         }
                         console.log(admin)
                        res.redirect('/Dashboard')
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/')
                    }
                }else if(medico !=undefined) {
                    var correct = bcrypt.compareSync(senha, medico.senha);
                    if(correct){
                        req.session.medico = {
                            
                            idMedico:medico.idMedico
                            
                         }
                        
                        res.redirect('/DashboardMedico')
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/')
                    }
                }else{
                    req.flash('errado', "e-mail desconhecido") 
                    res.redirect('/')
                }
        
            }else{
                req.flash('errado', "E-mail Incorreto") 
                res.redirect('/')
            }

        } catch (error) {
               req.flash('errado', "Ocorreu um problema") 
                res.redirect('/')
            console.log(error)
        }
    }
    async logout(req,res){
        req.session.admin = undefined;
        req.session.Enfermeiro = undefined;
       res.redirect("/");
    
    }

}
module.exports = new Conta();