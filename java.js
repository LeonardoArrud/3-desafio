const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151
const pokemons = [];
const pokemonsClicados = [];

// Criar cards 
const colors = {
    
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'


}
const mainTypes = Object.keys(colors);

    const fecthPokemons = async() => {
        for(let i = 1; i <= pokemonCount; i++){
            await getPokemons(i)

        }
    }

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
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
// Selecionar pokemon
document.addEventListener('DOMContentLoaded', function() {
    const pokemonsSelecionados = [];

    // Adiciona evento de clique às divs de Pokémon (inclusive aquelas adicionadas dinamicamente)
    document.addEventListener('click', function(event) {
        const divPokemon = event.target.closest('.pokemon');
        if (divPokemon) {
            const nomePokemon = divPokemon.querySelector('.nome').textContent.trim();
            adicionarPokemon(nomePokemon, divPokemon);
        }
    });

    // Adiciona evento de clique ao botão de criar time
    const criarTimeBtn = document.getElementById('criar-time-btn');
    criarTimeBtn.addEventListener('click', function() {
        if (pokemonsSelecionados.length >= 6) {
            const nomeTime = prompt('Digite o nome do time:');
            if (nomeTime) {
                const time = {
                    nome: nomeTime,
                    pokemons: pokemonsSelecionados
                };
                adicionarTimeALista(time);
                pokemonsSelecionados.length = 0; // Limpa a lista de pokémons selecionados
                limparSelecoes(); // Limpa as seleções visuais
            } else {
                alert('O nome do time é obrigatório.');
            }
        } else {
            alert('Selecione pelo menos 6 Pokémon antes de criar um time.');
        }
    });

    // Função para adicionar um Pokémon à lista de selecionados
    function adicionarPokemon(pokemon, divPokemon) {
        if (pokemonsSelecionados.length < 6) {
            pokemonsSelecionados.push(pokemon);
            divPokemon.classList.add('selecionado'); // Adiciona a classe para alterar o estilo visual
            alert(`Pokémon ${pokemon} adicionado!`);
        } else {
            alert('Você já selecionou 6 Pokémon. Crie um time!');
        }
    }

    // Função para limpar as seleções visuais
    function limparSelecoes() {
        const divsPokemon = document.querySelectorAll('.pokemon');
        divsPokemon.forEach(function(divPokemon) {
            divPokemon.classList.remove('selecionado');
        });
    }

    // Função para adicionar o time à lista
    function adicionarTimeALista(time) {
        const listaTimes = document.getElementById('lista-times');
        const listItem = document.createElement('li');
        listItem.textContent = `${time.nome} - ${time.pokemons.join(', ')}`;
        listaTimes.appendChild(listItem);
    }
});


fecthPokemons()