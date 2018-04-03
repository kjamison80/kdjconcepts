import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// take data from tables and return meals array
const meals = {
  babs: {
      id: 1,
      name: 'BABS',
      items: [
        {
            qty: 1,
            id: 1,
        },
        {
            qty: 2,
            id: 2,
        },
        {
            qty: 2,
            id: 3,
        },
      ],
      type: 'breakfast', //maybe make this type id instead
  },
  chefsalad: {
      name: 'chef salad',
      items: [
        {
            qty: 2,
            id: 3,
        },
      ],
      type: 'dinner',
  },
  chilidogmadness: {
      name: 'chili dog madness',
      items: [],
      type: 'dinner',
  },
  chunkchickentacos: {
      name: 'chunk chicken tacos',
      items: [],
      type: 'dinner',
  },
  crumbletacos: {
      name: 'crumble tacos',
      items: [],
      type: 'dinner',
  },
  eggsalad: {
      name: 'egg salad',
      items: [],
      type: 'breakfast',
  },
  hambrugerhelper: {
      name: 'hamburger helper',
      items: [],
      type: 'dinner',
  },
  grilledchicken: {
      name: 'grilled chicken',
      items: [],
      type: 'dinner',
  },
  hotwingchickensandwiches: {
      name: 'hot wing chicken sandwiches',
      items: [],
      type: 'dinner',
  },
  leftovers: {
      name: 'leftovers',
      items: [],
      type: '',
  },
  pastaalahomer: {
      name: 'pasta a la homer',
      items: [],
      type: 'dinner',
  },
  pastamarinara: {
      name: 'pasta - marinara',
      items: [],
      type: 'dinner',
  },
  shreddedbeeftacos: {
      name: 'shredded beef tacos',
      items: [],
      type: 'dinner',
  },
  shreddedchickentacos: {
      name: 'shredded chicken tacos',
      items: [],
      type: 'dinner',
  },
};

// should be fetched from db: tables: items
const items = {
    1: {
        id: 1,
        name: 'bagel',
        category: 'bread',
        typicalPackageQty: 6,
    },
    2: {
        id: 2,
        name: 'bacon',
        category: 'meat',
        typicalPackageQty: 12,
    },
    3: {
        id: 3,
        name: 'eggs',
        category: 'refrigerated',
        typicalPackageQty: 12,
    },
};

const initialState = {
    dayQty: 8,
    daysOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    daysToPlan: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    plannedMeals: {},
    mealGroceryList: {},
    groceryList: {},
    mealSelectorOptions: {
        display: false,
        day: 'sunday',
        meal: 'breakfast'
    },
    items: {},
    meals: {},
    suggestedMealNames: [],
};

export const actionTypes = {
    SET_DAY_QTY: 'set_day_qty',
    SET_MEAL_SELECTOR_OPTIONS: 'set_meal_selector_options',
    SET_PLANNED_MEAL: 'set_planned_meal',
    UPDATE_DAYS_TO_PLAN: 'update_days_to_plan',
    UPDATE_START_DAY: 'update_start_day',
    UPDATE_MEAL_GROCERY_LIST: 'update_meal_grocery_list',
    UPDATE_GROCERY_LIST: 'update_grocery_list',
    GET_ITEMS: 'get_items',
    GET_SUGGESTED_MEAL_NAMES: 'get_suggested_meal_names',
    GET_MEALS: 'get_meals',
};

// REDUCERS
export const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.SET_DAY_QTY:
            return { ...state, dayQty: actions.payload };
        case actionTypes.SET_MEAL_SELECTOR_OPTIONS:
            return { ...state, mealSelectorOptions: actions.payload };
        case actionTypes.SET_PLANNED_MEAL:
            return { ...state, plannedMeals: actions.payload };
        case actionTypes.UPDATE_DAYS_TO_PLAN:
            return { ...state, daysToPlan: actions.payload };
        case actionTypes.UPDATE_START_DAY:
            return { ...state, daysToPlan: actions.payload };
        case actionTypes.UPDATE_MEAL_GROCERY_LIST:
            return { ...state, mealGroceryList: actions.payload };
        case actionTypes.UPDATE_GROCERY_LIST:
            return { ...state, groceryList: actions.payload };
        case actionTypes.GET_ITEMS:
            return { ...state, items: actions.payload };
        case actionTypes.GET_SUGGESTED_MEAL_NAMES:
            return { ...state, suggestedMealNames: actions.payload };
        case actionTypes.GET_MEALS:
            return { ...state, meals: actions.payload };
        default: return state;
    }
};

// ACTIONS

/**
 * Sets how many days you want to plan meals for
 * @param qty
 * @returns {function(dispatch)}
 */
export const setDayQty = qty => dispatch => dispatch({ type: actionTypes.SET_DAY_QTY, payload: qty });

/**
 * Reusable function that creates an array of days to plan based on start day and qty of days to plan.
 * @param currDays
 * @param startDay
 * @param qty
 * @returns Array []
 */
const updateDays = (currDays, startDay, qty) => {
    const daysOfWeek = [...initialState.daysOfWeek];
    const indexStart = currDays.length ? daysOfWeek.indexOf(startDay) : 0;
    let updatedDays = [];

    for (let i = indexStart; i < (qty + indexStart); i++) {
        updatedDays = [...updatedDays, daysOfWeek[i % 7]];
    }

    return [...updatedDays];
}

/**
 * Updates the days to plan based on qty changes
 * @param days
 * @param qty
 * @returns {function(dispatch)}
 */
export const updateDaysToPlan = (days, qty) => dispatch => {
    const updatedDays = updateDays(days, days[0], qty);

    return dispatch({ type: actionTypes.UPDATE_DAYS_TO_PLAN, payload: updatedDays });
}

/**
 * Updates the days to plan based on start date changes.
 * @param daysToPlan
 * @param newStartDay
 * @returns {function(dispatch)}
 */
export const updateStartDay = (daysToPlan, newStartDay) => dispatch => {
    const updatedDays = updateDays(daysToPlan, newStartDay, daysToPlan.length);

    return dispatch({ type: actionTypes.UPDATE_START_DAY, payload: updatedDays});
}

/**
 * Sets display state of meal selector
 * @param options
 * @returns {function(dispatch)}
 */
export const setMealSelectorOptions = options => dispatch => dispatch({ type: actionTypes.SET_MEAL_SELECTOR_OPTIONS, payload: options });

/**
 * Sets the planned meals for selected day and meal type
 * @param key
 * @param day
 * @param plan
 * @param curr
 * @returns {function(dispatch)}
 */
export const setPlannedMeal = (key, day, plan, curr) => dispatch => {
    const updatedPlannedMeals = { ...curr };
    updatedPlannedMeals[key] = { ...curr[key], ...plan };
    return dispatch({ type: actionTypes.SET_PLANNED_MEAL, payload: updatedPlannedMeals });
};

/**
* Updates items from the planned meal to the grocery list
* @param list
* @param items
* @returns {function(dispatch)}
*/
export const updateMealGroceryList = (list, items) => dispatch => {
    const updatedList = updateList(list, items);

    return dispatch({ type: actionTypes.UPDATE_MEAL_GROCERY_LIST, payload: updatedList });
};

/**
* Reusable function that checks if item is in the list and if it is the qty will increase or else add the item
* @param list
* @param items
* @returns Object
*/
const updateList = (list, items) => {
    const updatedList = items.reduce((finalList, listItem) => {
        if (typeof finalList[listItem.id] === 'undefined') {
            return { ...finalList, [listItem.id]: { ...listItem } };
        } else {
            finalList[listItem.id].qty += listItem.qty;
            return { ...finalList };
        }
    }, {});

    return updatedList;
};

/**
* Updates items from the planned meal to the grocery list and merges with individual items
* @param list
* @param items
* @returns {function(dispatch)}
*/
export const mergeLists = (list, mealList) => dispatch => {
    const updatedList = Object.keys(mealList).reduce((finalList, mealListItemKey) => {
        if (typeof finalList[mealListItemKey] === 'undefined') {
            return { ...finalList, [mealListItemKey]: { ...mealList[mealListItemKey] } };
        } else {
            finalList[mealListItemKey].qty += mealList[mealListItemKey].qty;
            return { ...finalList };
        }
    }, { ...list });

    return dispatch({ type: actionTypes.UPDATE_GROCERY_LIST, payload: updatedList });
};

// const sortListByCategory = (list) => {};

/**
* Gets all stored items
* @returns {function(dispatch)}
*/
export const getItems = () => dispatch => {
    return dispatch({ type: actionTypes.GET_ITEMS, payload: items });
};

/**
* Gets all stored meals
* @returns {function(dispatch)}
*/
export const getMeals = () => dispatch => {
    return dispatch({ type: actionTypes.GET_MEALS, payload: meals });
};

/**
* Gets all stored meal names and types for autosuggest
* @returns {function(dispatch)}
*/
export const getSuggestedMealNames = (meals) => dispatch => {
    const suggestedMeals = Object.keys(meals).map(mealKey => {
        return { name: meals[mealKey].name, type: meals[mealKey].type };
    });
    return dispatch({ type: actionTypes.GET_SUGGESTED_MEAL_NAMES, payload: [...suggestedMeals] });
};

/**
 * Initializes the store
 * @param initialState
 */
export const initStore = (initialState = initialState) => (
    createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);
