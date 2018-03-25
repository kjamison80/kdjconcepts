import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Autosuggest from 'react-autosuggest';
import { CSSTransition, transit } from "react-css-transition";
import { initStore, setMealSelectorOptions, setPlannedMeal } from '../stores/grocery';

// tables: items
const items = [
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
	}
];
// tables: meals, mealItems, mealTypeIds
const mealsDbData = {
	1: {
		id: 1,
		name: 'BABS',
		type: 1,
	}
};
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

// take data from tables and return meals array
const meals = [
  {
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
  {
      name: 'chef salad',
      items: [],
      type: 'dinner',
  },
  {
      name: 'chili dog madness',
      items: [],
      type: 'dinner',
  },
  {
      name: 'chunk chicken tacos',
      items: [],
      type: 'dinner',
  },
  {
      name: 'crumble tacos',
      items: [],
      type: 'dinner',
  },
  {
      name: 'egg salad',
      items: [],
      type: 'breakfast',
  },
  {
      name: 'hamburger helper',
      items: [],
      type: 'dinner',
  },
  {
      name: 'grilled chicken',
      items: [],
      type: 'dinner',
  },
  {
      name: 'hot wing chicken sandwhiches',
      items: [],
      type: 'dinner',
  },
  {
      name: 'leftovers',
      items: [],
      type: '',
  },
  {
      name: 'pasta a la homer',
      items: [],
      type: 'dinner',
  },
  {
      name: 'pasta - marinara',
      items: [],
      type: 'dinner',
  },
  {
      name: 'shredded beef tacos',
      items: [],
      type: 'dinner',
  },
  {
      name: 'shredded chicken tacos',
      items: [],
      type: 'dinner',
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [...meals] : meals.filter(meal =>
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

class DayOptions extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	        value: '',
	        suggestions: [...meals],
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

	onChange(event, { newValue }) {
	    this.setState({
	        value: newValue,
	    });
	}

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
	    this.setState({
	        suggestions: getSuggestions(value),
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
		this.setState({
			value: '',
			suggestions: [...meals],
		});
	}

	typeOnChange(event) {
	    this.setState({
	        filterByMealType: event.currentTarget.checked,
	    });
	}

	handleDoneClick(day, meal, event) {
		this.props.setPlannedMeal(day, { [meal]: this.state.value }, this.props.plannedMeals);

		this.setState({
			mounted: false,
		});
	}

	onTransitionComplete() {
		if (!this.state.mounted) {
	        this.props.setMealSelectorOptions({ display: false });
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

        return (
            <CSSTransition
                className="p-fixed full-screen modal-overlay"
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
	            	className="p-fixed modal-window"
	                defaultStyle={{ opacity: 0, transform: 'scale(.5, .5)' }}
	                enterStyle={{ opacity: transit(1, 150, 'ease-in-out'), transform: transit('scale(1, 1)', 100, 'ease-in-out') }}
	                leaveStyle={{ opacity: transit(0, 150, 'ease-in-out'), transform: transit('scale(.5, .5)', 100, 'ease-in-out') }}
	                activeStyle={{ opacity: 1, transform: 'scale(1, 1)' }}
	                transitionDelay={{ enter: 170, leave: 0 }}
	                active={mounted}
	                transitionAppear
	            >
	                <p className="caps">
	                	<span className="upper-case bold">{mealSelectorOptions.day}:</span> {mealSelectorOptions.meal}
	                </p>
	                <div>
	                    <input id="filterByMealType" type="checkbox" checked={filterByMealType} onClick={e => this.typeOnChange(e)} /> <label htmlFor="filterByMealType" className="cursorPointer">Filber by meal type</label>
	                	
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
				        <button onClick={() => this.handleDoneClick(mealSelectorOptions.day, mealSelectorOptions.meal)}>Done</button>
				    </div>
	            </CSSTransition>
            </CSSTransition>
        );
    }
}

const mapStateToProps = ({ mealSelectorOptions, plannedMeals }) => ({ mealSelectorOptions, plannedMeals });

const mapDispatchToProps = dispatch => ({
	setMealSelectorOptions: bindActionCreators(setMealSelectorOptions, dispatch),
    setPlannedMeal: bindActionCreators(setPlannedMeal, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DayOptions);
