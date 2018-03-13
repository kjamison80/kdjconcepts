import Head from 'next/head';
import Header from '../components/Header';

import stylesheet from 'styles/index.scss'
// or, if you work with plain css
// import stylesheet from 'styles/index.css'

export default ({ children }) => (
  <div>
      <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <link href="/static/index.css" rel="stylesheet" />
          <link href="/static/index2.css" rel="stylesheet" />
      </Head>
      <Header />
      {children}
  </div>
)