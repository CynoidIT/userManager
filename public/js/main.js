const deleteText = document.querySelectorAll('.fa-trash')
// const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteUser)
})

// Array.from(thumbText).forEach((element)=>{
//     element.addEventListener('click', addLike)
// })

async function deleteUser(){
    const uName = this.parentNode.childNodes[1].innerText
    const uEmail = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteUser', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'userNameS': uName,
              'emailAddressS': uEmail
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
