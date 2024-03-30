const dish = ['huevo', 'pisto', 'macarrones'];
let main = document.getElementsByTagName('main')[0];
console.log(dish[0]);
let parrafo = document.createElement("p");
let texto = document.createTextNode(dish[0]);
parrafo.appendChild(texto);
main.appendChild(parrafo);
function imprime(dish, main){
    let lista=document.createElement('ul');
    lista.style.border="1px solid red"
    main.appendChild(lista);

    for (const plato of dish) {
        console.log(plato);
        let categoria = document.createElement('li');
        let nombre= document.createTextNode(plato);
        categoria.appendChild(nombre);
        lista.appendChild(categoria);
    }
}
imprime(dish,main);