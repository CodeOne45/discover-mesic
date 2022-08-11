const tabs= document.querySelectorAll(".tab");
tabs.forEach((clickedTab)=>{
    console.log("jhkfdgdfigfdgjfd");
    clickedTab.addEventListener('click',()=>{
        tabs.forEach((tab=>{
            tab.classList.remove("active");
        }))
        clickedTab.classList.add("active");
        const clickedTabBGColor=getComputedStyle
        (clickedTab).getPropertyValue(
            "color"
        );
        document.body.style.background=clickedTabBGColor;
    });
});

