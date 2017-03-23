import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    const styles = flush()
    return { html, head, styles }
  }

  render () {
    return (
     <html>
       <Head>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/atom-one-light.min.css" rel="stylesheet" />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
