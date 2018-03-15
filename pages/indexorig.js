import React, { Component } from 'react';
import Link from 'next/link';
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
        const userId = 2;

        return (
            <Page>
                <h1>ciao</h1>
                <p>Next.js has {this.props.stars} ⭐️</p>
                <Link prefetch href="/preact">
                    How about preact?
                </Link>
                <p>
                    <Link prefetch href={`/user?id=${userId}`} as={`/user/${userId}`}>
                        Go to user page
                    </Link>
                </p>
            </Page>
        );
    }
}
