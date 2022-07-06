import React, { Component } from 'react'
import CoursePoss from './CoursePoss'
import "../styles/PossibleCourses.css"

export class PossibleCourses extends Component {
  render() {
    return(
        <div className='houtselR'>
          <h3>Courses you can Take</h3>
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