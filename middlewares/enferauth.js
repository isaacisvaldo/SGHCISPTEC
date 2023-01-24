function enferauth(req, res, next){
    if(req.session.Enfermeiro != undefined){
        
         next();
       
    }else{
        req.session= undefined
        res.redirect("/");
    }
 }
 
 module.exports = enferauth