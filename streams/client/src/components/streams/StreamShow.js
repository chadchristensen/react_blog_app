import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  // componentDidMount() {
  //   this.props.fetchStream(this.props.match.params.streamId);
  // }

  render() {
    return <div>{this.props.stream.title}</div>
  }
};

const mapStateToProps = (state) => {
  return {
    stream: state.streams[this.props.match.params.streamId]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);