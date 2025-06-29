import { Link } from 'react-router-dom';

function DiscussionItem({ discussion }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5 text-primary mb-2">{discussion.title}</h3>
        <p className="card-text mb-3">{discussion.snippet}</p>
        <div className="d-flex justify-content-between text-muted small mb-2">
          <span>By {discussion.author}</span>
          <span>{new Date(discussion.date).toLocaleDateString()}</span>
        </div>
        {discussion.id && (
          <Link to={`/discussions/${discussion.id}`} className="text-decoration-none text-info">
            View Discussion →
          </Link>
        )}
      </div>
    </div>
  );
}

export default DiscussionItem;
