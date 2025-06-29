import { Link } from 'react-router-dom';


function BikeItem({ bike }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h3 className="card-title h5">{bike.name}</h3>
        <p className="card-text text-muted">{bike.description || 'No description'}</p>
        <p className="card-text text-success fw-semibold">Ksh {bike.price}</p>
        <Link to={`/bikes/${bike.id}`} className="text-decoration-none text-primary">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default BikeItem;
