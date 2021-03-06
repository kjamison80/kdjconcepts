import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
import { CSSTransition, transit } from "react-css-transition";
import { initStore, setMealSelectorOptions, setPlannedMeal, updateMealGroceryList } from '../stores/grocery';

// tables: meals, mealItems, mealTypeIds
const mealsDbData = {
	1: {
		id: 1,
		name: 'BABS',
		type: 1,
	}
};

// This would be on save
const mealItemsDbData = {
	1: {
		id: 1,
		mealId: 1,
		name: 'bagel',
	},
	2: {
		id: 2,
		mealId: 1,
		name: 'bacon',
	}
};
const mealTypeIdsDbData = {
	1: 'breakfast',
	2: 'lunch',
	3: 'dinner',
};

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, suggestedMealNames) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [...suggestedMealNames] : suggestedMealNames.filter(meal =>
        meal.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);


const flatten = (arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

class DayOptions extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	        value: '',
	        suggestions: this.props.suggestedMealNames ? [...this.props.suggestedMealNames] : [],
	        filterByMealType: true,
	        mounted: true,
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
	    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
	    this.handleClearInputClick = this.handleClearInputClick.bind(this);
	    this.typeOnChange = this.typeOnChange.bind(this);
	    this.handleDoneClick = this.handleDoneClick.bind(this);
	    this.onTransitionComplete = this.onTransitionComplete.bind(this);
	}

	componentDidMount() {
		// ADD THE GET ITEMS AND MEALS HERE, CHECK IF LENGTH, THEN FETCH IF 0 ONLY AND REMOVE FROM /PAGES/GROCERY.JS AND DISPLAY THE MAIN UI
		// ONLY IF LENGTH > 0
	}

	componentWillUnmount() {
		const { items, plannedMeals, mealGroceryList, updateMealGroceryList, meals } = this.props;
		const mealItems = Object.keys(plannedMeals).map(meal => {
			return Object.keys(plannedMeals[meal]).map(m => meals[plannedMeals[meal][m].name.toLowerCase().replace(/\W/g, '')].items.map(item => {
				return { ...items[item.id], qty: item.qty };
			}));
		});
		const mergedItems = flatten(mealItems);

		updateMealGroceryList(mealGroceryList, mergedItems);
	}

	onChange(event, { newValue }) {
	    this.setState({
	        value: newValue,
	    });
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
		const { suggestedMealNames } = this.props;

	    this.setState({
	        suggestions: getSuggestions(value, suggestedMealNames),
	    });
	}

	// Autosuggest will call this function every time you need to clear suggestions.
	// Commented out the setting of the state for now cause it was clearing suggestions on blur
	onSuggestionsClearRequested() {
	    // this.setState({
	    //     suggestions: [...meals],
	    // });
	}

	handleClearInputClick() {
		const { suggestedMealNames } = this.props;

		this.setState({
			value: '',
			suggestions: [...suggestedMealNames],
		});
	}

	typeOnChange(event) {
	    this.setState({
	        filterByMealType: event.currentTarget.checked,
	    });
	}

	handleDoneClick(key, day, meal) {
		const { setPlannedMeal, plannedMeals } = this.props;

		setPlannedMeal(key, day, { [meal]: { id: 1, name: this.state.value } }, plannedMeals);

		this.setState({
			mounted: false,
		});
	}

	onTransitionComplete() {
		const { setMealSelectorOptions } = this.props;
		const { mounted } = this.state;

		if (!mounted) {
	        setMealSelectorOptions({ display: false });
	    }
	}

    render() {
        const { mealSelectorOptions } = this.props;
	    const { value, suggestions, filterByMealType, mounted } = this.state;

	    // Autosuggest will pass through all these props to the input.
	    const inputProps = {
	        placeholder: 'Type a meal nickname',
	        value,
	        onChange: this.onChange,
	    };

		CSSTransition.childContextTypes = {
	    	// this prevents error and can be empty
		};

        return (
            <CSSTransition
                className="p-fix full-screen modal-overlay"
                defaultStyle={{ opacity: 0, top: '100%' }}
                enterStyle={{ opacity: transit(1, 200, 'ease-in-out'), top: transit(0, 200, 'ease-in') }}
                leaveStyle={{ top: transit('100%', 200, 'ease-in') }}
                activeStyle={{ opacity: 1, top: 0 }}
                transitionDelay={{ enter: 0, leave: 170 }}
                active={mounted}
                transitionAppear
	            onTransitionComplete={this.onTransitionComplete}
            >
	            <CSSTransition
	            	className="p-abs modal-window"
	                defaultStyle={{ opacity: 0, transform: 'scale(.5, .5)' }}
	                enterStyle={{ opacity: transit(1, 150, 'ease-in-out'), transform: transit('scale(1, 1)', 100, 'ease-in-out') }}
	                leaveStyle={{ opacity: transit(0, 150, 'ease-in-out'), transform: transit('scale(.5, .5)', 100, 'ease-in-out') }}
	                activeStyle={{ opacity: 1, transform: 'scale(1, 1)' }}
	                transitionDelay={{ enter: 180, leave: 0 }}
	                active={mounted}
	                transitionAppear
	            >
	                <p className="caps">
	                	<span className="upper-case bold">{mealSelectorOptions.day}:</span> {mealSelectorOptions.meal}
	                </p>
	                <div>
	                    <input id="filterByMealType" type="checkbox" checked={filterByMealType} onChange={e => this.typeOnChange(e)} /> <label htmlFor="filterByMealType" className="cursorPointer">Filber by meal type</label>
	                	
	                </div>
	                <div className="dw-80 mw-90 mlr-auto mTB1">
	                	<div className="mealPicker mlr-auto">
	                		{value && (
				    			<button onClick={this.handleClearInputClick} className="clearAutosuggestions">x</button>
				    		)}
	                		<Autosuggest
				        		suggestions={filterByMealType ? suggestions.filter(suggestion => suggestion.type === mealSelectorOptions.meal || suggestion.type === '') : suggestions}
				        		onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				        		onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				        		getSuggestionValue={getSuggestionValue}
				        		renderSuggestion={renderSuggestion}
				        		alwaysRenderSuggestions={true}
				        		inputProps={inputProps}
				        		focusInputOnSuggestionClick={false}
				      		/>
				        </div>
				        <button onClick={() => this.handleDoneClick(mealSelectorOptions.key, mealSelectorOptions.day, mealSelectorOptions.meal)}>Done</button>
				    </div>
	            </CSSTransition>
            </CSSTransition>
        );
    }
}

const mapStateToProps = ({ items, mealSelectorOptions, plannedMeals, mealGroceryList, meals, suggestedMealNames }) => ({ 
	items, 
	mealSelectorOptions, 
	plannedMeals, 
	mealGroceryList,
	meals, 
	suggestedMealNames,
});

const mapDispatchToProps = dispatch => ({
	setMealSelectorOptions: bindActionCreators(setMealSelectorOptions, dispatch),
    setPlannedMeal: bindActionCreators(setPlannedMeal, dispatch),
    updateMealGroceryList: bindActionCreators(updateMealGroceryList, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DayOptions);
