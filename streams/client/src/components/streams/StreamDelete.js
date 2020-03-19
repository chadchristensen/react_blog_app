import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId)
  }

  renderContent() {
    if(!this.props.stream) {
      return 'Are you sure you want to delete this stream?'
    }

    return `Are you sure you want to delete the stream with the title: ${this.props.stream.title}`
  }

  renderActions() {
    const { streamId } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(streamId)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">Cancel</Link>
      </>
    )
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.streamId]
  }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);