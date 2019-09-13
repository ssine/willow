import React from 'react'
import axios from 'axios'
import { api_uri } from '../config'
import { University } from '../util/type'

class UniversityPage extends React.Component<{}, {universities: University[]}> {
  constructor(prop: any) {
    super(prop)
    this.state = {
      universities: []
    }
  }

  async componentDidMount() {
    let res = await axios.get(`${api_uri}university`, {
      params: {
        filter: `{}`
      }
    })
    console.log(res.data)
    this.setState({
      universities: res.data
    })
    console.log('done')
  }

  render() {
    return (
      <div className="Universities">
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