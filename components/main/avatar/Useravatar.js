import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
function Useravatar({ image, name }) {
  return (
    <Avatar>
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}

export default Useravatar;
