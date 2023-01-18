
const Enfermeiro = require('../models/Enfermeiro')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const Op = require('sequelize').Op;

const axios = require("axios");


class EnfermeiroController {
    
    
 async index(req, res) {
        try {
         
           
            res.render('inicio/index',{certo:req.flash('certo'),errado:req.flash('errado'),info:req.flash('info')})
            
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}
 async login(req, res) {
        try {
          res.render('Site/login',{errado:req.flash('errado'),certo:req.flash('certo')})
            
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}


 async Cliente(req, res) {
        try {
            const token = req.session.cliente.token
          res.render('Cliente/index',{errado:req.flash('errado'),certo:req.flash('certo'),token})
            
        } catch (error) {
            res.json({ erro: "Ocorreu um problema" });
            console.log(error)
        }
}
    async NovoCliente(req, res) {
        try {
 
            const { nome, email, telefone, username, senha, senha2, nif } = req.body;
            console.log(nome, email, telefone, username, senha, senha2, nif);
            if (nome.length < 5) {
                
                res.json({erro:'Nome demasiado Curto'})

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                
                res.json({erro:' user nao pode ter letra Maiscula'})
               
            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))
             
               res.json({erro:'User nao pode ter espaço'})
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
               
               res.json({erro:'e-mail Incorrreto'})
            } else if (senha.length < 8) {
                
               res.json({erro:'Senha muito fraca'})
            } else if (senha != senha2) {
                
               res.json({erro:'Senha Diferentes'})
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefone))) {
               
               res.json({erro:'Numero de Telefone incorreto'})

            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
              
               res.json({erro:'NIF incorreto'})
            } else {
                const cliente = await Cliente.findAll({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                const admin = await Admin.findAll({ where: { [Op.or]: [{ email: email }, { username: username }, { telefone: telefone }] } }).catch(err => { console.log(err) })
                console.log(cliente.length)
                console.log(admin.length)
                if (cliente.length < 1) {
                    if (admin.length < 1) {
                        const image = (req.file) ? req.file.filename : 'user.png';
                        
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const cliente = await Cliente.create({acesso:0, image, nome, email, telefone, username, senha: hash, nif, estado: 1 }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                        
                        res.json({certo:'Conta criado com sucesso'})
                       
                    } else {
                        
                       res.json({erro:'Dados ja Cadastrado'})
                    }

                } else {
                    
                   res.json({erro:'Dados ja Cadastrado'})
                }
            }


        } catch (error) {
           
           res.json({erro:'Houve um problema'})
        }
}
async Feedbak(req, res) {
    try {
        const { comentario}= req.body
      res.render('Cliente/index',{errado:req.flash('errado'),certo:req.flash('certo'),token})
        
    } catch (error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }
}

    async EditarCliente(req, res) {
        try {
            const { nome, email, telefone, username, senha, senha2, nif, idCliente } = req.body;
            const telefonel = isNaN(telefone)
            if (nome.length < 5) {
                req.flash('errado', "Nome demasiado Curto");
                res.json({ err: "Falha interna 1" });

            } else if ((/[A-Z]/.test(username))) {
                console.log((/[A-Z]/.test(username)))
                req.flash('errado', " user nao pode ter letra Maiscula");
                res.json({ err: "Falha interna 2" });
            } else if ((/\s/g.test(username))) {
                console.log((/\s/g.test(username)))
                req.flash('errado', "User nao pode ter espaço");
                res.json({ err: "Falha interna 33" });
            } else if (!(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))) {
                req.flash('errado', "nao cadastrado");
                res.json({ err: "Falha interna 3" });
            } else if (!(/^[9]{1}[0-9]{8}$/.test(telefonel))) {
                req.flash('info', "Numero de Telefone incorreto");
                res.json({ err: "Falha interna 6" });
            } else if (!(/^[0-9]{9}[A-Z]{2}[0-9]{3}$/.test(nif))) {
                req.flash('info', "NIF incorreto");
                res.json({ err: "Falha interna 7" });
            } else {
                const image = (req.file) ? req.file.filename : 'user.png';
                if (senha != "") {
                    if (senha.length < 8) {
                        req.flash('errado', "Senha muito fraca");
                        res.json({ err: "Falha interna 4" });
                    } else if (senha != senha2) {
                        req.flash('errado', "Senha Diferentes");
                        res.json({ err: "Falha interna 5" });
                    } else {


                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(senha, salt);
                        const cliente = await Cliente.update({ image, nome, email, telefone: telefonel, username, senha: hash, nif }, { where: { idCliente: idCliente} }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                        res.json({ certo: "A sua conta foi Editada !" });
                        console.log(cliente)
                    }
                } else {

                    const cliente = await Cliente.update({ image, nome, email, telefone: telefonel, username, nif }, { where: { idCliente: idCliente} }).catch(err => { console.log(err); req.flash('info', "Occoreeu um problema") });
                    res.json({ certo: "A sua conta foi Editada !" });
                    console.log(cliente)



                }

            }


        } catch (error) {
            res.json({ errado: "Houve um problema interno !" });
            console.log(error)
        }
    }
    //Pesquisas 
    async findOneCliente(req, res) {
        try {
          const {idCliente}  = req.params
          const cliente = await Cliente.findOne({where:{idCliente:idCliente}}).catch(err => { console.log(err) })
   
        res.json({cliente})
              
        } catch (error) {
            res.send("Ocorreu um problema")
            console.log(error)
        }
    }
   


}
module.exports = new EnfermeiroController();