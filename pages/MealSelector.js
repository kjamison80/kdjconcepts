import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import Page from '../layouts/default';

const meals = [
  {
      name: 'BABS',
      items: [],
      type: 'breakfast',
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
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
	    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
	    this.typeOnChange = this.typeOnChange.bind(this);
	}

	onChange(event, { newValue }) {
	    this.setState({
	        value: newValue,
	    });
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
	onSuggestionsFetchRequested({ value }) {
	    this.setState({
	        suggestions: getSuggestions(value),
	    });
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested() {
	    this.setState({
	        suggestions: [...meals],
	    });
	};

	typeOnChange(event) {
	    this.setState({
	        filterByMealType: event.currentTarget.checked,
	    });
	};

    render() {
        const { mealSelectorOptions } = this.props;
	    const { value, suggestions, filterByMealType } = this.state;

	    // Autosuggest will pass through all these props to the input.
	    const inputProps = {
	        placeholder: 'Type a meal nickname',
	        value,
	        onChange: this.onChange,
	    };

        return (
            <Page>
                <p>{mealSelectorOptions.day} {mealSelectorOptions.meal}</p>
                <div>
                    <input id="filterByMealType" type="checkbox" checked={filterByMealType} onClick={e => this.typeOnChange(e)} /> <label htmlFor="filterByMealType" className="cursorPointer">Filber by meal type</label>
                </div>
                <div className="dw-80 mlr-auto mTB1">
                  <Autosuggest
			        suggestions={filterByMealType ? suggestions.filter(suggestion => suggestion.type === mealSelectorOptions.meal || suggestion.type === '') : suggestions}
			        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
			        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			        getSuggestionValue={getSuggestionValue}
			        renderSuggestion={renderSuggestion}
			        alwaysRenderSuggestions={true}
			        inputProps={inputProps}
			      />
			    </div>
            </Page>
        );
    }
}

const mapStateToProps = ({ mealSelectorOptions }) => ({ mealSelectorOptions });

export default connect(mapStateToProps, null)(DayOptions);
