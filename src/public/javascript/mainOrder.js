let token = localStorage.getItem('token')
let navbarRight = document.querySelector('#navbar-right')
let main = document.querySelector('.main')
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
            main.innerHTML = ``,
                main.innerHTML = `${data.user.orders.map((element) => {
                    return `<div class="card shadow-sm mb-4 font">
                            <div class="card-body">
                                <div class="row ">
                                    <div class="col-md-2">
                                        <img src="${element.img}" alt="Sản phẩm" class="img-fluid rounded">
                                    </div>

                                    <div class="col-md-10">
                                        <h5 class="card-title">Tên sản phẩm: ${element.name_book}</h5>
                                        <p><strong>Số lượng:</strong> ${element.quantity}</p>
                                        <p><strong>Phương thức thanh toán:</strong> ${element.payment}</p>
                                        <p><strong>Địa chỉ giao hàng: </strong>${element.address}</p>
                                        <p><strong>Tổng tiền: </strong>${element.totalPrice}</p>
                                        <p><strong>Ngày giao: </strong>${element.day}</p>
                                        <p><strong>Ngày nhận: </strong>${element.day}</p>
                                        <a href="/detail/${element.id_book}"><button class="btn btn-primary">🔄 Đặt lại</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>`

                })}`
            document.querySelector('#logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('token')
                window.location.href = '/'
            })
            document.querySelector('.infor').addEventListener('click', () => {
                localStorage.setItem('idUser', data.user._id)
                window.location.href = '/profile'
            })
        } else {
            navbarRight.innerHTML = ''
            navbarRight.innerHTML = `
            <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
            <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>`
        }
    } catch (err) {
        console.log('Lỗi ở hàm checkAccount ' + err)
    }
}
checkAccount()
