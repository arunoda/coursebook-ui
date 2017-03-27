import React from 'react'
import Podda from 'podda'
import ReactDisqusThread from 'react-disqus-comments'
import Header from '~/containers/Header'
import Layout from '~/components/Layout'
import getInitialState from '~/lib/state'
import getLokkaClient from '~/lib/lokka'
import InitPage from '~/lib/init-page'
import Head from 'next/head'

class Reviews extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { showComments: false }
  }

  componentDidMount() {
    this.setState({ showComments: true })
  }

  getComments () {
    const { showComments } = this.state
    if (!showComments) return null

    return (
      <ReactDisqusThread
        shortname="learnnextjs"
        title="Learn Next.js Reviews"
        identifier="/reviews"
        url={location.href}
        category_id="123456"
      />
    )
  }

  render () {
    return (
      <Layout>
        <Head>
          <title>Reviews - {SITE_NAME}</title>
        </Head>
        <Header />
        <div className="reviews-page">
          <h1>Reviews</h1>
          <p>What do you think about these lessons?</p>
          <div className="comments">
            { this.getComments() }
          </div>
        </div>
        <style jsx>{`
          .reviews-page {
            padding: 0 50px;
          }

          h1 {
            margin: 25px 0 0 0;
            padding: 0;
            font-size: 25px;
          }

          p {
            font-size: 14px;
          }

          .comments {
            max-width: 650px;
            margin: 30px 0 0 0;
          }
        `}</style>
      </Layout>
    )
  }
}

export default InitPage({
  rootContainers: [Header],
  getProps: (context) => {
    const initialState = getInitialState(context)
    return { initialState }
  },
  getEnv: (props) => {
    return {
      store: new Podda(props.initialState),
      lokkaClient: getLokkaClient(props.initialState)
    }
  }
})(Reviews)
