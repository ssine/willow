import React from 'react'
import { University } from '../util/type'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

interface UniversityCardProp {
  university: University
}

const UniversityCard: React.SFC<UniversityCardProp> = props =>
  <Card className="university-card">
    { props.university ?
      <div>
        <Typography variant="h4">
          {props.university.name}
          <span> ({props.university.abbreviations[0]})</span>
        </Typography>
        <br/>
        <Typography variant="h6">
          Location
        </Typography>
        <Typography variant="body1" component="div">
          {props.university.location ?
            <ul>
              {props.university.location.latitude && props.university.location.longitude ?
                <div>
                  <li>latitude: {props.university.location.latitude}</li>
                  <li>longitude: {props.university.location.longitude}</li>
                </div>
              :null
              }
            </ul>
          :
          null
          }
        </Typography>
        {props.university.csrankings_rank ? 
        <div>
          <Typography variant="h6">
            CSRankings
          </Typography>
          <Typography variant="body1" component="div">
            {props.university.csrankings_rank}
          </Typography>
        </div>
        :null
        }
      </div>
    :
      <p>university not set</p>
    }
  </Card>

export default UniversityCard