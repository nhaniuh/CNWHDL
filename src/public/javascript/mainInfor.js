// const { name } = require("ejs")

let id = localStorage.getItem('idUser')
let name = document.querySelector('#name')
let email = document.querySelector('#email')
let gender = document.querySelector('#gender')

if (!id) {
    console.log('Không có id')
}

async function infor() {
    if (id) {
        try {
            const response = await fetch('/getProfile/' + id)
            const data = await response.json()
            name.innerHTML = data[0].name
            email.innerHTML = data[0].email
            gender.innerHTML = data[0].gender
        }catch(err){
            console.log(err)
        }
    }
}

infor()

let token = localStorage.getItem('token')
let navbarRight = document.querySelector('#navbar-right')
async function checkAccount() {
    try {
        const response = await fetch('/checkLogin', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await response.json()
        if (data.status) {
            navbarRight.innerHTML = ''
            navbarRight.innerHTML = `
  <div class="d-flex align-items-center">
    <a href="/cart" class="btn btn-light position-relative me-2">
      <img src="/img/card.png" alt="" style="width:24px; height:24px;">

      <!-- Số lượng sản phẩm (badge) -->
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        ${data.total2}
      </span>
    </a>
    <a href="/order" class="btn btn-light position-relative me-2">
      <img src="/img/truck.png" alt="" style="width:24px; height:24px;">
      <!-- Số lượng sản phẩm (badge) -->
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        ${data.user.orders.length}
      </span>
    </a>
    <div class="dropdown">
      <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        👤 ${data.user.name}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item infor" href="#">Thông tin tài khoản</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Đăng xuất</a></li>
      </ul>
    </div>
  </div>
`
            document.querySelector('#logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('token')
                window.location.href = '/'
            })
            document.querySelector('.infor').addEventListener('click', ()=>{
                localStorage.setItem('idUser',data.user._id)
                window.location.href = '/profile'
            })
        } else {
            navbarRight.innerHTML = ''
            navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
        }
    }catch(err){
        console.log('Lỗi ở hàm checkAccount '+err)
    }
}
checkAccount()