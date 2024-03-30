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

        this[VIEW].init();
        this[VIEW].bindCategories(this.handleCategories);
        this[VIEW].bindDishes(this.handleDishes);
        this[VIEW].bindAllergens(this.handleAllergens);
        this[VIEW].bindMenus(this.handleMenus);
        this[VIEW].bindRestaurants(this.handleRestaurants);
        this[VIEW].bindDishInCategory(this.handleDishInCategory);  //añadimos funcionalidad a las categorias del inicio.

    }

    handleInit = () => {
        this.onInit();
        this.onCharge();//cargamos las categorias al inicio




    }

    onLoadDish = (dishes) => {
        for (const dish of dishes) {
            this[MODEL].addDish(dish.instance);
        }
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
        this.randomDish();
        this[VIEW].bindRandomDish(this.handleSelectedDish);
        this[VIEW].bindShowContenidoRest(this.handleSelectedRestaurant);


    }

    /*
    creamos los manejadores para obtener los datos del modelo
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

    handleSelectedAllergen = (name) => {
        let allergen = this[MODEL].findAllergen(name);

        this[VIEW].showAllergenDetail(allergen);
        this[VIEW].bindSelectDish(this.handleSelectedDish);

        //la vista para mostrar el detalle de los alergenos 
        //tiene que estar en el manejador de los alergenos 
        //si la ponemos al cargar la pagina 
        //como no se ha generado el elemento da fallo...

    }

    handleDishInCategory = (name) => {
        let dishCategories = this[MODEL].getDishesInCategory(name);
        this[VIEW].showDishInCategory(dishCategories, name);
        this[VIEW].bindSelectDish(this.handleSelectedDish);

    }
    handleSelectedDish = (name) => {
        let info = this[MODEL].infoDish(name);
        this[VIEW].showSelectDishDetail(info);
        this[VIEW].bindSelectAllergen(this.handleSelectedAllergen);
        this[VIEW].bindSelectMenu(this.handleSelectedMenu)
    }

    handleSelectedMenu = (name) => {
        let menu = this[MODEL].findMenu(name);
        this[VIEW].showMenuDetails(menu);
        this[VIEW].bindSelectDish(this.handleSelectedDish);

    }
    handleSelectedRestaurant = (name) => {
        console.log(name);
        let restaurant = this[MODEL].findRestaurant(name);
        this[VIEW].showRestaurantDetail(restaurant);

    }
    menuRest = () => {
        let restaurants = this[MODEL].getRestaurants();
        this[VIEW].showContenidoRest(restaurants)
    }
   

    randomDish =() => {
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