import React from 'react'

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
    this.state = { }
  }

  render() {
    return (
      <div>
        <div className="accepted-comments">
          {this.props.positive_comments.map(v => (
            <div className="item">
              <div className="author">{v.author}</div>
              <div className="comment">{v.comment}</div>
            </div>
          ))}
        </div>
        <div className="rejected-comments">
          {this.props.negative_comments.map(v => (
            <div className="item">
              <div className="author">{v.author}</div>
              <div className="comment">{v.comment}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CommentsCard