import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { initStore, setMealSelectorOptions } from '../stores/grocery';

class DayOptions extends Component {
    setMealSelectorOptions(day, meal) {
        this.props.setMealSelectorOptions({ display: true, day, meal });
    }

    render() {
        const { dayQty, daysToPlan } = this.props;
        const meals = ['breakfast', 'lunch', 'dinner'];

        return daysToPlan.map(day => (
            <div key={`plan_${day.toLowerCase()}`} className="col text-left">
                <div style={{ margin: '.5em', padding: '0 .5em', background: '#ffffff', height: '11em', border: '1px solid red' }}>
                    <p>{day} ({dayQty})</p>
                    {meals.map(meal => <p key={`${day}_${meal}`} className="cursorPointer caps" onClick={() => this.setMealSelectorOptions(day, meal)}>{meal}:</p>)}
                </div>
            </div>
        ));
    }
}

const mapStateToProps = ({ dayQty, daysToPlan }) => ({ dayQty, daysToPlan });

const mapDispatchToProps = dispatch => ({
    setMealSelectorOptions: bindActionCreators(setMealSelectorOptions, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DayOptions);