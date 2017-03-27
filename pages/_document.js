import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head} = renderPage()
    const styles = flush()
    return { html, head, styles }
  }

  getGoogleAnalyticsScript() {
    if (process.env.NODE_ENV !== 'production') return null

    return (
      <script dangerouslySetInnerHTML={{__html: `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '${GA_TRACKING_ID}' , 'auto');
        ga('send', 'pageview');
      `}}/>
    )
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
         { this.getGoogleAnalyticsScript() }
       </body>
     </html>
    )
  }
}
