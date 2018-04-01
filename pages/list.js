import React, { Component } from 'react';
// import 'isomorphic-unfetch';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Link from 'next/link'
import Page from '../layouts/default';
import { initStore, mergeLists } from '../stores/grocery';

export class MyPage extends Component {
    componentDidMount() {
        const { groceryList, mealGroceryList, mergeLists } = this.props;

        mergeLists(groceryList, mealGroceryList);
    }

    render() {
        const { groceryList } = this.props;

        return (
            <Page>
                <div>
                    <div>
                        {Object.keys(groceryList).map((listItemKey, index) => <div key={`item_${groceryList[listItemKey].id}_${index}`}>{groceryList[listItemKey].name}: {groceryList[listItemKey].qty}</div>)}
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
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MyPage);
