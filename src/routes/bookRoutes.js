const express = require('express');
const bookRouter= express.Router();
const sql=require('mssql');
const debug=require('debug')('app:bookRoutes');

function router(nav){
  const books=[{title:'ghost hour',author:'boaz'},
              {title:'murder she wrote',author:'bobby'},
              {title:'djumanji',author:'mwangi'},
              {title:'secret',author:'secret squad'},
              {title:'life',author:'ethiopia'},
              {title:'of',author:'bobgitch'},
              {title:'pets',author:'bobmwangi'},
              ];


bookRouter.route('/').get((req,res)=>{
  ((async function query(){
    const request= new sql.Request();
    const {recordset}=  await request.query('select * from books');
    // debug(result);
    res.render('bookListView',{ nav, title: 'GAME OF BOOKS!',books:recordset })
  }()));
/*  request.query('select * from books').then((result)=>{   // ===> using promises
    debug(result);
    res.render('bookListView',{ nav, title: 'GAME OF BOOKS!',books:result.recordset })
  }) */
});
bookRouter.route('/:id').get((req,res)=>{
  (async function query(){
    const {id}=req.params   ;
    const request=new sql.Request();
    const {recordset} = await request.input('id',sql.Int,id).query('select * from books where id= @id');
    res.render('bookView',{ nav, title: 'GAME OF BOOKS!',
      book:recordset[0] })
  }());  
});
return bookRouter;
}

module.exports=router;