import React, { Component } from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
// import Router from 'next/router';
import Page from '../layouts/default';

export default class MyPage extends Component {
    static async getInitialProps(props) {
        // eslint-disable-next-line no-undef
        const res = await fetch(`https://rbb3nrkjc1.execute-api.us-west-2.amazonaws.com/dev/users/${props.query.id}`);
        const json = await res.json();
        return { stars: json.firstName, queryid: props.query.id };
    }

    render() {
        return (
            <Page>
                <p>Preact has {this.props.stars} ⭐️</p>
                <p>User Id: {this.props.queryid}</p>
                <Link prefetch href="/">
                    I bet next has more stars (?)
                </Link>
            </Page>
        );
    }
}
