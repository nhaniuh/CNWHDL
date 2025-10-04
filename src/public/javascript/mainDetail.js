let token = localStorage.getItem('token')
let buy = document.querySelector('.buy')
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
      document.querySelector('.infor').addEventListener('click', () => {
        localStorage.setItem('idUser', data.user._id)
        window.location.href = '/profile'
      })
      buy.addEventListener('click', async () => {
        window.location.href = '/person-Payment/?id=' + id + '&quantity=' + quantity.value
      })
    } else {
      navbarRight.innerHTML = ''
      navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
      buy.addEventListener('click', async () => {
        window.location.href = '/login'
      })
    }
  } catch (err) {
    console.log('Lỗi ở hàm checkAccount ' + err)
    navbarRight.innerHTML = ''
    navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
    buy.addEventListener('click', async () => {
      window.location.href = '/login'
    })
  }
}
checkAccount()

let successCheck = document.querySelector('.checkCart')
let successCheck2 = document.querySelector('.checkCart2')
let addCart = document.querySelector('#addToCartBtn')
let check = document.querySelector('#successCheck')
let id = check.getAttribute('data-id')
let id_user = localStorage.getItem('idUser')
let quantity = document.querySelector('#quantity')
addCart.addEventListener('click', async () => {
  if (!token){
    return window.location.href = '/login'
  }
  try {
    const response = await fetch('/addCart', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id_book: id,
        id_user,
        quantity: quantity.value
      })
    })
    const data = await response.json()
    if (!data.message) {
      successCheck2.style.display = 'flex'
      setTimeout(() => {
        successCheck2.style.display = 'none'
      }, 1000)
    }
    successCheck.style.display = 'flex'
    setTimeout(() => {
      successCheck.style.display = 'none'
    }, 1000)
  }
  catch (err) {
    console.log('Lỗi không thể gửi fetch /addCart', 'err')
    successCheck2.style.display = 'flex'
    setTimeout(() => {
      successCheck2.style.display = 'none'
    }, 1000)
  }
})
