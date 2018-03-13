import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import Page from '../layouts/default'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    // eslint-disable-next-line no-undef
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    const userId = 2;

  	return (
	  <Page>
	    <h2>Coming Soon</h2>
	  </Page>
  	)
  }
}
