const stepList = ['step_one', 'step_two', 'step_three'];

let actualStep = 'step_one';
let actualStepDOM = document.querySelector(`#${actualStep}`);

function reverseStep(str) {
    const splited = str.split('_');
    return `${splited[1]}_${splited[0]}`;
}

function switchStep(new_step, remove=false) {
    if(actualStep === new_step) return false;
    if(!stepList.includes(new_step)) return false;
    const newIndex = stepList.indexOf(new_step);

    if(remove && actualStepDOM?.classList?.value.includes('active')) {
        actualStepDOM.classList.remove('active');
        if(newIndex === 0) {
            document.querySelector('#backStep').style.display = 'none';
        }
    }

    document.querySelector(`.${reverseStep(actualStep)}`).style.display = 'none';
    document.querySelector(`.${reverseStep(new_step)}`).style.display = 'block';

    actualStep = new_step;
    actualStepDOM = document.querySelector(`#${actualStep}`);

    if(actualStepDOM) actualStepDOM.classList.add('active');
    if(newIndex+1 === stepList.length) {
       // document.querySelector(".sendStep").style.display = "block";
        //document.querySelector(".nextStep").style.display = "none";
        document.querySelector('.nextStep').innerHTML = 'Enviar Whitelist';
    } else document.querySelector('.nextStep').innerHTML = 'Próxima Etapa';
    if(newIndex !== 0) {
        document.querySelector('#backStep').style.display = 'block';
    }
}

function nextStep() {
    const actualIndex = stepList.indexOf(actualStep);
    if(stepList.length < (actualIndex+1)) return false;
    const pageClass = reverseStep(actualStep);

    const questionsEl = document.querySelectorAll(`.${pageClass}_question`);
    let allValid = true;

    for(const qEl of questionsEl) {
        const isValid = qEl.checkValidity();
        if(!isValid && allValid) allValid = false;
    }


    if(!allValid) return false;

    if(actualIndex+1 === stepList.length) {
        let allInputs = Array.from(document.querySelectorAll('.question_input'));
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

        let questionsAlternatives = Array.from(document.querySelectorAll('.question_input'));
        questionsAlternatives = questionsAlternatives.filter(inp => {
            if(inp.type === 'radio') {
                if(inp.checked) return true;
            } 
        }).map(inp => {
            return {
                question: Number(inp.getAttribute('data_question')) || 0,
                value: inp.value || '0'
            }
        })

        const finalResponse = allInputs.map(inp => inp.value);
        const finalAlternatives = questionsAlternatives.map(inp => inp.value);

        const data = new FormData();
        data.append("finalResponse", JSON.stringify(finalResponse)) 
        data.append("finalAlternatives", finalAlternatives)

        fetch("/sendform", {
            method: "POST",
            body: data,
        }).then(res => {
            res.json().then(obj => {    
                if (obj.success == true) {
                    document.querySelector('.main_whitelist').style.pointerEvents = 'none';
                    $("#notify").slideDown('slow')
                    document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> Whitelist enviada com sucesso. Instruções enviadas ao seu privado.`

                    setTimeout(function(){location.reload(true) }, 4000);
                }else if(obj.success == false){
                    document.querySelector('.main_whitelist').style.pointerEvents = 'none';
                    $("#notify").slideDown('slow')
                    document.getElementById('notify').innerHTML = `<i class="fas fa-bell"></i> ${obj.mensagem}`
                    
                    setTimeout(function(){document.querySelector('.main_whitelist').style.pointerEvents = 'auto'; $("#notify").fadeOut('slow')}, 3000);
                }
            })
        })
    } else switchStep(stepList[actualIndex+1]);
}

function backStep() {
    const actualIndex = stepList.indexOf(actualStep);
    if(actualIndex === 0) return false;
    switchStep(stepList[actualIndex-1], true);
}