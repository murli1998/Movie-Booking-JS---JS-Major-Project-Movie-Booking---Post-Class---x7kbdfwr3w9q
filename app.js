import {fetchMovieAvailability,fetchMovieList} from "./api.js"

let movies = []
let selectedMovie = null
let unavailableSeats =[]
let selectedSeats 
const loaderEle = document.getElementById("loader")

function showMovies(){
    console.log("showing movies");
    const divEle = document.createElement("div")
    divEle.className = "movie-holder"
    const mainEle = document.querySelector("main")
    mainEle.appendChild(divEle)
    for(let movie of movies){
        console.log(movie);
        const movieElement = document.createElement("div")
        movieElement.innerHTML = `<a class="movie- link">
        <div class="movie" data- d="${movie.name}">
        <div class="movie-img-wrapper" style="background-image:url(${movie.imgUrl}); background-size:cover">
        </div>
        <h4>${movie.name}</h4>
        </div>
        </a>`

        movieElement.addEventListener("click",async function(){
            unavailableSeats =await fetchMovieAvailability(movie.name)
            //
            console.log(unavailableSeats);
            const selectorEle = document.getElementById("selector-text")
            selectorEle.className = ""
            showSeats()
        })


    divEle.appendChild(movieElement)

    const imageWrapper = document.querySelector(".movie-img-wrapper")
    imageWrapper.style.backgroundImage=`url(${movie.imgUrl})`
    imageWrapper.style.backgroundSize = "cover"
}

}

function showSeats(){
    console.log("show seats");
    const gridHolderEle = document.getElementById("booker-grid-holder")
    const firstGrid = document.createElement("div")
    firstGrid.className ="booking-grid"
    gridHolderEle.appendChild(firstGrid)
    for(let i=0;i<12;i++){
        const seat =document.createElement("div")
        seat.innerText = i+1;
        seat.className="booing-grid-gridNumber"
        seat.style.padding = "10px"
        seat.style.border = "1px solid black"

        if(unavailableSeats.includes(i+1)){
            seat.className="unavailable-seat"
        }
        else{
            seat.className="available-seat"
        }
        seat.addEventListener("click",function(){

            if(!unavailableSeats.includes(i+1)){
            
            
            selectedSeats.push(i+1)
            seat.className="selected-seat"
            seat.style.border="4px outset rgb(0,0,0)"
            console.log(selectedSeats);
            }
        })

        firstGrid.appendChild(seat)
    }
}
function hideLoader(){
   loaderEle.className="d-none"
}
async function getMovies()
{
    movies = await fetchMovieList()
    console.log(movies);
    hideLoader();
    showMovies();
}

getMovies()
