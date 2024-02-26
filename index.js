const iconToggle=document.querySelector('.toggle_icon');
const navbarMenu=document.querySelector('.menu');
const menuLinks=document.querySelectorAll('.menu_link');
const iconClose=document.querySelector('.close_icon');

iconToggle.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
})

iconClose.addEventListener('click', ()=>{
    navbarMenu.classList.remove('active');   
})

menuLinks.forEach((menuLink)=>{
    menuLink.addEventListener('click', ()=>{
        navbarMenu.classList.remove('active');
    })
})


function scrollHeader(){
    const header=document.getElementById('header');
    this.scrollY>=20? header.classList.add('active'): header.classList.remove('active');
}

window.addEventListener('scroll', scrollHeader);


// Image SLider


const initSlider=()=>{
    const imageList=document.querySelector(".slider-wrapper .image-list");
    const slideButtons=document.querySelectorAll(".slider-wrapper .slide-button"); 
    const sliderScrollbar =document.querySelector(".slider-container .slider-scrollbar");
    const scrollbarThumb=sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft=imageList.scrollWidth - imageList.clientWidth;


    scrollbarThumb.addEventListener("mousedown", (e)=>{
        const startX=e.clientX
        const thumbPosition= scrollbarThumb.offsetLeft;
        const handleMouseMove = (e)=>{
            const deltaX= e.clientX-startX;
            const newThumbPosition=thumbPosition+deltaX;
            const maxThumbPosition= sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPostion=(boundedPosition/maxThumbPosition)*maxScrollLeft;
            scrollbarThumb.style.left=`${boundedPosition}px`;
            imageList.scrollLeft=scrollPostion;
        }

        const handleMouseUp=()=>{
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

    })
   
    slideButtons.forEach(button=>{
        button.addEventListener("click", () =>{ 
            console.log(button);
           const direction=button.id === "prev-slide" ? -1:1;
           const scrollAmount = imageList.clientWidth*direction;
           imageList.scrollBy({ left: scrollAmount, behavior: "smooth" })

        });
    });
    const handleSlideButtons=()=>{
        slideButtons[0].style.display = imageList.scrollLeft<=0 ? "none":"block";
        slideButtons[1].style.display = imageList.scrollLeft>= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPosition=()=>{
      const scrollPostion = imageList.scrollLeft;
      const thumbPosition=(scrollPostion/maxScrollLeft)*(sliderScrollbar.clientWidth-scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left=`${thumbPosition}px`
    }
    imageList.addEventListener("scroll", () =>{
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}
window.addEventListener("load", initSlider);


//resume scroll
const pages= document.querySelectorAll('.page');
const resume=document.querySelector('.resume');

function resumeActive(){
    const scrollY= window.pageYOffset;

    pages.forEach(page=>{
        const sectionHeight=page.offsetHeight;
        const sectionTop=page.offsetTop;

        let sectionId= page.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop+ sectionHeight){
            document.querySelector('.resume_tabs a[href *=' + sectionId+ ']').classList.add('current');
        }
        else{
            document.querySelector('.resume_tabs a[href *=' + sectionId+ ']').classList.remove('current');
        }
    })
}

window.addEventListener('scroll', resumeActive);