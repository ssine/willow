import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

interface CommentsCardProp {
  positive_comments: {
    author: string
    comment: string
  }[]
  negative_comments: {
    author: string
    comment: string
  }[]
}

interface CommentsCardState {
}

class CommentsCard extends React.Component<CommentsCardProp, CommentsCardState> {
  constructor(props: CommentsCardProp) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Card className='comments'>
        <Typography variant="h4">Accepted</Typography>
        <div className="accepted">
          {this.props.positive_comments.map((v, idx) => (
            <Grid container>
              <div className="item" key={idx}>
                <Grid item xs={2} className="author">{v.author}</Grid>
                <Grid item xs={10} className="comment">{v.comment}</Grid>
              </div>
            </Grid>
          ))}
        </div>
        <Typography variant="h4">Rejected</Typography>
        <div className="rejected">
          {this.props.negative_comments.map((v, idx) => (
            <Grid container>
              <div className="item" key={idx}>
                <Grid item xs={2} className="author">{v.author}</Grid>
                <Grid item xs={10} className="comment">{v.comment}</Grid>
              </div>
            </Grid>
          ))}
        </div>
      </Card>
    );
  }
}

export default CommentsCard