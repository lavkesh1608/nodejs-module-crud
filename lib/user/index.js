var express =require('express');
var bodyParser = require('body-parser');

var lay=require('express-ejs-layouts');


var fs = require('node-fs');

var connection  = require('express-myconnection'); 
var mysql = require('mysql');


//var router = express.Router();

// call our router we just created

var user_cont = require(__dirname +'/user_con/user_con.js');
var app=module.exports=express();
//var locale=require('ejs-locals');
app.use(lay);
app.use(user_cont);

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'nodejs'
    },'request')	
);

app.set('views', __dirname);
app.set('view engine','ejs');
app.set('view options', { layout:'user_layout' });

console.log(__dirname);

//app.set('view options', { layout:'user_layout.ejs' });
//app.use(locale);
app.use('/hi',function(req,res){
	res.send("hi");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.multipart());
//app.use(bodyParser( { keepExtensions: true } ));


app.get('/alluser', user_cont.list);
app.post('/createuser', user_cont.create);

/*app.use('/alluser',function(req,res){
	
	res.render('alluser', { title:'alluser'});
});*/
//app.use(router);



app.use('/newuser',function(req,res){
	
	//if (!ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
	console.trace();
	//res.send("hi");
	res.render('new', { title:'home'});
});

//app.use(express.Router());
