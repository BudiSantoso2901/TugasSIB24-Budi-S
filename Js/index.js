let searchHistory = []; 

async function fetchData(){
    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const pokemonNameDisplay = document.getElementById("pokemonNameDisplay");
        const pokemonStats = document.getElementById("pokemonStats");
        const pokemonTypes = document.getElementById("pokemonTypes");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        pokemonNameDisplay.textContent = pokemonName;
        pokemonStats.innerHTML = "";
        data.stats.forEach(stat => {
            const statItem = document.createElement("li");
            statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            pokemonStats.appendChild(statItem);
        });

        pokemonTypes.innerHTML = "";
        data.types.forEach(type => {
            const typeItem = document.createElement("li");
            typeItem.textContent = type.type.name;
            pokemonTypes.appendChild(typeItem);
        });

        const pokemonInfoDiv = document.getElementById("pokemonInfo");
        pokemonInfoDiv.style.display = "block";

        // Menambahkan pencarian ke dalam riwayat
        if (!searchHistory.includes(pokemonName)) {
            searchHistory.push(pokemonName);
            renderSearchHistory();
        }
    }
    catch(error){
        console.error(error);
    }
}

function renderSearchHistory() {
    const historyContainer = document.getElementById("searchHistory");
    historyContainer.innerHTML = "";
    searchHistory.forEach(pokemon => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-card");
        historyItem.innerHTML = `
        <div class="card" style="background-color: #333333; color: #aaaaaa; margin-bottom: 10px;">
        <div class="card-body">
            <img src="" alt="Pokemon Sprite" id="pokemonSprite" style="display: none">
            <div id="pokemonInfo" style="display: none;">
                <h2 id="pokemonNameDisplay"></h2>
                <h3>Stats:</h3>
                <ul id="pokemonStats"></ul>
                <h3>Type:</h3>
                <ul id="pokemonTypes"></ul>
            </div>
            <button class="btn btn-primary" onclick="fetchPokemon('${pokemon}')">View</button>
        </div>
    </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}

function fetchPokemon(pokemon) {
    document.getElementById("pokemonName").value = pokemon;
    fetchData();
}
