import { Link } from 'react-router-dom';

function WorkshopItem({ workshop }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{workshop.name}</h5>
        <p className="card-text text-muted mb-1">{workshop.location}</p>
        <p className="card-text text-warning mb-2">Rating: {workshop.rating} ⭐</p>
        <Link
          to={`/workshops/${workshop.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default WorkshopItem;
