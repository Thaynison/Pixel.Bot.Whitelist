function salvarConfig(){
    $("#notify").slideDown('slow')
    document.getElementById('notify').innerHTML = '<i class="fas fa-bell"></i> Configurações salvas com sucesso.'

    const data = new FormData();
    data.append("logo", document.getElementById("logo").value)
    data.append("banner", document.getElementById("banner").value)
    data.append("tentativas", document.getElementById("tentativas").value)
    data.append("whitelist", document.getElementById('togBtn').checked)
    data.append("canallogs", document.getElementById("canallogs").value)
    data.append("cargoaprovado", document.getElementById("cargoaprovado").value)
    data.append("cargoreprovado", document.getElementById("cargoreprovado").value)
    data.append("mensagemaprovado", document.getElementById("mensagemaprovado").value)
    data.append("mensagemreprovado", document.getElementById("mensagemreprovado").value)

    fetch("/saveconfig", {
        method: "POST",
        body: data,
    });
    window.scrollTo(0, 0);

    setTimeout(function(){ 
        $("#notify").fadeOut('slow')
    }, 3000);
}


let alphabet = ["A", "B", "C", "D", "E"];
const backup = []

async function openModal(idQuestion){
    window.scrollTo(0, 0);
    document.querySelector('body').style.overflow = "hidden";

    document.querySelector('.modal-form-inactive').style.display = 'flex';
    document.querySelector('#idQuestionEdit').innerHTML = idQuestion+'.'
    document.querySelector('.dsaxdsad').value = ''
    document.querySelector('#togBtn2').checked = false
    document.querySelector('#buttonAddQuestion').style.display = 'none'

    let classeModal = document.getElementsByClassName("create-modal")[0]
    classeModal.setAttribute("id", 'create')
}

async function closeModal(){
    $("#questionsAlts").html("")
    backup.splice(0,backup.length)
    document.querySelector('.modal-form-inactive').style.display = 'none';
    document.querySelector('body').style.overflow = "visible";

    let classeModal = document.getElementsByClassName("create-modal")[0]
    classeModal.removeAttribute("id")
}

function adicionarForm () {
    let list = backup
   
    if (list.length === 5) return false;

    list.push('Question-'+list.length)


    $("#questionsAlts").append(`
        <div class="top-items asdas" id="question-${list.length - 1}">
            <div class="textQuestion" id="questionsAlternatives">
                <span class="numberquestion asdasdasdsasdasdqq">${alphabet[list.length - 1]}.</span>
                    <input type="text" class="question qusadsadas dsaxdsad" data_question="${list.length - 1}" placeholder="Digite a questão aqui..." required>
                <div >
                <label class="switch">
                    <input type="checkbox" name="togBtn3" id="togBtn3" onclick="answerQuestion(this)" class="tog-${list.length - 1}">
                    <div class="slider round">
                        <span class="on">Correta</span>
                        <span class="off">Incorreta</span>
                    </div>
                </label>
                    <i class="fas fa-trash-alt ajsdiashjkasdjkadsjksad" id="${list.length - 1}" onclick="removerForm(this)"></i>
                </div>
            </div>
        </div>

        <script>
        function removerForm(el){
            let id = el.id
            let list = backup
            if (list.length === 1) return false;

            list.splice(list.indexOf('Question-'+id), 1);
            $('#question-'+id).remove()
            list.map(function(num,index) {
                let classe = document.getElementsByClassName("asdasdasdsasdasdqq")[index]
                $(classe).html(alphabet.sort()[index] +'.')

                let idDiv = document.getElementsByClassName("ajsdiashjkasdjkadsjksad")[index]
                idDiv.removeAttribute("id")
                idDiv.setAttribute("id", index)
               
                let classeDiv = document.getElementsByClassName("asdas")[index]
                classeDiv.removeAttribute("id")
                classeDiv.setAttribute("id", 'question-'+index)
                
                let classTog = document.querySelectorAll('#togBtn3')[index]
                $(classTog).attr("class",'tog-'+index)

                $('.qusadsadas').removeAttr("data_question")

                let dataDiv = document.getElementsByClassName("qusadsadas")[index]
                dataDiv.setAttribute('data_question', index)
            });  
        }
        </script>
    `)
}


async function editQuestion(idQuestion,id,textQuestion,typeQuestion,answersQuestion,questaoCorreta){
    let list = backup

    window.scrollTo(0, 0);
    document.querySelector('body').style.overflow = "hidden";

    
    let classeModal = document.getElementsByClassName("create-modal")[0]
    classeModal.removeAttribute("id")
    classeModal.setAttribute("id", 'edit-'+id)
    
    document.querySelector('.modal-form-inactive').style.display = 'flex';
    document.querySelector('#idQuestionEdit').innerHTML = Number(idQuestion)+1 +'.'
    document.querySelector('#textQuestionEdit').value = textQuestion

    document.querySelector('#togBtn2').checked = typeQuestion === 'alternative' ? true : false
    document.querySelector('#buttonAddQuestion').style.display = typeQuestion === 'alternative' ? 'flex' : 'none'
    
    if(typeQuestion == 'alternative') {

        for(let j=0; j < JSON.parse(answersQuestion).length; ++j){
            list.push('Question-'+j)

            $("#questionsAlts").append(`
                <div class="top-items asdas" id="question-${list.length - 1}">
                    <div class="textQuestion" id="questionsAlternatives">
                        <span class="numberquestion asdasdasdsasdasdqq">${alphabet[list.length - 1]}.</span>
                            <input type="text" class="question qusadsadas dsaxdsad" data_question="${list.length - 1}" placeholder="Digite a questão aqui..." value="${JSON.parse(answersQuestion)[j]}"  required>
                        <div>
                            <label class="switch">
                                <input type="checkbox" name="togBtn3" id="togBtn3" onclick="answerQuestion(this)" class="tog-${list.length - 1}">
                                <div class="slider round">
                                    <span class="on">Correta</span>
                                    <span class="off">Incorreta</span>
                                </div>
                            </label>
                            <i class="fas fa-trash-alt ajsdiashjkasdjkadsjksad" id="${list.length - 1}" onclick="removerForm(this)"></i>
                        </div>
                    </div>
                </div>
                <script>
                function removerForm(el){
                    let id = el.id
                    let list = backup
                    if (list.length === 1) return false;

                    list.splice(list.indexOf('Question-'+id), 1);
                    $('#question-'+id).remove()
                    list.map(function(num,index) {
                        let classe = document.getElementsByClassName("asdasdasdsasdasdqq")[index]
                        $(classe).html(alphabet.sort()[index] +'.')

                        let idDiv = document.getElementsByClassName("ajsdiashjkasdjkadsjksad")[index]
                        idDiv.removeAttribute("id")
                        idDiv.setAttribute("id", index)
                    
                        let classeDiv = document.getElementsByClassName("asdas")[index]
                        classeDiv.removeAttribute("id")
                        classeDiv.setAttribute("id", 'question-'+index)

                        let dataDiv = document.getElementsByClassName("qusadsadas")[index]
                        $('.qusadsadas').removeAttr("data_question")
                        dataDiv.setAttribute('data_question', index)
                    });  
                }
                </script>
            `)
        }
        document.querySelector('.tog-'+questaoCorreta).checked = true
    }
}

async function deleteQuestion(id,discordid,textQuestion){
    window.scrollTo(0, 0);

    const canalLogs = document.getElementById("canallogs").value
    
    const data = new FormData();
    data.append("id", id)
    if (canalLogs !== "0") data.append("canalLogs", canalLogs)
    data.append("discordid", discordid)
    data.append("textQuestion", textQuestion)

    fetch("/deletequestion", {
        method: "POST",
        body: data,
    }).then(res => {
        res.json().then(obj => {    
            if (obj.success == true) {
                $("#notify").slideDown('slow')
                document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Questão deletada com sucesso. ${canalLogs === '0' ? 'Defina um canal de Logs.' : 'Logs enviadas ao canal configurado.'}`
                setTimeout(function(){location.reload(true) }, 3000);
            }
        })
    })
}

async function typeQuestion(el) {
    if (el.checked){ document.querySelector('#buttonAddQuestion').style.display = 'inline-block'
        adicionarForm()
        document.querySelector('#togBtn3').checked = true
    } else {
        document.querySelector('#buttonAddQuestion').style.display = 'none'
        backup.splice(0,backup.length)
        document.querySelector('#questionsAlts').innerHTML = ''
    }
}

async function answerQuestion(el) {
    var elements = document.querySelectorAll('#togBtn3');

    for(var i = 0; i < elements.length; i++) {
        elements[i].checked = false
    }
    el.checked = true
}


async function createQuestion(){
    const questionsEl = document.querySelectorAll(`.dsaxdsad`);
    let allValid = true;

    for(const qEl of questionsEl) {
        const isValid = qEl.checkValidity();
        if(!isValid && allValid) allValid = false;
    }
    if(!allValid) return false;

    let allInputs = Array.from(document.querySelectorAll('.qusadsadas'));
    allInputs = allInputs.filter(inp => {
        if(inp.type === 'radio') {
            if(inp.checked) return true;
            else return false;
        } else return true;
    }).map(inp => {
        return {
            question: Number(inp.getAttribute('data_question')) || 0,
            value: inp.value || '0'
        }
    })

    
    if (document.querySelector('#togBtn2').checked){
        if (document.getElementById("textQuestionEdit").value !== null) {
            const finalResponse = allInputs.map(inp => inp.value);

            let togActive = document.querySelector('input[name="togBtn3"]:checked')
            if (togActive == null) return false;
            
            console.log($('.create-modal').attr("id"))

            const data = new FormData();
            data.append("textQuestion", document.getElementById("textQuestionEdit").value) 
            data.append("finalResponse", JSON.stringify(finalResponse)) 
            data.append("correta",$(togActive).attr('class').replace("tog-",""))
            data.append("type", "alternative") 
            data.append("action", $('.create-modal').attr("id")) 

            fetch("/createquestion", {
                method: "POST",
                body: data,
            })
            location.reload(true)
        }
    }else{ 
        if (document.getElementById("textQuestionEdit").value !== null) {
            const data = new FormData();
            data.append("textQuestion", document.getElementById("textQuestionEdit").value) 
            data.append("type", "essay") 
            data.append("action", $('.create-modal').attr("id")) 

            fetch("/createquestion", {
                method: "POST",
                body: data,
            });
            location.reload(true)
        }
    }
  
}