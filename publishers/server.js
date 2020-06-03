const express = require('express');
const redis = require('redis');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const app = express();
const publicacao = require('./Publicacao')

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const publisher = redis.createClient();


app.get('/',(req,res) => {
    res.render("pub",{mensagens: publicacao.listar()})
})

app.get('/channels',(req,res) => {
    publisher.pubsub("channels", (err, channels) => {
        if(err){
            res.send(err)
        }else{
            res.render("channels",{channels: channels})
        }
    })
})

app.post('/',(req, res) => {
    publicacao.add(req.body.canal, req.body.publicacao)
    publisher.publish(req.body.canal, req.body.publicacao)
    res.redirect("/")
})

app.get('/limpar',(req,res) => {
    publicacao.limpar()
    res.redirect('/')
})

app.use(express.static(__dirname + "public"))

app.listen(3000,() => {
    console.log(`servidor na PORT 3000`);
})