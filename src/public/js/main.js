let menuStatus = false

function navBar(){
    let modal = document.getElementById('navbar')

    if(menuStatus === false) {
        menuStatus = true
        modal.classList.add('open-modal')
        modal.classList.add('active')
    } else {
        modal.classList.remove('open-modal')
        modal.classList.remove('active')
        menuStatus = false
    }

}

