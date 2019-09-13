import React from 'react'
import { University } from '../util/type'

interface UniversityCardProp {
  university?: University
}

const UniversityCard: React.SFC<UniversityCardProp> = props =>
  <div className="university-card">
    { props.university ?
      <div>
        <div className="name">
          <span>{props.university.name}</span>
          <span>({props.university.abbreviations.map(v => v)})</span>
        </div>
        <p>{JSON.stringify(props.university.location)}</p>
        <p>{JSON.stringify(props.university.csrankings_rank)}</p>
      </div>
    :
      <p>university not set</p>
    }
  </div>

export default UniversityCard