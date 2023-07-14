import {  useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useGetCommentQuery, usePostCommentMutation } from '@/redux/api/apiSlice';


// const dummyComments = [
//   'Bhalo na',
//   'Ki shob ghori egula??',
//   'Eta kono product holo ??',
//   '200 taka dibo, hobe ??',
// ];


export default function ProductReview({ productId }:{productId:string |undefined}) {
   const commentRef = useRef<HTMLTextAreaElement>(null);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     userComment({ id: productId, comment: commentRef.current?.value || '' });
     commentRef.current!.value = ''; // Reset the form input value
   };

  const [userComment] = usePostCommentMutation();
  //! first function (function er nam icche moto dite parbo) , then option ->option is and object so we can destructure
  // ! as like as const [setComment, {isLoading,error}] = useSetCommentMutation();


  const { data } = useGetCommentQuery(productId);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea className="min-h-[30px]" name="comment" ref={commentRef} />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>

      <div className="mt-10">
        {data?.comments?.map((comment:string, index:number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
