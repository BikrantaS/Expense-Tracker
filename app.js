const express=require("express");
const app=express();//using instance of express
const bodyParser=require("body-parser");//to parse through the html page
const fs=require('fs');//file stream library instance

app.set('view engine','ejs');

//parsing the page body with body-parser
app.use(bodyParser.urlencoded({extended:true}));//to find the required values in html tags

//middleware and static file
app.use(express.static("public"));//to call static files in html page

const expenselist=[];//initialising array

//GET request render the root route
app.get('/',(req,res)=>{
  res.render('index',{listTitle:"hookah",expenselist});


});


//POST request to render the root route after processing
app.post('/',(req,res)=>{

  //storing the html attributes in variables
  let date=req.body.date;
  let time=req.body.time;
  let name=req.body.name;
  let description=req.body.description;
  let amount=req.body.amount;

  //creating an object of datas
  data={date:date,time:time,name:name,description:description,amount:amount};

  expenselist.push(data);//inserting the expenselist array
  console.log(expenselist);

  //writing in file
  var t="";
  for (var i=0;i<expenselist.length;i++)
  {
    let a=expenselist[i].date;
    let b=expenselist[i].time;
    let c=expenselist[i].name;
    let d=expenselist[i].description;
    let e=expenselist[i].amount;
    let text=a+" "+b+" "+c+" "+d+" "+e+" "+"\n";
    t=t+text;
    fs.writeFile('./docs/blog1.txt',t,()=>{
      console.log('file was written');
    });
  }

  res.redirect("/");//redirecting to render final result
});


//Download the file
app.get('/download', function(req, res){
  const file = `${__dirname}/docs/blog1.txt`;
  res.download(file); // Set disposition and send it.
});

app.listen(process.env.PORT || 3000);
