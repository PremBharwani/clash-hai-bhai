import React, { Component } from 'react'
import DeptInf from './Components/DeptInf'
import PresetCourses from './Components/PresetCourses'
import PossibleCourses from './Components/PossibleCourses' 
import Course from './classes/Course'

export class home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       preCourses : [new Course("MTH101", 1, 1), new Course("PHY103", 1, 1)],
       possCourses : [new Course("ESO207", 1, 1), new Course("PHY313", 1, 1)],
       dept : "PHY",
       sem : 1
    }
  }

  removeCourse = (name) => {
    var course = null
    this.setState({
      ...this.state,
      preCourses : this.state.preCourses.filter((val,ind,arr) => {
        if (val.name !== name)
        {
          return val
          return
        }
        else {
          course = val
          return null
        }
      } ),

      possCourses : [...this.state.possCourses, course]
    }, ()=>{console.log(this.state.possCourses)})
  }

  addCourse = (name) => {
    var course
    this.setState({
      ...this.state,
      possCourses : this.state.possCourses.filter((val,ind,arr) => {
        if (val.name !== name)
        {
          return val
        }
        else {
          course = val
        }
      } ),

      preCourses : [...this.state.preCourses, course]
    }, ()=>{console.log(this.state)})
  }

  changeDept = () => {
    
  }

  render() {
    return (
      <div>
          <h1>Clash</h1>
          <DeptInf />
          <h3>Courses in Template</h3>
          <PresetCourses preCourse = {this.state.preCourses} removeCourse = {this.removeCourse} />
          <h3>Courses you can Take</h3>
          <PossibleCourses possCourse = {this.state.possCourses} addCourse = {this.addCourse} />
      </div>
    )
  }
}

export default home
