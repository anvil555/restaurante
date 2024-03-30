class RestaurantManagerView {
    constructor() {
        this.main = document.getElementsByTagName('main')[0];
        this.nav = document.getElementById('navegador');
        this.cat = document.getElementById('cat');
        this.randomDish = document.getElementById('randomdish');

    }
    init() {
        this.showMenu();
        this.main.replaceChildren();
        //   this.showMain();


    }
    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            handler();
        });

    }
    showMenu() {
        this.nav.replaceChildren();//vacia el elemento
        this.nav.insertAdjacentHTML('afterbegin',
            `<a href="#" id="cat">Categorías</a>
            <a href="#" id="dish">Platos</a>
            <a href="#" id="aller">Alérgenos</a>
            <a href="#" id="menu">Menús</a>
            <a href="#" id="rest">Restaurantes</a>`);

    }


    showMain() {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('afterbegin',
            `<div class="centrador">
            <a href="#" id='cat2'><img src='images/cat.jpg' alt='categoría'></a>
            <a href="#" id="dish2"><img src='images/dish.jpg' alt='platos'></a>
            <a href="#" id="aller2"><img src='images/aller.jpg' alt='alergenos'></a>
            <a href="#" id="menu2"><img src='images/menu.jpg' alt='menu'></a>
            <a href="#" id="rest2"><img src='images/rest.jpg' alt='restaurante'></a>
        </div>`);

    }
    /*
    creamos el listener
    */
    bindCategories(handler) {
        document.getElementById('cat').addEventListener('click', (event) => {
            handler();
        });

    }

    /*
    creamos el hmtl con los datos que recibimos del manejador
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

    bindDishes(handler) {
        document.getElementById('dish').addEventListener('click', (event) => {
            handler();
        });

    }

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
    bindAllergens(handler) {
        document.getElementById('aller').addEventListener('click', (event) => {
            handler();
        })

    }
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
    bindMenus(handler) {
        document.getElementById('menu').addEventListener('click', (event) => {
            handler();
        })

    }
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

    bindRestaurants(handler) {
        document.getElementById('rest').addEventListener('click', (event) => {
            handler();
        })

    }

    showRestaurantsType(restaurants) {
        this.showTitle('Restarurantes');
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
    showSelectDishDetail(item) {
        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Categoría > ${item.category.name} > ${item.dish.name}</h2>
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
        if (item.menu) {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Menús relacionados</h3>
                <section class='menu-list' id='menulist'>
                    <div class='card'>
                        <img src='./images/menu.jpg' alt='menu1' data-menu='${item.menu.name}'>
                        <div class='container'>
                            <li data-menu='${item.menu.name}'>${item.menu.name}</li>
                        </div>
                    </div>
                <section>`);

        } else {
            this.main.insertAdjacentHTML('beforeend',
                `<h3>Menús relacionados</h3>
                <h3 class='no-asignado'>No conocidos</h3>
                <section class='menu-list' id='menulist'></section>`);

        }
    }

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
        //aqui el listener de los restaurantes
        /*let contenidoRest = document.getElementById('contenidorest');
        let options = contenidoRest.querySelectorAll('.option');
        options.forEach(function (item, key) {
            console.log(item);

            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.restaurant);
            })
        })*/
        
    }
    showRestaurantDetail(restaurant) {

        this.main.replaceChildren();
        this.main.insertAdjacentHTML('beforeend',
            `<h2>Restaurantes > ${restaurant.name}</h2>
                <section class='ficha' id='ficha'>
                    <img src='./images/rest.jpg' alt='menu'>
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


    showContenidoRest(restaurants) {
        let contenidoRest = document.getElementById('contenidorest');
        contenidoRest.replaceChildren();
        restaurants.forEach(function (value, key) {
            contenidoRest.insertAdjacentHTML('beforeend',
                `<option class='option' value='${key}' data-restaurant='${key}'>${key}</option>`)
        })
    }

    bindShowContenidoRest(handler) {
        let contenidoRest = document.getElementById('contenidorest');
        let options = contenidoRest.querySelectorAll('.option');
        console.log(options.length)
        options.forEach(function (item, key) {
            // console.log(item);
            item.addEventListener('click', (event) => {
                handler(event.currentTarget.dataset.restaurant);
            })
        })
    }
    //////////////////////////////////////
    showRandomDish(dishes){
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
    bindRandomDish(handler){
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


    showTitle(titleCat) {
        this.main.replaceChildren();
        let title = document.createElement('h2');
        let nombre = document.createTextNode(titleCat);
        title.appendChild(nombre);
        this.main.append(title);
    }



}//fin de clase


export default RestaurantManagerView;