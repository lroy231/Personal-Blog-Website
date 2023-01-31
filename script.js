//import loadImage from "blueimp-load-image";

//query selector for carousels
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const CAROUSEL_SIZE = carouselItems.length;


const formData = new FormData();

//dark mode query selector
const darkModeBtn = document.querySelector('.darkModeBtn');

//query selectors for modal
const modal = document.querySelector(".modal");
const newBtn = document.querySelector(".newStuffBtn");
const closeBtn = document.querySelector(".close-button");

//query selector for transform button API feature
const show_Btn = document.querySelector('.show-horoscope');
const containerImg = document.querySelector('.container-img');
const containerContent = document.querySelector('.container-content');
const url = 'https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=virgo&day=today';
const options = {
    method: 'POST',
    headers: {
        'X-RapidAPI-Key': '1bfd573b77mshd2db33f512f76f9p16f6cejsn51500944104f',
		'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
    }
};

if(show_Btn!=null){
show_Btn.disabled = false;
show_Btn.addEventListener('click', getHoroScope);
}
function toggleModal(){
    modal.classList.toggle("show-modal");
}

function windowOnClick(event){
    if (event.target === modal) {
        toggleModal();
    }
}

if(newBtn != null && closeBtn != null && window != null){
newBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
window.addEventListener('click', windowOnClick);

}


//dark mode function
darkModeBtn.addEventListener('click', function(e){
    //query selectors to alter the body header and footer components
    var bodyE = document.querySelector('body');
    var headerE = document.querySelector('header');
    var footerE = document.querySelector('footer');
    var mainE = document.querySelector('main');
    var containerE = document.querySelector('.container-content');
    

    if(containerE != null){
        containerE.classList.toggle('containerDarkMode');
    }
    if(show_Btn!=null){
        show_Btn.classList.toggle('darkMode');
    }
        darkModeBtn.classList.toggle('darkModeBtnClicked');
        bodyE.classList.toggle('darkMode');
        mainE.classList.toggle('darkMode');
        headerE.classList.toggle('lightDarkMode');
        footerE.classList.toggle('lightDarkMode');
});

//carousel function
if(leftBtn != null && rightBtn != null){
leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);
}
function swipe(e){
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);
    let nextIndex;
    if(e.currentTarget.classList.contains('left')){
        nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;
    }else
        nextIndex = currentIndex === CAROUSEL_SIZE - 1? 0 : currentIndex + 1;
        carouselItems[nextIndex].classList.add('active');
        currentCarouselItem.classList.remove('active');
}

async function getHoroScope(){
    try{
        const response = await fetch(url, options);
        if(!response.ok)
            throw Error('Error');
        const data = await response.json();
            showScope(data);
    }catch(error){
        console.log(error);
    }
}


function showScope(data){
   console.log(data);
   show_Btn.disabled = true;

   const date_Range = document.createElement('div');
   const current_Date = document.createElement('div');
   const description = document.createElement('div');
   const compatibility = document.createElement('div');
   const mood = document.createElement('div');
   const color = document.createElement('div');
   const lucky_number = document.createElement('div');
   const lucky_time = document.createElement('div');

   date_Range.innerHTML = 'Date Range: ' + data.date_range;
   current_Date.innerHTML = 'Current Date: ' + data.current_date;
   description.innerHTML = 'Description: ' + data.description;
   compatibility.innerHTML = 'Compatibility: ' + data.compatibility;
   mood.innerHTML = 'Mood: ' + data.mood;
   color.innerHTML = 'Color: ' + data.color;
   lucky_number.innerHTML = 'Lucky Number: ' + data.lucky_number;
   lucky_time.innerHTML = 'Lucky Time: ' + data.lucky_time;


   containerContent.appendChild(date_Range);
   containerContent.appendChild(current_Date);
   containerContent.appendChild(description);
   containerContent.appendChild(compatibility);
   containerContent.appendChild(mood);
   containerContent.appendChild(color);
   containerContent.appendChild(lucky_number);
   containerContent.appendChild(lucky_time);

   

}



