import React, { Component } from 'react'
import CoursePoss from './CoursePoss'

export class PossibleCourses extends Component {
  render() {
    return(
        <div>
            {
              this.props.possCourse.map(elem => {
                return <CoursePoss name={elem.name} key={elem.name} addCourse = {this.props.addCourse} />
              })
            }
        </div>
      )
  }
}

export default PossibleCourses