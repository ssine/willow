import React from 'react'
import { GREScore } from '../util/type'
import Histogram from './histogram'
import Card from '@material-ui/core/Card'

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
      <Card className='gre-card'>
        <div className="histogram">

          <Histogram
            title="GRE Verbal"
            data_positive={this.state.verbal.pos}
            data_negative={this.state.verbal.neg}
            range={[129.5, 170.5]}
            num_bins={41}
            width={500}
            height={150}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
        <div className="histogram">

          <Histogram
            title="GRE Quant"
            data_positive={this.state.quant.pos}
            data_negative={this.state.quant.neg}
            range={[129.5, 170.5]}
            num_bins={41}
            width={500}
            height={150}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
        <div className="histogram">

          <Histogram
            title="GRE AW"
            data_positive={this.state.AW.pos}
            data_negative={this.state.AW.neg}
            range={[-0.25, 6.25]}
            num_bins={13}
            width={500}
            height={150}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
        <div className="histogram">

          <Histogram
            title="GRE Total"
            data_positive={this.state.total.pos}
            data_negative={this.state.total.neg}
            range={[258.5, 340.5]}
            num_bins={41 * 2}
            width={500}
            height={150}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
      </Card>
    );
  }
}

export default GRECard