import Navigation from '~/components/Content/Navigation'
import WithData from '~/lib/with-data'

export default WithData({
  propsToWatch: [],
  dataProps: ['courses'],
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
