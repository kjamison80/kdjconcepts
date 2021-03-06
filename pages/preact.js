import React, { Component } from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
import Page from '../layouts/default';

export default class MyPage extends Component {
    static async getInitialProps() {
        // eslint-disable-next-line no-undef
        const res = await fetch('https://api.github.com/repos/developit/preact');
        const json = await res.json();
        return { stars: json.stargazers_count };
    }

    render() {
        return (
            <Page>
                <p>Preact has {this.props.stars} ⭐️</p>
                <Link prefetch href="/">
                    I bet next has more stars (?)
                </Link>
            </Page>
        );
    }
}
