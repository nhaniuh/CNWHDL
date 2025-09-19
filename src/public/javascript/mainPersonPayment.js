let token = localStorage.getItem('token')
let navbarRight = document.querySelector('#navbar-right')
let name = document.getElementById('name')
let email = document.getElementById('email')
let address = document.getElementById('address')
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
      name.value = data.user.name
      email.value = data.user.email
      if (data.user.orders[data.user.orders.length-1].address) {
        address.value = data.user.orders[data.user.orders.length-1].address
      }
    } else {
      navbarRight.innerHTML = ''
      navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
      localStorage.removeItem('idUser')
    }
  } catch (err) {
    console.log('Lỗi ở hàm checkAccount ' + err)
    navbarRight.innerHTML = ''
    navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
    localStorage.removeItem('idUser')
  }
}
checkAccount()
let order = document.querySelector('.order')
let book_name = document.querySelector('.book_name')
let quantity = book_name.getAttribute('data-quantity')
let name_book = book_name.getAttribute('data-name')
let id_book = book_name.getAttribute('data-id')
let totalPrice = document.getElementById('totalPrice')
let payment = document.getElementById('payment')
const id_user = localStorage.getItem('idUser')
let day = new Date().toDateString()
let card_success = document.querySelector('.card-success')
console.log(day)
order.addEventListener('click', async (e) => {
  e.preventDefault()
  let value1 = false
  let value2 = false
  if (payment.value === "") {
    value1 = false
    payment.classList.add('border')
    payment.classList.add('border-danger')
  } else {
    value1 = true
    payment.classList.remove('border')
    payment.classList.remove('border-danger')
  }
  if (address.value === "") {
    value2 = false
    address.classList.add('border')
    address.classList.add('border-danger')
  } else {
    value2 = true
    address.classList.remove('border')
    address.classList.remove('border-danger')
  }
  if (value1&&value2) {
    try {
      const response = await fetch('/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user,
          id_book,
          name_book,
          quantity,
          totalPrice: totalPrice.value,
          address: address.value,
          payment: payment.value,
          day
        })
      })
      const data = await response.json()
      if(data.status){
        card_success.classList.add('show')
      }
    }
     catch (err) {
      console.log('Lỗi không thể gửi dữ liệu đi', err)
    }
  }
})