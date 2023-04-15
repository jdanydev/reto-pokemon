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
    obtenerDatosPokemon(element.url).then((data) => {
      const card = document.createElement("div");
      card.classList.add("card","col-md-4",'m-2','rounded-4');
      card.style.width='18rem';
      card.innerHTML = `<img class="card-img-top" width="100" heigth="100" src="${data.sprites.other.dream_world.front_default}" alt="Card image cap">
                        <div class="card-body">
                        <h3 class="card-title">${data.name}</h3>
                        </div>
                        <div class="card-footer bg-transparent border-danger"><a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#detalleModal"> Ver Detalles</a></div>`;
      cuerpo.appendChild(card);
    });
  });
});
