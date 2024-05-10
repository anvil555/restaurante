
import { Category, Allergen, Coordinate, Dish, Menu, Restaurant } from './objects.js';

import RestaurantManagerController from './restaurantManagerController.js';
import RestaurantManagerView from './restaurantManagerView.js';
import AuthenticationService from './authentication.js';
import Manager from './restaurantmanagerModel.js';
/**
 * https://github.com/anvil555/restaurante.git
 */

const RestaurantManagerApp = new RestaurantManagerController(Manager.getInstancia(), new RestaurantManagerView(), AuthenticationService.getInstance());


export default RestaurantManagerApp;