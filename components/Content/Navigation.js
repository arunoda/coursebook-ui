import React from 'react'
import Link from 'next/link'

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

Navigation.query = (c) => `
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

export default Navigation
