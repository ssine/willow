import React from 'react'
import { GREScore } from '../util/type'
import Histogram from './histogram'

interface GRECardProp {
  positive_GREs: GREScore[]
  negative_GREs: GREScore[]
}

interface GRECardState {
  verbal: {
    pos: number[]
    neg: number[]
  }
  quant: {
    pos: number[]
    neg: number[]
  }
  AW: {
    pos: number[]
    neg: number[]
  }
  total: {
    pos: number[]
    neg: number[]
  }
}

class GRECard extends React.Component<GRECardProp, GRECardState> {
  constructor(props: GRECardProp) {
    super(props)
    this.state = {
      verbal: {
        pos: [],
        neg: []
      },
      quant: {
        pos: [],
        neg: []
      },
      AW: {
        pos: [],
        neg: []
      },
      total: {
        pos: [],
        neg: []
      }
    }
  }

  static getDerivedStateFromProps(nextProps: GRECardProp, prevState: GRECardState) {
    let new_state: GRECardState = {
      verbal: {
        pos: [],
        neg: []
      },
      quant: {
        pos: [],
        neg: []
      },
      AW: {
        pos: [],
        neg: []
      },
      total: {
        pos: [],
        neg: []
      }
    }
    nextProps.positive_GREs.forEach(g => {
      if (g.verbal) new_state.verbal.pos.push(g.verbal)
      if (g.quant) new_state.quant.pos.push(g.quant)
      if (g.AW) new_state.AW.pos.push(g.AW)
      if (g.total) new_state.total.pos.push(g.total)
    })
    nextProps.negative_GREs.forEach(g => {
      if (g.verbal) new_state.verbal.neg.push(g.verbal)
      if (g.quant) new_state.quant.neg.push(g.quant)
      if (g.AW) new_state.AW.neg.push(g.AW)
      if (g.total) new_state.total.neg.push(g.total)
    })
    return new_state
  }

  render() {
    return (
      <div>
        <Histogram
          title="GRE Verbal"
          data_positive={this.state.verbal.pos}
          data_negative={this.state.verbal.neg}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="GRE Quant"
          data_positive={this.state.quant.pos}
          data_negative={this.state.quant.neg}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="GRE AW"
          data_positive={this.state.AW.pos}
          data_negative={this.state.AW.neg}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
        <Histogram
          title="GRE Total"
          data_positive={this.state.total.pos}
          data_negative={this.state.total.neg}
          width={500}
          height={150}
          margin={{top: 10, right: 10, left: 10, bottom: 10}}
        />
      </div>
    );
  }
}

export default GRECard