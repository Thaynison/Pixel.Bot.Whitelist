async function lerWhitelist(el){
    window.location.href = `/about/${el}`;
}

$(".pesquisarWhitelist").keypress((event) => {
    const key = event.keyCode ? event.keyCode : event.which;
    if (key === 13) {
        const data = new FormData();
        data.append("form", event.target.value)

        fetch("/search", {
            method: "POST",
            body: data
        }).then(res => {
            res.json().then(obj => {    
                if (obj.success == true) {
                    window.location.href = `/about/${obj.id}`;
                }
            })
        })
    }
});