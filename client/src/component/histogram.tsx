import React from 'react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area,
} from 'recharts'
import _ from 'lodash'
import {
  get_histogram_counts,
  linspace
} from '../util/helper'

interface HistogramProp {
  title: string
  data_positive: number[]
  data_negative: number[]
  width: number
  height: number
  range?: [number, number]
  num_bins?: number
  margin: {
    top: number
    right: number
    left: number
    bottom: number
  }
}

interface HistogramState {
  data: {x: number, y_pos: number, y_neg: number}[]
}

class Histogram extends React.Component<HistogramProp, HistogramState> {
  constructor(props: HistogramProp) {
    console.log('histogram init')
    super(props)
    this.state = {
      data: []
    }
  }

  static getDerivedStateFromProps(nextProps: HistogramProp, prevState: HistogramState) {
    console.log('getDerivedStateFromProps')
    console.log(nextProps)
    let data_all = nextProps.data_positive.concat(nextProps.data_negative)
    if (data_all.length === 0) return null
    let num_bins = nextProps.num_bins ? nextProps.num_bins : 10
    let left = _.min(data_all) as number, right = _.max(data_all) as number
    if (nextProps.range) {
      left = nextProps.range[0]
      right = nextProps.range[1]  
    }
    let pos_cnt = get_histogram_counts(
      nextProps.data_positive,
      [left, right],
      num_bins
    )
    let neg_cnt = get_histogram_counts(
      nextProps.data_negative,
      [left, right],
      num_bins
    )
    let interval = (right - left) / num_bins
    let idxs = linspace(left + interval / 2, right - interval / 2, num_bins)
    let new_stat =  {
      data: idxs.map((val, idx) => {return {x: val, y_pos: pos_cnt[idx], y_neg: neg_cnt[idx]}})
    }
    console.log(new_stat)
    return new_stat
  }

  render() {
    console.log('histogram update')
    console.log(this.state.data)
    return (
      <div>
        <h4>{this.props.title}</h4>
        <AreaChart
          width={this.props.width}
          height={this.props.height}
          data={this.state.data}
          syncId="anyId"
          margin={{
            top: this.props.margin.top,
            right: this.props.margin.right,
            left: this.props.margin.left,
            bottom: this.props.margin.bottom
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="y_pos" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="y_neg" stroke="pink" fill="#82ca9d" />
        </AreaChart>
      </div>
    );
  }
}

export default Histogram