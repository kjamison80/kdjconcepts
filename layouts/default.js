import Head from 'next/head';
import Header from '../components/Header';

import stylesheet from 'styles/index.scss'
// or, if you work with plain css
// import stylesheet from 'styles/index.css'

export default ({ children }) => (
  <div>
      <Head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      	  <title>KDJ Concepts</title>
          <meta name="description" content="My playground of react apps" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <link href="/static/index.css" rel="stylesheet" />
          <link href="/static/index2.css" rel="stylesheet" />
      </Head>
      <Header />
      {children}
  </div>
)