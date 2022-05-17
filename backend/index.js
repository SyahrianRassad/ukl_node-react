const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res)=>{
    res.send({
        message: "Tersambung"
    })
})

app.use("/spp", require("./router"))

const port = 1104;
app.listen(port, ()=> console.log(`App running ${port}`))
