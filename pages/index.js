import React, { Component } from 'react';
import 'isomorphic-unfetch';
import Page from '../layouts/default';

export default class MyPage extends Component {
    static async getInitialProps() {
        // eslint-disable-next-line no-undef
        const res = await fetch('https://api.github.com/repos/zeit/next.js');
        const json = await res.json();
        return { stars: json.stargazers_count };
    }

    render() {
        return (
            <Page>
                <h2>Coming Soon</h2>
            </Page>
        );
    }
}
