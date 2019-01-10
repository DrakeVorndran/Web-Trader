const backgrounds = require("../items/backgrounds")
const texts = require("../items/text_colors")
const Background = require('../models/background')
const Text = require('../models/text')
const models = {backgrounds: Background, text_colors: Text};
module.exports = (app) => {
    app.get('/catalog', (req, res) => {
        res.render('catalog', {backgrounds: backgrounds, texts: texts})
    })

    app.get('/crate/:crate', (req, res) => {
        const currentUser = req.user;
        if(currentUser){
            const items = require(`../items/${req.params.crate}`)
            const item = items[Math.floor(Math.random()*items.length)]
            models[req.params.crate].create({name: item.name, value: item.value, owner: currentUser._id}).then((newItem) => {
                res.render('crate', {item: newItem})
            }).catch((err) => {
                console.log(err)
            })
        }
        else{
            res.redirect('/login')
        }
    })
}