import React from 'react'
import { University, Program } from '../util/type'
import { get_all_universities, get_programs_by_university } from '../util/helper'
import UniversityList from '../component/university-list'

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
        <UniversityList
          universities={this.state.universities.map((u, idx) => {
            return {
              name: u.name,
              programs: this.state.programs[idx].map(p => p.name)
            }
          })}
        />
      </div>
    )
  }
}

export default UniversityPage