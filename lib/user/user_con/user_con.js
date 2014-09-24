/*
 * GET customers listing.
 */
var express =require('express');
var app=module.exports=express();

var fs = require('node-fs');

module.exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM user',function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );
     
            res.render('alluser',{title:"User - Node.js",data:rows});
                           
         });
       
    });
  
};


/*Save the customer*/
module.exports.create = function(req,res){
    
  
   // console.log('FIRST TEST: ' + JSON.stringify(req.files));
    //console.log('second TEST: ' +req.files.thumbnail.name);
    
    var input = JSON.parse(JSON.stringify(req.body));
    
     /*var tmp_path = req.files.thumbnail.path;
     
     console.log(input);
     
     console.log(req.files.thumbnail.name);
      var target_path = './images/' + req.files.thumbnail.name;
      
      
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });*/
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            username: input.username,
            password : input.password
         
        
        };
        
        var query = connection.query("INSERT INTO user set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/alluser');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};