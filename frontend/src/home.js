import React, { Component } from 'react'
import DeptInf from './Components/DeptInf'
import PresetCourses from './Components/PresetCourses'
import PossibleCourses from './Components/PossibleCourses' 
import Course from './classes/Course'
import './index.css'

export class home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       preCourses : [],
       possCourses : [],
       dept : "",
       sem : 1
    }
    
    this.requestTemplate = this.requestTemplate.bind(this)
  }

  requestTemplate(dep, semes){
    //Api request
    const st = {
       preCourses : [new Course("MTH101", 1, 1), new Course("PHY103", 1, 1)],
       possCourses : [new Course("ESO207", 1, 1), new Course("PHY313", 1, 1)],
       dept : "PHY",
       sem : "1"
    }


    const rt = {
       preCourses : [new Course("PHY101", 1, 1), new Course("PSY103", 1, 1)],
       possCourses : [new Course("ESK207", 1, 1), new Course("PSO313", 1, 1)],
       dept : "MTH",
       sem : "1"
    }

    let iter = [rt, st];
    iter.forEach((obj) => {

      if(obj.dept === dep && obj.sem === semes)
      {
        this.setState(obj);
      }
    })
  }

  async requestCourses()
  {
    //Api request
    const st = await {
       preCourses : [],
       possCourses : [new Course("ESO207", 1, 1), new Course("PHY313", 1, 1), new Course("MTH101", 1, 1), new Course("PHY103", 1, 1)],
       dept : "PHY",
       sem : 1
    }
    this.setState(st);
  }

  componentDidMount()
  {
    this.requestCourses();
  }

  removeCourse = (name) => {
    var course = null
    this.setState({
      ...this.state,
      preCourses : this.state.preCourses.filter((val,ind,arr) => {
        if (val.name !== name)
        {
          return val;
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
          return null;
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
          <h1>CLASH HAI BHAI!</h1>
          <div className='outerB'>
            <DeptInf requestTemplate = {this.requestTemplate} />
            <div className='flout'>
              <PresetCourses preCourse = {this.state.preCourses} removeCourse = {this.removeCourse} />
              <PossibleCourses possCourse = {this.state.possCourses} addCourse = {this.addCourse} />
            </div>
          </div>
      </div>
    )
  }
}

export default home
