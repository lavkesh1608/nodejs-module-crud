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
     
            res.render('alluser',{title:"User - Node.js",data:rows,session: req.session});
                           
         });
       
    });
  
};
module.exports.search_user = function(req, res){
	
	console.log("Request recieve");
	
  req.getConnection(function(err,connection){
  	
        var query = req.body.query;
        console.log(query);
     connection.query('SELECT * FROM user where username like ?', '%' + query + '%', function(err,rows)     {
            
        if(err)
           console.log("Error Selecting : %s ",err );           
           
         	 /* res.writeHead(200, {'Content-Type': 'text/javascript'});
     		
     	      var data = '';
     	     
		      req.addListener('data', function (rows) {
		          // removed this - eval("(" + chunk + ")");
		           data = JSON.parse(rows);    
		          console.log(data[0].username);
		      });
		      
		      res.addListener('end', function() {
		          console.log('end triggered');
		          res.write("Post data:"+data);
		          res.end();
		      });
		      
		      */
		      res.writeHead('200', { "Content-Type": "application/json" });
             // res.send(rows);
              res.end(JSON.stringify(rows));  
           // res.send({data:rows});
                           
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
         
          req.flash('info', 'User Added Successfully');
          res.redirect('/alluser');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

module.exports.uplaod = function(req,res){
    
  
   // console.log('FIRST TEST: ' + JSON.stringify(req.files));
    //console.log('second TEST: ' +req.files.thumbnail.name);
    
    var input = req.body;
    
    var tmp_path = req.files.thumbnail.path;
     
     console.log(input);
     console.log("tmp_path**************************"+tmp_path);
     
     console.log(req.files.thumbnail.name);
     var base = process.env.PWD;
     
     var file_name=req.files.thumbnail.name;
      var target_path = base+'/lib/user/images/' + file_name ;
      
     // path.join(__dirname, '../..');
      console.log("Target Path**************************"+target_path);
      
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
        	
            if (err) throw err;
            
               req.getConnection(function (err, connection) {
        
        var data = {
            
            username : input.username,
            password : input.password,
         	image_name:file_name
        
        };
        
        var query = connection.query("INSERT INTO user set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          req.flash('info', 'User Added Successfully');
          res.redirect('/alluser');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
          //  res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
    
 
};

module.exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM user WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_user',{title:"Edit User - Node.js",data:rows,session:req.session});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

module.exports.save_edit = function(req,res){
    
    var input = req.body;
    
    
    var id = req.params.id;
    
    if(req.files.thumbnail.name!=''){
    	
		    var tmp_path = req.files.thumbnail.path;
		     
		     console.log(input);
		     console.log("tmp_path**************************"+tmp_path);
		     
		     console.log(req.files.thumbnail.name);
		     var base = process.env.PWD;
		     
		     var file_name=req.files.thumbnail.name;
		      var target_path = base+'/lib/user/images/' + file_name ;
		      
		     // path.join(__dirname, '../..');
		      console.log("Target Path**************************"+target_path);
		      
		      fs.rename(tmp_path, target_path, function(err) {
		        if (err) throw err;
		        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		        fs.unlink(tmp_path, function() {
		        	
				            if (err) throw err;
				            
				      
				    
		  	  });
			});
	}
	
	 req.getConnection(function (err, connection) {
		        
				       var data = {
				            
				            username : input.username,
				            password : input.password,
				         	image_name:file_name
				        
				        };
				        
				        connection.query("UPDATE user set ? WHERE id = ? ",[data,id], function(err, rows)
				        {
				  
				          if (err)
				              console.log("Error Updating : %s ",err );
				         
				         req.flash('info', 'User Update Successfully');
				          res.redirect('/alluser');
				          
				        });
		        
		         });
	
}; 


module.exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM user  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
            req.flash('info', 'User Deleted Successfully');
             res.redirect('/alluser');
             
        });
        
     });
};