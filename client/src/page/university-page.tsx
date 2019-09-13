import React from 'react'
import { University } from '../util/type'
import { get_all_universities } from '../util/helper'

class UniversityPage extends React.Component<{}, {universities: University[]}> {
  constructor(prop: any) {
    super(prop)
    this.state = {
      universities: []
    }
  }

  async componentDidMount() {
    let universities = await get_all_universities();
    this.setState({
      universities: universities
    })
  }

  render() {
    return (
      <div className="university-page">
        <ul>
          {this.state.universities.map(u => 
            <li key={u.name}>
              <a href={`/university/${u.name}`}>{u.name}</a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default UniversityPage