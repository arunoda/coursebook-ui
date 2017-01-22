import React from 'react'
import Link from 'next/link'
import { withCache, setCache } from '../../lib/lokka'

class Navigation extends React.Component {
  renderLesson(course, lesson, index) {
    return (
      <div key={lesson.id}>
        <Link href={`/${course.id}/${lesson.id}`}>
          <a>{index+1}. {lesson.name}</a>
        </Link>
      </div>
    )
  }

  renderCourse(course) {
    return (
      <div key={course.id}>
        <h3>{course.name}</h3>
        <div>
          {course.lessons.map((l, i) => this.renderLesson(course, l, i))}
        </div>
      </div>
    )
  }

  render() {
    const { courses } = this.props
    // TODO: Move this logic into a container
    setCache('courses-for-nav', { courses }, Navigation.cacheOptions)

    return (
      <div>
        {courses.map((c, i) => this.renderCourse(c, i))}
      </div>
    )
  }
}

Navigation.propTypes = {
  courses: React.PropTypes.array
}

Navigation.cacheOptions = { client: 1000 * 60 * 5 }

// TODO: Move this logic into a container
Navigation.fetch = async (c) => {
  const query = `
    {
      courses {
        id
        name
        lessons {
          id
          name
        }
      }
    }
  `
  const getData = () => c.query(query)
  return await withCache('courses-for-nav', getData, Navigation.cacheOptions)
}

export default Navigation
