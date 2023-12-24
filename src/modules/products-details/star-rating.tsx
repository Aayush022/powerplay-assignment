
import React from "react";
import './star-rating.css'

interface StarRatingProps {
  rating: number;
  maxRating: number;
  userCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating,
  userCount,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          role="img"
          aria-label={i <= rating ? "Filled Star" : "Empty Star"}
        >
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      <div className="stars">{renderStars()}</div>
      {userCount && (
        <div className="user-count">
          ({userCount} {userCount === 1 ? "user" : "users"})
        </div>
      )}
    </div>
  );
};

export default StarRating;
