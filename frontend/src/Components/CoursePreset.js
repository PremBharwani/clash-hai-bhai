import React, { Component } from 'react'

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
      <div>
          <h3>
              {this.state.name}
              <button onClick={this.removeHandler}>Remove</button>
          </h3>
      </div>
    )
  }
}

export default CoursePreset