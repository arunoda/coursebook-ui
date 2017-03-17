import React, { Children } from 'react'

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
        `}</style>
        { this.props.children }
      </div>
    ) 
  }
}