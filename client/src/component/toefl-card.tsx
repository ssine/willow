import React from 'react'
import { TOEFLScore } from '../util/type'
import Histogram from './histogram'

interface TOEFLCardProp {
  positive_TOEFLs: TOEFLScore[]
  negative_TOEFLs: TOEFLScore[]
}

interface TOEFLCardState {
  reading: {
    pos: number[]
    neg: number[]
  }
  listening: {
    pos: number[]
    neg: number[]
  }
  speaking: {
    pos: number[]
    neg: number[]
  }
  writing: {
    pos: number[]
    neg: number[]
  }
}

class TOEFLCard extends React.Component<TOEFLCardProp, TOEFLCardState> {
  constructor(props: TOEFLCardProp) {
    super(props)
    this.state = {
      reading: {
        pos: [],
        neg: []
      },
      listening: {
        pos: [],
        neg: []
      },
      speaking: {
        pos: [],
        neg: []
      },
      writing: {
        pos: [],
        neg: []
      }
    }
  }

  static getDerivedStateFromProps(nextProps: TOEFLCardProp, prevState: TOEFLCardState) {
    let new_state: TOEFLCardState = {
      reading: {
        pos: [],
        neg: []
      },
      listening: {
        pos: [],
        neg: []
      },
      speaking: {
        pos: [],
        neg: []
      },
      writing: {
        pos: [],
        neg: []
      }
    }
    nextProps.positive_TOEFLs.forEach(g => {
      if (g.reading) new_state.reading.pos.push(g.reading)
      if (g.listening) new_state.listening.pos.push(g.listening)
      if (g.speaking) new_state.speaking.pos.push(g.speaking)
      if (g.writing) new_state.writing.pos.push(g.writing)
    })
    nextProps.negative_TOEFLs.forEach(g => {
      if (g.reading) new_state.reading.neg.push(g.reading)
      if (g.listening) new_state.listening.neg.push(g.listening)
      if (g.speaking) new_state.speaking.neg.push(g.speaking)
      if (g.writing) new_state.writing.neg.push(g.writing)
    })
    return new_state
  }

  render() {
    return (
      <div>
        <Histogram
          title="TOEFL Reading"
          data_positive={this.state.reading.pos}
          data_negative={this.state.reading.neg}
          range={[-0.5, 30.5]}
          num_bins={31}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="TOEFL Listening"
          data_positive={this.state.listening.pos}
          data_negative={this.state.listening.neg}
          range={[-0.5, 30.5]}
          num_bins={31}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="TOEFL Speaking"
          data_positive={this.state.speaking.pos}
          data_negative={this.state.speaking.neg}
          range={[-0.5, 30.5]}
          num_bins={31}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="TOEFL Writing"
          data_positive={this.state.writing.pos}
          data_negative={this.state.writing.neg}
          range={[-0.5, 30.5]}
          num_bins={31}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
      </div>
    );
  }
}

export default TOEFLCard