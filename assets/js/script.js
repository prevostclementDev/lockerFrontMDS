// #######################################################
// ################## GLOBAL SCRIPT   ####################
// #######################################################
document.addEventListener('DOMContentLoaded', () => {

    const input = document.querySelector('#number');
    const label_text = document.querySelector('.label_text');

    // ANNIMATION LABEL TEXTE
    input.onfocus = () => {
        onchange_update_annimation(true);
    }
    input.addEventListener('focusout', () => {
        onchange_update_annimation()
    })

    input.onchange = () => {
        onchange_update_annimation();
    }

    // RENDER TOUCH BTN
    const touch = document.querySelectorAll('.touch');
    touch.forEach(el => {
       el.onclick = (e) => {

           const value = el.getAttribute('value');

           if(value === 'submit') {
               return;
           }

           e.preventDefault();

           if(value === 'delete') {
               input.value = (input.value.length > 1) ? input.value.slice(0,-1) : "" ;
           } else {
               input.value += value;
           }

           onchange_update_annimation();
       }
    });


    function onchange_update_annimation(active = false){
        if(active){
            label_text.classList.add('active');
            return;
        }

        if(input.value === '') {
            input.value = '';
            label_text.classList.remove('active');
        } else {
            label_text.classList.add('active');
        }
    }
})