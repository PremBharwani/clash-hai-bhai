import React, { Component } from 'react'
import CoursePoss from './CoursePoss'
import "../styles/PossibleCourses.css"

export class PossibleCourses extends Component {
  render() {
    return (
      <div className='houtselR'>
        <h3>Courses you can Take</h3>
        {
          this.props.possCourse.map((elem, index) => {
            return <CoursePoss name={elem.name} key={elem.code + elem.slot} addCourse={this.props.addCourse} />
          })
        }
      </div>
    )
  }
}

export default PossibleCourses