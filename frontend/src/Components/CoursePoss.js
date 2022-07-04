import React, { Component } from 'react'

export class CoursePoss extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           name : this.props.name
        }
      }
    
        addHandler = (e) => {
            this.props.addCourse(this.state.name)
        }
    
      render() {
    
        return (
          <div>
              <h3>
                  {this.state.name}
                  <button onClick={this.addHandler}>Add</button>
              </h3>
          </div>
        )
      }
}

export default CoursePoss