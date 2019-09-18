import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { University, Program } from '../util/type'
import UniversityCard from '../component/university-card'
import ProgramCard from '../component/program-card'
import ApplicationStatisticsCard from '../component/application-stats-card'
import { get_university_by_name, get_programs_by_university } from '../util/helper'

interface MatchParams {
  name: string
  program?: string
}

interface DetailsPageProps extends RouteComponentProps<MatchParams> { }

interface DetailsPageState {
  university: University | null
  program: Program | null
}

class DetailsPage extends React.Component<DetailsPageProps, DetailsPageState> {
  constructor(prop: any) {
    super(prop)
    this.state = {
      university: null,
      program: null
    }
  }

  async componentDidMount() {
    const { params } = this.props.match
    let uni = await get_university_by_name(params.name.replace(/-/g, ' '))
    let prog: Program | null = null
    if (params.program) {
      let prog_name = params.program.replace(/-/g, ' ')
      let progs = await get_programs_by_university(uni.name)
      progs.forEach(p => {
        if (p.name === prog_name) prog = p
      })
    }
    this.setState({
      university: uni,
      program: prog
    })
  }

  render() {
    return (
      <div className="university">
        {this.state.university ? <UniversityCard university={this.state.university} /> : null}
        {this.state.program ? <ProgramCard program={this.state.program} /> : null}
        <br/>
        { this.state.university ?
          <ApplicationStatisticsCard
            university={this.state.university}
            program={this.state.program}
          />
          : <div></div>
        }
      </div>
    )
  }
}

export default DetailsPage