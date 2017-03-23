import React from 'react'
import ReactDom from 'react-dom'
import marked from 'marked'
import Highlight from 'react-highlight'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

export default class Markdown extends React.Component {
  makeLinksOpenInANewTab() {
    const dom = ReactDom.findDOMNode(this)
    const links = dom.getElementsByTagName('a')
    for(const link of links) {
      link.setAttribute('target', '_blank')
    }
  }

  componentDidMount () {
    this.makeLinksOpenInANewTab()
  }

  componentDidUpdate () {
    this.makeLinksOpenInANewTab()
  }

  render () {
    const { content } = this.props
    return (
      <div className='markdown'>
        <Highlight innerHTML={true}>
          {marked(content)}
        </Highlight>
        <style jsx global>{`
          .markdown{
            font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            max-width: 600px;
            color: #444;
            line-height: 25px;
          }

          .markdown h2 {
            font-size: 20px;
          }

          .markdown h3 {
            font-size: 18px;
          }

          .markdown blockquote {
            padding: 10px 20px;
            margin: 18px 0;
            border-left: 5px solid #B2CDA9;
          }

          .markdown blockquote p {
            margin: 0;
          }

          .markdown pre {
            font-size: 14px;
            line-height: 20px;
            background-color: #f9f9f9;
            padding: 10px 15px;
            border: 1px solid #eee;
            margin: 25px 0;
          }

          .markdown code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 13px;
            background-color: #f9f9f9;
            border-radius: 3px;
            padding: 2px 5px;
          }

          .markdown pre code {
            padding: 0;
            border-radius: 0;
          }

          .markdown img {
            max-width: 100%
          }

          .markdown a {
            text-decoration: none;
            color: #2196F3;
            border-bottom: 1px solid #2196F3;
          }

          .markdown a:hover {
            opacity: 0.7;
          }
        `}</style>
      </div>
    )
  }
}
