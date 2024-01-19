import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarPhotoProps = {
  imageUrl: string;
};

export default function AvatarPhoto({ imageUrl }: AvatarPhotoProps) {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
