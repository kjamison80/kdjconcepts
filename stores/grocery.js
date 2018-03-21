import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
    dayQty: 7,
    daysToPlan: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    plannedMeals: {},
    mealSelectorOptions: {
        display: false,
        day: 'sunday',
        meal: 'breakfast'
    }
};

export const actionTypes = {
    SET_DAY_QTY: 'set_day_qty',
    SET_MEAL_SELECTOR_OPTIONS: 'set_meal_selector_options',
    SET_PLANNED_MEAL: 'set_planned_meal',
};

// REDUCERS
export const reducer = (state = exampleInitialState, actions) => {
    switch (actions.type) {
        case actionTypes.SET_DAY_QTY:
            return { ...state, dayQty: actions.payload };
        case actionTypes.SET_MEAL_SELECTOR_OPTIONS:
            return { ...state, mealSelectorOptions: actions.payload };
        case actionTypes.SET_PLANNED_MEAL:
            return { ...state, plannedMeals: actions.payload };
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
 * Sets display state of meal selector
 * @param options
 * @returns {function(dispatch)}
 */
export const setMealSelectorOptions = options => dispatch => dispatch({ type: actionTypes.SET_MEAL_SELECTOR_OPTIONS, payload: options });

/**
 * Sets the planned meals
 * @param plan
 * @param curr
 * @returns {function(dispatch)}
 */
export const setPlannedMeal = (day, plan, curr) => dispatch => {
    const updatedPlannedMeals = { ...curr };
    updatedPlannedMeals[day] = { ...curr[day], ...plan };
    return dispatch({ type: actionTypes.SET_PLANNED_MEAL, payload: updatedPlannedMeals });
};

/**
 * Initializes the store
 * @param initialState
 */
export const initStore = (initialState = exampleInitialState) => (
    createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);
