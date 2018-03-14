
import React from 'react'
import Link from 'next/link'
import 'isomorphic-unfetch'
import Page from '../layouts/default'

export default class MyPage extends React.Component {
  // static async getInitialProps () {
  //   // eslint-disable-next-line no-undef
  //   const res = await fetch('https://api.github.com/repos/developit/preact')
  //   const json = await res.json()
  //   return { stars: json.stargazers_count }
  // }

  render () {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <Page>
        <div class="col-wrap dw-50 tw-100">
          <div class="col">
            <label htmlFor="shoppingDay">Planned Shopping Day</label>
            <select id="shppingDay">
              {days.map((day, index) => <option key={day.toLowerCase()} value={day.toLowerCase()}>{day}</option>)}
            </select>
          </div>
          <div class="col dw-50">
            <label htmlFor="qtyDays">Shopping for how many days?</label>
            <input type="number" value="7" />
          </div>
        </div>
        <hr />
      </Page>
    );
  }
}
