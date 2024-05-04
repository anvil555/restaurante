/**
 * importamos las clases con las excepciones del archivo ./exception.js
 */

import {
    ValueEmptyException, InvalidConstructorException,
    UnexpectedObjectException, ItemNotFoundException,
    ObjectAlreadyExistsException, CategoryNotExistException,
    NullObjectException, AuthenticationServiceException
} from './exceptions.js';





/**
 * El siguiente listado están definidos los objetos de entidad, es decir, 
 * objetos planos que tan solo tienen propiedades que almacenar, 
 * pero no tienen relación con otros objetos
 */

/**
 * Objeto que representa los alérgenos que puede tener un determinado plato.
 */
class Allergen {
    #name;
    #description;
    constructor(name, description) {
        if (!new.target) throw new InvalidConstructorException();
        if (!name) throw new ValueEmptyException();//la propiedad #name es obligatoria.
        this.#name = name;
        this.#description = description;

        /**
         * propiedades de acceso para que sean enumerables hay que definirlas en el constructor
         * Al definir como privadas las propiedades con el atributo #
         * los getter y setter se definen en el cuerpo de la clase.
         * 
         * lo dejo comentado a modo de ejemplo.
         * 
         */
        /*
         Object.defineProperty(this, "name", {
             enumerable: true,
             get() {
                 return this.#name;
             },
             set(value) {
                 if (!value) throw new ValueEmptyException();
                 this.#name = value;
             }
         });
         */
        // Object.defineProperty(this, "description", {
        //     enumerable: true,
        //     get() {
        //         return this.#description;
        //     },
        //     set(value) {
        //         this.#description = value;
        //     }
        // })

    }

    /**
     * getter de la propiedad #name
     */
    get name() {
        return this.#name;
    }
    /**
     * set de la propiedad #name se le asigna el parámetro value
     */
    set name(value) {
        this.#name = value;
    }
    /**
     * getter de la propiedad #description
     */
    get description() {
        return this.#description;
    }
    /**
     * set de la propiedad #description se le asigna el parámetro value
     */
    set description(description) {
        this.#description = description;
    }
    /**
     * metodo que retorna una cadena con las propiedades del objeto.
     * @returns 
     */
    toString() {
        return `${this.#name} ${this.#description}`;
    }
}

/**
 * Con este objeto podemos crear la estructura de categorías.
 */
class Category {
    //propiedades privadas
    #name;
    #description;
    constructor(name, description) {//
        if (!new.target) throw new InvalidConstructorException();
        if (!name) throw new ValueEmptyException();//la propiedad name es obligatoria
        this.#name = name;
        this.#description = description;
    }
    /**
     * getter, setter y metodo toString() de la clase Category
     */
    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }
    set description(description) {
        this.#description = description;
    }
    toString() {
        return `${this.#name} ${this.#description}`;
    }
}


/**
 * Objeto para identificar las propiedades de un plato.
 * La propiedad ingredientes es una coleccion con los nombres de los ingredientes
 * del plato. 
 * Como mejora la hubiera implementado como una clase propia y que además estuviera 
 * relacionada de alguna manera con los alérgenos.
 */
class Dish {
    #name;
    #description;
    #ingredients = [];
    #image;
    constructor(name, description, ingredients, image) {
        if (!new.target) throw new InvalidConstructorException();

        if (!name) {
            throw new NullObjectException();//la propiedad #name es obligatoria
        }
        this.#name = name;
        this.#description = description;
        if (!ingredients) {//la propiedad ingredients es una coleccion con los nombres de los ingredientes
            this.create();//si no se pasa como parámetro creamos un nuevo array en el constructor
        } else {
            this.#ingredients = ingredients;
        }
        this.#image = image;


    }//fin de constructor

    /**
     * getter y setter
     */
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }
    get ingredients() {
        return this.#ingredients;
    }

    get image() {
        return this.#image;
        //console.log(image.name); 
    }
    set name(name) {
        this.#name = name;

    }
    set description(description) {
        this.#description = description;
    }
    set image(image) {
        this.#image = image;
        //paella.image = "foto" 
    }
    set ingredients(ingredients) {
        this.#ingredients = ingredients;
    }
    /**
     * metodos de la colección de ingredientes.
     */

    /**
     * crea la colección.
     */
    create() {
        this.#ingredients = [];
    }

    /**
     * añade ingredientes a la coleccion.
     * @param {*} ingredient 
     * @returns 
     */
    addIngredients(ingredient) {
        this.#ingredients.push(ingredient);
        return this.size();
    }

    /**
     * elimina ingredientes de la coleccion.
     * @param {*} object 
     * @returns 
     */
    removeIngredients(object) {
        let control = false;
        if (this.#ingredients.includes(object)) {
            let posicion = this.indexOf(object);
            if (this.#ingredients.splice(posicion, 1)) {
                control = true;
            }
        }
        return control;
    }

    /**
     * devuelve el tamaño de la coleccion de ingredientes.
     * @returns 
     */
    size() {
        return this.#ingredients.length;
    }

    /**
     * comprueba si está vacío
     * @returns 
     */
    isEmpty() {
        return this.#ingredients.length === 0;
    }
    /**
     * devuelve el indice de un ingrediente
     * @param {*} object 
     * @returns 
     */
    indexOf(object) {
        if (!this.#ingredients.includes(object)) {
            throw new ItemNotFoundException(Object.values(object));
        } else {
            return this.#ingredients.indexOf(object);

        }
    }

    /**
     * devuelve una cadena con las propiedades del objeto.
     * @returns 
     */
    toString() {
        return `${this.#name} ${this.#description} ${this.size()}` + " ingredientes";
    }
}

/**
 * Esta clase es una agregación de platos.
 */

class Menu {
    #name;
    #description;
    constructor(name, description) {
        if (name === undefined) {
            throw new NullObjectException();//esta propiedad es obligatoria
        } else {
            this.#name = name;
        }
        this.#description = description;
    }

    /**
     * getter, setter y toString de la clase Menu
     */
    get name() {
        return this.#name;
    }
    get description() {
        return this.#description;
    }
    set name(name) {
        this.#name = name;
    }
    set description(description) {
        this.#description = description;
    }
    toString() {
        return `${this.#name} ${this.#description}`;
    }
}



class Restaurant {
    #name;
    #description;
    #location;
    constructor(name, description, location) {
        if (name === undefined) {
            throw new NullObjectException();//esta propiedad es obligatoria
        } else {
            this.#name = name;
        }
        this.#description = description;
        // if (location === undefined) {
        //     this.#location = "";
        // } else {
        this.#location = location;//utilizamos el set
        // }
    }

    /**
     * getter, setter y toString de la clase Restaurant
     */
    get name() {

        return this.#name;
    }
    get description() {
        return this.#description;
    }
    set name(name) {
        this.#name = name;
    }
    set description(description) {
        this.#description = description;
    }
    get location() {
        return this.#location;
    }
    /**
     * en el setter de la propiedad location validamos el tipo de objeto que añdimos.
     */
    set location(coordinate) {
        if (coordinate instanceof Coordinate) {
            this.#location = coordinate;
        }
    }

    toString() {
        return `${this.#name} ${this.#description} ${this.#location}`;
    }
}


/**
 * Define las coordenadas para localizar la ubicacion de un restauante
 * Se pasa como parámetro al objeto Restaurant
 */
class Coordinate {
    #latitude;
    #longitude;
    constructor(latitude, longitude) {
        if (!new.target) throw new InvalidConstructorException();
        if (!latitude) throw new ValueEmptyException();//propiedad obligatoria
        latitude = Number.parseFloat(latitude);  //la parseamos como Float      
        this.#latitude = latitude;
        if (!longitude) throw new ValueEmptyException();//propiedad obligaoria
        longitude = Number.parseFloat(longitude);     //la parseamos como Float   
        this.#longitude = longitude;
    }

    /**
     * getter, setter y toString() de la clase Coordinate.
     */
    get latitude() {
        return this.#latitude;
    }
    get longitude() {
        return this.#longitude;
    }
    set latitude(latitude) {
        if (!latitude) throw new ValueEmptyException();
        this.#latitude = latitude;
    }
    set longitude(longitude) {
        if (!longitude) throw new ValueEmptyException();
        this.#longitude = longitude;
    }

    toString() {
        return `${this.#latitude} ${this.#longitude}`;
    }
}
class User {
    // Campos privados
    #username;
    #preferences;
    constructor(username) {
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!username) throw new EmptyValueException('username');
        this.#username = username;
        Object.defineProperty(this, 'username', {
            enumerable: true,
            get() {
                return this.#username;
            },
        });
        Object.defineProperty(this, 'preferences', {
            enumerable: true,
            get() {
                return this.#preferences;
            },
            set(value) {
                if (!value) throw new EmptyValueException('preferences');
                this.#preferences = value;
            },
        });
    }
    get username() {
        return this.#username;
    }
}

/**
 * exportamos los objetos 
 */
export { Category, Allergen, Coordinate, Dish, Menu, Restaurant, User };
