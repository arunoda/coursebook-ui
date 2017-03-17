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
    const selectedClassName = (course.id === courseId && lesson.id === lessonId) ? 'selected' : ''

    return (
      <div key={lesson.id}>
        <Link
          href={`/content?course=${course.id}&lesson=${lesson.id}`}
          as={`/${course.id}/${lesson.id}`}
        >
          <a className={selectedClassName}>
            <span className='number'>{index + 1}.</span>
            {lesson.name}
          </a>
        </Link>
        <style jsx>{`
          a {
            color: #444;
            text-decoration: none;
            font-size: 14px;
          }

          .number {
            font-family: monospace;
            font-size: 15px;
            padding-right: 5px;
          }

          .selected {
            font-weight: 600;
            color: #000;
          }
        `}</style>
      </div>
    )
  }

  renderCourse (course) {
    return (
      <div className="course" key={course.id}>
        <h3>{course.name}</h3>
        <div>
          {course.lessons.map((l, i) => this.renderLesson(course, l, i))}
        </div>
        <style jsx>{`
          h3 {
            padding: 0;
            margin: 0 0 10px 0;
            font-size: 18px;
            font-weight: 600;
          }

          .course {
            margin: 0 0 30px 0;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const { courses } = this.props
    return (
      <div className='navigation-area'>
        {courses.map((c, i) => this.renderCourse(c, i))}
        <style jsx>{`
          .navigation-area {
            padding: 0 0 0 50px;
          }
        `}</style>
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
