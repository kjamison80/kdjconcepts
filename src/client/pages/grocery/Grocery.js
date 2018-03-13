import React, { Component } from 'react';
import axios from 'axios';
import Transmit from 'react-transmit';

class Grocery extends Component {
	render() {
		console.log('this.props');
		console.log(this.props);
		return (
			<main>
				<h1>Coming Soon.</h1>
			</main>
		);
	}
}

export default Grocery;

// export default Transmit.createContainer(Grocery, {
//   // These must be set or else it would fail to render
//   initialVariables: {},
//   // Each fragment will be resolved into a prop
//   fragments: {
//     posts() {
//       return axios.get('https://rbb3nrkjc1.execute-api.us-west-2.amazonaws.com/dev/users/1').then((resp) => resp.data);
//     }
//   }
// });