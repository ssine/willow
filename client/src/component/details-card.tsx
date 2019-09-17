import React from 'react'
import { Applicant } from '../util/type'
import ReactTable from "react-table"
import "react-table/react-table.css"
import Card from '@material-ui/core/Card'

interface DetailsCardProp {
  positive_applicants: Applicant[]
  negative_applicants: Applicant[]
}

interface DetailsCardState {
  positive_data: {
    id: string
    GRE: string
    TOEFL: string
    university_level: string
    university: string
    major: string
    GPA: string
    background: string
  }[]
  negative_data: {
    id: string
    GRE: string
    TOEFL: string
    university_level: string
    university: string
    major: string
    GPA: string
    background: string
  }[]
}

class DetailsCard extends React.Component<DetailsCardProp, DetailsCardState> {
  constructor(props: DetailsCardProp) {
    super(props)
    this.state = { positive_data: [], negative_data: [] }
  }

  static getDerivedStateFromProps(nextProps: DetailsCardProp, prevState: DetailsCardState) {
    let new_state: DetailsCardState = { positive_data: [], negative_data: [] }
    nextProps.positive_applicants.forEach(a => {
      new_state.positive_data.push({
        id: a.id,
        GRE: `${a.GRE.verbal?'V'+a.GRE.verbal+' ':''}${a.GRE.quant?'Q'+a.GRE.quant+' ':''}${a.GRE.AW?'AW'+a.GRE.AW+' ':''}${a.GRE.total?'T'+a.GRE.total:''}`,
        TOEFL: `${a.TOEFL.reading?'R'+a.TOEFL.reading+' ':''}${a.TOEFL.listening?'L'+a.TOEFL.listening+' ':''}${a.TOEFL.speaking?'S'+a.TOEFL.speaking+' ':''}${a.TOEFL.writing?'W'+a.TOEFL.writing+' ':''}${a.TOEFL.total?'T'+a.TOEFL.total:''}`,
        university_level: a.bachelor.university_level,
        university: a.bachelor.university,
        major: a.bachelor.major,
        GPA: `${a.bachelor.gpa.scale_100?a.bachelor.gpa.scale_100+'/100':''}${a.bachelor.gpa.scale_4?' '+a.bachelor.gpa.scale_4+'/4':''}${a.bachelor.gpa.scale_4_3?' '+a.bachelor.gpa.scale_4_3+'/4.3':''}`,
        background: a.background
      })
    })
    nextProps.negative_applicants.forEach(a => {
      new_state.negative_data.push({
        id: a.id,
        GRE: `${a.GRE.verbal?'V'+a.GRE.verbal+' ':''}${a.GRE.quant?'Q'+a.GRE.quant+' ':''}${a.GRE.AW?'AW'+a.GRE.AW+' ':''}${a.GRE.total?'T'+a.GRE.total:''}`,
        TOEFL: `${a.TOEFL.reading?'R'+a.TOEFL.reading+' ':''}${a.TOEFL.listening?'L'+a.TOEFL.listening+' ':''}${a.TOEFL.speaking?'S'+a.TOEFL.speaking+' ':''}${a.TOEFL.writing?'W'+a.TOEFL.writing+' ':''}${a.TOEFL.total?'T'+a.TOEFL.total:''}`,
        university_level: a.bachelor.university_level,
        university: a.bachelor.university,
        major: a.bachelor.major,
        GPA: `${a.bachelor.gpa.scale_100?a.bachelor.gpa.scale_100+'/100':''}${a.bachelor.gpa.scale_4?' '+a.bachelor.gpa.scale_4+'/4':''}${a.bachelor.gpa.scale_4_3?' '+a.bachelor.gpa.scale_4_3+'/4.3':''}`,
        background: a.background
      })
    })
    return new_state
  }

  render() {
    return (
      <Card className='details-card'>
        <h4>Accpeted Applicants</h4>
        <ReactTable
          data={this.state.positive_data}
          columns={[
            {
              Header: "id",
              accessor: "id"
            },
            {
              Header: "university level",
              accessor: "university_level",
              filterMethod: (filter: any, row: any) => {
                if (filter.value === "all") {
                  return true;
                }
                if (filter.value === "true") {
                  return row[filter.id] >= 21;
                }
                return row[filter.id] < 21;
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                  <option value="all">Show All</option>
                  <option value="true">Can Drink</option>
                  <option value="false">Can't Drink</option>
                </select>
            },
            {
              Header: "university",
              accessor: "university"
            },
            {
              Header: "major",
              accessor: "major"
            },
            {
              Header: "GPA",
              accessor: "GPA"
            },
            {
              Header: "GRE",
              accessor: "GRE"
            },
            {
              Header: "TOEFL",
              accessor: "TOEFL"
            },
            {
              Header: "background",
              accessor: "background"
            }
          ]}
          // pivotBy={["firstName", "lastName"]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <h4>Rejected Applicants</h4>
        <ReactTable
          data={this.state.negative_data}
          columns={[
            {
              Header: "id",
              accessor: "id"
            },
            {
              Header: "university level",
              accessor: "university_level",
              filterMethod: (filter: any, row: any) => {
                if (filter.value === "all") {
                  return true;
                }
                if (filter.value === "true") {
                  return row[filter.id] >= 21;
                }
                return row[filter.id] < 21;
              },
              Filter: ({ filter, onChange }) =>
                <select
                  onChange={event => onChange(event.target.value)}
                  style={{ width: "100%" }}
                  value={filter ? filter.value : "all"}
                >
                  <option value="all">Show All</option>
                  <option value="true">Can Drink</option>
                  <option value="false">Can't Drink</option>
                </select>
            },
            {
              Header: "university",
              accessor: "university"
            },
            {
              Header: "major",
              accessor: "major"
            },
            {
              Header: "GPA",
              accessor: "GPA"
            },
            {
              Header: "GRE",
              accessor: "GRE"
            },
            {
              Header: "TOEFL",
              accessor: "TOEFL"
            },
            {
              Header: "background",
              accessor: "background"
            }
          ]}
          // pivotBy={["firstName", "lastName"]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </Card>
    );
  }
}

export default DetailsCard