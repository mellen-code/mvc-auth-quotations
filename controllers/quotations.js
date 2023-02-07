const Quote = require('../models/Quotation')

module.exports = {
    getQuotes: async (req,res)=>{
        console.log(req.user)
        try{
            const quoteItems = await Quote.find({userId:req.user.id})
            const quotesLeft = await Quote.countDocuments({userId:req.user.id,completed: false})
            res.render('quotes.ejs', {quotes: quoteItems, left: quotesLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createQuote: async (req, res)=>{
        try{
            await Quote.create({name: req.body.quotePerson, quote: req.body.quoteItem, upvote: 0, userId: req.user.id})
            console.log('Quotation has been added!')
            res.redirect('/quotes')
        }catch(err){
            console.log(err)
        }
    },
    addLike: async (req, res)=>{
        try { 
            await Quote.updateOne({_id:req.body.quoteIdFromJSFile, upvote: req.body.quoteUpvoteFromJSFile}, 
                {
                $set: {
                    upvote: req.body.quoteUpvoteFromJSFile + 1
                }
            }, {
                sort: {upvote: -1},
                upsert: true
            })
            console.log('Upvote added')
            res.json('Upvote added')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    removeQuote: async (req, res)=>{
        console.log(req.body.quoteIdFromJSFile)
        try{
            await Quote.findOneAndDelete({_id:req.body.quoteIdFromJSFile})
            console.log('Deleted Quotation')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    