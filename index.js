
const KEY = 'b0475f9818b9d1226620ab3dda74b7f0'

const movies = ['tt4823776','299536','9297', '414906', '14160', 'tt1211837', 'tt1825683','19995']

const search_input = document.querySelector('#search')

const movieslist = document.querySelector('.movies-list')



const ClearMoviesList = ()=>{
    movieslist.innerHTML = ""
    console.log('sia')
}


function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=pt-br`
  }


const img_url = {
    original: 'https://image.tmdb.org/t/p/original',
    small: 'https://image.tmdb.org/t/p/w500'
}


const getmoviedata = async(movieId) => {
      try {
        let data = await fetch(getUrlMovie(movieId))
        data = await data.json()
      
        const movieData = {
          id: movieId,
          title: data.title,
          overview: data.overview,
          rating: data.vote_average.toFixed(1),
          genre: data.genres[0].name,
          image: {
            original: img_url.original + data.backdrop_path,
            small: img_url.small + data.backdrop_path,
          }
        }
  
        return movieData;

      } catch(e) {
        console.log('error:',e)
      }

      return null
}
  


const activateMovie = (id)=>{
  let movie = document.getElementById(id)
  movie.classList.add('active')
}



  const setMainMovie = async(movieID, index)=>{

    let currentmovie = document.querySelector('.active')
    currentmovie ? currentmovie.classList.remove('active') : null

    activateMovie(movieID)

    let movie = await getmoviedata(movieID)

    const img = document.querySelector('.main-movie-img img')
    img.setAttribute('src', movie.image.original)

    

    const strong = document.querySelector('#rating').innerText = movie.rating;
    const span = document.querySelector('.movie-genre').innerText = movie.genre;
    const h1 = document.querySelector(".movie-name").innerText = movie.title;
    const p = document.querySelector('.movie-description').innerText = movie.overview

// #### função para quando o main movie for setado no menu responsivo ####
    handleToggle()
    
  }

  
  function SetmovieInlist(movie){

      let li = document.createElement('li')
      li.setAttribute('class','movie')
      li.setAttribute('id',movie.id)


      let span = document.createElement('span')
      span.setAttribute('class','genre')
      span.innerText = movie.genre

      let strong = document.createElement('strong')
      strong.setAttribute('class','name')
      strong.innerText = movie.title
      
      let button = document.createElement('button')
      button.setAttribute('class','btn-play')
      button.setAttribute('onclick',`setMainMovie('${movie.id}')`)
      button.innerHTML = `<img src="./assets/icon-play-button.png" alt="icon play">`

      let div = document.createElement('div')
      div.setAttribute('class','img')
      div.innerHTML = `<img src="${movie.image.small}" alt="movie image" loading="lazy">`

      li.appendChild(span)
      li.appendChild(strong)
      li.appendChild(button)
      li.appendChild(div)


      movieslist.appendChild(li)
  }


// # lidando com a aparencia dos botões da lista de filmes e mob ########

  const handleToggle = ()=>{
      let button = document.querySelector('.menu-btn')
      button.classList.toggle('active-btn')

      let aside = document.querySelector('.aside')
      aside.classList.toggle('activated')
  }



const handleSearch = (query)=>{

    ClearMoviesList() 

    movies.forEach( async(movieID)=>{
      let moviedata = await getmoviedata(movieID)

      let title = moviedata.title.toLowerCase()
    
      if(title.includes(query)){
        SetmovieInlist(moviedata)
      }
    
    })
}



//evento para a barra search
search_input.addEventListener('input',(e)=>{
   let query = e.target.value;

   handleSearch(query)
})


const loadMovies = ()=>{

  movies.map(async(item, index)=>{

      let moviedata  = await getmoviedata(item);
      SetmovieInlist(moviedata)

      index === 0 ? setMainMovie(moviedata.id,index) : null

  })
}

loadMovies()

