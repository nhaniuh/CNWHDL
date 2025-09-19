

let name = document.querySelector('.name')
let email = document.querySelector('.email')
let password = document.querySelector('.password')
let gender = document.querySelector('.gender')
let sigin = document.querySelector('.sigin')
let alert1 = document.querySelector('.checkEmail')
let arrayEmail = []
async function checkEmail() {
    try {
        const response = await fetch('/checkEmail')
        const data = await response.json()
        if (data) {
            arrayEmail= data.user.map(element => element.email)
            console.log(arrayEmail)
        }
    } catch (err) {
        console.log(err)
    }
}
checkEmail()
sigin.addEventListener('click',async (e)=>{
    e.preventDefault()
    if(arrayEmail.includes(email.value.trim())){
        alert1.innerHTML = 'Email đã tồn tại'
    }
    try{
        const response = await fetch('/register',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
               name: name.value.trim(),
               email: email.value.trim(),
               password: password.value.trim(),
               gender: gender.value
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.message){
            window.location.href = '/login'
        }
    }catch(err){
        console.log(err)
    }
})