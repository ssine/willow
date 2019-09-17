import React from 'react'
import { GPA } from '../util/type'
import Histogram from './histogram'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

interface GPACardProp {
  positive_GPAs: GPA[]
  negative_GPAs: GPA[]
}

interface GPACardState {
  scale_4: {
    pos: number[]
    neg: number[]
  }
  scale_4_3: {
    pos: number[]
    neg: number[]
  }
  scale_100: {
    pos: number[]
    neg: number[]
  }
}

class GPACard extends React.Component<GPACardProp, GPACardState> {
  constructor(props: GPACardProp) {
    super(props)
    this.state = {
      scale_4: {
        pos: [],
        neg: []
      },
      scale_4_3: {
        pos: [],
        neg: []
      },
      scale_100: {
        pos: [],
        neg: []
      }
    }

  }

  static getDerivedStateFromProps(nextProps: GPACardProp, prevState: GPACardState) {
    let new_state: GPACardState = {
      scale_4: {
        pos: [],
        neg: []
      },
      scale_4_3: {
        pos: [],
        neg: []
      },
      scale_100: {
        pos: [],
        neg: []
      }
    }
    nextProps.positive_GPAs.forEach(g => {
      if (g.scale_100) new_state.scale_100.pos.push(g.scale_100)
      if (g.scale_4) new_state.scale_4.pos.push(g.scale_4)
      if (g.scale_4_3) new_state.scale_4_3.pos.push(g.scale_4_3)
    })
    nextProps.negative_GPAs.forEach(g => {
      if (g.scale_100) new_state.scale_100.neg.push(g.scale_100)
      if (g.scale_4) new_state.scale_4.neg.push(g.scale_4)
      if (g.scale_4_3) new_state.scale_4_3.neg.push(g.scale_4_3)
    })
    return new_state
  }

  render() {
    return (
      <Card className='gpa-card'>

        <div className="histogram">

          <Histogram
            title="GPA (scale 100)"
            data_positive={this.state.scale_100.pos}
            data_negative={this.state.scale_100.neg}
            range={[59.5, 100.5]}
            num_bins={41}
            width={500}
            height={200}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
        <div className="histogram">

          <Histogram
            title="GPA (scale 4)"
            data_positive={this.state.scale_4.pos}
            data_negative={this.state.scale_4.neg}
            range={[2.45, 4.05]}
            num_bins={16}
            width={500}
            height={200}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
        <div className="histogram">

          <Histogram
            title="GPA (scale 4.3)"
            data_positive={this.state.scale_4_3.pos}
            data_negative={this.state.scale_4_3.neg}
            range={[2.45, 4.35]}
            num_bins={19}
            width={500}
            height={200}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          />
        </div>
      </Card>
    );
  }
}

export default GPACard