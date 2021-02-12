const express=require("express");
const app=express();//using instance of express
const bodyParser=require("body-parser");//to parse through the html page

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
  res.redirect("/");//redirecting to render final result
});

app.listen(3000);
