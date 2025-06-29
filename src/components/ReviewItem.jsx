function ReviewItem({ review }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body bg-light">
        <div className="d-flex justify-content-between mb-2">
          <h5 className="card-title mb-0">{review.user}</h5>
          <span className="text-warning fw-semibold">⭐ {review.rating}/5</span>
        </div>
        <p className="card-text">{review.comment}</p>
        <p className="text-muted small mb-0">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ReviewItem;

