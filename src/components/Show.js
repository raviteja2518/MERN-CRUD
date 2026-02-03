import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios
      .get('/api/book/' + this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data });
      })
      .catch(err => console.error(err));
  }

  delete = (id) => {
    axios
      .delete('/api/book/' + id)
      .then(() => {
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
  };

  render() {
    const { book } = this.state;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{book.title}</h3>
          </div>

          <div className="panel-body">
            <h4>
              <Link to="/">← Book List</Link>
            </h4>

            <dl>
              <dt>ID:</dt>
              <dd>{book._id}</dd>

              <dt>Author:</dt>
              <dd>{book.author}</dd>

              <dt>Description:</dt>
              <dd>{book.description}</dd>

              <dt>Published Date:</dt>
              <dd>{book.published_date}</dd>
            </dl>

            <Link to={`/edit/${book._id}`} className="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={() => this.delete(book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
