/**
 * importamos las clases con las excepciones del archivo ./exception.js
 */

import {
    ValueEmptyException, InvalidConstructorException,
    UnexpectedObjectException, ItemNotFoundException,
    ObjectAlreadyExistsException, CategoryNotExistException,
    NullObjectException
} from './exceptions.js';

/**
 * https://github.com/anvil555/restaurante.git
 */

/**
 * importamos las clases con los objetos que solicita el enunciado.
 */
import { Category, Allergen, Coordinate, Dish, Menu, Restaurant } from './objects.js';

/**
 * creamos el patrón SINGLETON para generar una única instancia de nuestro objeto
 * manager.
 * 
 */
const Manager = (function () {
    let manager;

    class Manager {
        /**
         * En mi caso he considerado implementar una estructura de mapas
         * al encontrarla más sencilla ("""dentro de la complejidad de la tarea""").
         * El salto ha sido grande desde la unidad 3 a la 4 cualitativa y cuantitativamente
         * en cuanto a los contenidos y a la tarea.
         * 
         * Definimos las propiedades privadas.
         */
        #name;
        #categories = new Map();
        #allergens = new Map();
        #dishes = new Map();
        #menus = new Map();
        #restaurants = new Map();

        /**
         * Generamos el constructor y sus métodos privados
         * @param {*} name 
         */
        constructor(name) {
            if (!new.target) throw new InvalidConstructorException();
            this.#name = name;
            Object.defineProperty(this, "name", {
                enumerable: true,
                get() {
                    return this.#name;
                },
                set(value) {
                    this.#name = value;
                }
            });
            /**
             * 2 iteradores que no he sabido implementar en la estructura de mapas...
             * se puede???
             */

            Object.defineProperty(this, "categories", {
                enumerable: true,
                get() {
                    const array = this.#categories.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const storedCategorys of array) {
                                yield storedCategorys.category;
                            }
                        }
                    }
                }
            })
            Object.defineProperty(this, "dishes", {
                get() {
                    const array = this.#dishes.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const storedDishes of array) {
                                yield storedDishes.dish
                            }
                        }
                    }
                }
            })
        }//fin de constructor

        /**
         * Función que añade categorías al mapa de categorias si no existe y
         * si es una categoría, captura las excepciones,
         * añade un nuevo mapa para añadir platos como posteriormente pide el
         * enunciado.
         * Comento el método por linea..
         * 
         * @param  {...any} category 
         * @returns 
         */
        addCategory(...category) {
            if (category.length === 0) {//si los argumentos no existen
                throw new NullObjectException();//capturamos la excepcion
            }
            for (let cat of category) {//iteramos sobre los argumentos que recibe la funcion
                if (!(cat instanceof Category)) {//comprobamos que es un objeto como el que necesitamos
                    throw new UnexpectedObjectException(Object.values(cat));//capturamos la excepcion
                } else {
                    if (this.#categories.has(cat.name)) {//si el objeto existe en la coleccion
                        throw new ObjectAlreadyExistsException(cat.name);//capturamos la excepcion
                    } else {
                        this.#categories.set(cat.name, cat)
                        //console.log("Añadida nueva categoria " + cat.name);//lo mostramos por consola.
                    }
                }
            }
            return this;//lo retornamos.
        }

        /**
         * Funcion que elimina categorías del mapa de categorias, si estas existen´
         * y captura las excepciones.
         * 
         * @param  {...any} category 
         * @returns 
         */
        removeCategory(...category) {
            for (let cat of category) {//iteramos sobre los argumentos de la funcion
                if (!(cat instanceof Category)) {//comprobamos que es el tipo de objeto que necesitamos
                    throw new UnexpectedObjectException(Object.values(cat));//capturamos la excepcion
                } else {
                    if (this.#categories.has(cat.name)) {//si el elemento está en la colección
                        this.#categories.delete(cat.name);//lo eliminamos
                        //console.log("Eliminada categoria " + cat.name);//lo mostramos por pantalla
                    } else {
                        new ItemNotFoundException(Object.values(cat));//si no lo encuentra capturamos la excepción.
                    }
                }
            }
            return this;//lo retornamos.
        }
        /**
        * Función que añade menus al mapa de menus si no existen y
        * si es un menu, captura las excepciones,
        * añade un nuevo mapa para añadir platos como posteriormente pide el
        * enunciado.
        * @param  {...any} category 
        * @returns 
        */
        addMenu(...menu) {
            if (menu.length === 0) {
                throw new NullObjectException();
            }
            for (let men of menu) {
                if (!(men instanceof Menu)) {
                    throw new UnexpectedObjectException(Object.values(men));
                } else {
                    if (this.#menus.has(men.name)) {
                        throw new ObjectAlreadyExistsException(men.name);
                    } else {
                        this.#menus.set(men.name, men)
                        //console.log("Añadido nuevo menu " + men.name);
                    }
                }
            }
        }

        /**
         * Funcion que elimina menus del mapa de menus, si estos existen
         * y captura las excepciones.
         * 
         * @param  {...any} category 
         * @returns 
         */
        removeMenu(...menu) {
            for (let men of menu) {
                if (!(men instanceof Menu)) {
                    throw new UnexpectedObjectException(Object.values(men));
                } else {
                    if (this.#menus.has(men.name)) {

                        this.#menus.delete(men.name);
                        //console.log("Menu " + men.name + " borrado!!!")
                    } else {
                        throw new ItemNotFoundException(men.name);
                    }
                }
            }
            return this;
        }

        /**
         * Funcion que añade alérgenos al mapa de alérgenos.
         * Captura las excepciones que solicita el enunciado.
         * 
         * @param  {...any} allergen
         * @returns 
         */
        addAllergen(...allergen) {
            if (allergen.length === 0) {
                throw new NullObjectException();
            }
            for (let aller of allergen) {
                if (!(aller instanceof Allergen)) {
                    throw new UnexpectedObjectException(Object.values(aller));
                } else {
                    if (this.#allergens.has(aller.name)) {
                        throw new ObjectAlreadyExistsException(aller.name);
                    } else {
                        this.#allergens.set(aller.name, aller);
                        //console.log("Añadido nuevo alérgeno " + aller.name);
                    }


                }
            }
            return this;
        }

        /**
         * Funcion que elimiina un alérgeno del mapa de alérgeno.
         * @param  {...any} allergen 
         * @returns 
         */
        removeAllergen(...allergen) {
            for (let aller of allergen) {
                if (!(aller instanceof Allergen)) {
                    throw new UnexpectedObjectException(Object.values(aller));
                } else {
                    if (this.#allergens.has(aller.name)) {
                        this.#allergens.delete(aller.name);
                        //console.log("Allergeno " + aller.name + " borrado!!!")
                    } else {
                        throw new ItemNotFoundException(aller.name);
                    }
                }
            }
            return this;
        }

        /**
         * funcion que añade un plato a la coleccion de platos.
         * En principio le he añadido un mapa como valor por que quizás
         * se podría implementar una clase INGREDIENTES en lugar de ser
         * solo una propiedad de la clase Dish y relacionarla con los alérgenos.
         * ...pero ando mal de tiempo...
         * 
         * @param  {...any} dish 
         * @returns
         */
        addDish(...dish) {
            if (dish.length === 0) {
                throw new NullObjectException();
            }
            for (let dishIt of dish) {
                if (!(dishIt instanceof Dish)) {
                    throw new UnexpectedObjectException(Object.values(dishIt));
                } else {
                    if (this.#dishes.has(dishIt.name)) {

                        // throw new ObjectAlreadyExistsException(dishIt.name);
                    } else {
                        this.#dishes.set(dishIt.name, dishIt);
                        //console.log("Añadido nuevo plato " + dishIt.name)
                    }
                }
            }
            return this;
        }

        /**
         * Elimina un plato de la coleccion de platos.
         * Captura las excepciones
         * 
         * @param  {...any} dish 
         * @returns 
         */
        removeDish(...dish) {
            for (let dishIt of dish) {
                if (!(dishIt instanceof Dish)) {
                    throw new UnexpectedObjectException(Object.values(dishIt));
                } else {
                    if (this.#dishes.has(dishIt.name)) {
                        this.#dishes.delete(dishIt.name);
                        //console.log("Plato " + dishIt.name + " borrado!!!")
                    } else {
                        new ItemNotFoundException(dishIt.name);
                    }
                }
            }
            return this;
        }



        /**
         * Funcion que añade un restaurante a la colección de restaurantes
         * si es un objeto Restaurante y todavía no está en la colección.
         * @param  {...any} restaurant 
         * @returns
         */

        addRestaurant(...restaurant) {
            if (restaurant.length === 0) {
                throw new NullObjectException();
            }
            for (let rest of restaurant) {
                if (!(rest instanceof Restaurant)) {
                    throw new UnexpectedObjectException(Object.values(rest));
                } else {
                    if (this.#dishes.has(rest.name)) {
                        new ObjectAlreadyExistsException(rest.name);
                    } else {
                        this.#restaurants.set(rest.name, rest);
                        //console.log("Añadido nuevo Restaurante " + rest.name);
                    }
                }
            }
            return this;
        }

        /**
         * Elimina un objeto restaurante de la coleccion.
         * @param  {...any} restaurant 
         * @returns 
         */

        removeRestaurant(...restaurant) {
            for (let rest of restaurant) {
                if (!(rest instanceof Restaurant)) {
                    throw new UnexpectedObjectException(Object.values(rest));
                } else {
                    if (this.#restaurants.has(rest.name)) {
                        this.#restaurants.delete(rest.name);
                        //console.log("Restaurante " + rest.name + " borrado!!!")
                    } else {
                        new ItemNotFoundException(rest.name);
                    }
                }
            }
            return this;
        }

        /**
         * Función que asigna un plato en una categoría.
         * El objeto Dish se almacena en el mapa que hemos creado
         * en la función addCategory() como valor de la clave Category
         * 
         * @param {*} category 
         * @param  {...any} dishes 
         * @returns 
         */
        assignCategoryToDish(category, ...dishes) {//pasamos como parámetros una categoría y varios platos
            if (category === null || dishes.length === 0) {//validamos la entrada de argumentos
                throw new NullObjectException();//capturamos la excepción.
            }
            if (!(category instanceof Category)) {//comprobamos que el parámetro category es una instancia del objeto que necesitamos 
                throw new UnexpectedObjectException(Object.values(category));//capturamos la excepción.
            }
            if (!this.#categories.has(category.name)) {//si la categoría no se encuentra en la colección.
                try {
                    this.addCategory(category);//la añadimos.
                } catch (error) {
                    console.log(error.message);//si no, capturamos la excepción.
                }
            }

            for (const dish of dishes) {//iteramos sobre el segundo argumento de la función
                if (!(dish instanceof Dish)) {//comprobamos que son instancias del objeto que necesitamos.
                    throw new UnexpectedObjectException(Object.values(dish));//capturamos la excepción.
                }
                if (!this.#dishes.has(dish.name)) {//si el objeto dish no existe en su colección
                    this.addDish(dish);//lo añadimos a ella.
                }
                let storedCategory = this.#categories.get(category.name);
                if (storedCategory.dishes) {
                    storedCategory.dishes.set(dish.name, dish);
                    //console.log("Añadido " + dish.name + " a la categoría " + category.name);
                } else {
                    let value = { category, dishes: new Map().set(dish.name, dish) }
                    this.#categories.set(category.name, value);//lo insertamos en el mapa
                    //console.log("Añadido " + dish.name + " a la categoría " + category.name);
                }


            }
            return this;
        }
        /**
         * Funcion que elimina un plato de una categoria ( y solo de la categoría )
         * 
         * @param {*} category 
         * @param  {...any} dishes 
         * @returns 
         */
        deassignCategoryToDish(category, ...dishes) {//pasamos como parámetros una categoría y varios platos.
            if (category === null || dishes.length === 0) {//validamos la entrada de argumentos
                throw new NullObjectException();//si no capturamos la excepcion.
            }
            if (!(category instanceof Category)) {//si el parámetro category no es una instancia de Category
                throw new UnexpectedObjectException(Object.values(category));//capturamos la excepción.
            }
            for (const dish of dishes) {//iteramos sobre el segundo argumento... los platos.
                if (!(dish instanceof Dish)) {//si no son instancias del objeto Dish
                    throw new UnexpectedObjectException(Object.values(dish));//capturamos la excepción.
                }
                let storedCategory = this.#categories.get(category.name);
                if (storedCategory.dishes.has(dish.name)) {
                    storedCategory.dishes.delete(dish.name);
                    //console.log("Eliminada plato " + dish.name + " de la categoría " + category.name);
                } else {
                    throw "No se ha encontrado el plato " + dish.name + " en la categoría " + category.name;
                }
            }
            return this;
        }

        /**
         * Similar al método assignCategoryToDish pero en este caso asignamos alérgenos al mapa 
         * de un plato.
         * @param {*} dish 
         * @param  {...any} allergens 
         * @returns 
         */

        assignAllergenToDish(dish, ...allergens) {
            if (dish === null || allergens.length === 0) {
                throw new NullObjectException();
            }
            if (!(dish instanceof Dish)) {
                throw new UnexpectedObjectException(Object.values(dish));
            }
            if (!this.#dishes.has(dish.title)) {
                try {
                    this.addDish(dish);
                } catch (error) {
                    console.log(error.message);
                }
            }
            for (const allergen of allergens) {
                if (!(allergen instanceof Allergen)) {
                    throw new UnexpectedObjectException(Object.values(allergen));
                }
                if (!this.#allergens.has(allergen.name)) {
                    this.addAllergen(allergen);
                }
                // let storedDish = this.#dishes.get(dish.name);
                // if (storedDish.allergens) {
                //     storedDish.allergens.set(allergen.name, allergen);
                //     console.log("Añadido alérgeno " + allergen.name + " al plato " + dish.name);
                // } else {
                //     let value = { dish, allergens: new Map().set(allergen.name, allergen) };
                //     this.#dishes.set(dish.name, value);
                //     console.log("Añadido alérgeno " + allergen.name + " al plato " + dish.name);
                // }

                let storedAllergen = this.#allergens.get(allergen.name);
                if (storedAllergen.dishes) {
                    storedAllergen.dishes.set(dish.name, dish);
                    //console.log("Añadido alérgeno " + allergen.name + " al plato " + dish.name);
                } else {
                    let value = { allergen, dishes: new Map().set(dish.name, dish) };
                    this.#allergens.set(allergen.name, value);
                    //console.log("Añadido alérgeno " + allergen.name + " al plato " + dish.name);
                }
            }
            return this;
        }

        /**
         * Desasignamos un alergeno de un elemento plato
         * 
         * @param {*} dish 
         * @param  {...any} allergens 
         * @returns 
         */

        deassignAllergenToDish(dish, ...allergens) {
            if (dish === null || allergens.length === 0) {
                throw new NullObjectException();
            }
            if (!(dish instanceof Dish)) {
                throw new UnexpectedObjectException(Object.values(dish));
            }
            for (const allergen of allergens) {
                if (!(allergen instanceof Allergen)) {
                    throw new UnexpectedObjectException(Object.values(allergen));
                }
                let storedAllergen = this.#allergens.get(allergen.name);
                if (storedAllergen.dishes.has(dish.name)) {
                    storedAllergen.dishes.delete(dish.name)
                    //console.log("Eliminado plato " + dish.name + " del alérgeno " + allergen.name);
                }
                else {
                    throw "No se ha encontrado el allérgeno " + allergen.name + " en el plato " + dish.name;

                }





            }
            return this;
        }
        /**
         * Función que asigna uno o varios platos a un elemento menu.
         * 
         * @param {*} menu 
         * @param  {...any} dishes 
         * @returns 
         */
        assignDishToMenu(menu, ...dishes) {///duda de los menus......
            if (menu === null || dishes.length === 0) {
                throw new NullObjectException();
            }
            if (!(menu instanceof Menu)) {
                throw new UnexpectedObjectException(Object.values(menu));
            }
            if (!this.#menus.has(menu.name)) {
                this.addMenu(menu);
            }
            for (let dish of dishes) {
                if (!(dish instanceof Dish)) {
                    throw new UnexpectedObjectException(Object.values(dish));
                }
                if (!(this.#dishes.has(dish))) {
                    try {
                        this.addDish(dish)
                    } catch (error) {
                        console.log(error.message);
                    }
                }
                let storedMenu = this.#menus.get(menu.name);//tomamos el valor del objeto literal
                if (storedMenu.dishes) {
                    if (storedMenu.dishes.has(dish.name)) {
                        console.log("el plato ya existe en la coleccion")
                    } else {
                        storedMenu.dishes.set(dish.name, dish);
                        // console.log("Añadido plato " + dish.name + " al menú " + menu.name);   
                    }
                } else {
                    let value = (menu.name, { menu, dishes: new Map().set(dish.name, dish) });
                    this.#menus.set(menu.name, value);
                    // console.log("Añadido plato " + dish.name + " al menú " + menu.name);

                }
            }
            return this;
        }

        /**
         * Función que elimina un plato de un menú.
         * @param {*} menu 
         * @param  {...any} dishes 
         * @returns 
         */
        deassignDishToMenu(menu, ...dishes) {
            if (!menu || dishes.length === 0) {
                throw new NullObjectException();
            }
            if (!(menu instanceof Menu)) {
                throw new UnexpectedObjectException(Object.values(menu));
            } if (!this.#menus.has(menu.name)) {
                throw new ItemNotFoundException(menu.name);
            }
            for (let dish of dishes) {
                if (!(dish instanceof Dish)) {
                    throw new UnexpectedObjectException(Object.values(dish));
                }
                let storedMenu = this.#menus.get(menu.name);
                console.log(storedMenu);
                if (storedMenu.dishes.has(dish.name)) {
                    storedMenu.dishes.delete(dish.name);
                    //console.log("Plato eliminado");
                } else {
                    throw "No se ha encontrado el plato " + dish.name + " en el menú " + menu.name;
                }
            }
            return this;
        }

        /**
         * ya he sabido implementar este método...
         * en la tarea 4 no supe... y ademas he implementado algun iterador mas...
         * 
         * @param {*} category 
         */
        *getDishesInCategory(category) {

            if (this.#categories.has(category)) {
                const storedCategory = this.#categories.get(category);
                // console.log(storedCategory);
                if (storedCategory.dishes) {
                    const values = storedCategory.dishes.values();
                    for (const dish of values) {
                        yield dish;
                    }
                }

            } else {
                throw new ItemNotFoundException(category);
            }
        }
        *getDishesInAllergen(allergen) {//le pasamos el nombre del alergeno
            if (this.#allergens.has(allergen)) {
                const storedAllergen = this.#allergens.get(allergen);
                if (storedAllergen.dishes) {
                    const values = storedAllergen.dishes.values();
                    for (const dish of values) {
                        yield dish;
                    }
                }
            }
        }
        *getMenuInMenus(menu) {
            if (this.#menus.has(menu)) {
                const storedMenu = this.#menus.get(menu);
                if (!menu.dishes) {
                    yield storedMenu;
                } else {
                    yield storedMenu.menu;
                }
            }
        }


        /**
         * funcion que devuelve un objeto literal con todas las propiedades
         * que puede tener un objeto plato.
         * @param {*} dish 
         * @returns 
         */


        infoDish(dish) {
            if (!dish) {
                throw new NullObjectException();
            }
            let literal = {};//creamos un objeto literal para añadirle toda la informacion de un plato.
            if (this.#dishes.has(dish)) {
                literal.dish = this.#dishes.get(dish);
            }

            // literal.category=[];
            this.#categories.forEach(function (value, key) {
                if (value.dishes) {
                    if (value.dishes.has(dish)) {
                        // literal.dish = value.dishes.get(dish);
                        literal.category = value.category;
                    }
                }
            })
            literal.allergen = [];
            this.#allergens.forEach(function (value, key) {
                if (value.dishes) {
                    if (value.dishes.has(dish)) {
                        literal.allergen.push(value.allergen);
                    }
                }
            })
            literal.menu = [];
            this.#menus.forEach(function (value, key) {
                if (value.dishes) {
                    if (value.dishes.has(dish)) {
                        literal.menu.push(value.menu);
                    }
                }
            })
            return literal;
        }


        /**
         * Método que Devuelve un objeto Dish si está registrado
         * o crea uno nuevo en función de su nombre.
         * 
         * Como mejora en estos métodos habría que crear una funcion para controlar los
         * posibles fallos ocasionados por las mayúsculas y minúsculas....
         * 
         * con este método me surge una duda con respecto de los constructores de objetos:
         * como se podría validar los parámetros que recibe un constructor con respecto a los datos
         * que se le asignan, en este caso en la propiedad descripcion podría ocurrir asignarle un array
         * con los ingredientes....
         * 
         * entiendo que habría que validar todos los datos?
         * un objeto puede tener varios constructores como ocurre en Java por ejemplo?
         * como se diferencian a la hora de crear un objeto?
         * 
         * 
         * @param {*} name 
         * @param {*} description 
         * @param {*} image 
         * @param  {...any} ingredients 
         * @returns 
         */

        createDish(name, description, image, ...ingredients) {
            if (!name) { throw new ValueEmptyException("name"); } let dish;
            let control = false; this.#dishes.forEach(function (value, key) {
                if (key === name) {
                    control = true;
                }
            })
            if (control === false) {
                dish = new Dish(name, description);
                dish.image = image;
                // console.log(dish);
                for (let ing of ingredients) {
                    for (let temp of ing) {
                        dish.addIngredients(temp);
                    }

                }
                this.addDish(dish);
            }
            return dish;
        }

        /**
         * 
         * @param {*} dish 
         * @returns
         * metodo modificado y adaptado para esta version del proyecto
         * que añade un plato a la coleccion si no existe
         * y devuelve falso si ya existe. 
         */
        // createDish(dish) {
        //     let control = false;
        //     if (!this.#dishes.has(dish.name)) {
        //         this.addDish(dish);
        //         // console.log("plato añadido");
        //         control = true;
        //     }
        //     return control;
        // }
        /**
         * Funcion que crea un menu o devuelve el que ya está registrado.
         * 
         * @param {*} name 
         * @param {*} description 
         * @returns 
         */
        createMenu(name, description) {
            if (!name) { throw new ValueEmptyException("name"); }
            let menu;
            let control = false;
            this.#menus.forEach(function (value, key) {
                if (key === name) {
                    control = true;
                    value.forEach(function (value2, key2) {
                        menu = key2;
                    })
                }
            })
            if (control === false) {
                menu = new Menu(name);
                if (!description) {
                    menu.description = "";
                } else {
                    menu.description = description;
                }
            }
            return menu;
        }

        /**
         * Función que crea un nuevo alérgeno o devuelve el que ya está registrado.
         * 
         * @param {*} name 
         * @param {*} description 
         * @returns 
         */
        createAllergen(name, description) {
            if (!name) { throw new ValueEmptyException("name"); }
            let allergen;
            let control = false;
            this.#allergens.forEach(function (value, key) {
                if (key === name) {
                    control = true;
                    allergen = value;
                }
            })
            if (control === false) {
                allergen = new Allergen(name);
                if (!description) {
                    allergen.description = "";
                } else {
                    allergen.description = description;
                }
            }
            return allergen;
        }

        /**
         * Función que crea una categoría o la devuelve si ya está registrada.
         * @param {*} name 
         * @param {*} description 
         * @returns 
         */
        createCategory(name, description) {
            if (!name) { throw new ValueEmptyException("name"); }
            let category;
            let control = false;
            this.#categories.forEach(function (value, key) {
                if (key === name) {
                    control = true;
                }
            })
            if (control === false) {
                category = new Category(name, description);
                this.addCategory(category);
            }
            return category;
        }

        /**
         * Función que crea un restaurante o lo devuelve si ya está registrado
         * @param {*} name 
         * @param {*} description 
         * @param {*} latitude, longitude
         * @param {*} longitude 
         * @returns 
         */
        createRestaurant(name, description, latitude, longitude) {
            let restaurant;
            restaurant = new Restaurant(name, description);
            if (location != null) {
                let coord = new Coordinate(latitude, longitude);
                restaurant.location = coord;
                this.addRestaurant(restaurant);
            }
            return restaurant;
        }
        /**
         * funciones auxiliares que devuelven numero de platos,
         * categorias
         */

        /**
         * 
         * @returns 
         */
        getNumberDishes() {
            
            return this.#dishes.size;
        }
        /**
         * 
         * @returns 
         */
        getNumberCategories() {
            return this.#categories.size;
        }

        /**
         * funciones auxiliares que devuelven los mapas con las distintas
         * colecciones.
         */
        /**
         * 
         * @returns 
         */
        getCategories() {
            // return this.#categories;
            const array = Array.from(this.#categories);
            const sortedArray = array.sort((a, b) => String(a[0]).localeCompare(b[0]));
            const sortedMap = new Map(sortedArray);
            return sortedMap;
        }
        /**
         * 
         * @returns 
         */
        getDishes() {
            // return this.#dishes;
            const array = Array.from(this.#dishes);
            const sortedArray = array.sort((a, b) => String(a[0]).localeCompare(b[0]));
            const sortedMap = new Map(sortedArray);
            return sortedMap;


            
        }
        /**
         * 
         * @returns 
         */
        getAllergens() {
            // return this.#allergens;
            const array = Array.from(this.#allergens);
            const sortedArray = array.sort((a, b) => String(a[0]).localeCompare(b[0]));
            const sortedMap = new Map(sortedArray);
            return sortedMap;
        }
        /**
         * 
         * @returns 
         */
        getMenus() {
            // return this.#menus;
            const array = Array.from(this.#menus);
            const sortedArray = array.sort((a, b) => String(a[0]).localeCompare(b[0]));
            const sortedMap = new Map(sortedArray);
            return sortedMap;
        }
        /**
         * 
         * @returns 
         */
        getRestaurants() {
            // return this.#restaurants;
            const array = Array.from(this.#restaurants);
            const sortedArray = array.sort((a, b) => String(a[0]).localeCompare(b[0]));
            const sortedMap = new Map(sortedArray);
            return sortedMap;
        }
        /**
         * funciones qeu devuelve un objeto en concreto de la coleccion.
         * @param {*} clave 
         * @returns 
         */
        findAllergen(clave) {
            let temp = this.#allergens.get(clave);
            return temp;
        }
        findMenu(clave) {
            let temp = this.#menus.get(clave);
            return temp;
        }
        findRestaurant(clave) {
            let temp = this.#restaurants.get(clave);
            return temp;
        }
        findCategory(clave) {
            let temp = this.#categories.get(clave);
            return temp;
        }
        findDish(clave) {
            let temp = this.#dishes.get(clave);
            return temp;
        }
        /**
         * 
         * @param {*} menu 
         * @returns 
         * funcion que toma un menu y retorna un mapa con los 
         * platos que no estan asignados a ese menu.
         * NO IMPLEMENTADA. la intencion de esta funcion es que en los 
         * select solo muestre los platos que NO estan en un menu en concreto.
         * 
         */
        filterDishes(menu) {
            let filter = new Map();
            let storedMenu = this.#menus.get(menu);
            if (storedMenu.dishes) {
                this.#dishes.forEach(function (value, key) {
                    if (!storedMenu.dishes.has(key)) {
                        filter.set(key, value);
                    }
                })
                console.log(filter);
            }
            return filter;
        }


        deleteDishFromCollection(dish) {
            this.#menus.forEach(function (value, key) {
                if (value.dishes.has(dish.name)) {
                    // this.deassignDishToMenu(value.menu,dish);
                    value.dishes.delete(dish.name);
                    console.log(dish.name + " " + value.menu.name);
                }
            })
            this.#categories.forEach(function (value, key) {
                if (value.dishes.has(dish.name)) {
                    // this.deassignCategoryToDish(value.category,dish);
                    value.dishes.delete(dish.name);
                    console.log(dish.name + " " + value.category.name);
                }
            })
            this.#allergens.forEach(function (value, key) {
                if (value.dishes.has(dish.name)) {
                    // this.deassignAllergenToDish(value.allergen,dish);
                    value.dishes.delete(dish.name);
                    console.log(dish.name + " " + value.allergen.name);
                }
            })

        }








        //////////////////////////////////////////////////////////////////////////////////////////////////


    }//fin de clase
    function init() {
        return new Manager();
    }
    return {
        getInstancia: function () {
            if (!manager) {
                manager = init();
            }
            return manager;
        }
    }
})();//fin de const



export default Manager;


