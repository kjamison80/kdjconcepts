import React, { Component } from 'react';
// import 'isomorphic-unfetch';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Link from 'next/link'
import Page from '../layouts/default';
import { initStore, mergeLists, resetGroceryList } from '../stores/grocery';

export class MyPage extends Component {
    componentDidMount() {
        const { groceryList, mealGroceryList, mergeLists } = this.props;

        mergeLists(groceryList, mealGroceryList);
    }

    componentWillUnmount() {
        const { resetGroceryList } = this.props;
        
        resetGroceryList();
    }

    render() {
        const { groceryList } = this.props;

        return (
            <Page>
                <div>
                    <div className="mlr-auto groceryList" style={{ marginBottom: '1.5em' }}>
                        <div className="clr-fix" style={{ borderBottom: '2px solid rgba(255,255,255,.5)' }}>
                            <span className="f-left">Item</span>
                            <span className="f-right">Qty</span>
                        </div>
                        {Object.keys(groceryList).map((listItemKey, index) => (
                            <div key={`item_${groceryList[listItemKey].id}_${index}`} className="clr-fix">
                                <span className="f-left">{groceryList[listItemKey].name}</span>
                                <span className="f-right">{groceryList[listItemKey].qty}</span>
                            </div>
                        ))}
                    </div>
                    <Link prefetch href="/"><a>Home</a></Link>
                    <Link prefetch href="/grocery"><a>Planner</a></Link>
                </div>
            </Page>
        );
    }
}

const mapStateToProps = ({ groceryList, mealGroceryList }) => ({ groceryList, mealGroceryList });

const mapDispatchToProps = dispatch => ({
    mergeLists: bindActionCreators(mergeLists, dispatch),
    resetGroceryList: bindActionCreators(resetGroceryList, dispatch),
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MyPage);
