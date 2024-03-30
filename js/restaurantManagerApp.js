import Manager from './restaurantmanagerModel.js';
import { Category, Allergen, Coordinate, Dish, Menu, Restaurant } from './objects.js';
import RestarurantManagerController from './restaurantMangerController.js';
import RestaurantManagerView from './restaurantManagerView.js';

const RestaurantManagerApp = new RestarurantManagerController(Manager.getInstancia(), new RestaurantManagerView());

let cat1 = new Category("Pescados", "Directamente del mar");
let cat2 = new Category("De cuchara", "Apetece todo el año...");
let cat3 = new Category("Carnes", "Sin comentarios");
let cat4 = new Category("Entrantes", "Para picar");
let cat5 = new Category("Postres", "A quién le amarga un dulce?");
let dish1 = new Dish("Paella", "arroz con cosas", ["arroz", "pollo"]);
let dish2 = new Dish("Fabada", "Asturiana y contundente.", ["judias", "chorizo"]);
let dish3 = new Dish("Bacalao con tomate", "Para mojar pan",["Bacalao","Tomate","Aceite","Cebolla"]);
let dish4 = new Dish("Tortilla de Patatas", "Plato típico", ["huevos", "patata", "cebolla"], "url image",);
let dish5 = new Dish("Arroz Tres Delicias", "Con tortilla", ["arroz", "huevo", "gambas"]);
let dish6 = new Dish("Gyoza de Gamba", "De un bocado", ["Gambas", "Harina", "Cebolleta", "Gengibre"]);
let dish7 = new Dish("Chuletas de cordero", "Siempre triunfan", ["cordero", "ajo"]);
let dish8 = new Dish("Chuletón de Ávila", "La mejor carne", ["ternera", "patatas", "pimientos verdes fritos"]);
let dish9 = new Dish("Lomo de novillo a la brasa", "Al punto");
let dish10 = new Dish("Parrillada de Cerdo", "Hasta los andares...", ["chorizos", "morcilla", "panceta"]);
let dish11 = new Dish("Ensalada de Perdiz", "De nuestra tierra", ["brotes verdes", "tomate cherry", "perdiz"]);
let dish12 = new Dish("Gazpacho Andaluz", "En verano apetece un montón.", ["tomate", "pepino", "pimiento", "ajo"]);
let dish13 = new Dish("Rodaballo al horno", "¡Suculento!", ["Rodaballo fresco"]);
let dish14 = new Dish("Lubina a la espalda", "Elaboración fácil");
let dish15 = new Dish("Trucha a la navarra", "En la sierra", ["trucha", "jamón"]);
let dish16 = new Dish("Gachas", "Hoy hace día de gachas...", ["Harina de titos", "Ajos", "Pimentón"]);
let dish17 = new Dish("Torrijas", "Las más tradicionales", ["Pan", "lecha", "canela", "Azúcar"]);
let dish18 = new Dish("Tarta de Queso", "Irresistible", ["Queso Philadelphia", "Azúcar", "Harina"])
let dish19 = new Dish("Bizcochá", "Hay cosas que no se pueden imitar", ["Tortas de Alcázar", "Leche", "Canela", "Limón"]);
let menu1 = new Menu("WeekEnd", "Menu especial para el fin de semana");
let menu2 = new Menu("Menu del dia");
let menu3 = new Menu("Navidad", "Ofertas Especiales para Navidad");
let menu4 = new Menu("Menu Infantil", "Nunca falla");
let menu5 = new Menu("Vegetariano", "Sólo para valientes.")
let coord1 = new Coordinate(40.4618423556788, -3.6957148035669287);
let coord2 = new Coordinate(39.3907729885929, -3.2191598852469294);
let coord3 = new Coordinate(38.989814, -3.906697);
let rest1 = new Restaurant("Asador Donostiarra", "Sin comentarios...", coord1);
let rest2 = new Restaurant("La Mancha", "Cocina Tipica", coord2);
let rest3 = new Restaurant("Sukol", "Para tomar, llevar y recoger", coord3);
let rest4 = new Restaurant("Mesón Manolo", "El de toda la vida");
let aller1 = new Allergen("Trigo", "Intolerancia al Gluten");
let aller2 = new Allergen("Marisco", "Intolerancia a los crustaceos");
let aller3 = new Allergen("Frutos Secos", "Intolerancia a los frutos secos");
let aller4 = new Allergen("Lactosa", "intolerante a productos lacteos");

RestaurantManagerApp.onLoadDish([
    { instance: dish1 },
    { instance: dish2 },
    { instance: dish3 },
    { instance: dish4 },
    { instance: dish5 },
    { instance: dish6 },
    { instance: dish7 },
    { instance: dish8 },
    { instance: dish9 },
    { instance: dish10 },
    { instance: dish11 },
    { instance: dish12 },
    { instance: dish13 },
    { instance: dish14 },
    { instance: dish15 },
    { instance: dish16 },
    { instance: dish17 },
    { instance: dish18 },
    { instance: dish19 }
]);

RestaurantManagerApp.onLoadCategory([
    { instance: cat4 },
    { instance: cat2 },
    { instance: cat3 },
    { instance: cat1 },
    { instance: cat5 }
]);
RestaurantManagerApp.onLoadAllergen([
    { instance: aller1 },
    { instance: aller2 },
    { instance: aller3 },
    { instance: aller4 }
]);
RestaurantManagerApp.onLoadMenu([
    { instance: menu1 },
    { instance: menu2 },
    { instance: menu3 },
    { instance: menu4 },
    { instance: menu5 }
]);
RestaurantManagerApp.onLoadRestaurant([
    { instance: rest1 },
    { instance: rest2 },
    { instance: rest3 },
    { instance: rest4 }
]);
RestaurantManagerApp.onCharge();//hay que llamar a esta funcion primero para que cargue las categorías al inicio y poder mostrar la vista con las categorías.

Manager.getInstancia().assignCategoryToDish(cat1, dish3, dish13, dish14, dish15);
Manager.getInstancia().assignCategoryToDish(cat2, dish2, dish5, dish12, dish16);
Manager.getInstancia().assignCategoryToDish(cat3, dish7, dish8, dish9, dish10);
Manager.getInstancia().assignCategoryToDish(cat4, dish1, dish12, dish4, dish6, dish11);
Manager.getInstancia().assignCategoryToDish(cat5, dish17, dish18, dish19);


// Manager.getInstancia().deassignCategoryToDish(cat1,dish15);
Manager.getInstancia().assignAllergenToDish(dish1, aller1, aller2, aller4);
Manager.getInstancia().assignAllergenToDish(dish6, aller4, aller2);
Manager.getInstancia().assignAllergenToDish(dish19, aller4);



// Manager.getInstancia().deassignAllergenToDish(dish1,aller1);
Manager.getInstancia().assignDishToMenu(menu2, dish3, dish4, dish18);
Manager.getInstancia().assignDishToMenu(menu3, dish11, dish7, dish19);
Manager.getInstancia().assignDishToMenu(menu5, dish10, dish8, dish17);
Manager.getInstancia().assignDishToMenu(menu1, dish12, dish1, dish18);
Manager.getInstancia().assignDishToMenu(menu4, dish5, dish6, dish13, dish18);



// Manager.getInstancia().deassignDishToMenu(menu1, dish5);

export default RestaurantManagerApp;