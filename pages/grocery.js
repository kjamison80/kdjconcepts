import React, { Component } from 'react';
// import 'isomorphic-unfetch';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Link from 'next/link'
import Page from '../layouts/default';
import { initStore, setDayQty, updateDaysToPlan, updateStartDay } from '../stores/grocery';
import DayOptions from '../components/DayOptions';
import MealSelector from './MealSelector';

export class MyPage extends Component {
    constructor(props) {
        super(props);

        this.setDayQty = this.setDayQty.bind(this);
        this.updateStartDay = this.updateStartDay.bind(this);
    }
    
    setDayQty(e) {
        const { daysToPlan, setDayQty, updateDaysToPlan } = this.props;
        const qty = e.currentTarget.value !== '' ? parseInt(e.currentTarget.value, 10) : 1;

        setDayQty(qty);
        updateDaysToPlan(this.props.daysToPlan, qty);
    }

    updateStartDay(e) {
        const { updateStartDay, daysToPlan, setDayQty } = this.props;

        updateStartDay(daysToPlan, e.currentTarget.value);
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
                            <select id="shppingDay" className="caps" onChange={this.updateStartDay}>
                                {daysOfWeek.map(day => <option key={day.toLowerCase()} value={day.toLowerCase()}>{day}</option>)}
                            </select>
                        </div>
                        <div className="col dw-50">
                            <label htmlFor="qtyDays" className="block">Shopping for how many days?</label>
                            <input className="ti qty" type="number" pattern="\d*" defaultValue={dayQty} onChange={this.setDayQty} />
                        </div>
                    </div>
                    <hr style={{margin: '1em .5em'}} />
                    <div className="col-wrap d-4col t-2col m-1col">
                        <DayOptions />
                    </div>
                    <Link prefetch href="/"><a>Home</a></Link>
                    <Link prefetch href="/list"><a>List</a></Link>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = ({ dayQty, daysOfWeek, daysToPlan, mealSelectorOptions }) => ({ dayQty, daysOfWeek, daysToPlan, mealSelectorOptions });

const mapDispatchToProps = dispatch => ({
    updateDaysToPlan: bindActionCreators(updateDaysToPlan, dispatch),
    updateStartDay: bindActionCreators(updateStartDay, dispatch),
    setDayQty: bindActionCreators(setDayQty, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MyPage);
