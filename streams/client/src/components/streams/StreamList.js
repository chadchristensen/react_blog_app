import React from 'react';
import { connect } from 'react-redux';
import { fetchAllStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchAllStreams();
  }

  renderAdmin(stream) {
    if(this.props.currentUserId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderStreamList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">
              {stream.description}
            </div>
          </div>
        </div>
      )
    })
  }

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderStreamList()}
        </div>
        {this.renderCreateButton()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
}
export default connect(mapStateToProps, { fetchAllStreams })(StreamList);