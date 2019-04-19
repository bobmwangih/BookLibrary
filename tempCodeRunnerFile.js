var express=require('express');

var app=express();

app.get('/',function(req,res){
    res.send('All my guys are ballers');
})

app.listen(3000,function(){
    console.log('listening to port:3000');
});
