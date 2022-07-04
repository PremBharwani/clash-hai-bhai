import React, { Component } from 'react'

export class DeptInf extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         dept : "",
         sem : ""
      }
    }

    DeptHandler = (e) =>{
        this.setState({
            ...this.state,
            dept : e.target.value
        })
    }

    SemHandler = (e) => {
        this.setState({
            ...this.state,
            sem : e.target.value
        })
    }

    onSubmit = (e) => {
        
    }


  render() {
    return (
      <div>
          <select name='dept' placeholder='Department' onChange={this.DeptHandler} value = {this.state.dept}>
              <option value="MTH" key="MTH">MTH</option>
              <option value="PHY" key="PHY">PHY</option>
              <option value="EE" key="EE">EE</option>
          </select>

          <select name='sem' placeholder='Department' onChange={this.SemHandler} value = {this.state.sem}>
              <option value="First" key="First">First</option>
              <option value="Second" key="Second">Second</option>
              <option value="Third" key="Third">Third</option>
          </select>

          <input type="submit" value="Submit" onClick={this.onSubmit} />
      </div>
    )
  }
}

export default DeptInf