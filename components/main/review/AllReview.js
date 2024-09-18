import { db } from "../../../db/drizzle";
import { reviews, users } from "../../../db/schema";
import { eq } from "drizzle-orm";
import Stars from "../review/Stars";

async function AllReview({ productID }) {
  const allreviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productID, productID))
    .fullJoin(users, eq(users.id, reviews.userID));
  console.log(allreviews);
  if (allreviews.length === 0) return <p>برای این محصول نظری ثبت نشده است.</p>;
  const now = new Date();

  const timeDifferences = allreviews.map((review) => {
    const reviewTime = new Date(review.reviews.created);
    const timeDifference = now - reviewTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return {
      review: review,
      timeDifferenceInDays: days,
    };
  });

  console.log(timeDifferences);

  return (
    <div>
      {timeDifferences.map((reviews) => (
        <div className="space-y-2 border-b border-gray-400 py-4">
          <div>
            <span>کاربر</span>
            <p>{reviews?.review?.user?.name}</p>
            <Stars rating={reviews.review.reviews.rating} />
          </div>
          {reviews.timeDifferenceInDays >= 1 && (
            <span className=" text-gray-400 text-sm block">
              {reviews.timeDifferenceInDays}روز گذشته
            </span>
          )}
          <span className="text-lg">{reviews?.review?.reviews.comment}</span>
        </div>
      ))}
    </div>
  );
}

export default AllReview;
