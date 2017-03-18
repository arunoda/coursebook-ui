import Navigation from '~/components/Content/Navigation'
import WithData from '~/lib/with-data'

export default WithData({
  id: 'Navigation',
  propsToWatch: [],
  cacheOptions: { client: 1000 * 60 * 5 },
  fetch ({ lokkaClient }, props) {
    const query = `
      {
        courses {
          ...${Navigation.courseFragment(lokkaClient)}
        }
      }
    `
    return lokkaClient.query(query)
  }
})(Navigation)
