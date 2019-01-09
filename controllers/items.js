module.exports = (app) => {
    const Background = require('../models/background')
    const Text = require('../models/text')
    
    app.get("/sign-up", (req, res) => {
        res.render("sign-up");
    });


    app.get('/item-create', (req, res) => {
        res.render('item-create');
    })

    app.get('/inventory', (req, res) => {
        Background.find({}).then((background) => {
            Text.find({}).then((text) => {
                res.render('inventory',{text: text, background: background});

            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err);
        })
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