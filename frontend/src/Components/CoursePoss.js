import React, { Component } from 'react'
import "../styles/CourseTile.css"

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
          <div className='courseT'>
              <h2>
                  {this.state.name}
                  <button onClick={this.addHandler}>Add</button>
              </h2>
          </div>
        )
      }
}

export default CoursePoss