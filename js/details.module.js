const gameContainer = document.querySelector('.selectedGameContainer')


async function getSelectedGame(){
    const gameId = localStorage.getItem('selectedGame')
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd59148f372mshc758d5d0e179797p1ec2c4jsnfcb1e5950009',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    const api = await fetch(url, options);
    const response = await api.json()
    return response
}

export async function displaySelectedGame(){
    const theGame = await getSelectedGame()
    let container = `
    
            <div class="row">
            <div class="col-sm-12 col-md-4 p-3">
                <h2 class="my-3">Details Game</h2>
                <div class="gameImage">
                    <img class="w-100" src="${theGame.thumbnail}" alt="${theGame.title}">
                </div>
            </div>
            <div class="col-sm-12 col-md-8 p-3">
                <div class="detailsCaption">
                    <div class="mainDetails">
                        <h4><span id="gameName">${theGame.title}</span></h4>
                        <p>Category: <span class="gener" id="gameCategory">${theGame.genre}</span></p>
                        <p>Platform: <span class="gener" id="gamePlatform">${theGame.platform}</span></p>
                        <p>Status: <span class="gener" id="gameStatus">${theGame.status}</span></p>
                    </div>
                    <div class="description">
                            <p>${theGame.description}</p>
                    </div>
                    <a target="_blank" href="${theGame.game_url}" class="btn" id="showGame">Show Game</a>
                </div>
            </div>
        </div>

    `

    gameContainer.innerHTML = container

}

