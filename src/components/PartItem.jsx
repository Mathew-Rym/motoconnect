import { Link } from 'react-router-dom';


function PartItem({ part }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{part.name}</h5>
        <p className="card-text text-muted mb-1">Condition: {part.condition}</p>
        <p className="card-text text-success fw-semibold">Ksh {part.price}</p>
        <Link to={`/parts/${part.id}`} className="btn btn-link p-0 text-decoration-none">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PartItem;
