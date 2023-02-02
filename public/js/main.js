const removeQuote = document.querySelectorAll('.fa-trash')
const insertLike = document.querySelectorAll('.fa-thumbs-up')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(removeQuote).forEach((el)=>{
    el.addEventListener('click', deleteQuote)
})

Array.from(insertLike).forEach((el)=>{
    el.addEventListener('click', addLike)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteQuote(){
    const quoteId = this.parentNode.dataset.id
    console.log(quoteId)
    try{
        const response = await fetch('quotes/deleteQuote', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'quoteIdFromJSFile': quoteId,

            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const quoteName = this.parentNode.childNodes[3].innerHTML
    const quoteQuote = this.parentNode.childNodes[5].innerHTML
    const quoteUpvotes = Number(this.parentNode.childNodes[7].innerHTML)
    const quoteId = this.parentNode.dataset.id
    
    try{
        const response = await fetch('quotes/addLike', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'quoteNameFromJSFile': quoteName,
                'quoteQuoteFromJSFile': quoteQuote,
                'quoteUpvoteFromJSFile': quoteUpvotes,
                'quoteIdFromJSFile': quoteId             
            })
        })     
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}