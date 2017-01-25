import React from 'react'
import Link from 'next/link'

const styles = {
  bold: {
    fontWeight: 800
  }
}

class Navigation extends React.Component {
  renderLesson (course, lesson, index) {
    const { courseId, lessonId } = this.props
    const textStyle = (course.id === courseId && lesson.id === lessonId) ? styles.bold : {}

    return (
      <div key={lesson.id}>
        <Link
          href={`/content?course=${course.id}&lesson=${lesson.id}`}
          as={`/${course.id}/${lesson.id}`}
        >
          <a style={textStyle}>{index + 1}. {lesson.name}</a>
        </Link>
      </div>
    )
  }

  renderCourse (course) {
    return (
      <div key={course.id}>
        <h3>{course.name}</h3>
        <div>
          {course.lessons.map((l, i) => this.renderLesson(course, l, i))}
        </div>
      </div>
    )
  }

  render () {
    const { courses } = this.props
    return (
      <div>
        {courses.map((c, i) => this.renderCourse(c, i))}
      </div>
    )
  }
}

Navigation.propTypes = {
  courses: React.PropTypes.array.isRequired,
  courseId: React.PropTypes.string.isRequired,
  lessonId: React.PropTypes.string.isRequired
}

Navigation.courseFragment = (c) => c.createFragment(`
  fragment on Course {
    id
    name
    lessons {
      id
      name
    }
  }
`)

export default Navigation
