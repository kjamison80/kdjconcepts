import React, { Component } from 'react';
// import 'isomorphic-unfetch';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Link from 'next/link'
import Page from '../layouts/default';
import { initStore, setDayQty, updateDaysToPlan } from '../stores/grocery';
import DayOptions from '../components/DayOptions';
import MealSelector from './MealSelector';

export class MyPage extends Component {
    setDayQty(e) {
        this.props.setDayQty(e.currentTarget.value);
        this.props.updateDaysToPlan(this.props.daysToPlan, e.currentTarget.value);
    }

    render() {
        const { dayQty, daysToPlan, daysOfWeek, mealSelectorOptions } = this.props;
        const days = [...daysToPlan];

        return (
            <Page>
                {mealSelectorOptions.display && (
                    <MealSelector/>
                )}
                <div style={{padding: '0 3%'}}>
                    <div className="col-wrap dw-50 tw-100">
                        <div className="col">
                            <label htmlFor="shoppingDay" className="block">Planned Shopping Day</label>
                            <select id="shppingDay" className="caps">
                                {daysOfWeek.map(day => <option key={day.toLowerCase()} value={day.toLowerCase()}>{day}</option>)}
                            </select>
                        </div>
                        <div className="col dw-50">
                            <label htmlFor="qtyDays" className="block">Shopping for how many days?</label>
                            <input className="ti qty" type="number" defaultValue={dayQty} onChange={e => this.setDayQty(e)} />
                        </div>
                    </div>
                    <hr style={{margin: '1em .5em'}} />
                    <div className="col-wrap d-4col t-2col m-1col">
                        <DayOptions />
                    </div>
                    <Link prefetch href="/"><a>Home</a></Link>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = ({ dayQty, daysOfWeek, daysToPlan, mealSelectorOptions }) => ({ dayQty, daysOfWeek, daysToPlan, mealSelectorOptions });

const mapDispatchToProps = dispatch => ({
    updateDaysToPlan: bindActionCreators(updateDaysToPlan, dispatch),
    setDayQty: bindActionCreators(setDayQty, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MyPage);
