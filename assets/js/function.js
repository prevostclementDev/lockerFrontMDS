// #####################################
// ########## GLOBAL FUNCTION ##########
// #####################################

// check if code exist with API
function submit(){
    const code = get_code();
    const valueIs = /\d{4}/g;
    const match = code.match(valueIs);

    if(( match !== null && match.length === 1) && code.length === 4){

        fetch('http://localhost/site/MDSlocker/includes/request.php?url='+'http://10.54.128.96:8888/projetworkshop/index.php'+'&params=code='+code)
            .then(response => response.json())
            .then(response => {
                const code = response.code;
                const pin = response.pin;
                if (response.errors === undefined) {
                    fetch('http://localhost/locker/includes/pinStarter.php?pin='+pin+"&code="+code)
                        .then(response => {
                            set_setting_notice('success','Le casier : '+code+' est ouvert');
                            timelineSetting.play();
                        }).catch(error => {
                        set_setting_notice('error','Une erreur est survenu pendant l\'ouverture de votre casier');
                        timelineSetting.play();
                    });
                } else {
                    set_setting_notice('error','Le code saisi est invalide');
                    timelineSetting.play();
                }
            })
            .catch(error => {
                set_setting_notice('error','Une erreur est survenu pendant l\'ouverture de votre casier');
                timelineSetting.play();
            });

    } else {
        set_setting_notice('error','Le code saisi n\'est pas valide');
        timelineSetting.play();
    }

}

// get code from 4 inputs
function get_code(){
    let code = "";
    for(let i = 1;i<=4;i++){
        code += document.querySelector('[attr-number="'+i+'"]').value.toString();
    }
    return code;
}

// check step after delete by keyboard
function checkstep(){
    const inputs = document.querySelectorAll('.numberInput');
    let remove = false;
    inputs.forEach(input => {
        let number = input.getAttribute('attr-number');
        if(!remove && input.value === '') {
            remove = true;
            updateStep(number,true);
        }
        if(remove) {
            input.value = '';
        }
    })
}

// update step of input
function updateStep(step,noUp = false) {
    const label = document.querySelector('#label_number');
    if(step < 4 && step >= 1) {
        if(!noUp){
            step++;
        }
        label.setAttribute('step',step);
        document.querySelector('[attr-number="'+step+'"]').focus();
    }
}

// timeline open main nav
function timelineHomepageSwitch(){
    const t1 = gsap.timeline({
        paused:true,
    })

    t1.to('.backgroundOnSwitch',{
        scaleY : 1
    })

    t1.set('.backgroundOnSwitch', {
        transformOrigin : "top"
    })
    t1.set('#homepage',{
        backgroundColor : "rgba(231, 231, 231, 0)",
    })
    t1.set('.titre, #homepageSwitch',{
        opacity : 0,
    })

    t1.to('.backgroundOnSwitch',{
        scaleY : 0
    })

    t1.set('#homepage',{
        display : "none"
    })

    return t1;
}

// timeline open setting menu
function timelineOpenSetting(){
    const t1 = gsap.timeline({
        paused:true,
        onStart : displayOpenLocker,
    });

    t1.set('#setting',{
        x : 0
    })

    t1.to('#setting',{
        background: 'rgba(24, 24, 24, 0.56)',
        duration : 0.2
    })

    t1.to('#content',{
        x : 0,
        duration : 0.2
    })

    return t1;

}

// set notice display in modal setting
function set_setting_notice(classname,msg){
    const notice = document.querySelector('.notice-checked');
    const content = document.querySelector('.notice-checked p');
    const allClass = [
        'error',
        'warning'
    ];

    for (let classInArray of allClass) {
        if(notice.classList.contains(classInArray)) {
            notice.classList.remove(classInArray);
        }
    }

    notice.classList.add(classname);
    content.innerHTML = msg;


}

// navigator check for speechRecognition
function navigator_checker(){
    return !navigator.userAgent.match(/firefox|fxios/i);
}

// animation loader for speech
function timelineSpeechLoad() {
    const t1 = gsap.timeline({paused:true});
    t1.to('.ball',{
        y:15,
        stagger:{
            each : 0.2,
            repeat : -1,
            yoyo : true,
        },
    })
    return t1;
}

// timeline to open speech modal
function timelineSpeechModal() {
    const t1 = gsap.timeline({paused:true});
    t1.set('#speechmodal',{display:"flex"});
    t1.to('#speechmodal',{opacity:1,duration:0.2});
    return t1;
}

// display all locker open
function displayOpenLocker(){
    fetch('http://localhost/site/MDSlocker/includes/request.php?params=isOpen=1&url=http://10.54.128.96:8888/projetworkshop/locker-list.php')
        .then(response => response.json())
        .then(response => {

            const templateLocker = document.querySelector('#lockerDisplayStatus');
            const containerLocker = document.querySelector('.lockerStatusList');

            if(Array.isArray(response)) {

                containerLocker.innerHTML = '';

                for(const locker of response) {
                    let lockerElement = templateLocker.content.cloneNode(true).children[0];
                    lockerElement.children[0].children[0].innerHTML = locker.code;
                    lockerElement.children[1].setAttribute('pin',locker.pin);
                    containerLocker.appendChild(lockerElement);
                }

            }

            closeLockerEvent();
        })

}

// fetch to close locker
function closeLockerEvent(){
    const closeButton = document.querySelectorAll('.closeLocker');
    closeButton.forEach(el => {
        el.onclick = (e) => {
            e.preventDefault();
            fetch('http://localhost/locker/includes/closeLocker.php?pin='+el.getAttribute('pin'))
                .then(response => response.json())
                .then(response => {
                    set_setting_notice('error','Le casier est fermé');
                })
        }
    })
}