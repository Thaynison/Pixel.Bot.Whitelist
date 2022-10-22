async function aprovarUser(id,discordid){
    const data = new FormData();
    data.append("form", id)
    data.append("discordid", discordid)

    fetch("/aproveuser", {
        method: "POST",
        body: data
    }).then(res => {
        res.json().then(obj => {    
            if (obj.success == true) {
                $("#notify").slideDown('slow')
                document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Usuário aprovado com sucesso.`
                setTimeout(function(){ location.reload(true) }, 3000);
            }else{
                $("#notify").slideDown('slow')
                document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Você não pode aprovar este usuário.`
                setTimeout(function(){ $("#notify").fadeOut('slow')}, 3000);
            }
        })
    })
}

async function reprovarUser(id){
    const data = new FormData();
    data.append("form", id)

    fetch("/reproveuser", {
        method: "POST",
        body: data
    }).then(res => {
        res.json().then(obj => {    
            if (obj.success == true) {
                $("#notify").slideDown('slow')
                document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Usuário reprovado com sucesso.`
                setTimeout(function(){ location.reload(true)}, 3000);
            }else{
                $("#notify").slideDown('slow')
                document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Você não pode reprovar este usuário.`
                setTimeout(function(){ $("#notify").fadeOut('slow')}, 3000);
            }
        })
    })
}