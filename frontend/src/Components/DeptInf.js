import React, { Component } from 'react'
import "../styles/DeptInf.css"

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
        this.props.requestTemplate(this.state.dept, this.state.sem);
    }


  render() {
    return (
      <div className='outCont'>
          <select name='dept' placeholder='Department' onChange={this.DeptHandler} value = {this.state.dept}>
              <option value="" key="NONE">Select</option>
              <option value="MTH" key="MTH">MTH</option>
              <option value="PHY" key="PHY">PHY</option>
              <option value="EE" key="EE">EE</option>
          </select>

          <select name='sem' placeholder='Department' onChange={this.SemHandler} value = {this.state.sem}>
              <option value="0" key="Zero">Select</option>
              <option value="1" key="First">First</option>
              <option value="2" key="Second">Second</option>
              <option value="3" key="Third">Third</option>
          </select>

          <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}

export default DeptInf