import AnswerBox from '../../../components/Content/Lesson/AnswerBox'
import Lesson from './'
import { GetEnv } from '../../../lib/env'
import WithActions from '../../../lib/with-actions'

let AnswerBoxContainer = WithActions((props, changeProps) => ({
  onSubmit: async (answer) => {
    if (!answer) {
      throw new Error('Need an answer')
    }

    const { courseId, lessonId, step, lokkaClient } = props
    changeProps({ loading: true })

    const { updatedStep } = await lokkaClient.mutate(`
      {
        updatedStep: submitAnswer(
          courseId: "${courseId}"
          lessonId: "${lessonId}"
          stepId: "${step.id}"
          answer: "${answer}"
        ) {
          ...${AnswerBox.fragment(lokkaClient)}
        }
      }
    `)

    // Update the cache for the updated state
    Lesson.updateCache({ courseId, lessonId }, (item) => {
      const oldStep = item.course.lessons[0].steps.find((s) => s.id === step.id)
      Object.assign(oldStep, updatedStep)

      return item
    })

    // send the updated step to the component
    changeProps({ loading: false, step: updatedStep })
  }
}))(AnswerBox)

AnswerBoxContainer = GetEnv()(AnswerBoxContainer)

export default AnswerBoxContainer
