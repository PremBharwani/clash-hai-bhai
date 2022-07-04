import React, { Component } from 'react'
import CoursePreset from './CoursePreset'

export class PresetCourses extends Component {
  render() {
    return (
      <div>
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