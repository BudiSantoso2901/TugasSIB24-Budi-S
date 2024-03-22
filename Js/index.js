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
    }
    catch(error){
        console.error(error);
    }
}
