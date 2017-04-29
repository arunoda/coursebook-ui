export default () => (
  <div>
    <p>
      Brought to you by <a href="https://zeit.co" target="_blank">▲ZEIT</a>.
      Curated by <a href="https://twitter.com/arunoda" target="_blank">@arunoda</a>.
    </p>
    <p>
      Visit <a href="https://github.com/arunoda/learnnextjs-content" target="_blank">here</a> to edit content.
    </p>
    <style jsx>{`
      div {
        text-align: center;
        padding: 20px 0;
        font-size: 11px;
        border-top: 1px solid #EEE;
        opacity: 0.3;
      }

      div:hover {
        opacity: 1;
      }

      a {
        text-decoration: none;
        color: #2196F3;
        border-bottom: 1px solid #2196F3;
      }

      a:hover {
        opacity: 0.7;
      }

      p {
        padding: 0;
        margin: 3px 0;
      }
    `}</style>
  </div>
)
