const token = localStorage.getItem('token')
const navbarRight = document.getElementById("navbar-right")
let table = document.querySelector('.table')
async function checkLogin() {
  if (token) {
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
        document.querySelector('.infor').addEventListener('click', async (e) => {
          localStorage.setItem('idUser', data.user._id)
          window.location.href = '/profile'
        })
        table.innerHTML = ''
        table.innerHTML = `<thead class="table-light">
                    <tr>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                        <th>Xóa</th>
                        <th>Thanh Toán</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.book.map((element, index) => {
          return `
                      <tr>
                        <td>${index + 1}</td>
                        <td>${element.name}</td>
                        <td><img src="/${element.img}" class="img-fluid" alt="Áo thun"></td>
                        <td>${element.quantity}</td>
                        <td>${element.price}</td>
                        <td>${parseFloat(element.quantity * element.price.split(' ')[0]).toLocaleString('de-DE')}.000 VND</td>
                        <td>
                            <button id="${element._id}" class="btn btn-sm btn-danger remove">Xóa</button>
                        </td>
                        <td>
                        <a href="/person-Payment/?id=${element._id}&quantity=${element.quantity}"><button id="${element._id}" class="btn btn-sm btn-primary">Thanh Toán</button></a>
                        </td>
                    </tr>`
        })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="5" class="text-end">Tổng tiền:</th>
                        <th colspan="3">${data.total.toLocaleString('de-DE')}.000 VND</th>
                    </tr>
                </tfoot>`
      } else {
        console.log('Lỗi ở verify có khi là token hết hạn')
        navbarRight.innerHTML = ''
        navbarRight.innerHTML = `
      <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
      <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>
    `
      }
      let remove = document.querySelectorAll('.remove')
      for (let element of remove) {
        element.addEventListener('click', async () => {
          let id = element.getAttribute('id')
          try {
            const response = await fetch('/removeCardBook', {
              method: 'DELETE',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                id_book: id,
                id_user: localStorage.getItem('idUser')
              })
            })
            const data = await response.json()
            if (data.status) {
              window.location.href = '/cart'
            }
          }
          catch (err) {
            console.log('Lỗi xóa cardBook', err)
          }
        })
      }
    }
    catch (err) {
      console.log('Lỗi không thể truy cập được /checkLogin' + err)
    }
  } else {
    navbarRight.innerHTML = ''
    navbarRight.innerHTML = `
      <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
      <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>
    `
  }
}
checkLogin()
