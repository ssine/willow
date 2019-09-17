import React from 'react'
import { University } from '../util/type'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

interface UniversityCardProp {
  university?: University
}

const UniversityCard: React.SFC<UniversityCardProp> = props =>
  <Card className="university-card">
    { props.university ?
      <div>
        <Typography variant="h5" component="h2">
          <span>{props.university.name}</span>
          <span>({props.university.abbreviations.map(v => v)})</span>
        </Typography>
        <p>{JSON.stringify(props.university.location)}</p>
        <p>{JSON.stringify(props.university.csrankings_rank)}</p>
      </div>
    :
      <p>university not set</p>
    }
  </Card>

export default UniversityCard