import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"
import fs from 'fs'
import multer from "multer"

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({storage: storage})

// const fs = require('fs');

const app = express()
app.use(cors())
app.use(express.json())
app.use('/image', express.static('uploads'))
dotenv.config()

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Dasun123",
    database: "FriendlySL"
}).promise()

app.get("/",(req,res)=>{
    res.json("Hello this the backend!!")
})

app.get("/lists",async (req,res)=>{

    const notes =await db.query("SELECT * FROM `friendlysl`.`listings`;")
    const row = notes[0]
    res.send(row)

})

app.get("/Categorie",async (req,res)=>{

    const notes =await db.query("SELECT * FROM Categories")
    const row = notes[0]
    res.send(row)

})

// app.post("/Image", async (req, res) => {
//     await db.query("INSERT INTO Img(Data) VALUES (?)",[req.body.image])
// })

// const fs = require('fs')

app.post("/Image", upload.single('image'),async (req, res) => {
    
    try {
        // Check if a file was uploaded
        if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get the uploaded file
        const file = req.file;

        // console.log(file.path)


        // Insert the file path into the database
        // await db.query("INSERT INTO Img(`Data`) VALUES ((?))", [file.path]);
        console.log(file.originalname)
        res.send(file)
        // res.json({ message: 'File uploaded and saved to the database' });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

// app.post("/Image/Upload", async (req, res) => {
//     console.log(req.body)
// })

app.post("/Image/Upload", async (req, res) => {
    try {
    fs.readFile(req.body.Path, (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'File reading error', error: err });
        }

        // Insert file data into the database as a BLOB
        const sql = 'INSERT INTO img (Title, image) VALUES (?, ?)';
        db.query(sql, [req.body.Title, data], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
          }

          // Optionally delete the file from the filesystem after storing it in the database
          fs.unlink(req.body.Path, (err) => {
            if (err) {
              return res.status(500).json({ message: 'File deletion error', error: err });
            }
            // res.json({ message: 'File uploaded and stored in database!', file: req.body.Title });
            res.send(true)
          });
        });
    });

    } catch (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ error: "Error uploading image" });
    }
  });
  

app.get("/Categorie/Name",async (req,res)=>{

    const notes =await db.query("SELECT Name,Category_ID FROM Categories")
    const row = notes[0]
    res.send(row)

})

app.get("/places",async (req,res)=>{

    const notes =await db.query("SELECT * FROM places")
    const row = notes[0]
    res.send(row)

})

app.get("/categorie/:categorie_ID",async (req,res)=>{

    const id = req.params.categorie_ID
    const notes =await db.query(
        `SELECT * FROM categories
        where Category_ID = ?`,[id])
    const [row] = notes[0]
    res.send(row)

})


app.get('/categorie/catImage/:id', async (req, res) => {
    try {
      const imgId = req.params.id;
      const query = 'SELECT Img_ID FROM categories WHERE Category_ID = ?'; 
      const results = await db.query(query, [imgId]);
  
      if (results.length > 0) {
        const imageData = results[0][0].Img_ID; 

        if (imageData) {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(imageData, 'binary');
        } 
        else {
            res.status(404).send('Image data not found');
        }
      } else {
        res.status(404).send('Image not found');
      }

    } catch (error) {
      console.error('Error fetching image data:', error);
      res.status(500).send('Error fetching image data');
    }  
    
  });

app.get('/Image/:id', async (req, res) => {
try {
    const imgId = req.params.id;
    const query = 'SELECT image FROM img WHERE ID = ?'; 
    const results = await db.query(query, [imgId]);

    if (results.length > 0) {
    const imageData = results[0][0].image; 

    if (imageData) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(imageData, 'binary');
    } 
    else {
        res.status(404).send('Image data not found');
    }
    } else {
    res.status(404).send('Image not found');
    }

} catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).send('Error fetching image data');
}  

});
  

app.get("/Categorie/Listings/:Categorie_ID",async (req,res)=>{

    const id = req.params.Categorie_ID
    const notes =await db.query(
        `SELECT * FROM Listings
        where Category_ID = ?`,[id])
    const row = notes[0]
    res.send(row)

})

app.get("/Categorie/:Categorie_ID/:Listing_ID", async (req, res) => {
    
    const L_id = req.params.Listing_ID
    const detail = await db.query(
        `SELECT * FROM listings L 
        LEFT JOIN Places P 
        USING(Place_ID)
        WHERE L.Listing_ID = ?`,[L_id]
    )
    const [row] = detail[0]
    res.send(row)
})

app.get("/Place/:Place_ID", async (res,req) => {

    const P_id = req.params.Place_ID
    const detail = await db.query(
        `SELECT Place
        FROM Places
        WHERE Place_ID = ?`,[P_id]
    )
    const [row] = detail[0]
    res.send(row)

})

app.get("/login/:UName", async (req,res) => {

    const User = req.params.UName;

    const detail =await db.query(`SELECT * FROM permanant_user WHERE User_Name = ?`, [User])

    const [row] = detail[0];
    res.send(row);
})

app.get("/Users", async (req,res) => {
    const detail = await db.query("SELECT User_Name FROM permanant_user")
    const row = detail[0]
    res.send(row)
})

app.get("/userAgents", async (req,res) => {
    const detail = await db.query("SELECT User_ID FROM user_agents")
    const row = detail[0]
    res.send(row)
})

app.get("/Users/:ID", async (req,res) => {
    const ID = req.params.ID
    const detail = await db.query("SELECT * FROM friendlysl.permanant_user WHERE User_ID = ?",[ID])
    const [row] = detail[0]
    res.send(row)
})

app.post("/register/:First/:Last/:Bday/:userName/:Password", async (req,res) => {
    const F_Name = req.params.First;
    const L_Name = req.params.Last;
    const Bday = req.params.Bday;
    const userName = req.params.userName;
    const Password = req.params.Password;
    db.query(
        `
        INSERT INTO permanant_user('First Name','Last Name', 'Birthday','User Level ID','User_Name','Password') 
        VALUES (?,?,?,1,?,?)
        `,[F_Name,L_Name,Bday,userName,Password]);
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8800, ()=>{
    console.log("connected to backend!")
}) 