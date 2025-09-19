const token = localStorage.getItem('token')
const navbarRight = document.getElementById("navbar-right")
const mainBook = document.querySelector('.book')
async function showBook() {
    try {
        const response = await fetch('/showBook')
        const data = await response.json()
        data.forEach(element => {
            let div = document.createElement('div')
            div.classList.add('col-md-4')
            div.innerHTML = `
    <div class="card shadow-sm h-100"> 
        <img src="${element.img}" class="card-img-top img-fluid" 
             style="height:250px; object-fit:cover;" alt="Sách">
        <div class="card-body d-flex flex-column"> 
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">Giá: ${element.price}</p>
            <div class="mt-auto"> 
                <a href="/detail/${element._id}" class="btn btn-success buy">Mua ngay</a>
            </div>
        </div>
    </div>
`
            mainBook.append(div)
        });
    } catch (err) {
        console.log('Lỗi không thể thêm lấy được dữ liệu sách showBook')
    }
}
showBook()
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
                localStorage.setItem('idUser', data.user._id)
                document.querySelector('#logoutBtn').addEventListener('click', () => {
                    localStorage.removeItem('token')
                    window.location.href = '/'
                })
                document.querySelector('.infor').addEventListener('click', async (e) => {
                    localStorage.setItem('idUser', data.user._id)
                    window.location.href = '/profile'
                })
            } else {
                console.log('Lỗi ở verify có khi là token hết hạn')
                navbarRight.innerHTML = ''
                navbarRight.innerHTML = `
      <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
      <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>
    `
                localStorage.removeItem('idUser')
            }
        }
        catch (err) {
            console.log('Lỗi không thể truy cập được /checkLogin' + err)
            navbarRight.innerHTML = ''
            navbarRight.innerHTML = `
      <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
      <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>
    `
            localStorage.removeItem('idUser')
        }
    } else {
        navbarRight.innerHTML = ''
        navbarRight.innerHTML = `
      <a href="/login" class="btn btn-light btn-sm me-2">Đăng nhập</a>
      <a href="/register" class="btn btn-warning btn-sm">Đăng ký</a>
    `
        localStorage.removeItem('idUser')
    }
}
checkLogin()