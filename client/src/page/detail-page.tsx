import React from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom'
import { api_uri } from '../config'
import { University } from '../util/type'
import UniversityCard from '../component/university-card'
import ApplicationStatisticsCard from '../component/application-stats-card'
import { get_university_by_name } from '../util/helper'

interface MatchParams {
  name: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

class DetailsPage extends React.Component<Props, {university?: University}> {
  constructor(prop: any) {
    super(prop)
    this.state = {  }
  }

  async componentDidMount() {
    const { params } = this.props.match
    let uni = await get_university_by_name(params.name)
    this.setState({
      university: uni
    })
  }

  render() {
    return (
      <div className="university">
        <UniversityCard
          university={this.state.university}
        />
        <br/>
        { this.state.university ?
          <ApplicationStatisticsCard university={this.state.university} />
          : <div></div>
        }
      </div>
    )
  }
}

export default DetailsPage