function adminAuth(req, res, next){
    if(req.session.admin != undefined){
        
         next();
       
       
    }else if(req.session.Enfermeiro != undefined){
        next()
    }else{
        res.redirect("/");
    }
 }
 
 module.exports = adminAuth