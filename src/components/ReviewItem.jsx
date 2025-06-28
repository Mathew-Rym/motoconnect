// src/components/ReviewItem.jsx
function ReviewItem({ review }) {
  return (
    <div className="border rounded p-4 shadow-sm mb-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{review.user}</h4>
        <span className="text-yellow-500">⭐ {review.rating}/5</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {new Date(review.date).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ReviewItem;
