import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Textfit } from 'react-textfit';
import { initStore, setMealSelectorOptions } from '../stores/grocery';

class DayOptions extends Component {
    setMealSelectorOptions(day, meal, key) {
        this.props.setMealSelectorOptions({ display: true, day, meal, key });
    }

    render() {
        const { dayQty, daysToPlan, plannedMeals } = this.props;
        const meals = ['breakfast', 'lunch', 'dinner'];

        return daysToPlan.map((day, dayIndex) => (
            <div key={`plan_${day.toLowerCase()}_${dayIndex}`} className="col text-left">
                <div className="dayOptions">
                    <p className="caps dayHeading">{day}</p>
                    {meals.map(meal => (
                        <div key={`${dayIndex}_${meal}`} className="cursorPointer caps mealPlan" onClick={() => this.setMealSelectorOptions(day, meal, dayIndex)}>
                            <span className="meal block bold upper-case mealType">
                                {meal}:
                            </span>
                            <Textfit className="block" mode="single" max="16">
                                {plannedMeals[dayIndex] && plannedMeals[dayIndex][meal] ? plannedMeals[dayIndex][meal] : <span className="mealPlaceHolder">!</span>}
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