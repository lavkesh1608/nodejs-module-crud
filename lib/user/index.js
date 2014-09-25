var express =require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressSession = require('express-session');

//var lay=require('express-ejs-layouts');

 var flash = require('express-flash');


var connection  = require('express-myconnection'); 

var mysql = require('mysql');

var SessionStore = require('express-mysql-session');

var user_cont = require(__dirname +'/user_con/user_con.js');

var session_cont = require(__dirname +'/user_con/session_con.js');

var app=module.exports=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'nodejs'
    },'request')	
);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'nodejs'
};

var fs = require('node-fs');



app.use(expressSession({secret:'somesecrettokenhere',
						store: new SessionStore(options),// connect-mongo session store
					    proxy: true,
					    resave: true,
					    saveUninitialized: true		

						}
));

//var router = express.Router();

// call our router we just created


//var locale=require('ejs-locals');

//app.use(express.session()); 

app.use(express.static(path.join(__dirname, '/public')));

app.use(flash());

//app.use(lay);
app.use(user_cont);
app.use(session_cont);
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname);
app.set('view engine','ejs');
//app.set('view options', { layout:'user_layout' });


/*app.use(function(req, res, next){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  var err = req.session.error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    , msg = req.session.success;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  delete req.session.error;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  delete req.session.success;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  res.locals.message = '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
});*/          




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
function restrict(req, res, next) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  if (req.session.store) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    next();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  } else {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    req.session.error = 'Access denied!';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    res.redirect('/login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get('/userhome', restrict, function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.get('/logout', function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  // destroy the user's session to log them out                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  // will be re-created next request                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    res.redirect('/login');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
});    

app.use('/login', function(req, res){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  res.render('login',{title :'Login', session:req.session });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
});              



console.log(__dirname);

//app.set('view options', { layout:'user_layout.ejs' });
//app.use(locale);
app.use('/hi',function(req,res){
	res.send("hi");
});


//app.use(express.multipart());
//app.use(bodyParser( { keepExtensions: true } ));


app.get('/alluser', restrict, user_cont.list);
app.post('/createuser', user_cont.create);

app.post('/dologin', session_cont.create); 
/*app.use('/alluser',function(req,res){
	
	res.render('alluser', { title:'alluser'});
});*/
//app.use(router);



app.use('/newuser',restrict,function(req,res){
	
	//if (!ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
	console.trace();
	//res.send("hi");
	res.render('new', { title:'home', session: req.session});
});

//app.use(express.Router());
