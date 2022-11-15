if (document.querySelector(".share-trigger") !== null) {
    //TRIGGER
    let isShareTriggerActive = false;
    const toggleShareIcons = () => {
        if(!isShareTriggerActive){
            document.querySelector(".share-trigger").nextElementSibling.classList.add("active")
        } else {
            document.querySelector(".share-trigger").nextElementSibling.classList.remove("active")
        }
        isShareTriggerActive = !isShareTriggerActive;
    }
    const closeShareIcons = () => {
        document.querySelector(".share-trigger").nextElementSibling.classList.remove("active")
        isShareTriggerActive = false;
    }
    if(window.isTouchScreen()){
        document.querySelector(".share-trigger").addEventListener("click", toggleShareIcons, false)
    } else {
        ['click','mouseenter'].forEach( evt => 
            document.querySelector(".share-trigger").addEventListener(evt, toggleShareIcons, false)
        );
        document.querySelector(".share-container").addEventListener("mouseleave", closeShareIcons, false)
    }
    // COPY SHARE
    document.querySelectorAll(".navigator-share").forEach(($link) => {
        let timer;
        function removeNotification() {
            window.clearTimeout(timer);
            timer = window.setTimeout(function(){
                if($link.nextElementSibling.classList.contains("navigator-share-notification")){
                    $link.nextElementSibling.classList.remove('active');
                }
            },1000); 
        }
        $link.addEventListener("click", async (e) => {
            e.preventDefault();
            const shareData = {
                title: $link.getAttribute("data-title"),
                text: $link.getAttribute("data-excerpt"),
                url: $link.href,
            };
            try {
                await navigator.share(shareData);
                console.log("shared successfully");
            } catch (err) {
                console.log(err);
                // try clipboard
                if (!navigator.clipboard) {
                    // Clipboard API not available
                    return;
                }
                const text = $link.href;
                try {
                    await navigator.clipboard.writeText(text);
                    // event.target.textContent = 'Copied to clipboard'
                    console.log(`Copied - ${text}`);
                    if($link.nextElementSibling.classList.contains("navigator-share-notification")){
                        $link.nextElementSibling.classList.add('active');
                    }
                    removeNotification()
                } catch (err) {
                    console.error("Failed to copy!", err);
                }
            }
        });
    });
}
