const cursorSelector = "#cursor";
document.addEventListener('DOMContentLoaded', () => {

    // ############
    // CURSOR BASIC
    // ############
    gsap.set(cursorSelector, {xPercent: -50, yPercent: -50});

    let xTo = gsap.quickTo(cursorSelector, "x", {duration: 0.3, ease: "power3"});
    let yTo = gsap.quickTo(cursorSelector, "y", {duration: 0.3, ease: "power3"});

    window.addEventListener("mousemove", e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // ##############
    // HOVER ON TOUCH
    // ##############
    const touchs = document.querySelectorAll('.touch, .numberInput, #homepageSwitch, #closeInterface, .closeModalContent, .closeLocker, #displaySettingButton, #speechOpen');
    touchs.forEach(touch => {
        // enter
        touch.onmouseenter = () => {
            const {width, height,top,left} = touch.getBoundingClientRect();
            gsap.to(cursorSelector,{
                width : 40,
                height :40,
                delay:0.01
            });
        }
        // leave
        touch.onmouseleave = () => {
            const {width, height,top,left} = touch.getBoundingClientRect();
            gsap.to(cursorSelector,{
                width : 20,
                height : 20,
                delay : 0.01
            });
        }
    })

    // ##########################
    // HOME PAGE SWITCH ANIMATION
    // ##########################
    const switchHomepage = document.querySelector('#homepageSwitch');
    switchHomepage.onclick = () => {
        timelineSwitch.play();
    }

    const closeInterface = document.querySelector('#closeInterface');
    closeInterface.onclick = () => {
        timelineSwitch.reverse();
    }

    // #################
    // MENU SETTING OPEN
    // #################
    const displaySettingButton = document.querySelector('#displaySettingButton');
    displaySettingButton.onclick = () => {
        timelineSetting.play();
    }

    const closeModalContent = document.querySelector('.closeModalContent');
    closeModalContent.onclick = () => {
        timelineSetting.reverse();
    }

})