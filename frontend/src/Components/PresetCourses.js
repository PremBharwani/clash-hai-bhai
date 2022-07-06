import React, { Component } from 'react'
import CoursePreset from './CoursePreset'
import "../styles/PresetCourses.css"

export class PresetCourses extends Component {
  render() {
    return (
      <div className='houtselL'>
          <h3>Courses in Template</h3>

          {
            this.props.preCourse.map(elem => {
              return <CoursePreset name={elem.name} key={elem.name} removeCourse = {this.props.removeCourse} />
            })
          }
      </div>
    )
  }
}

export default PresetCourses