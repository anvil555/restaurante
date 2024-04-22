/**
 * https://github.com/anvil555/restaurante.git
 */

class RestaurantManagerView {
    /**
     * en el constructor declaramos los id de los elementos fijos que se
     * crean desde el html
     * si declaramos alguno de los que generamos en las vistas posteriores
     * evidentemente genera un error ya que estariamos llamando a una variable que todavia
     * no esta declarada.
     */
    constructor() {
        this.main = document.getElementsByTagName('main')[0];
        this.nav = document.getElementById('navegador');
        this.cat = document.getElementById('cat');
        this.randomDish = document.getElementById('randomdish');
        this.header = document.getElementById('header');

    }
    /**
     * metodo con las vistas iniciales de la página
     */
    init() {
        this.showMenu();
        this.main.replaceChildren();
    }

    /**
     * listener para el boton de inicio y el logo de la pagina y devolver 
     * la página al estado inicial
     * @param {*} handler 
     */
    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            handler();
        });
        document.getElementById('tarea').addEventListener('click', (event) => {
            handler();
        });

    }
    /**
     * funcion que genera la vista del navegador
     */
    showMenu() {
        this.nav.replaceChildren();//vacia el elemento
        this.nav.insertAdjacentHTML('afterbegin',
            `<a href="#" id="cat">Categorías</a>
            <a href="#" id="dish">Platos</a>
            <a href="#" id="aller">Alérgenos</a>
            <a href="#" id="menu">Menús</a>
            <a href="#" id="rest">Restaurantes</a>`);

    }

    /*
    creamos el listener para el boton de categorias.
    */
    bindCategories(handler) {
        document.getElementById('cat').addEventListener('click', (event) => {
            handler();
        });

    }

    /*
    creamos el hmtl con los datos de las categorias que recibimos del manejador
    */
    showCategoriesType(categories) {
        this.showTitle('Categorías');

        let list = document.createElement('section');
        list.classList.add(("item-list"));
        this.main.append(list);
        for (const [key, value] of categories) {
            list.insertAdjacentHTML('beforeend', `
        <div class='card'>
            <img src='./images/cat.jpg' alt='aller1' data-category='${key}'>
            <div class='container'>
                 <li data-category='${key}'>${key}</li>
            </div>
        </div>`)
        }
    }
    /*
    creamos el listener para el boton de platos.
    */
    bindDishes(handler) {
        document.getElementById('dish').addEventListener('click', (event) => {
            handler();
        });

    }
    /*
    creamos el hmtl con los datos de los platos que recibimos del manejador
    */
    showDishesType(dishes) {
        this.showTitle('Platos');
        let list = document.createElement('section');
        list.classList.add(("item-list"));
        this.main.append(list);
        for (const [key, value] of dishes) {
            list.insertAdjacentHTML('beforeend', `
        <div class='card'>
            <img src='./images/dish.jpg' alt='dish' data-dish='${key}'>
            <div class='container'>
                 <li data-dish='${key}'>${key}</li>
            </div>
        </div>`)
        }
    }
    /*
   creamos el listener para el boton de alérgenos.
   */
    bindAllergens(handler) {
        document.getElementById('aller').addEventListener('click', (event) => {
            handler();
        })

    }
    /*
    creamos el hmtl con los datos de los alérgenso que recibimos del manejador
    */
    showAllergensType(allergens) {
        this.showTitle('Alérgenos');
        let list = document.createElement('section');
        list.classList.add(("item-list"));
        this.main.append(list);
        for (const [key, value] of allergens) {
            list.insertAdjacentHTML('beforeend', `
        <div class='card'>
            <img src='./images/aller.jpg' alt='aller1' data-allergen='${key}'>
            <div class='container'>
                 <li data-allergen='${key}'>${key}</li>
            </div>
        </div>`)
        }
    }
    /*
   creamos el listener para el boton de menús.
   */
    bindMenus(handler) {
        document.getElementById('menu').addEventListener('click', (event) => {
            handler();
        })

    }
    /*
    creamos el hmtl con los datos de los menús que recibimos del manejador
    */
    showMenusType(menus) {
        this.showTitle('Menús');
        let list = document.createElement('section');
        list.classList.add(("item-list"));
        this.main.append(list);
        for (const [key, value] of menus) {
            list.insertAdjacentHTML('beforeend', `
        <div class='card'>
            <img src='./images/menu.jpg' alt='aller1' data-menu='${key}'>
            <div class='container'>
                 <li data-menu='${key}'>${key}</li>
            </div>
        </div>`)
        }
    }

    /*
   creamos el listener para el boton de menús.
   */
    bindRestaurants(handler) {
        document.getElementById('rest').addEventListener('click', (event) => {
            handler();
        })

    }
    /*
    creamos el hmtl con los datos de los restaurantes que recibimos del manejador
    */
    showRestaurantsType(restaurants) {
        this.showTitle('Restaurantes');
        let list = document.createElement('section');
        list.classList.add(("item-list"));
        this.main.append(list);
        for (const [key, value] of restaurants) {
            list.insertAdjacentHTML('beforeend', `
        <div class='card'>
            <img src='./images/rest.jpg' alt='rest' data-restaurant='${key}'>
            <div class='container'>
                 <li data-restaurant='${key}'>${key}</li>
            </div>
        </div>`)
        }
    }
    /**
     * listener de los alergenos
     * en el data type (dataset.allergen) pasamos el valor que estamos 
     * recibiendo en el evento click al manejador.
     * @param {*} handler 
     */
    bindAllergensDetails(handler) {
        let itemList = this.main.querySelectorAll('.container li');
        // console.log(itemList.length);
        itemList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.allergen);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        // console.log(imagenList.length);
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.allergen);
            })
        })
    }
    /**
     * vista que muestra el detalle de un alérgeno.
     * como el objeto allergen puede tener asociados otros elementos
     * como son los platos en este caso, ponemos la condicional del principio
     * 
     * el valor del mapa puede ser un objeto literal donde se encuentre la propiedad
     * allergen.allergen ó alleren.dishes con los platos relacionados con ese alérgeno.
     * @param {} allergen 
     */
    showAllergenDetail(allergen) {
        let temp;
        this.main.replaceChildren();
        if (allergen.allergen) {
            temp = allergen.allergen;
        } else {
            temp = allergen;
        }
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Alérgenos > ${temp.name}</h2>
        <section class='ficha' id='ficha'>
            <img src='./images/aller.jpg' alt='aller1'>
            <article class='detalle'>
                <h3>${temp.name}</h3>
                <li>${temp.description}</li>
            </article>        
        </section>`);
        if (allergen.dishes) {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Platos relacionados</h3>
                <section class='item-list' id='itemlist'><section>`
            )
            let itemlist = document.getElementById('itemlist');

            for (const [key, value] of allergen.dishes) {
                itemlist.insertAdjacentHTML('beforeend',
                    `<div class='card'>
                            <img src='./images/dish.jpg' alt='aller1' data-dish='${key}'>
                            <div class='container'>
                                <li data-dish='${key}'>${key}</li>
                            </div>
                    </div>`
                )
            }
        } else {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Platos relacionados</h3>
                <h3 class='no-asignado'>No conocidos</h3>
                <section class='aller-list' id='allerlist'><section>`);

        }
    }

    /**
     * listener con los platos de cada categoría 
     * @param {*} handler 
     */
    bindDishInCategory(handler) {
        let itemlist = this.main.querySelectorAll('.container li');
        // console.log(itemlist.length);
        itemlist.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.category);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        // console.log(imagenList.length);
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.category);
            })
        })
    }
    /**
     * vista que muestra los platos de una categoria y muestra el rastro de migas de pan
     * 
     * @param {*} dishes coleccion de  platos de una categoria 
     * @param {*} name nombre de la categoria
     */
    showDishInCategory(dishes, name) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin',
            `<h2>Categoría > ${name}</h2>
        <section class='item-list' id='itemlist'></section>
        `);
        let itemlist = document.getElementById('itemlist');
        for (const dish of dishes) {
            itemlist.insertAdjacentHTML('afterbegin',
                `<div class='card'>
                <img src='./images/dish.jpg' alt='aller1' data-dish='${dish.name}'>
                <div class='container'>
                    <li data-dish='${dish.name}'>${dish.name}</li>
                </div>
            </div>
            `)
        }
    }
    /**
     * listener de los platos seleccionados
     * @param {*} handler 
     */
    bindSelectDish(handler) {
        let itemlist = this.main.querySelectorAll('.container li');
        itemlist.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })

    }

    /**
     * listener con los alergenos seleccionados.
     * @param {*} handler 
     */
    bindSelectAllergen(handler) {
        let allerList = document.getElementById('allerlist');
        let selectorAller = allerList.querySelectorAll('.container li');
        //console.log(selectorAller.length)
        selectorAller.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.allergen);
            })
        })
        let imagenAllerList = allerList.querySelectorAll('.card img');
        imagenAllerList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.allergen);
            })
        })

    }
    /**
     * listener para los menus 
     * @param {*} handler 
     */
    bindSelectMenu(handler) {
        let menuList = document.getElementById('menulist');
        let selectorMenu = menuList.querySelectorAll('.container li');
        //console.log(selectorMenu.length)
        selectorMenu.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.menu);
            })
        })
        let imagenMenuList = menuList.querySelectorAll('.card img');
        imagenMenuList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.menu);
            })
        })
    }
    /**
     * vista que recibe toda la informacion de un plato: plato, alergenos
     * , menus y la muestra por pantalla
     * @param {*} item plato completo
     */
    showSelectDishDetail(item) {
        // console.log(item);
        let detalle;
        if (item.category) {
            detalle = item.category.name;
        } else {
            detalle = "Sin Categoría asignada";
        }
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Categoría > ${detalle} > ${item.dish.name}</h2>
        <section class='ficha' id='ficha'>
            <img src='./images/dish.jpg' alt='dish'>
            <article class='detalle'>
                <h3>${item.dish.name}</h3>
                <li>${item.dish.description}</li>
                <h4>Ingredientes</h4>
                <ul id="ingredientes"></ul>
            </article>        
        </section>`);
        let ingredientes = document.getElementById('ingredientes');
        for (const ingrediente of item.dish.ingredients) {
            ingredientes.insertAdjacentHTML('afterbegin',
                `<li>${ingrediente}</li>`)
        }
        if (item.allergen.length > 0) {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Alérgenos relacionados</h3>
                <section class='aller-list' id='allerlist'><section>`);
            let allerlist = document.getElementById('allerlist');
            for (const allergen of item.allergen) {
                allerlist.insertAdjacentHTML('afterbegin',
                    `<div class='card'>
                    <img src='./images/aller.jpg' alt='aller1' data-allergen='${allergen.name}'>
                    <div class='container'>
                        <li data-allergen='${allergen.name}'>${allergen.name}</li>
                    </div>
                </div>
            `)
            }
        } else {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Alérgenos relacionados</h3>
                <h3 class='no-asignado'>No conocidos</h3>
                <section class='aller-list' id='allerlist'><section>`);

        }

        if (item.menu.length > 0) {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Menús relacionados</h3>
                <section class='menu-list' id='menulist'>`);
            let menulist = document.getElementById('menulist');
            for (const menu of item.menu) {
                menulist.insertAdjacentHTML('afterbegin',
                    ` 
                    <div class='card'>
                        <img src='./images/menu.jpg' alt='menu1' data-menu='${menu.name}'>
                        <div class='container'>
                            <li data-menu='${menu.name}'>${menu.name}</li>
                        </div>
                    </div>
                <section>`);
            }

        } else {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Menús relacionados</h3>
                <h3 class='no-asignado'>No conocidos</h3>
                <section class='menu-list' id='menulist'></section>`);

        }
    }
    /**
     * listener para los platos en la vista de platos
     * @param {*} handler 
     */
    bindDishInDishes(handler) {
        let itemlist = this.main.querySelectorAll('.container li');
        // console.log(itemlist.length);
        itemlist.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        // console.log(imagenList.length);
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })
    }
    /**
     * listener para los menus en la vista de menus
     * @param {*} handler 
     */
    bindMenuDetails(handler) {
        let itemList = this.main.querySelectorAll('.container li');
        itemList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.menu);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.menu);
            })
        })
    }
    /**
     * vista que muestra el detalle de un menu y sus platos relacionados.
     * @param {*} item 
     */
    showMenuDetails(item) {
        let menu;
        if (item.menu) {
            menu = item.menu;
        } else {
            menu = item;
        }
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Menús > ${menu.name}</h2>
            <section class='ficha' id='ficha'>
                <img src='./images/menu.jpg' alt='menu'>
                <article class='detalle'>
                    <h3>${menu.name}</h3>
                    <li>${menu.description}</li>
                </article>        
            </section>`);
        if (item.dishes) {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Platos relacionados</h3>
                <section class='item-list' id='itemlist'><section>`
            )
            let itemlist = document.getElementById('itemlist');

            for (const [key, value] of item.dishes) {
                itemlist.insertAdjacentHTML('beforeend',
                    `<div class='card'>
                                <img src='./images/dish.jpg' alt='dish' data-dish='${key}'>
                                <div class='container'>
                                    <li data-dish='${key}'>${key}</li>
                                </div>
                        </div>`
                )
            }
        } else {
            {
                this.main.insertAdjacentHTML('beforeend',
                    `<h3>Platos relacionados</h3>
                        <h3 class='no-asignado'>No conocidos</h3>`);

            }
        }

    }
    /**
     * listener para los restaurantes en la vista de restaurantes
     * @param {*} handler 
     */
    bindRestaurantDetails(handler) {
        let itemList = this.main.querySelectorAll('.container li');
        itemList.forEach(function (item, key) {
            // console.log(item);
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.restaurant);
            })
        })
        let imagenList = this.main.querySelectorAll('.card img');
        imagenList.forEach(function (item, key) {
            // console.log(item);
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.restaurant);
            })
        })
    }

    /**
     * vista que muestra el detalle de los restaurantes.
     * @param {*} restaurant 
     */
    showRestaurantDetail(restaurant) {

        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Restaurantes > ${restaurant.name}</h2>
                <section class='ficha' id='ficha'>
                    <img src='./images/rest.jpg' alt='restaurante'>
                    <article class='detalle'>
                        <h3>${restaurant.name}</h3>
                        <li>${restaurant.description}</li>
                        <h4>Localización</h4>
                        <ul id="coordenadas">                            
                        </ul>
                    </article>        
                </section>`);
        let coordenadas = document.getElementById('coordenadas');
        if (restaurant.location) {
            coordenadas.insertAdjacentHTML('beforeend',
                `<li>${restaurant.location.latitude} , 
            ${restaurant.location.longitude}</li>`);
        } else {
            coordenadas.insertAdjacentHTML('beforeend',
                `<li>Sin información</li>`);
        }
    }

    /**
     * vista para el menu desplegable de restaurantes en el header de la pagina
     * @param {*} restaurants 
     */
    showContenidoRest(restaurants) {
        let contenidoRest = document.getElementById('contenidorest');
        contenidoRest.replaceChildren();
        restaurants.forEach(function (value, key) {
            contenidoRest.insertAdjacentHTML('beforeend',
                `<option class='option' value='${key}' data-restaurant='${key}'>${key}</option>`)
        })
    }
    /**
     * listener para los elementos del desplegable de los restaurantes.
     * @param {*} handler 
     */
    bindShowContenidoRest(handler) {
        let contenidoRest = document.getElementById('contenidorest');
        let options = contenidoRest.querySelectorAll('.option');
        // console.log(options.length);
        options.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.restaurant);
            })
        })
    }
    /**
     * vista para el menu desplegable de categorias en el header de la pagina
     * @param {*} categories 
     */
    showContenidoCat(categories) {
        let contenidoCat = document.getElementById('contenidocat');
        contenidoCat.replaceChildren();
        categories.forEach(function (value, key) {
            contenidoCat.insertAdjacentHTML('beforeend',
                `<option class='option' value='${key}' data-category='${key}'>${key}</option>`)
        })
    }
    /**
     * listener para los elementos del desplegable de categorias 
     * @param {} handler 
     */
    bindShowContenidoCat(handler) {
        let contenidoCat = document.getElementById('contenidocat');
        let options = contenidoCat.querySelectorAll('.option');
        // console.log(options.length);
        options.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.category);
            })
        })
    }

    /**
     * vista para los platos aleatorios 
     * @param {*} dishes 
     */
    showRandomDish(dishes) {
        this.randomDish.replaceChildren();

        for (const dish of dishes) {
            this.randomDish.insertAdjacentHTML('afterbegin',
                `<div class='card'>
                <img src='./images/dish.jpg' alt='aller1' data-dish='${dish.name}'>
                <div class='container'>
                    <li data-dish='${dish.name}'>${dish.name}</li>
                </div>
            </div>
            `)
        }

    }
    /**
     * listener para los platos aleatorios.
     * @param {} handler 
     */
    bindRandomDish(handler) {
        let randomDish = this.randomDish.querySelectorAll('.container li');
        randomDish.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })
        let imagenList = this.randomDish.querySelectorAll('.card img');
        imagenList.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.dish);
            })
        })
    }

    /**
     * funcion auxiliar para mostrar el titulo de la vista en la que nos encontramos.
     * @param {*} titleCat 
     */
    showTitle(titleCat) {
        this.main.replaceChildren();
        let title = document.createElement('h2');
        let nombre = document.createTextNode(titleCat);
        title.appendChild(nombre);
        this.main.append(title);
    }

    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/


    showContenidoOpt() {
        let contenidoOpt = document.getElementById('contenidoopcion');
        contenidoOpt.replaceChildren();
        contenidoOpt.insertAdjacentHTML('beforeend',
            `<option class='option' value='newdish'data-option='newdish'>Nuevo Plato</option>
            <option class='option' value='removedish' data-option='removedish'>Eliminar Plato</option>
            <option class='option' value='menugest' data-option='menugest'>Gestión Menús</option>
            <option class='option' value='categorygest' data-option='categorygest'>Gestión Categorías</option>
            <option class='option' value='newrest' data-option='newrest'>Nuevo Restaurante</option>
            <option class='option' value='dishcategory' data-option='dishcategory'>Gestión Platos y Categorías</option>          
            `);
    }

    bindshowContenidoOpt(handler) {
        let contenidoOpt = document.getElementById('contenidoopcion');
        let options = contenidoOpt.querySelectorAll('.option');
        // console.log(options.length);
        options.forEach(function (item, key) {
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.option);
            })
        })
    }
    showDishModal(handler, categories, menus) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                    <div id="myModal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <section class='headerform'>
                                <div>
                                    <h3>Añade un plato a la colección...</h3>
                                </div>                                    
                                    <a class="close">&times;</a>                                
                            </section>
                            <form name="dishform" role="form">
                                <section class="formclass">
                                    <article>
                                        <div class="form-group">
                                            <label for="name">Nombre del Plato:</label>
                                            <input type="text" class="formcontrol" id="name" name="name" placeholder="Nombre del plato" value="" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="descripcion">Descripción del Plato:</label>
                                            <input type="text" class="formcontrol" id="description" name="description" placeholder="Descripción"  value="" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="ingredients">Ingredientes:</label>
                                            <div class="add-ingredient">
                                                <input type="text" class="formcontrol" id="ingredient" name="ingredient"
                                                    placeholder="Añade un ingrediente...">
                                                <button id='addIngredientBt'>Add</button>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <legend>Lista de ingredientes</legend>
                                            <textarea id='listareaIngredientes'></textarea>
                                        </div>
                                        
                                    </article>
                                    <article id='dishoptions'>
                                        <div class="form-group">
                                            <label for="imagen">Imagen:</label>
                                            <input type="file" class="formcontrol" id="image" name="imagen" value="imagen" style='margin-top:16px;'>
                                        </div>
                                        
                                        <div class="form-group" style='margin-top:16px;' >
                                            <label for="name">Categorías:</label>
                                            <select class="formcontrol" id="categorySl" name="category" required>
                                                <option value=''>Elige una categoría...</option>
                                            </select>
                                        </div>  
                                        <div class="form-group">
                                            <label for="name">Alérgenos:</label>
                                            <select class="formcontrol" id="allergenSl" name="allergen">
                                                <option value=''>Añade un alérgeno...</option>
                                            </select>
                                        </div>
                                        <div class="form-group" style="margin-top:2px">
                                            <legend>Lista de alérgenos</legend>
                                            <textarea id='listareaAlergenos'></textarea>
                                        </div>
                                    </article>
                                </section>
                                <button type="submit" id='agregarDishBt'>Agregar</button>
                                <button type="reset" id='resetDishBt'>Cancelar</button>
                            </form>
                        </div>
                    </div>`
        );
        let modal = document.getElementById("myModal");

        //gestion de categorias
        let categorySl = document.getElementById('categorySl');
        categories.forEach(function (value, key) {
            categorySl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        //gestion de alergenos
        let listaAlergenos = [];
        let listaAreaAlergenos = document.getElementById('listareaAlergenos');
        let allergenSl = document.getElementById('allergenSl');
        menus.forEach(function (value, key) {
            allergenSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        allergenSl.addEventListener('change', () => {
            listaAlergenos.push(allergenSl.value);
            listaAlergenos.sort();
            listaAreaAlergenos.append(allergenSl.value + ", ");
        })
        //gestion de ingredientes
        let listaIngredientes = [];
        let listAreaIngredientes = document.getElementById('listareaIngredientes');
        let addIngredientBt = document.getElementById('addIngredientBt');
        addIngredientBt.addEventListener('click', (event) => {
            let ingredient = document.getElementById('ingredient');
            let ingredValue = ingredient.value;
            if (!ingredValue) {
                ingredient.setCustomValidity('Añade un ingrediente');
            } else {
                event.preventDefault();
                listaIngredientes.push(ingredValue);
                listaIngredientes.sort();
                listAreaIngredientes.append(ingredValue + ", ");
                ingredient.value = "";
            }
        })


        // //pendiente validar imagen
        // let imageFormat = document.getElementById('image');
        // imageFormat.addEventListener('invalid', function () {
        //     this.setCustomValidity('Debe seleccionar un archivo con extensión jpg,png o gif.');
        // });

        // imageFormat.addEventListener('change', function () {
        //     this.setCustomValidity('');
        //     if (!this.checkFileExtension(this.files[0], ['jpg', 'png', 'gif'])) {
        //         this.setCustomValidity('Debe seleccionar un archivo con extensión jpg, png o gif.');
        //     }
        //     let size = 10;
        //     if (this.checkFileSize(this.files[0], size)) {
        //         this.setCustomValidity(`"El archivo ${this.files[0].name} no debe ser
        //    mayor a ${size}KB"`);
        //     }
        // });


        //gestion de boton agregar plato
        let addDishBt = document.getElementById('agregarDishBt');
        addDishBt.addEventListener('click', (event) => {
            let dish = {};
            let name = document.getElementById('name').value;
            let description = document.getElementById('description').value;
            let imageFormat = document.getElementById('image');
            let image = imageFormat.value;

            //imagen
            if (!image) {
                image = './images/rest.jpg';
            }


            let category = document.getElementById('categorySl').value;


            if (name && description && category) {
                event.preventDefault();
                dish.name = name;
                dish.description = description;
                dish.ingredients = listaIngredientes;
                dish.image = image;
                handler(dish, category, listaAlergenos);
            }

        })//fin de listener

        //gestion de boton cancelar
        let resetDishBt = document.getElementById('resetDishBt');
        resetDishBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();

    }

    /**
     * mostramos el modal para eliminar un plato 
     * @param {*} dishes 
     */
    showRemoveDishModal(handler, dishes) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">
                                <section class='headerform'>
                                    <div>
                                        <h3>Elimina un plato de la colección...</h3>
                                    </div>                                    
                                        <a class="close">&times;</a>                                
                                </section>
                                <form name="dishform" role="form">
                                    <section class="formclass">
                                        <article id='dishoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Platos:</label>
                                                <select class="formcontrol" id="dishSl" name="dish" required>
                                                    <option value=''>Selecciona un plato...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                    </section>
                                    <section>
                                        <button type="submit" id='removeDishBt'>Eliminar</button>
                                        <button type="reset" id='resetBt'>Cancelar</button>
                                    </section>
                                </form>
                            </div>
                        </div>`);
        //gestion de select dishes
        let dishSl = document.getElementById('dishSl');
        dishes.forEach(function (value, key) {
            dishSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });

        //gestion del boton eliminar
        let removeDishBt = document.getElementById('removeDishBt');
        removeDishBt.addEventListener('click', (event) => {
            let dishValue = dishSl.value;
            if (dishValue) {
                event.preventDefault();
                handler(dishValue);
            }
        })

        //gestion de boton cancelar
        let modal = document.getElementById("myModal");
        let resetBt = document.getElementById('resetBt');
        resetBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();

    }


    showMenuGestModal(handler, menus, dishes) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">
                                <section class='headerform'>
                                    <div>
                                        <h3>Gestión de menús</h3>
                                    </div>                                    
                                        <a class="close">&times;</a>                                
                                </section>
                                <form role="form">
                                    <div>
                                        <h4>Asignar menús</h4>
                                    </div> 
                                    <section class="formclass">
                                    
                                    <article id='menuoptions'>                                 
                                        <div class="form-group">
                                            <label for="name">Menús:</label>
                                            <select class="formcontrol" id="menuSl" name="menu" required>
                                                <option value=''>Selecciona un menu...</option>
                                            </select>
                                        </div>                                           
                                    </article>
                                        <article id='dishoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Platos:</label>
                                                <select class="formcontrol" id="dishSl" name="dish" required>
                                                    <option value=''>Selecciona un plato...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                    <button type="submit" id='assignMenuhBt'>Asignar</button>

                                    </section>
                                    <div>
                                        <h4>Eliminar platos de menús</h4>
                                    </div> 
                                </form>
                                <form role="form">
                                    <section class="formclass">                                    
                                        <article id='menuoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Menús:</label>
                                                <select class="formcontrol" id="menuFullSl" name="menu" required>
                                                    <option value=''>Selecciona un menu...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                        <article id='dishoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Platos:</label>
                                                <select class="formcontrol" id="dishFullSl" name="dish" required>
                                                    <option value=''>Selecciona un plato...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                        <button type="submit" id='desAssignMenuhBt'>Quitar</button>
                                    </section>
                                    <section>
                                        <button type="reset" id='resetBt'>Cancelar</button>
                                    </section>
                                </form>
                            </div>
                        </div>`);

        //gestion de asignar menus
        let menuSl = document.getElementById('menuSl');
        menus.forEach(function (value, key) {
            menuSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        //lo suyo seria mostrar solo los platos que no estan en ese menu.
        let dishSl = document.getElementById('dishSl');
        dishes.forEach(function (value, key) {
            dishSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });



        let assignMenuhBt = document.getElementById('assignMenuhBt');
        assignMenuhBt.addEventListener('click', (event) => {
            let dishValue = dishSl.value;
            let menuValue = menuSl.value;
            if (dishValue && menuValue) {
                event.preventDefault();
                handler(dishValue, menuValue)
            }
        })


        //gestion de desasignar menus
        let menuFullSl = document.getElementById('menuFullSl');
        menus.forEach(function (value, key) {
            menuFullSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        let dishFullSl = document.getElementById('dishFullSl');
        menuFullSl.addEventListener('change', () => {
            let menuSelect = menuFullSl.value;
            if (menus.has(menuSelect)) {
                let storedMenu = menus.get(menuSelect);
                dishFullSl.replaceChildren();
                storedMenu.dishes.forEach(function (value, key) {
                    dishFullSl.insertAdjacentHTML('beforeend',
                        `<option value='${key}'>${key}</option>`
                    )
                })
            }
        })
        let desAssignMenuhBt = document.getElementById('desAssignMenuhBt');
        desAssignMenuhBt.addEventListener('click', (event) => {
            let dishValue = dishFullSl.value;
            let menuValue = menuFullSl.value;
            if (dishValue && menuValue) {
                event.preventDefault();
                handler(dishValue, menuValue)
            }
        })



        //gestion de boton cancelar
        let modal = document.getElementById("myModal");
        let resetBt = document.getElementById('resetBt');
        resetBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();
    }
    showCategoryGestModal(handler, categories) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                    <div id="myModal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <section class='headerform'>
                                <div>
                                    <h3>Gestión de categorías</h3>
                                </div>                                    
                                    <a class="close">&times;</a>                                
                            </section>
                            <form name="categoryform" role="form">
                                    <div>
                                        <h4>Eliminar categoría</h4>
                                    </div> 
                                <section class="formclass">
                                    <article id='optionsCat'>                                 
                                        <div class="form-group">
                                            <label for="name">Categorías:</label>
                                            <select class="formcontrol" id="categorySl" name="category" required>
                                                <option value=''>Selecciona una categoría...</option>
                                            </select>
                                            <button type="submit" id='removeCategoryBt'>Eliminar Categoría</button>
                                        </div>                                           
                                    </article>
                                </section>
                                </form>
                                <form>
                                    <div>
                                        <h4>Añadir categoría</h4>
                                    </div> 
                                <section class="formclass" style='margin-top:10px'>
                                    <article id='options'>                                 
                                        <div class="form-group">
                                            <label for="name">Nombre:</label>
                                            <input type="text" class="formcontrol" id="name" name="name" placeholder="Nombre de la categoría" value="" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="descripcion">Descripción:</label>
                                            <input type="text" class="formcontrol" id="description" name="description" placeholder="Descripción"  value="" required>
                                        </div>     
                                        <button type="submit" id='addCategoryBt'>Añadir Categoría</button>                            
                                    </article>
                                </section>
                                <section>
                                    <button type="reset" id='resetBt'>Cancelar</button>
                                </section>
                            </form>
                        </div>
                    </div>`);
        let categorySl = document.getElementById('categorySl');
        categories.forEach(function (value, key) {
            categorySl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        //gestion de boton eliminar categoria
        let removeCategoryBt = document.getElementById('removeCategoryBt');
        removeCategoryBt.addEventListener('click', (event) => {
            let catValue = categorySl.value;

            if (catValue) {
                let category = {};
                category.name = catValue;
                event.preventDefault();
                handler(category)
            }
        })
        //gestion de boton eliminar categoria
        let addCategoryBt = document.getElementById('addCategoryBt');
        addCategoryBt.addEventListener('click', (event) => {
            let name = document.getElementById('name').value;
            let description = document.getElementById('description').value;

            if (name && description) {
                let category = {};
                category.name = name;
                category.description = description

                event.preventDefault();
                handler(category)
            }
        })


        //gestion de boton cancelar
        let modal = document.getElementById("myModal");
        let resetBt = document.getElementById('resetBt');
        resetBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();
    }
    showNewRestModal(handler) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                    <div id="myModal" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <section class='headerform'>
                                <div>
                                    <h3>Gestión de restaurantes</h3>
                                </div>                                    
                                    <a class="close">&times;</a>                                
                            </section>
                            <form role="form">
                                <section>
                                    <div>
                                        <h4>Añadir Restaurante</h4>
                                    </div>
                                </section>
                                <section class="formclass" style='margin-top:10px'>
                                    <article id='options'>
                                        <div class="form-group">
                                            <label for="name">Nombre:</label>
                                            <input type="text" class="formcontrol" id="name" name="name" placeholder="Nombre del Restaurante"
                                                value="" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="descrition">Descripción:</label>
                                            <input type="text" class="formcontrol" id="description" name="description" placeholder="Descripción"
                                                value="" required>
                                        </div>
                                    </article>
                                    <article id='coordinate'>
                                        <div class="form-group">
                                            <label for="latitude">Latitud:</label>
                                            <input type="text" class="formcontrol" id="latitude" name="latitude" placeholder="latitud" value="" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="longitude">Longitud:</label>
                                            <input type="text" class="formcontrol" id="longitude" name="longitude" placeholder="longitud" value="" required>
                                        </div>
                                    </article>
                                </section>
                                <section>
                                    <button type="submit" id='addRestaurantBt'>Añadir Restaurante</button>
                                    <button type="reset" id='resetBt'>Cancelar</button>
                                </section>
                            </form>
                        </div>
                    </div>`);

        //gestion del boton añadir restaurante
        let addRestaurantBt = document.getElementById('addRestaurantBt');
        addRestaurantBt.addEventListener('click', (event) => {
            let name = document.getElementById('name');
            let namValue = name.value;
            let description = document.getElementById('description');
            let descValue = description.value;
            let latitude = document.getElementById('latitude');
            let latValue = latitude.value;
            let longitude = document.getElementById('longitude');
            let longValue = longitude.value;
            let restaurant = {};
            if (namValue && descValue && latValue && longValue) {
                event.preventDefault();
                restaurant.name = namValue;
                restaurant.description = descValue;
                restaurant.latitude = latValue;
                restaurant.longitude = longValue;
                handler(restaurant);
            }
        })


        //gestion de boton cancelar
        let modal = document.getElementById("myModal");
        let resetBt = document.getElementById('resetBt');
        resetBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();
    }
    showDishCategoryModal(handler, categories, dishes) {
        this.header.insertAdjacentHTML('afterbegin',
            `<!-- MODAL -->
                        <div id="myModal" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">
                                <section class='headerform'>
                                    <div>
                                        <h3>Gestión de Categorías y Platos</h3>
                                    </div>                                    
                                        <a class="close">&times;</a>                                
                                </section>
                                <form role="form">
                                    <div>
                                        <h4>Asignar Categorías</h4>
                                    </div> 
                                    <section class="formclass">
                                    
                                    <article id='catoptions'>                                 
                                        <div class="form-group">
                                            <label for="name">Categorías:</label>
                                            <select class="formcontrol" id="categorySl" name="category" required>
                                                <option value=''>Selecciona una categoría...</option>
                                            </select>
                                        </div>                                           
                                    </article>
                                        <article id='dishoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Platos:</label>
                                                <select class="formcontrol" id="dishSl" name="dish" required>
                                                    <option value=''>Selecciona un plato...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                    <button type="submit" id='assignCategoryBt'>Asignar</button>

                                    </section>
                                    <div>
                                        <h4>Eliminar platos de las categorías</h4>
                                    </div> 
                                </form>
                                <form role="form">
                                    <section class="formclass">                                    
                                        <article id='categoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Categorías:</label>
                                                <select class="formcontrol" id="categoryFullSl" name="category" required>
                                                    <option value=''>Selecciona una categoría...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                        <article id='dishoptions'>                                 
                                            <div class="form-group">
                                                <label for="name">Platos:</label>
                                                <select class="formcontrol" id="dishFullSl" name="dish" required>
                                                    <option value=''>Selecciona un plato...</option>
                                                </select>
                                            </div>                                           
                                        </article>
                                        <button type="submit" id='desAssignCategoryBt'>Quitar</button>
                                    </section>
                                    <section>
                                        <button type="reset" id='resetBt'>Cancelar</button>
                                    </section>
                                </form>
                            </div>
                        </div>`);

        //gestion de asignar categorias
        let categorySl = document.getElementById('categorySl');
        categories.forEach(function (value, key) {
            categorySl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        //lo suyo seria mostrar solo los platos que no estan en esa categoria
        let dishSl = document.getElementById('dishSl');
        dishes.forEach(function (value, key) {
            dishSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });

        let assignCategoryBt = document.getElementById('assignCategoryBt');
        assignCategoryBt.addEventListener('click', (event) => {
            let dishValue = dishSl.value;
            let categoryValue = categorySl.value;
            if (dishValue && categoryValue) {
                event.preventDefault();
                handler(dishValue, categoryValue)
            }
        })


        //gestion de desasignar categorias
        let categoryFullSl = document.getElementById('categoryFullSl');
        categories.forEach(function (value, key) {
            categoryFullSl.insertAdjacentHTML('beforeend',
                `<option value='${key}'>${key}</option>`
            )
        });
        let dishFullSl = document.getElementById('dishFullSl');
        categoryFullSl.addEventListener('change', () => {
            let categorySelect = categoryFullSl.value;
            if (categories.has(categorySelect)) {
                let storedCategory = categories.get(categorySelect);
                dishFullSl.replaceChildren();
                storedCategory.dishes.forEach(function (value, key) {
                    dishFullSl.insertAdjacentHTML('beforeend',
                        `<option value='${key}'>${key}</option>`
                    )
                })
            }
        })
        let desAssignCategoryBt = document.getElementById('desAssignCategoryBt');
        desAssignCategoryBt.addEventListener('click', (event) => {
            let dishValue = dishFullSl.value;
            let categoryValue = categoryFullSl.value;
            if (dishValue && categoryValue) {
                event.preventDefault();
                handler(dishValue, categoryValue)
            }
        })



        //gestion de boton cancelar
        let modal = document.getElementById("myModal");
        let resetBt = document.getElementById('resetBt');
        resetBt.addEventListener('click', () => {
            modal.style.display = "none";
        })

        //gestion de modal
        this.gestionModal();
    }



    /**
     * vistas auxiliares para la informacion de los procesos
     * y gestion de las vistas modal
     * 
     * @param {*} item 
     */
    showAlarmModal(item) {
        alert('El elemento ' + item.name + ' ya existe en esta colección');
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    showConfirmModal(item) {
        alert('El elemento ' + item.name + ' se ha guardado en la colección');
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    showDeleteModal(item) {
        alert('El elemento ' + item.name + ' se ha eliminado de la colección');
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    gestionModal() {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            // modal.remove();
            modal.style.display = "none";
        }
        window.onclick = (event) => {
            if (event.target == modal) {
                // modal.remove();
                modal.style.display = "none";
            }
        }

    }

    /**
     * metodos de validacion del input tipo file según los contenidos
     */
    checkFileExtension(file, allowedExtensions) {
        let fileExtension = file.name.split('.').pop().toLowerCase();
        return allowedExtensions.some((extension) => {
            return extension === fileExtension
        });
    }
    checkFileSize(file, size) {
        return (file.size > size * 1024);
    }

}//fin de clase


export default RestaurantManagerView;