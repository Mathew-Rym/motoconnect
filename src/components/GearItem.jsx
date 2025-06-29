import { Link } from 'react-router-dom';


function GearItem({ gear }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{gear.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Size: {gear.size}</h6>
        <p className="card-text text-success fw-medium">Ksh {gear.price}</p>
        {gear.description && (
          <p className="card-text">{gear.description}</p>
        )}
        {gear.id && (
          <Link to={`/gear/${gear.id}`} className="card-link text-primary">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default GearItem;
