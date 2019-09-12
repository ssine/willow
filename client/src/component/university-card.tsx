import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { api_uri } from '../config';

interface University {
  name: string;
  abbreviation: string[];
  location?: {
    latitude: number;
    longitude: number;
  }
}

interface MatchParams {
  name: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}


class University extends React.Component<Props, {university?: University}> {
  constructor(prop: any) {
    super(prop);
    this.state = {  };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    let res = await axios.get(`${api_uri}university`, {
      params: {
        filter: `{"name": "${params.name}"}`
      }
    });
    console.log(res.data);
    this.setState({
      university: res.data[0]
    });
    console.log('done');
  }

  render() {
    return (
      <div className="university">
        { this.state.university ? 
          <div>
            <p>{this.state.university.name}</p>
            <p>{this.state.university.abbreviation[0]}</p>
            <p>{JSON.stringify(this.state.university.location)}</p>
          </div>
        : 
          <p>null</p>
        }
      </div>
    )
  }
}

export default University;