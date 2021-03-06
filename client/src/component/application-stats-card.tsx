import React from 'react'
import {
  get_applications_by_university,
  get_applications_by_university_and_program,
  get_applicants_by_ids
} from '../util/helper'
import { Program, University, Application, Applicant } from '../util/type'
import GPACard from './gpa-card'
import GRECard from './gre-card'
import TOEFLCard from './toefl-card'
import DetailsCard from './details-card'
import CommentsCard from '../component/comments-card'

interface ApplicationStatisticsCardProp {
  university: University
  program: Program | null
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
    let positive_applicants = await get_applicants_by_ids(Array.from(positive_applicants_set))
    let negative_applicants = await get_applicants_by_ids(Array.from(negative_applicants_set))

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
        <CommentsCard
          positive_comments={this.state.positive_applications.map(v => {
            return {
              author: v.applicant,
              comment: v.info
            }
          })}
          negative_comments={this.state.negative_applications.map(v => {
            return {
              author: v.applicant,
              comment: v.info
            }
          })}
        />
      </div>
    :
      <div>fetching data...</div>
  }
}

export default ApplicationStatisticsCard
