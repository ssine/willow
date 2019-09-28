import React from 'react'
import { Program } from '../util/type'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import RequirementTable from './requirement-table'
import { all_attr_is_null } from '../util/helper'
import Button from '@material-ui/core/Button'

interface ProgramCardProp {
  program?: Program
}

const ProgramCard: React.SFC<ProgramCardProp> = props =>
  <Card className="program-card">
    { props.program ?
      <div>
        <Typography variant="h4">
          {`${props.program.name} (${props.program.abbreviations[0]})`}
          {/* {`${props.program.name} at ${props.program.university} (${props.program.abbreviations[0]})`} */}
        </Typography>
        <div className="deadline">
          {typeof props.program.timeline.opening === 'string' ?
            <p>opening: {props.program.timeline.opening.substr(0, 10)}</p>
          :null
          }
          {typeof props.program.timeline.early_deadline === 'string' ?
            <p>early deadline: {props.program.timeline.early_deadline.substr(0, 10)}</p>
          :null
          }
          {typeof props.program.timeline.final_deadline === 'string' ?
            <p>final deadline: {props.program.timeline.final_deadline.substr(0, 10)}</p>
          :null
          }
        </div>
        <div className="requirements">
          {props.program.TOEFL && !all_attr_is_null(props.program.TOEFL) ?
            <div>
              <Typography variant="h5">TOEFL</Typography>
              <br/>
              <Typography variant="body1" component="div">
                minimal:
                <RequirementTable
                  headers={['reading', 'listening', 'speaking', 'writing', 'total']}
                  rows={[[
                    props.program.TOEFL.minimum.reading || '-',
                    props.program.TOEFL.minimum.listening || '-',
                    props.program.TOEFL.minimum.speaking || '-',
                    props.program.TOEFL.minimum.writing || '-',
                    props.program.TOEFL.minimum.total || '-'
                  ]]}
                />
                {props.program.TOEFL.institution_code ? <p>institution code: {props.program.TOEFL.institution_code}</p> : null} 
                {props.program.TOEFL.department_code ? <p>department code: {props.program.TOEFL.department_code}</p> : null} 
              </Typography>
              <br/>
            </div>
          :null
          }
          {props.program.GRE && !all_attr_is_null(props.program.GRE) ?
            <div>
              <Typography variant="h5">GRE</Typography>
              <br/>
              <Typography variant="body1" component="div">
                minimal:
                <RequirementTable
                  headers={['Verbal', 'Quant', 'AW', 'total']}
                  rows={[[
                    props.program.GRE.minimum.verbal || '-',
                    props.program.GRE.minimum.quant || '-',
                    props.program.GRE.minimum.AW || '-',
                    props.program.GRE.minimum.total || '-'
                  ]]}
                />
                {props.program.GRE.institution_code ? <p>institution code: {props.program.GRE.institution_code}</p> : null} 
                {props.program.GRE.department_code ? <p>department code: {props.program.GRE.department_code}</p> : null} 
              </Typography>
              <br/>
            </div>
          :null
          }
          {props.program.GPA && !all_attr_is_null(props.program.GPA) ?
            <div>
              <Typography variant="h5">GPA</Typography>
              <br/>
              <Typography variant="body1" component="div">
                minimal:
                <RequirementTable
                  headers={['100', '4', '4.3']}
                  rows={[[
                    props.program.GPA.minimum.scale_100 || '-',
                    props.program.GPA.minimum.scale_4 || '-',
                    props.program.GPA.minimum.scale_4_3 || '-'
                  ]]}
                />
              </Typography>
              <br/>
            </div>
          :null
          }
        </div>
        <Button color="primary" href={props.program.website} target="_blank">Website</Button>
      </div>
    :
      <p>program not set</p>
    }
  </Card>

export default ProgramCard
