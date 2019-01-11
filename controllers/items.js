const Background = require('../models/background')
const Text = require('../models/text')
module.exports = (app) => {



    app.get('/inventory', (req, res) => {
        var currentUser = req.user;
        if(currentUser){
            Background.find({owner: currentUser._id}).then((background) => {
                Text.find({owner: currentUser._id}).then((text) => {
                    res.render('inventory',{text: text, background: background, user: currentUser});

                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            res.redirect('/login')
        }
    })

    app.get('/text/:id/delete', (req, res) => {
        Text.findById(req.params.id).then((text) => {
            console.log(text)
            res.render('item-delete', {type:'text',item: text, user: currentUser})

        }).catch((err) => {
            console.log(err);
        })
    })

    app.get('/background/:id/delete', (req, res) => {
        Background.findById(req.params.id).then((background) => {
            console.log(background)
            res.render('item-delete', {type:'background',item: background, user: currentUser})

        }).catch((err) => {
            console.log(err);
        })
    })

    app.delete('/text/:id', (req, res) => {
        Text.findByIdAndDelete(req.params.id).then((text) => {
            console.log(text);
            res.redirect('/inventory')
        }).catch((err) => {
            console.log(err);
        })
    })

    app.delete('/background/:id', (req, res) => {
        Background.findByIdAndDelete(req.params.id).then((background) => {
            console.log(background);
            res.redirect('/inventory')
        }).catch((err) => {
            console.log(err);
        })
    })

}