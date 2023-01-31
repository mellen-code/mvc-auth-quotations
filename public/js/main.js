const removeQuote = document.querySelectorAll('.fa-trash')
// const quoteItem = document.querySelectorAll()
const todoComplete = document.querySelectorAll('span.completed')

Array.from(removeQuote).forEach((el)=>{
    el.addEventListener('click', deleteQuote)
})

// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

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

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
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