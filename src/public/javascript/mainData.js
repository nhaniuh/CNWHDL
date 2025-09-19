let userTable = document.querySelector('#userTable')

async function getData() {
    try {
         userTable.innerHTML = ""
        const response = await fetch('/getdata')
        const data = await response.json()
        data.forEach(element => {
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            let td4 = document.createElement('td')
            let button = document.createElement('button')
            button.classList.add('btn')
            button.classList.add('btn-outline-danger')
            button.innerHTML = 'Remove'
            td4.append(button)
            tr.append(td1, td2, td3, td4)
            userTable.append(tr)
            td1.innerHTML = element.name,
                td2.innerHTML = element.email
            td3.innerHTML = element.gender
            button.addEventListener('click', async () => {
                try {
                    const response = await fetch('/removeData/' + element._id,{method: 'Delete'})
                    const data = await response.json()
                    if (data.message) {
                        getData()
                    }
                } catch (err) {
                    console.log(err)
                }
            })
        });
    } catch (err) {
        console.log('Lỗi không lấy được dữ liệu data' + err)
    }
}
getData()