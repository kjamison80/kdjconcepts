import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
    dayQty: 8,
    daysOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    daysToPlan: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
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
    UPDATE_DAYS_TO_PLAN: 'update_days_to_plan',
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
        case actionTypes.UPDATE_DAYS_TO_PLAN:
            return { ...state, daysToPlan: actions.payload };
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


export const updateDaysToPlan = (days, qty) => dispatch => {
    const initialDays = [...exampleInitialState.daysToPlan];
    const indexStart = days.length ? initialDays.indexOf(days[0]) : 0;
    let updatedDays = [];

    for (let i = indexStart; i < qty; i++) {
        updatedDays = [...updatedDays, exampleInitialState.daysOfWeek[i < 7 ? i : i % 7]];
    }

    return dispatch({ type: actionTypes.UPDATE_DAYS_TO_PLAN, payload: updatedDays });
}

/**
 * Sets display state of meal selector
 * @param options
 * @returns {function(dispatch)}
 */
export const setMealSelectorOptions = options => dispatch => dispatch({ type: actionTypes.SET_MEAL_SELECTOR_OPTIONS, payload: options });

/**
 * Sets the planned meals for selected day and meal type
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
 * Initializes the store
 * @param initialState
 */
export const initStore = (initialState = exampleInitialState) => (
    createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
);
