import React from 'react'
import { University, Program } from '../util/type'
import { get_all_universities, get_programs_by_universities } from '../util/helper'
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
    let universities = await get_all_universities()
    let programs = await get_programs_by_universities(universities.map(u => u.name))
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
              programs: this.state.programs[idx].map(p => p.name),
              rank: u.csrankings_rank
            }
          })}
        />
      </div>
    )
  }
}

export default UniversityPage