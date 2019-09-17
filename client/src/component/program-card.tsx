import React from 'react'
import { Program } from '../util/type'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

interface ProgramCardProp {
  program?: Program
}

const ProgramCard: React.SFC<ProgramCardProp> = props =>
  <Card className="program-card">
    { props.program ?
      <div>
        <Typography variant="h5" component="h2">
          {`${props.program.name} at ${props.program.university} (${props.program.abbreviations[0]})`}
        </Typography>
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
  </Card>

export default ProgramCard
