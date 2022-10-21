const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile); //11.2k (gzipped: 4.2k)
app.set("view engine", "ejs");

const https = require("https");
const apiKey = "2060316327493904";
const url = "https://www.superheroapi.com/api.php/"+apiKey;
const character_id= 1;

app.get("/",(req, res) =>{ 
    posts = [];
    for (let x = 1; x<= 50; x++){
        https.get(url+"/"+x, (response) => {
            let data = "";
            response
                .on("data", (jdata)=>{
                    data += jdata;
                })
                .on("end", () => {
                    var jsonData = JSON.parse(data);
                    console.log(jsonData);
                    posts.push(
                        jsonData.image.url
                    );  
                    
                    // res.send("ok");
                    res.render("home", {posts: posts });
                    //res.render("details", { heroes:jsonData  });
                    /*
                    res.send();*/
                })
                .on("error",(e)=>{
                   console.log("Error ${e.message}");
                   res.send("Error ${e.message}");
                });   
        });
    }
    
    // /url/npoint //ipoint is a url adress //to configurate it:
    //res.sendFile(__dirname + "/public/html/index.html"); //dirname: refers to the current location of the file
    //posts.push({
        //title: "Superhero-pedia", 
    //});
    //res.render("home", {});
});

app.get("/heroes",(req, res) =>{ // /url/npoint //ipoint is a url adress //to configurate it:
    //res.sendFile(__dirname + "/public/html/index.html"); //dirname: refers to the current location of the file
    posts.push({
        title: "Superhero-pedia", 
    });
    res.render("details", { heroes,  });
});
/*
app.get("/",(req, res) =>{ // /url/npoint //ipoint is a url adress //to configurate it:
    //res.sendFile(__dirname + "/public/html/index.html"); //dirname: refers to the current location of the file
    posts.push({
        title: "Superhero-pedia", 
    });
    res.render("home", {});
});
*/



app.get("/posts/:blogTitle", (req, res) => { //shows the content that I am clicking on
    res.render("post",{ post: posts[0] }); //post is the name of my template, parameters I need to show
});

app.get("/character_id",(req, res) =>{
    https.get(url+"/"+character_id, (response) => {
        let data = "";
        response
            .on("data", (jdata)=>{
                data += jdata;
            })
            .on("end", () => {
                var jsonData = JSON.parse(data);
                console.log(jsonData);
                
               // res.send("ok");
            res.render("details", { heroes:jsonData  });
           /*
            res.send();*/
            })
            .on("error",(e)=>{
            console.log("Error ${e.message}");
            res.send("Error ${e.message}")
        });
        //console.log(response);
    });
    //res.send("Data logged in console");
});
/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000,(err) => {
    console.log("Listening on port 3000")
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
app.get("/",(req, res) =>{ 
    res.sendFile(__dirname + "/public/html/signup.html"); //dirname: refers to the current location of the file
});

app.post("/registry",(req, res) =>{
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    };
    var mailRequest = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            response.on("data", (data) => {
                var jsonResp = JSON.parse(data);
                if(jsonResp["error_count"] === 0) {
                    res.sendFile(__dirname +"/public/html/success.html");
                } else {
                    res.sendFile(__dirname +"/public/html/failure.html");
                    console.log(jsonResp.errors[0]["error_code"]);
                    console.log(jsonResp.errors[0]["error"]);
                }
            }).on("error", (e) => {
                res.sendFile(__dirname +"/public/html/failure.html");
            });
        } else {
            res.sendFile(__dirname +"/public/html/failure.html");
        }
    });
    var jsonData = JSON.stringify(data);
    mailRequest.write(jsonData);
    mailRequest.end();
});

app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});*/