import Link from 'next/link'

const A = (props) => (
  <Link href={props.href}>
    <a style={{ marginRight: 10 }} {...props}/>
  </Link>
)

export default () => (
  <div className='header'>
    <A href='/'>Home</A>
    <A href='/content'>Content</A>
  </div>
)
