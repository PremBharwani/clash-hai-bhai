import React, { Component } from 'react'
import '../styles/CourseTile.css'

export class CoursePreset extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       name : this.props.name
    }
  }

    removeHandler = (e) => {
        this.props.removeCourse(this.state.name)
    }

  render() {

    return (
      <div className='courseT'>
          <h2>
              {this.state.name}
              <button onClick={this.removeHandler}>Remove</button>
          </h2>
      </div>
    )
  }
}

export default CoursePreset