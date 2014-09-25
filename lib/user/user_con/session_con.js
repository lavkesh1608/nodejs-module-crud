/*
 * GET customers listing.
 */
var express =require('express');


var app=module.exports=express();

var fs = require('node-fs');




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
    console.log("input............."+input);
     
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            username: input.username,
            password : input.password
         
        
        };
        
        var query = connection.query("select * from user where username = ? and  password = ? ",[data.username,data.password], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
              
         var   str;
		 for (i = 0; i < rows.length; i++)
             str = rows[i].username;
        if(rows.length>0){
        	req.session.store = str;
          res.redirect('/alluser');
        }else{
        	req.flash('error', 'Invalid User login');
        	res.redirect('/login');
        }
          
          
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};