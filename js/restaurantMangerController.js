//import { Category, Allergen, Coordinate, Dish, Menu, Restaurant } from './objects.js';


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
        this[VIEW].showContenidoOpt();//tarea 6 menu opciones.
        this[VIEW].bindRandomDish(this.handleSelectedDish);
        this[VIEW].bindShowContenidoRest(this.handleSelectedRestaurant);
        this[VIEW].bindShowContenidoCat(this.handleDishInCategory);//
        this[VIEW].bindshowContenidoOpt(this.handleSelectedOption);/////////////

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


    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/
    /**********************   TAREA 6  *****************************/

    /**
     * manejador para el desplegable de opciones. Recibe un valor y en funcion
     * de él mostramos una vista con un modal para la opcion seleccionada.
     * 
     * 
     * en esta tarea he incluido los listener directamente en las vistas
     * porque me daba fallos de funcionalidad.
     * (ando un poco justo de tiempo para entregar la tarea en fecha).
     * Para la version 3 (si la hay) lo modifico.
     * 
     * @param {*} name 
     */
    handleSelectedOption = (name) => {
        let allergens = this[MODEL].getAllergens();
        let categories = this[MODEL].getCategories();
        let dishes = this[MODEL].getDishes();
        let menus = this[MODEL].getMenus();

        if (name == 'newdish') {
            //vista para crear un nuevo plato con la funcionalidad incluida
            this[VIEW].showDishModal(this.handleAddDish, categories, allergens);
        } else if (name === 'removedish') {
            //vista para eliminar un plato y su funcionalidad
            this[VIEW].showRemoveDishModal(this.handleRemoveDish, dishes);
        } else if (name === 'menugest') {
            //vista para asignar/desasignar un menu con la funcionalidad incluida
            this[VIEW].showMenuGestModal(this.handleMenuGest, menus, dishes);
        } else if (name === 'categorygest') {
            //vista para eliminar y crear categorias con su funcionalida incluida
            this[VIEW].showCategoryGestModal(this.handleCategoryGest, categories);
        } else if (name === 'newrest') {
            //vista para crear un restaurante con la funcionalidad incluida
            this[VIEW].showNewRestModal(this.handleNewRest);
        } else if (name === 'dishcategory') {
            //vista para asignar/desasignar categorias con la funcionalidad incluida
            this[VIEW].showDishCategoryModal(this.handleDishCategory, categories, dishes);


        }
    }
    /**
     * 
     * @param {*} dish 
     * @param {*} category 
     * @param {*} allergens 
     * metodo que recoge un objeto literal dish, lo convierte en un objeto Dish
     * y lo asigna a la coleccion. asi como toma la categoria y asigna el plato a dicha categoria
     * Tambien recibe una coleccion de alergenos y asigna el plato a esa coleccion.
     * 
     * muestra la vista de la ficha del plato creado
     */

    handleAddDish = (dish, category, allergens) => {
        // console.log(dish);
        // console.log(dish.name);
        let name = dish.name;
        let description = dish.description;
        let image = dish.image;
        let ingredients = dish.ingredients;

        this[MODEL].createDish(name, description, image, ingredients);//creamos el objeto y lo añadimos a la coleccion.

        let storedDish = this[MODEL].findDish(dish.name);// buscamos el plato en la coleccion
        let storedCategory = this[MODEL].findCategory(category);//buscamos la categoria en la coleccion

        this[MODEL].assignCategoryToDish(storedCategory.category, storedDish);//asignamos el plato a la categoria
        for (const allergen of allergens) {
            this[MODEL].assignAllergenToDish(storedDish, this[MODEL].findAllergen(allergen).allergen);//asignamos el plato a los alergenos pasados por array
        }

        //mostramos la ficha del plato creado y le damos funcionalidad
        this[VIEW].showSelectDishDetail(this[MODEL].infoDish(name));
        this[VIEW].bindSelectAllergen(this.handleSelectedAllergen);
        this[VIEW].bindSelectMenu(this.handleSelectedMenu);

        //informamos del proceso.
        this[VIEW].showConfirmModal(storedDish);
    }
    /**
     * manejador para eliminar un plato
     * 
     * muestra la vista principal de los platos
     * 
     * @param {*} dish 
     */
    handleRemoveDish = (dish) => {
        // console.log(dish);
        let storedDish = this[MODEL].findDish(dish);

        this[MODEL].removeDish(storedDish);
        this[MODEL].deleteDishFromCollection(storedDish);


        //mostramos la vista de los platos y le damos funcionalidad
        this[VIEW].showDishesType(this[MODEL].getDishes());
        this[VIEW].bindDishInDishes(this.handleSelectedDish);

        //informamos del proceso
        this[VIEW].showDeleteModal(storedDish);
    }
    /**
     * funcion que asigna o elimina un plato a un menu
     * he intentado implementar una funcion en el modelo que a la hora de
     * asignar una nuevo menu filtrara
     * los platos que no existen en el menu seleccionado.
     * pero no he sabido/podido pasarla a la vista 
     * 
     * this[MODEL].filterDishes(menu);
     * 
     * A la hora de desasignar un menu SI que muestra solamente
     * los platos del menu seleccionado.
     * 
     * muestra la vista principal de los menus.
     * 
     * @param {*} dish 
     * @param {*} menu 
     */

    handleMenuGest = (dish, menu) => {
        let storedMenu = this[MODEL].findMenu(menu);
        let storedDish = this[MODEL].findDish(dish);

        if (!storedMenu.dishes.has(dish)) {
            this[MODEL].assignDishToMenu(storedMenu.menu, storedDish);
            // console.log("Plato añadido al menu");

            //informamos del proceso
            this[VIEW].showConfirmModal(storedDish);
        } else {
            this[MODEL].deassignDishToMenu(storedMenu.menu, storedDish);
            // console.log("Plato eliminado del menu");

            //informamos del proceso
            this[VIEW].showDeleteModal(storedDish);
        }
        //mostramos la vista de los menús y los dotamos de funcionalidad
        this[VIEW].showMenusType(this[MODEL].getMenus());
        this[VIEW].bindMenuDetails(this.handleSelectedMenu);
    }
    /**
     * Se recibe un objeto literal con las propiedades de una categoria
     * si no existe en la coleccion se añade. 
     * de lo contrario se elimina.
     * 
     * muestra la vista principal de las categorias y actualiza el desplegable
     * @param {*} category 
     */
    handleCategoryGest = (category) => {

        if (!this[MODEL].getCategories().has(category.name)) {
            //creamos la categoría
            this[MODEL].createCategory(category.name, category.description);

            //actualiza la visa del desplegable de categorias y le da funcionalidad
            this[VIEW].showContenidoCat(this[MODEL].getCategories());
            this[VIEW].bindShowContenidoCat(this.handleDishInCategory);

            //actualiza las categorias de la vista principal de la pagina y le da funcionalidad
            this[VIEW].showCategoriesType(this[MODEL].getCategories());
            this[VIEW].bindDishInCategory(this.handleDishInCategory);

            //informamos del proceso
            this[VIEW].showConfirmModal(category);

        } else {
            let storedCategory = this[MODEL].findCategory(category.name);
            //eliminamos la categoria
            this[MODEL].removeCategory(storedCategory.category)

            //actualiza la visa del desplegable de categorias y le da funcionalidad
            this[VIEW].showContenidoCat(this[MODEL].getCategories());
            this[VIEW].bindShowContenidoCat(this.handleDishInCategory);

            //actualiza las categorias de la vista principal de la pagina y le da funcionalidad
            this[VIEW].showCategoriesType(this[MODEL].getCategories());
            this[VIEW].bindDishInCategory(this.handleDishInCategory);

            //informamos del proceso  
            this[VIEW].showDeleteModal(storedCategory.category);
        }
    }

    /**
     * recibimos un objeto literal con las propiedades del nuevo restaurante y las 
     * pasamos al metodo del modelo createRestaurant.
     * 
     * muestra la vista principal de los restaurantes y actualiza el desplegable
     * @param {*} restaurant 
     */
    handleNewRest = (restaurant) => {
        //creamos el restaurante
        this[MODEL].createRestaurant(restaurant.name, restaurant.description, restaurant.latitude, restaurant.longitude);

        //actualizamos la vista del desplegable de restaurantes
        this[VIEW].showContenidoRest(this[MODEL].getRestaurants())
        this[VIEW].bindShowContenidoRest(this.handleSelectedRestaurant);

        //mostramos la vista de los restaurantes y le damos funcionalidad.
        this[VIEW].showRestaurantsType(this[MODEL].getRestaurants());
        this[VIEW].bindRestaurantDetails(this.handleSelectedRestaurant);

        //informamos del proceso
        this[VIEW].showConfirmModal(restaurant);
    }

    /**
     * funcion que asigna o elimina un plato a una categoria
     * he intentado implementar una funcion en el modelo que a la hora de
     * asignar una nueva categoria filtrara
     * los platos que no existen en la categoria seleccionada.
     * pero no he sabido/podido pasarla a la vista
     * 
     * A la hora de desasignar una categoria SI que muestra solamente
     * los platos de la categoría seleccionada.
     * 
     * muestra la vista principal de las categorias
     * 
     * @param {*} dish 
     * @param {*} category 
     */
    handleDishCategory = (dish, category) => {
        let storedCategory = this[MODEL].findCategory(category);
        let storedDish = this[MODEL].findDish(dish);
        if (storedCategory.dishes) {
            //si la categoria ya tiene platos asignados
            if (!storedCategory.dishes.has(dish)) {

                //asignamos la categoría al plato
                this[MODEL].assignCategoryToDish(storedCategory.category, storedDish);

                //actualiza las categorias de la vista principal de la pagina y le da funcionalidad
                this[VIEW].showCategoriesType(this[MODEL].getCategories());
                this[VIEW].bindDishInCategory(this.handleDishInCategory);

                //informamos del proceso
                this[VIEW].showConfirmModal(storedDish);
            } else {
                //eliminamos el plato de la categoría
                this[MODEL].deassignCategoryToDish(storedCategory.category, storedDish);

                //actualiza las categorias de la vista principal de la pagina y le da funcionalidad
                this[VIEW].showCategoriesType(this[MODEL].getCategories());
                this[VIEW].bindDishInCategory(this.handleDishInCategory);

                //informamos del proceso
                this[VIEW].showDeleteModal(storedDish);
            }
            //de lo contrario
        } else {
            //asignamos la categoría al plato
            this[MODEL].assignCategoryToDish(storedCategory, storedDish);

            //actualiza las categorias de la vista principal de la pagina y le da funcionalidad
            this[VIEW].showCategoriesType(this[MODEL].getCategories());
            this[VIEW].bindDishInCategory(this.handleDishInCategory);

            //informamos del proceso
            this[VIEW].showConfirmModal(storedDish);

        }



    }




}//fin de clase

export default RestarurantManagerController;