import Link from 'next/link'

const A = (props) => (
  <Link href={props.href} as={props.as}>
    <a style={{ marginRight: 10 }} {...props}/>
  </Link>
)

export default () => (
  <div className='header'>
    <A href='/'>Home</A>
    <A href='/content?course=simple&lesson=lesson-one' as='/simple/lesson-one'>Content</A>
  </div>
)
