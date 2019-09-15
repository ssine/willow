import React from 'react'
import {
  get_applications_by_university,
  get_applications_by_university_and_program,
  get_applicant_by_id
} from '../util/helper'
import { Program, University, Application, Applicant } from '../util/type'
import GPACard from './gpa-card'
import GRECard from './gre-card'
import TOEFLCard from './toefl-card'
import DetailsCard from './details-card'

interface ApplicationStatisticsCardProp {
  university: University
  program?: Program
}

interface ApplicationStatisticsCardState {
  positive_applications: Application[]
  negative_applications: Application[]
  positive_applicants: Applicant[]
  negative_applicants: Applicant[]
}

class ApplicationStatisticsCard extends
  React.Component<ApplicationStatisticsCardProp, ApplicationStatisticsCardState> {
   constructor(props: ApplicationStatisticsCardProp) {
     super(props)
     this.state = {
      positive_applications: [],
      negative_applications: [],
      positive_applicants: [],
      negative_applicants: []
     }
   }

  async componentDidMount() {
    let applications: Application[]
    if (this.props.program) {
      applications = await get_applications_by_university_and_program(
        this.props.university.name,
        this.props.program.name
      )
    } else {
      applications = await get_applications_by_university(
        this.props.university.name
      )
    }
    let positive_applications: Application[] = []
    let negative_applications: Application[] = []
    let positive_applicants_set = new Set<string>()
    let negative_applicants_set = new Set<string>()
    applications.forEach(app => {
      if (app.result === 'AD' || app.result === 'OFFER') {
        positive_applications.push(app)
        positive_applicants_set.add(app.applicant)
      } else {
        negative_applications.push(app)
        negative_applicants_set.add(app.applicant)
      }
    })
    let positive_applicants: Applicant[] = []
    let negative_applicants: Applicant[] = []
    let positive_applicants_arr = Array.from(positive_applicants_set)
    let negative_applicants_arr = Array.from(negative_applicants_set)

    // TODO: too many concurrent queries may cause performance issue
    // consider doing this in server side
    let proms = positive_applicants_arr.map(async v => {
      positive_applicants.push(await get_applicant_by_id(v))
    }).concat(negative_applicants_arr.map(async v => {
      negative_applicants.push(await get_applicant_by_id(v))
    }))
    await Promise.all(proms)

    // for (let v of positive_applicants_arr) {
    //   let app = await get_applicant_by_id(v)
    //   positive_applicants.push(app)
    // }
    // for (let v of negative_applicants_arr) {
    //   let app = await get_applicant_by_id(v)
    //   negative_applicants.push(app)
    // }

    this.setState({
      positive_applications: positive_applications,
      negative_applications: negative_applications,
      positive_applicants: positive_applicants,
      negative_applicants: negative_applicants
    })
  }

  render() {
    return this.state.positive_applicants && this.state.negative_applicants ?
      <div className="app-stats-card">
        <GPACard
          positive_GPAs={this.state.positive_applicants.map(app => app.bachelor.gpa)}
          negative_GPAs={this.state.negative_applicants.map(app => app.bachelor.gpa)}
        />
        <GRECard
          positive_GREs={this.state.positive_applicants.map(app => app.GRE)}
          negative_GREs={this.state.negative_applicants.map(app => app.GRE)}
        />
        <TOEFLCard
          positive_TOEFLs={this.state.positive_applicants.map(app => app.TOEFL)}
          negative_TOEFLs={this.state.negative_applicants.map(app => app.TOEFL)}
        />
        <DetailsCard 
          positive_applicants={this.state.positive_applicants}
          negative_applicants={this.state.negative_applicants}
        />
      </div>
    :
      <div>fetching data...</div>
  }
}

export default ApplicationStatisticsCard
