const categories = document.querySelectorAll('.nav-link')
let gameItems = document.querySelectorAll('.gameItem')

let request = `mmorpg`

let games = []

const liberary = document.querySelector('.category')


class Game {
	constructor(title, thumbnail, short_description, game_url, genre, platform, id) {
	  this.title = title;
	  this.thumbnail = thumbnail;
	  this.short_description = short_description;
	  this.game_url = game_url;
	  this.genre = genre;
	  this.platform = platform;
	  this.id = id;
	}
  }



  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', () => {
        searchCategory(categories[i].innerHTML); 
        displayGames();
    });
}


  for (let i = 0; i < gameItems.length; i++) {
    gameItems[i].addEventListener('click', () => {
		window.location.href = "../details.html"
    });
}


function searchCategory(searchOn) {
    request = searchOn.toLowerCase();
    games = [];
}


async function getData(){

    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd59148f372mshc758d5d0e179797p1ec2c4jsnfcb1e5950009',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${request}`, options) ;
const response = await api.json()

for(let i = 0; i < response.length; i++) {

	const newGame = new Game(response[i].title, response[i].thumbnail, response[i].short_description, response[i].game_url, response[i].genre, response[i].platform, response[i].id)
	games.push(newGame)

}
}


export async function displayGames() {
	

	await getData()

	let container = ``

	for(let i = 0 ; i < games.length ; i++) {
		container += `
		        <div id='${games[i].id}' class="card gameItem bg-transparent" style="width: 16rem;">
            <img class="card-img-top" src="${games[i].thumbnail}" alt="Card image cap">
            <div class="card-body position-relative">
                <h5 class="gameTitleCard text-white">${games[i].title}</h5>
				<p class="card-text fastCap text-center">${games[i].short_description}</p>
                <p class="gameCondition">free</p>
            </div>
            <div class="lineUp" style="height: 30px;">
                <p class="extraDetails">${games[i].genre}</p>
                <p class="extraDetails">${games[i].platform}</p>
            </div>
          </div>
		`
	}

	liberary.innerHTML = container;

	let gameItems = document.querySelectorAll('.gameItem') 
	for (let i = 0; i < gameItems.length; i++) {
		gameItems[i].addEventListener('click', () => {
			window.location.href = "../details.html"
		});
	}

}



