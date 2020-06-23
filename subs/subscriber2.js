const express = require('express');
const redis = require('redis');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const publicacao = require('./Publicacao')

const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const subscriber = redis.createClient();

var lista = []
var patterns = []

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

subscriber.on("message", function (channel, message) {
    publicacao.add(channel, message,new Date().getHours(),new Date().getMinutes(), new Date().getSeconds())
});

subscriber.on("pmessage", function (pattern, channel, message) {
    publicacao.add(channel + ` (pattern : ${pattern})`, message,new Date().getHours(),new Date().getMinutes(), new Date().getSeconds())
})

app.get('/', (req, res) => {
    res.render("subs", { publicacao: publicacao.listar(), lista: lista, patterns: patterns })
})

app.post('/', (req, res) => {
    subscriber.subscribe(req.body.canal)
    if (lista.indexOf(req.body.canal) === -1)
        lista.push(req.body.canal)
    res.redirect('/')
})

app.post('/pattern', (req, res) => {
    subscriber.psubscribe(req.body.pattern)
    if (patterns.indexOf(req.body.pattern) === -1)
        patterns.push(req.body.pattern)
    res.redirect('/')
})

app.get('/delete/:channel', (req, res) => {
    subscriber.unsubscribe(req.params.channel)
    lista.splice(lista.indexOf(req.params.channel), 1);
    res.redirect('/')
})

app.get('/pdelete/:pattern', (req, res) => {
    subscriber.punsubscribe(req.query.pattern)
    patterns.splice(patterns.indexOf(req.params.pattern), 1);
    res.redirect('/')
})

app.use(express.static(__dirname + "public"))

app.listen(4000, () => {
    console.log(`servidor na PORT 4001`);
})