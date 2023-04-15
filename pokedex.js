//atrapamos todos los elementos que utilizaremos

const cuerpo = document.querySelector(".row");

const obtenerListaPokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`);
  const data = await response.json();
  return data.results;
};

const obtenerDatosPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  //console.log(data.results[0]);
  return data;
};

obtenerListaPokemon().then((poke) => {
  //console.log(poke);
  poke.forEach((element) => {
    console.log(element);
    obtenerDatosPokemon(element.url).then((data) => {
        console.log(data)
      const card = document.createElement("div");
      card.classList.add("card","col-md-4",'m-2','rounded-4');
      card.style.width='18rem';
      card.innerHTML = `<img class="card-img-top" src="${data.sprites.other.dream_world.front_default}" alt="Card image cap">
                        <div class="card-body">
                        <h3 class="card-title">${data.name}</h3>
                        </div>
                        <div class="card-footer bg-transparent border-danger"><a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#detalleModal" onclick="mostrarDetalle(${data.id})"> Ver Detalles</a></div>`;
      cuerpo.appendChild(card);
    });
  });
});

const pokeName = document.querySelector('#poke-name');
const imgPoke = document.querySelector('#img-poke');
const pokeExperience = document.querySelector('#poke-experience');
const pokeWeight = document.querySelector('#poke-weight');
const pokeHeight = document.querySelector('#poke-height');
const pokeHabilidades = document.querySelector('#poke-habilidades');


const mostrarDetalle = (id)=>{
    obtenerDatosPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((data) => {
    pokeName.textContent = data.name;
    imgPoke.src= `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    pokeExperience.textContent = data.base_experience;
    pokeWeight.textContent = data.weight;
    pokeHeight.textContent = data.height;
let habilidades='<ul>';
    data.abilities.forEach(e=>{
        habilidades+=`<li>${e.ability.name}</li>`
    })
    habilidades+='</ul>'
    pokeHabilidades.innerHTML=habilidades;
    });
}
/*
const detalleModal = document.querySelector('#detalleModal')
detalleModal.addEventListener('show.bs.modal', e => {
});*/
