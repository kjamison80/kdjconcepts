import React, { Component } from 'react';
import { connect } from 'react-redux';

class DayOptions extends Component {
    render() {
        const { dayQty, daysToPlan } = this.props;

        return daysToPlan.map((day) => (
            <div className="col text-left">
                <div style={{ margin: '.5em', padding: '0 .5em', background: '#ffffff', height: '11em', border: '1px solid red' }}>
                    <p>{day} ({dayQty})</p>
                    <p>Breakfast:</p>
                    <p>Lunch:</p>
                    <p>Dinner:</p>
                </div>
            </div>
        ));
    }
}

const mapStateToProps = ({ dayQty, daysToPlan }) => ({ dayQty, daysToPlan });

export default connect(mapStateToProps, null)(DayOptions);
