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
                        },
                    };
                },
            });
            Object.defineProperty(this, "dishes", {
                get() {
                    const array = this.#dishes.values();
                    return {
                        *[Symbol.iterator]() {
                            for (const storedDishes of array) {
                                yield storedDishes.dish
                            }
                        },
                    };
                },
            });
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
                        console.log("Añadida nueva categoria " + cat.name);//lo mostramos por consola.
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
                        console.log("Eliminada categoria " + cat.name);//lo mostramos por pantalla
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
                        console.log("Añadido nuevo menu " + men.name);
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
                        console.log("Menu " + men.name + " borrado!!!")
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
                        console.log("Añadido nuevo alérgeno " + aller.name);
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
                        console.log("Allergeno " + aller.name + " borrado!!!")
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
                        throw new ObjectAlreadyExistsException(dishIt.name);
                    } else {
                        this.#dishes.set(dishIt.name, dishIt);
                        console.log("Añadido nuevo plato " + dishIt.name)
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
                        console.log("Plato " + dishIt.name + " borrado!!!")
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
                        console.log("Añadido nuevo Restaurante " + rest.name);
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
                        console.log("Restaurante " + rest.name + " borrado!!!")
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
                let value = { dish, category };//creamos el nuevo valor para el mapa( plato + categoria ) como un objeto literal
                this.#dishes.set(dish.name, value);//lo insertamos en el mapa
                console.log("Añadido categoria " + category.name + " al plato " + dish.name);


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

                if (this.#dishes.has(dish.name)) {
                    let temp = this.#dishes.get(dish.name);
                    console.log(temp.category);
                    this.#dishes.set(dish.name, dish);
                    console.log("Eliminada categoria " + category.name + " del plato " + dish.name);
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
                let temp = this.#dishes.get(dish.name);//tomamos el valor del objeto literal
                temp.allergen = allergen;//le añadimos la nueva propiedad allergen
                this.#dishes.set(dish.name, temp);//lo guardamos actualizado en el mapa
                console.log("añadido alérgeno " + allergen.name + " al plato " + dish.name);
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
                if (this.#dishes.has(dish.name)) {
                    let temp = this.#dishes.get(dish.name);
                    delete temp.aller;
                    console.log("alergeno " + allergen.name + " borrado del plato " + dish.name);
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
                let temp = this.#dishes.get(dish.name);//tomamos el valor del objeto literal
                temp.menu = menu;//le añadimos la nueva propiedad menu
                this.#dishes.set(dish.name, temp);//lo guardamos actualizado en el mapa           
                console.log("actualizado plato " + dish.name + " con el menu " + menu.name);

            }
            return this;
        }

        /**
         * Función que elimina un plato de un menú.
         * @param {*} menu 
         * @param  {...any} dish 
         * @returns 
         */
        deassignDishToMenu(menu, ...dish) {
            if (!menu || dish.length === 0) {
                throw new NullObjectException();
            }
            if (!(menu instanceof Menu)) {
                throw new UnexpectedObjectException(Object.values(menu));
            } if (!this.#menus.has(menu.name)) {
                throw new ItemNotFoundException(menu.name);
            }
            for (let dishIt of dish) {
                if (!(dishIt instanceof Dish)) {
                    throw new UnexpectedObjectException(Object.values(dishIt));
                }
                this.#menus.forEach(function (value, key) {
                    if (key === menu.name) {
                        value.forEach(function (value2, key2) {/////////////////
                            if (value2.has(dishIt.name)) {
                                value2.delete(dishIt.name);
                                console.log("Eliminado " + dishIt.name + " al menu " + menu.name);
                            } else {
                                new ItemNotFoundException(dishIt.name)
                            }
                        })
                    }
                })
            }
            return this;
        }

        /**
         * no he sabido implementar este método...
         * en su lugar he desarrollado getCategoryOfDishes()
         * 
         * @param {*} category 
         */
        *getDishesInCategory(category) {
            if (!(category instanceof Category)) {
                throw new UnexpectedObjectException(Object.values(category));
            }
            if (this.#categories.has(category.name)) {
                const storedCategory = this.#categories.get(category.name);
                const values = storedCategory.dishes.values();
                for (const dish of values) {
                    yield dish;
                }
            } else {
                throw new ItemNotFoundException(category);
            }
        }


        /**
         * Funcion que devuelve los platos que tienen una categoria pasada por parametro.
         * en caso de que una categoría no tenga asignado ningún plato devolverá un mapa vacio.
         * @param {*} category 
         * @returns 
         */
        getCategoryOfDishes(category) {//pasamos por parámetro el objeto
            if (!category) {//validamos la entrada
                throw new NullObjectException();//capturamos la excepcion.
            }
            let temp = new Map();//creamos un mapa temporal para almacenar los datos que filtramos.
            if (!(category instanceof Category)) {//comprobamos que el parámetro es una instancia del objeto que quermos en este caso Category.
                throw new UnexpectedObjectException(Object.values(category));//capturamos la excepción.
            }
            if (this.#categories.has(category.name)) {//comprobamos que el objeto existe en la coleccion de categorias.
                const storedCategory = this.#categories.get(category.name);//tomamos la categoria de la coleccion de categorias.
                storedCategory.forEach(function (value, key) {//recorremos su mapa
                    temp = value;//asignamos los platos al mapa temporal
                })
            } else {
                throw new ItemNotFoundException(category.name);//capturamos la excepcion si no está la categoría en la colección.
            }
            console.log(temp.keys());//mostramos los datos por pantalla
            return temp;//retornamos el mapa
        }

        /**
         * similar al método anterior. 
         * muestra los platos que tienen un alérgeno en concreto.
         * en caso de no encontrarlo devuelve un mapa vacio.
         * 
         * @param {*} allergen 
         * @returns 
         */
        getDishesWithAllergen(allergen) {
            if (!allergen) {
                throw new NullObjectException();
            }
            let temp = new Map()
            if (!(allergen instanceof Allergen)) {
                throw new UnexpectedObjectException(Object.values(allergen));
            }
            this.#dishes.forEach(function (value, key) {
                value.forEach(function (value2, key2) {
                    if (value2.has(allergen.name)) {
                        temp.set(key2.name, key2);
                    }
                })
            })
            console.log(temp.keys());
            return temp;
        }


        /**
         * no he entendido lo que el enunciado pedía con este método.
         * para encontrar un plato directamente podemos iterar sobre la coleccion de platos
         * 
         * ¿?
         */
        findDishes(dish) {

            if (!dish) {
                throw new NullObjectException();
            }
            if (!(dish instanceof Dish)) {
                throw new UnexpectedObjectException(Object.values(dish));
            }
            let temp;
            this.#dishes.forEach(function (value, key) {
                if (key === dish.name) {
                    temp = value;
                }
            })
            return temp;

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

        createDish(name, description, image, ...ingredients) {//parámetros de la función, son los que necesita el constructor del objeto.
            if (!name) { throw new ValueEmptyException("name"); }//validamos el nombre(es la única propiedad obligatoria del objeto Dish)
            let dish;//creamos una variable para uso interno.
            let control = false;//booleano de control que cambia a true si el objeto existe en caso contrario se creará un objeto nuevo
            this.#dishes.forEach(function (value, key) {//recorremos la colección de platos para comprobar que no exista.

                if (key === name) {//si existe
                    control = true;//cambiamos el valor de la variable de control
                    value.forEach(function (value2, key2) {//iteramos sobre el valor del primer mapa para obtener la clave que es donde se encuentra el objeto que buscamos.
                        dish = key2;//retornamos el propio objeto coincidente.
                    })
                }
            })
            if (control === false) {//en caso de no existir el plato en la coleccion.
                dish = new Dish(name);//instanciamos un nuevo objeto Plato asignando las propiedades de los parámetros.
                if (!description) {//validamos el resto de parámetros de entrada.
                    dish.description = ""
                } else {
                    dish.description = description;
                }
                if (!image) {
                    dish.image = "";
                } else {
                    dish.image = image;
                }
                if (!ingredients) {
                    dish.ingredients = [];
                } else {
                    for (let ing of ingredients) {//se pueden añadir varios ingredientes al mismo tiempo
                        dish.addIngredients(ing);//utilizando el método del objeto addIngredients(ing)
                    }
                }
            }
            return dish;//retornamos el nuevo objeto o el que ya está registrado.
        }

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
                    value.forEach(function (value2, key2) {
                        category = key2;
                    })
                }
            })
            if (control === false) {
                category = new Category(name);

                if (!description) {
                    category.description = "";
                } else {
                    category.description = description;
                }
            }
            return category;
        }

        /**
         * Función que crea un restaurante o lo devuelve si ya está registrado
         * @param {*} name 
         * @param {*} description 
         * @param {*} location 
         * @returns 
         */
        createRestaurant(name, description, location) {
            if (!name) { throw new ValueEmptyException("name"); }
            let restaurant;
            let control = false;
            this.#restaurants.forEach(function (value, key) {
                if (key === name) {
                    control = true;
                    restaurant = value;
                }
            })
            if (control === false) {
                restaurant = new Restaurant(name);
                if (!description) {
                    restaurant.description = "";
                } else {
                    restaurant.description = description;
                }
                if (!location) {
                    restaurant.location = [];
                } else if (location instanceof Coordinate) {
                    restaurant.location = location;
                } else {
                    throw new UnexpectedObjectException();
                }
            }

            return restaurant;
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

//funcion de test del ejercicio

/**
 * funcion de test del ejercicio
 */
function test() {
    const manager = Manager.getInstancia();//creamos la instancia
    manager.name = "Tarea4";//le asignamos un nombre con el método set

    /**
     * Datos de prueba
     */
    let cat1 = new Category("Pescados");
    let cat2 = new Category("De cuchara", "Apetece todo el año...");
    let cat3 = new Category("Carnes");
    let dish1 = new Dish("Paella", "arroz con cosas", ["arroz", "pollo"]);
    let dish2 = new Dish("Fabada", "", ["judias", "chorizo"]);
    let dish3 = new Dish("Bacalao con tomate");
    let menu1 = new Menu("WeekEnd", "Menu especial para el fin de semana");
    let menu2 = new Menu("Menu del dia");
    let menu3 = new Menu("Navidad", "Ofertas Especiales para Navidad");
    let coord1 = new Coordinate(40.4618423556788, -3.6957148035669287);
    let coord2 = new Coordinate(39.3907729885929, -3.2191598852469294);
    let rest1 = new Restaurant("Asador Donostiarra", "Sin comentarios...", coord1);
    let rest2 = new Restaurant("La Mancha", "Cocina Tipica", coord2);
    let aller1 = new Allergen("Trigo");
    let aller2 = new Allergen("Marisco", "Intolerancia a los crustaceos");
    let aller3 = new Allergen("Almejas", "Intolerancia a los moluscos");
    let apple = {
        color: "red",
        tipo: "McIntosh"
    }

    manager.addCategory(cat1, cat2);//Añadida nueva categoria Pescados 
    //Añadida nueva categoria De cuchara

    manager.addMenu(menu1, menu2);  //Añadido nuevo menu WeekEnd 
    //Añadido nuevo menu Menu del dia

    manager.addAllergen(aller1, aller2);//Añadido nuevo alérgeno Trigo 
    //Añadido nuevo alérgeno Marisco

    manager.addDish(dish1, dish2);  //Añadido nuevo plato Paella 
    //Añadido nuevo plato Fabada

    manager.addRestaurant(rest1, rest2);//Añadido nuevo Restaurante Asador Donostiarra 
    //Añadido nuevo Restaurante La Mancha

    // manager.addMenu(apple);

    // try {
    //     manager.addCategory(apple);    
    // } catch (error) {
    //     console.log(error);
    // }

    // manager.removeCategory(cat1);
    // manager.removeMenu(menu1);
    // manager.removeAllergen(aller1);
    // manager.removeDish(dish1);
    // manager.removeRestaurant(rest1);

    manager.assignCategoryToDish(cat2, dish1, dish2, dish3);
    //De cuchara ya existe en la coleccion.
    // Añadido Paella a la categoria De cuchara
    // manager.assignCategoryToDish(cat2, dish3);
    //De cuchara ya existe en la coleccion. 
    //Añadido nuevo plato Bacalao con tomate 
    //Añadido Bacalao con tomate a la categoria De cuchara

    manager.deassignCategoryToDish(cat2, dish3);
    //eliminado plato Bacalao con tomate a la categoria De cuchara

    manager.assignAllergenToDish(dish1, aller1, aller2);
    //Paella ya existe en la coleccion.                                                
    //Añadido alergeno Trigo al plato Paella
    //Añadido alergeno Marisco al plato Paella

    manager.assignAllergenToDish(dish2, aller3, aller2);
    //Fabada ya existe en la coleccion.
    //Añadido nuevo alérgeno Almejas
    //Añadido alergeno Almejas al plato Fabada
    //Añadido alergeno Marisco al plato Fabada

    manager.deassignAllergenToDish(dish1, aller1);
    //Eliminado alergeno Trigo al plato Paella

    manager.assignDishToMenu(menu1, dish1, dish2, dish3);
    manager.assignDishToMenu(menu1, dish3);


    //Fabada ya existe en la coleccion.
    //Añadido plato Fabada al menu WeekEnd
    //Paella ya existe en la coleccion.
    //Añadido plato Paella al menu WeekEnd

    //manager.deassignDishToMenu(menu1, dish2);
    //Eliminado Fabada al menu WeekEnd

    // console.log(manager.getDishesInCategory(cat2));
    //getDishesInCategory {<suspended>}

    //  manager.getCategoryOfDishes(cat2);
    //MapIterator {'Paella'}

    //manager.getDishesWithAllergen(aller2);
    //MapIterator {'Paella', 'Fabada'}

    manager.addDish(manager.createDish("Tortilla de Patatas", "Plato típico", "url image", "huevos", "patata", "cebolla"));
    //Añadido nuevo plato Tortilla de Patatas

    manager.addMenu(manager.createMenu("Menu Infantil", "Para los peques de la casa"));
    //Añadido nuevo menu Menu Infantil

    manager.addRestaurant(manager.createRestaurant("Casa Manolo", "El de toda la vida"));
    //Añadido nuevo Restaurante Casa Manolo

    manager.addAllergen(manager.createAllergen("Lactosa", "intolerante a productos lacteos"));
    //Añadido nuevo alérgeno Lactosa

    manager.addCategory(manager.createCategory("Entrantes", "Para picar"));
    //Añadida nueva categoria Entrantes

    // manager.addDish(manager.createDish("Paella"));
    //devuelve la excepcion que dice que el objeto ya esta registrado en la coleccion de platos.

    // console.log(manager.createDish("Paella"));
    //en este caso devuelve el objeto que ya está registrado.

    // console.log(manager.createMenu("Menu Infantil"));
    //en este caso devuelve el objeto que ya está registrado.

    //console.log(manager.createAllergen("Lactosa"));
    //en este caso devuelve el objeto que ya está registrado.

    //console.log(manager.createCategory("Entrantes"));
    //en este caso devuelve el objeto que ya está registrado.

    //console.log(manager.createRestaurant("Casa Manolo"));
    //en este caso devuelve el objeto que ya está registrado.



    console.log(manager);//mostramos el manager completo.



}

window.onload = test()

