import marked from 'marked'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

const Markdown = ({ content }) => (
  <div>
    <div
      className='markdown'
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
    <style jsx global>{`
      .markdown{
        font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        max-width: 600px;
      }
    `}</style>
  </div>
)

export default Markdown
