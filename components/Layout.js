import React, { Children } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'

let progressStartTimeout

function cancelNprogressStart() {
  if (progressStartTimeout) {
    clearTimeout(progressStartTimeout)
  }
}

Router.onRouteChangeStart = () => {
  cancelNprogressStart()
  progressStartTimeout = setTimeout(NProgress.start, 200)
}

Router.onRouteChangeComplete = Router.onRouteChangeError = () => {
  cancelNprogressStart()
  NProgress.done()

  // Send route change to google analytics
  if (typeof ga !== 'undefined') {
    ga('set', 'page', location.href);
    ga('send', 'pageview');
  }
}


export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          }

          /* Nprogress CSS */
          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: #E25E5E;

            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;

            width: 100%;
            height: 2px;
          }

          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #E25E5E, 0 0 5px #E25E5E;
            opacity: 1.0;

            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }

          /* Remove these to get rid of the spinner */
          #nprogress .spinner {
            display: block;
            position: fixed;
            z-index: 1031;
            top: 15px;
            right: 15px;
          }

          #nprogress .spinner-icon {
            width: 18px;
            height: 18px;
            box-sizing: border-box;

            border: solid 2px transparent;
            border-top-color: #E25E5E;
            border-left-color: #E25E5E;
            border-radius: 50%;

            -webkit-animation: nprogress-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
          }

          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;
          }

          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }

          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
`}</style>
        { this.props.children }
      </div>
    )
  }
}
