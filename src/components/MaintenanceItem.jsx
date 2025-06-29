function MaintenanceItem({ record }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body bg-light">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{record.title}</h5>
          <small className="text-muted">
            {new Date(record.date).toLocaleDateString()}
          </small>
        </div>
        <p className="card-text">{record.notes}</p>
        <p className="card-text text-muted mt-2">Cost: Ksh {record.cost}</p>
      </div>
    </div>
  );
}

export default MaintenanceItem;
