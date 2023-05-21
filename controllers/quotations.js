const Quote = require('../models/Quotation')

module.exports = {
    getQuotes: async (req,res)=>{
        console.log(req.user)
        try{
            const quoteItems = await Quote.find({userId:req.user.id}).sort({upvote: 'desc'})
            res.render('quotes.ejs', {quotes: quoteItems, user: req.user})
        } catch(err){
            console.log(err)
        }
    },
    createQuote: async (req, res)=>{
        try{
            await Quote.create({name: req.body.quotePerson, quote: req.body.quoteItem, upvote: 0, userId: req.user.id})
            console.log('Quotation has been added!')
            res.redirect('/quotes')
        } catch(err){
            console.log(err)
        }
    },
    addLike: async (req, res)=>{
        try { 
            await Quote.findOneAndUpdate({_id:req.body.quoteIdFromJSFile}, 
                {
                $inc: {
                    upvote: 1
                }
            })
            // await Quote.find(null, {sort: {upvote: "desc"}}, function(err, docs) {})
            await Quote.find().sort({quoteUpvoteFromJSFile: "desc"})

            console.log(Quote.find())
            console.log('Upvote added')
            res.json('Upvote added')
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