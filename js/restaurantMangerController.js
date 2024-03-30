const MODEL = Symbol('RestautantManagerModel');
const VIEW = Symbol('RestaurantManagerView');

class RestarurantManagerController {
    constructor(modelRestaurantManager, viewRestaurantManager) {
        this[MODEL] = modelRestaurantManager;
        this[VIEW] = viewRestaurantManager;

        this.onInit();

        this.muestraManager();

        this[VIEW].bindInit(this.handleInit);


    }



    onInit = () => {

        this[VIEW].init();//vista que muestra el navegador de la página
        /** 
        *funciones que asignan a los listener de los botones del
        *navegador los manejadores con la carga de los datos que se
        *envian a las vistas correspondienes
        *
        */
        this[VIEW].bindCategories(this.handleCategories);
        this[VIEW].bindDishes(this.handleDishes);
        this[VIEW].bindAllergens(this.handleAllergens);
        this[VIEW].bindMenus(this.handleMenus);
        this[VIEW].bindRestaurants(this.handleRestaurants);

        //añadimos funcionalidad a las categorias del inicio.
        this[VIEW].bindDishInCategory(this.handleDishInCategory);
    }

    /**
     * manejador para devolver a la pagina al estado inicial.
     */
    handleInit = () => {
        this.onInit();
        this.onCharge();//cargamos las categorias al inicio




    }
    /**
     * carga de los datos de ejemplo.
     * @param {*} dishes 
     */
    onLoadDish = (dishes) => {
        for (const dish of dishes) {
            this[MODEL].addDish(dish.instance);
        }
        console.log("Carga de información de prueba...");
    }
    onLoadCategory = (categories) => {
        for (const category of categories) {
            this[MODEL].addCategory(category.instance);
        }
    }
    onLoadAllergen = (allergens) => {
        for (const allergen of allergens) {
            this[MODEL].addAllergen(allergen.instance);
        }
    }
    onLoadMenu = (menus) => {
        for (const menu of menus) {
            this[MODEL].addMenu(menu.instance);
        }
    }
    onLoadRestaurant = (restaurants) => {
        for (const restaurant of restaurants) {
            this[MODEL].addRestaurant(restaurant.instance);
        }
    }
    muestraManager() {
        console.log(this[MODEL]);
    }
    onCharge = () => {
        this[VIEW].showCategoriesType(this[MODEL].getCategories());
        this[VIEW].bindDishInCategory(this.handleDishInCategory);
        this.menuRest();
        this.menuCat();
        this.randomDish();
        this[VIEW].bindRandomDish(this.handleSelectedDish);
        this[VIEW].bindShowContenidoRest(this.handleSelectedRestaurant);
        this[VIEW].bindShowContenidoCat(this.handleDishInCategory)//

    }

    /** 
    *creamos los manejadores para obtener los datos del modelo
    *y los asignamos a las vistas correspondientes
    */
    handleCategories = () => {
        let categories = this[MODEL].getCategories();
        this[VIEW].showCategoriesType(categories);
        this[VIEW].bindDishInCategory(this.handleDishInCategory);
    }

    handleDishes = () => {
        let platos = this[MODEL].getDishes();
        this[VIEW].showDishesType(platos);
        this[VIEW].bindDishInDishes(this.handleSelectedDish);
    }

    handleAllergens = () => {
        let alergenos = this[MODEL].getAllergens();
        this[VIEW].showAllergensType(alergenos);
        this[VIEW].bindAllergensDetails(this.handleSelectedAllergen);
    }

    handleMenus = () => {
        let menus = this[MODEL].getMenus();
        this[VIEW].showMenusType(menus);
        this[VIEW].bindMenuDetails(this.handleSelectedMenu);
    }

    handleRestaurants = () => {
        let restaurants = this[MODEL].getRestaurants();
        this[VIEW].showRestaurantsType(restaurants);
        this[VIEW].bindRestaurantDetails(this.handleSelectedRestaurant);

    }
    /**
     * manejador que obtiene la inforamcion de un alergeno y se lo pasa
     * a la vista detallada del mismo
     * dota de funcionalidad a los platos relacionados con el alergeno seleccionado.
     * @param {*} name 
     */

    handleSelectedAllergen = (name) => {
        let allergen = this[MODEL].findAllergen(name);

        this[VIEW].showAllergenDetail(allergen);
        this[VIEW].bindSelectDish(this.handleSelectedDish);
    }
    /**
     * manejador que muestra los platos de cada cateroria y pasa el rastro
     * de migas de pan para saber la categoria del mismo
     * se dota de funcionalidad a los platos para que muestren su
     * informacion detallada
     * @param {*} name 
     */
    handleDishInCategory = (name) => {
        let dishCategories = this[MODEL].getDishesInCategory(name);
        this[VIEW].showDishInCategory(dishCategories, name);
        this[VIEW].bindSelectDish(this.handleSelectedDish);

    }
    /**
     * Manejador que recibe el parámetro del nombre de un plato
     * y le pasa toda la informacion del mismo a la vista
     * se muestran los alergenos y los menus relacionados
     * con el plato seleccionado y se dota de funcionalidad a las mismas
     * @param {*} name 
     */
    handleSelectedDish = (name) => {
        let info = this[MODEL].infoDish(name);
        this[VIEW].showSelectDishDetail(info);
        this[VIEW].bindSelectAllergen(this.handleSelectedAllergen);
        this[VIEW].bindSelectMenu(this.handleSelectedMenu)
    }

    /**
     * manejador que recupera la informacion de un menu y la pasa 
     * a la vista detallada del mismo
     * se dota de funcionalidad a los platos mostrados que estan
     * relacionados con el menu seleccionado.
     * @param {*} name 
     */
    handleSelectedMenu = (name) => {
        let menu = this[MODEL].findMenu(name);
        this[VIEW].showMenuDetails(menu);
        this[VIEW].bindSelectDish(this.handleSelectedDish);

    }
    /**
     * manejador que pasa la informacion de un restaurante a la 
     * vista detallada de los mismos.
     * @param {*} name 
     */
    handleSelectedRestaurant = (name) => {
        // console.log(name);
        let restaurant = this[MODEL].findRestaurant(name);
        this[VIEW].showRestaurantDetail(restaurant);

    }
    /**
     * muestra el menu desplegable de restaurantes
     * 
     */
    menuRest = () => {
        let restaurants = this[MODEL].getRestaurants();
        this[VIEW].showContenidoRest(restaurants)
    }
    /**
     * muestra el menu desplegable de categorias.
     */
    menuCat = () => {
        let categories = this[MODEL].getCategories();
        this[VIEW].showContenidoCat(categories);
    }

    /**
     * metodo que escoge 3 platos al azar y se los pasa a la vista.
     * 
     */
    randomDish = () => {
        let temp = this[MODEL].getDishes();
        let map = new Map();
        let secundario = new Map();
        let clave = 0;
        for (const [key, value] of temp) {
            secundario.set(clave, value);
            clave++;
        };
        let max = temp.size;
        for (let i = 0; i < 3; i++) {
            let numero = Math.floor(Math.random() * max);
            map.set(numero, secundario.get(numero));
        }
        this[VIEW].showRandomDish(map.values())
    }

}

export default RestarurantManagerController;