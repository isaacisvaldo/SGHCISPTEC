
const Admin = require('../models/Admin')
const Enfermeiro = require('../models/Enfermeiro')


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
                if(enfermeiro != undefined){
                    var correct = bcrypt.compareSync(senha, enfermeiro.senha);
                    if(correct){
                     
    
                      jwt.sign({idEnfermeiro: enfermeiro.idEnfermeiro, email: enfermeiro.email,acesso:0},JWTSecret,{expiresIn:'48h'}, async (err, token) => {
                            if(err){
                                res.status(400);
                                req.flash('errado', "Erro ao Gerar Token") 
                                res.redirect('/')
                            }else{
                               console.log(enfermeiro) 
                                req.session.Enfermeiro = {
                                    token:token,
                                    idEnfermeiro: enfermeiro.idEnfermeiro,
                                    
                                 }
                                res.redirect('/DashboardEnfermeiro')
                               
                               
                            }
                        })
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/')
                    }
                }else if(admin != undefined){
                    var correct = bcrypt.compareSync(senha, admin.senha);
                    if(correct){
                        jwt.sign({idAdmin: admin.idAdmin, email: admin.email,acesso:1},JWTSecret,{expiresIn:'48h'},(err, token) => {
                            if(err){
                                res.status(400);
                                res.json({err:"Falha interna"});
                            }else{
                                req.session.admin = {
                                    token:token,
                                    idAdmin:admin.idAdmin
                                    
                                 }
                                 console.log(admin)
                                res.redirect('/Dashboard')
                                
                            }
                        })
                    }else{
                        req.flash('errado', "Credencias Inválida") 
                        res.redirect('/')
                    }
                }else {
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