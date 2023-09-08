// #######################################################
// ################## GLOBAL SCRIPT   ####################
// #######################################################
document.addEventListener('DOMContentLoaded', () => {

    // ################################
    // ########## INPUT FORM ##########
    // ################################
    const label = document.querySelector('#label_number');
    const inputs = document.querySelectorAll('.numberInput');

    inputs.forEach(input =>{
        input.oninput = () => {
            let step = input.getAttribute('attr-number');
            const value = input.value;
            const match = value.match(/\d/g);

            if(match && value.length === 1) {
                input.classList.add('valid');
            } else if ( match && value.length > 1 ) {
                input.value = input.value.slice(0,-1);
                input.classList.add('valid');
            } else {
                input.value = "";
                input.classList.add('nomatch');
                checkstep();
                return;
            }

            updateStep(step);

        }
    })

    // RENDER TOUCH BTN
    const touch = document.querySelectorAll('.touch');
    touch.forEach(el => {
       el.onclick = (e) => {
           e.preventDefault();

           const value = el.getAttribute('value');
           let step = label.getAttribute('step');

           if(value === 'submit') {
               submit();
               return;
           }

           if(value === 'delete') {
               if(step > 0) {
                   document.querySelector('[attr-number="'+step+'"]').value = null;
                   updateStep(step-1,true);
               }
               return;
           }

           document.querySelector('[attr-number="'+step+'"]').value = value;

           console.log(step)

           if(step <= 4){
               updateStep(step++);
           }

       }
    });

    // #############
    // SPEECH SCRIPT
    // #############
    if(navigator_checker()){
        const recognition = new window.webkitSpeechRecognition();
        const output = document.querySelector('#returnSpeech');
        const speechOpen = document.querySelector('#speechOpen');
        const closeButton = document.querySelector('#stopSpeech');

        speechOpen.classList.add('comptabible')

        recognition.onstart = () => {
            output.textContent = "Écoute en cours...";
        };

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript.replaceAll(' ','');
            if(result.length === 4) {
                for (let i = 1; i<=4 ; i++){
                    inputs[i-1].value = result[i-1];
                }
                label.setAttribute('step','4');
                timelineSpeechModalVar.reverse();
                return;
            }
            output.textContent = "Une erreur de reconnaissance vocale est survenu :/";
        };

        recognition.onerror = (event) => {
            output.textContent = "Erreur de reconnaissance vocale : " + event.error;
        };

        closeButton.onclick = () => {
            if(timelineSpeech.isActive()){
                closeButton.innerHTML = 'Fermer';
                timelineSpeech.pause();
                recognition.stop();
                return
            }
            closeButton.innerHTML = 'Stop';
            timelineSpeechModalVar.reverse();
        }

        speechOpen.onclick = () => {
            closeButton.innerHTML = 'Stop';
            timelineSpeechModalVar.play();
            timelineSpeech.play();
            recognition.start();
        };
    }
})