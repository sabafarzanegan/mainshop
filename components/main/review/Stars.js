import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";

function Stars({ rating }) {
  console.log(rating);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          size={14}
          className={cn(
            "text-primary bg-transparent transition-all duration-300 ease-in-out",
            rating >= star ? "fill-primary" : "fill-transparent"
          )}
        />
      ))}
    </div>
  );
}

export default Stars;
