import React from 'react'
import { University, Program } from '../util/type'
import { get_all_universities, get_programs_by_university } from '../util/helper'

interface UniversityPageState {
  universities: University[]
  programs: Program[][]
}

class UniversityPage extends React.Component<{}, UniversityPageState> {
  constructor(prop: any) {
    super(prop)
    this.state = {
      universities: [],
      programs: []
    }
  }

  async componentDidMount() {
    let universities = await get_all_universities();
    let program_promises = universities.map(async v => 
      await get_programs_by_university(v.name)
    )
    let programs = await Promise.all(program_promises)
    this.setState({
      universities: universities,
      programs: programs
    })
  }

  render() {
    return (
      <div className="university-page">
        <ul>
          {this.state.universities.map((u, idx) => 
            <li key={u.name}>
              <a href={`/university/${u.name}`}>{u.name}</a>
              {this.state.programs[idx] === [] ?
                null
              :
                <ul>
                  {this.state.programs[idx].map(p => 
                    <li key={p.name}>
                      <a href={`/university/${u.name}/${p.name}`}>{p.name}</a>
                    </li>
                  )}
                </ul>
              }
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default UniversityPage