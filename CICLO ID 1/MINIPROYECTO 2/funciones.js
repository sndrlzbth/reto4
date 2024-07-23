const listaPokemon = document.querySelector("#listaPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0;
let limit = 10;

// Obtener y mostrar todos los pokemones
const obtenerYMostrarPokemon = async (i) => {
    try {
        const response = await fetch(`${URL}${i}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        mostrarPokemon(data);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
};

// Mostrar pokemon en html
const mostrarPokemon = (poke) => {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-id-back">#${poke.id}</p>
                     <div class="pokemon-imagen">
                         <img src="${poke.sprites.other["official-artwork"].front_default}" alt="pokemon">
                     </div>
                     <div class="pokemon-info">
                         <div class="nombre-contenedor">
                             <p class="pokemon-id">#${poke.id}</p>
                             <h2 class="pokemon-nombre">${poke.name}</h2>
                         </div>
                         <div class="pokemon-tipos">
                             ${tipos}
                         </div>
                         <div class="pokemon-stats">
                             <p class="stat">${poke.height}M</p>
                             <p class="stat">${poke.weight}kg</p>
                         </div>
                     </div>`;

    listaPokemon.append(div);
};

// Obtener y llamar a la función para obtener y mostrar todos los pokemones
const obtenerLotePokemon = async () => {
    const promises = [];
    for (let i = offset; i <= offset + limit; i++) {
        promises.push(obtenerYMostrarPokemon(i));
    }

    try {
        await Promise.all(promises);
        console.log('Todos los Pokémon han sido cargados correctamente.');
        offset += limit;
    } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
    }
};

// Scroll infinito
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        obtenerLotePokemon();
    }
});

// Llamar a la función
obtenerLotePokemon();