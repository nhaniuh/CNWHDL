let login = document.querySelector('.login')
let email = document.querySelector('.email')
let password = document.querySelector('.password')
let check = document.querySelector('.check')
console.log(login)
login.addEventListener('click', async (e) => {
    e.preventDefault()
    if (email.value.trim() !== "" && password.value.trim() !== "") {
        try {
            const response = await fetch('/postLogin', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value.trim(),
                    password: password.value.trim()
                })
            })
            const data = await response.json()
            if (data.message) {
                localStorage.setItem('token',data.token)
                localStorage.setItem('idUser',data.id)
                window.location.href = '/'
            } else {
                check.innerHTML = 'Mật khẩu hoặc email không tồn tại'
            }
        } catch (err) {
            console.log('Lỗi không thể truy cập được postLogin')
        }
    }
})