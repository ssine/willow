import React from 'react'
import { Program } from '../util/type'

interface ProgramCardProp {
  program?: Program
}

const ProgramCard: React.SFC<ProgramCardProp> = props =>
  <div className="program-card">
    { props.program ?
      <div>
        <div className="name">
          {`${props.program.name} at ${props.program.university} (${props.program.abbreviations[0]})`}
        </div>
        <div className="requirements">
          <div className="toefl">{JSON.stringify(props.program.TOEFL)}</div>
          <div className="gre">{JSON.stringify(props.program.GRE)}</div>
          <div className="gpa">{JSON.stringify(props.program.GPA)}</div>
        </div>
        <div className="website">
          <a href={props.program.website}>Website</a>
        </div>
      </div>
    :
      <p>program not set</p>
    }
  </div>

export default ProgramCard
