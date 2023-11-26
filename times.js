const teamContainer = document.getElementById('team-container');


const urlParams = new URLSearchParams(window.location.search);
const teamDataUrl = urlParams.get('team');
const teamData = JSON.parse(decodeURIComponent(teamDataUrl));


if (teamData) {
    document.write(`<h2>${teamData.name}</h2>`);
    teamData.pokemons.forEach(poke => {
        renderTeamCard(poke);
    });
} else {
    document.write('<h2>Nenhum time encontrado.</h2>');
}

function renderTeamCard(poke) {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color
    const pokemonInnerHTML = `
                <div class="foto">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
                </div>
                <div class="info">
                    <span class="number">#${id}</span>
                    <h1 class="nome">${name}</h1>
                    <small class="tipo">Tipo: <span>${type}</span></small>
                </div>

    `

    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
    return card;
}