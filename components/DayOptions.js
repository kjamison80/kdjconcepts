import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Textfit } from 'react-textfit';
import { initStore, setMealSelectorOptions } from '../stores/grocery';

class DayOptions extends Component {
    setMealSelectorOptions(day, meal) {
        this.props.setMealSelectorOptions({ display: true, day, meal });
    }

    render() {
        const { dayQty, daysToPlan, plannedMeals } = this.props;
        const meals = ['breakfast', 'lunch', 'dinner'];

        return daysToPlan.map(day => (
            <div key={`plan_${day.toLowerCase()}`} className="col text-left">
                <div className="dayOptions">
                    <p className="caps dayHeading">{day} ({dayQty})</p>
                    {meals.map(meal => (
                        <div key={`${day}_${meal}`} className="cursorPointer caps mealPlan" onClick={() => this.setMealSelectorOptions(day, meal)}>
                            <span className="meal block bold upper-case mealType">
                                {meal}:
                            </span>
                            <Textfit className="block" mode="single" max="16">
                                {plannedMeals[day] && plannedMeals[day][meal] ? plannedMeals[day][meal] : <span className="mealPlaceHolder">!</span>}
                            </Textfit>
                        </div>
                    ))}
                </div>
            </div>
        ));
    }
}

const mapStateToProps = ({ dayQty, daysToPlan, plannedMeals }) => ({ dayQty, daysToPlan, plannedMeals });

const mapDispatchToProps = dispatch => ({
    setMealSelectorOptions: bindActionCreators(setMealSelectorOptions, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DayOptions);