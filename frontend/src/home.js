import React, { Component } from 'react'
import axios from 'axios'

import DeptInf from './Components/DeptInf'
import PresetCourses from './Components/PresetCourses'
import PossibleCourses from './Components/PossibleCourses'
import Course from './classes/Course'
import './index.css'

export class home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      preCourses: [],
      possCourses: [],
      dept: "",
      sem: 1
    }

    this.requestTemplate = this.requestTemplate.bind(this)
  }

  requestTemplate(dep, semes) {
    //Api request
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.get(`${process.env.REACT_APP_ROOT_URL}/get_course_template`).then((res) => {
      let depcodes = res.data[dep][semes]
      let newcor = []
      console.log(depcodes)
      depcodes.forEach(val => {
        let cor = this.state.possCourses.find(elem => elem.code === val)
        newcor.push(cor)
      })
      this.setState({
        ...this.state,
        preCourses: newcor,
      })
      this.requestCourses()
    })

    const st = {
      preCourses: [new Course("MTH101", "Maths", 1, 1), new Course("PHY103", "Physics", 1, 1)],
      possCourses: [new Course("ESO207", 1, 1), new Course("PHY313", 1, 1)],
      dept: "PHY",
      sem: "1"
    }


    const rt = {
      preCourses: [new Course("PHY101", "Physics", 1, 1), new Course("PSY103", "Psycho", 1, 1)],
      possCourses: [new Course("ESK207", 1, 1), new Course("PSO313", 1, 1)],
      dept: "MTH",
      sem: "1"
    }

    let iter = [rt, st];
    iter.forEach((obj) => {

      if (obj.dept === dep && obj.sem === semes) {
        this.setState(obj);
      }
    })
  }

  async requestCourses() {
    //Api request
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    await axios.post(`${process.env.REACT_APP_ROOT_URL}/non_clashing_courses`,
      {
        currently_selected_courses: this.state.preCourses.map((val) => val.code),
        dept_to_choose_from: "",
      }).then((res) => {
        console.log("api", res)
        console.log("LIst", res.data.non_clashing_courses.map((val) => new Course(val.code_code, val.code_name, val.slot_name, val.credits)))
        this.setState({
          ...this.state,
          possCourses: res.data.non_clashing_courses.map((val) => new Course(val.course_code, val.course_name, val.slot_name, val.credits)),
        })

        console.log(this.state.possCourses)

      }).catch((err) => { console.log(err) })
  }

  componentDidMount() {
    this.requestCourses();
  }

  removeCourse = (name) => {
    var course = null
    this.setState({
      ...this.state,
      preCourses: this.state.preCourses.filter((val, ind, arr) => {
        if (val.name !== name) {
          return val;
        }
        else {
          course = val
          return null
        }
      }),

      possCourses: [...this.state.possCourses, course]
    })
    this.requestCourses()
  }

  addCourse = (name) => {
    var course
    this.setState({
      ...this.state,
      possCourses: this.state.possCourses.filter((val, ind, arr) => {
        if (val.name !== name) {
          return val
        }
        else {
          course = val
          return null;
        }
      }),

      preCourses: [...this.state.preCourses, course]
    })
    this.requestCourses()
  }

  changeDept = () => {

  }

  render() {
    return (
      <div>
        <h1>CLASH HAI BHAI!</h1>
        <div className='outerB'>
          <DeptInf requestTemplate={this.requestTemplate} />
          <div className='flout'>
            <PresetCourses preCourse={this.state.preCourses} removeCourse={this.removeCourse} />
            <PossibleCourses possCourse={this.state.possCourses} addCourse={this.addCourse} />
          </div>
        </div>
      </div>
    )
  }
}

export default home
