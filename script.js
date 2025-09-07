// 'use strict'
const navLinks = document.querySelectorAll('.nav-link') ,
cardsContainer = document.getElementById('cards-container'),
loading = document.querySelector('.loading') ,
closeDetails =document.getElementById('close-details'),
detailsEl = document.querySelector('.details '),
scrollTopBtn = document.getElementById("scrollTopBtn"),
options = {
    method:'GET',
    headers: {
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key' : 'fe5aa29ed8msh60e894d37da0a7ap114399jsn1962fd0c5d53'
    }
}

navLinks.forEach(link => {
    link.addEventListener('click' , ()=>{
        for(let i = 0 ; i < navLinks.length ; i++){
            navLinks[i].classList.remove('active')
        }
        link.classList.add('active')
        getGamesByCategory(link.innerHTML)
    })
})
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.display = "inline-flex";
    } else {
      scrollTopBtn.style.display = "none";
    }
    const breakingHeight = document.querySelector('.header-img').offsetHeight - document.querySelector('.navbar-expand-md').offsetHeight /2
    if(window.scrollY > breakingHeight){
        document.querySelector('.navbar-expand-md').classList.add('sticky')
    }
    else{
        document.querySelector('.navbar-expand-md').classList.remove('sticky')
    }
})  
closeDetails.addEventListener('click' , ()=>{
    detailsEl.classList.add('d-none')
})



async function getGamesByCategory (category) {     
    loading.classList.remove('d-none')
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}` , options)
    const data = await response.json()
    DisplayData(data)
    loading.classList.add('d-none')
}
async function getGameDetails (gameId){
    loading.classList.remove('d-none')
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}` , options)
    const data = await response.json()
    loading.classList.add('d-none')
    return data
}
function makeCard(title , short_discreption , genre , platform , thumbnail) { 
    const card = document.createElement('div')
    card.className = 'card bg-dark'
    card.style.width = '22rem';
    card.innerHTML = 
    `
    <img class="card-img" src="${thumbnail}" alt="">
    <div class="card-body text-light">
        <div class="card-title d-flex justify-content-between">
        <h4 class="fs-5">${title}</h4>
        <button class="btn fs-6 btn-primary">Free</button>
        </div>
        <p class="card-text text-center"> ${short_discreption} </p>
    </div>
    <div class="card-footer d-flex justify-content-between text-light  p-1">
        <h6 class="m-0 p-1">${genre}</h6>
        <h6 class="m-0 p-1">${platform}</h6>
    </div>
    `
    return card
}
function DisplayData(data){
    cardsContainer.innerHTML = ''
    for(let i = 0 ; i < data.length ; i++){
        const card = makeCard(data[i].title , data[i].short_description , data[i].genre , data[i].platform , data[i].thumbnail)
        card.addEventListener('click' , ()=>{
            displayGameDetails(data[i].id)
        })
        cardsContainer.appendChild(card)
    }

}
async function displayGameDetails(gameId){
    const details = await getGameDetails(gameId)
    document.getElementById('details-title').innerHTML = details.title
    document.getElementById('details-category').innerHTML = details.genre
    document.getElementById('details-platform').innerHTML = details.platform
    document.getElementById('details-status').innerHTML = details.status
    document.getElementById('details-details').innerHTML = details.description
    document.getElementById('details-img').src = details.thumbnail
    document.getElementById('details-game').href = details.game_url

    detailsEl.classList.remove('d-none')
}
getGamesByCategory('MMORPG')




