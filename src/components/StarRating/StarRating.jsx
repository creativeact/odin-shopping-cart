import { Star, StarHalf } from "lucide-react";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} fill="#EAB30A" strokeWidth={0.5} />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" fill="#EAB30A" strokeWidth={0.5} />);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} fill="none" strokeWidth={0.5} />);
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
}

export { StarRating };
