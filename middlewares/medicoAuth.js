function medicoAuth(req, res, next){
    if(req.session.medico != undefined){
        
         next();
       
    }else{
        req.session= undefined
        res.redirect("/");
    }
 }
 
 module.exports = medicoAuth