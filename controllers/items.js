const Background = require('../models/background')
const Text = require('../models/text')
module.exports = (app) => {





    app.get('/item-create', (req, res) => {
        const currentUser = req.user;
        res.render('item-create', {user: currentUser});
    })

    app.get('/inventory', (req, res) => {
        var currentUser = req.user;
        if(currentUser){
            Background.find({owner: currentUser._id}).then((background) => {
                Text.find({owner: currentUser._id}).then((text) => {
                    if(currentUser._id == '5c37800631c58920057eafa0'){
                        res.render('inventory',{text: text, background: background, admin: true});
                    }
                    else{
                        res.render('inventory',{text: text, background: background, admin: false});

                    }

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
            res.render('item-delete', {type:'text',item: text})

        }).catch((err) => {
            console.log(err);
        })
    })

    app.get('/background/:id/delete', (req, res) => {
        Background.findById(req.params.id).then((background) => {
            console.log(background)
            res.render('item-delete', {type:'background',item: background})

        }).catch((err) => {
            console.log(err);
        })
    })

    app.post('/background', (req, res) => {
        Background.create(req.body).then((background) => {
            console.log(background);
            res.redirect('/inventory')
        }).catch((err) => {
            console.log(err);
        })
    })

    app.post('/text', (req, res) => {
        Text.create(req.body).then((text) => {
            console.log(text);
            res.redirect('/inventory')
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