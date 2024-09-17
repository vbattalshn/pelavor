import apiClient from "@/lib/api";
import { useEffect, useState, version } from "react";
import Creator from "../creator";
import Link from "next/link";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";
import More from "@/assets/icons/more";
import Like from "@/assets/icons/like";

export default function GetComments({ url, refresh }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const data = { url };

    apiClient
      .post("/get-comments", data)
      .then((response) => setComments(response.data.data.comments))
      .catch((error) => console.log(error));
  }, [url, refresh])

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      {comments.map((comment, index) => (
        <Comment
          username={comment.user.username}
          profile={comment.user.Profile_photo}
          verification={comment.user.User_verification_status}
          date={comment.date}
          comment={comment.comment}
          comment_id={comment.comment_uniq_id}
          isLike={comment.is_liked}
          likeCount={comment.likes_count}
        />
      ))}
    </div>
  );
}

function Comment({
  username,
  profile,
  verification,
  date,
  comment,
  comment_id,
  isLike,
  likeCount,
}) {
  const [isLiked, setIsLiked] = useState(isLike);
  const [LikedsCount, setlikedsCount] = useState(likeCount);

  function likeComment(comment_id) {
    const data = { comment_id };

    apiClient
      .post("/like-comment", data)
      .then((response) => {
        setIsLiked(response.data.data.is_liked);
        setlikedsCount(response.data.data.likeds_count);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-neutral-200/50 rounded-lg flex flex-col gap-2 p-2 ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <Link
            href={"/user/" + username}
            className="flex gap-1 items-center justify-center "
          >
            <Image
              width={96}
              height={96}
              src={profile}
              alt={username + " avatar"}
              className="rounded-lg object-cover w-12 h-12"
            />
            <span className="text-neutral-700 font-normal">{username}</span>
            {verification ? <VerificationBadge /> : null}
          </Link>
          <span className="text-neutral-700 font-normal">{date}</span>
        </div>
        <button className="p-2 rounded-lg bg-neutral-300/25">
          <More />
        </button>
      </div>
      <p className="text-neutral-700 font-normal">{comment}</p>
      <div className="flex gap-2">
        <button
          onClick={() => likeComment(comment_id)}
          className={"p-2 flex gap-2 rounded-lg bg-neutral-300/25 text-neutral-800 transition-all  " + (isLiked == true ? "bg-blue-500 !text-neutral-200" : null)}
        >
          <Like />
          {LikedsCount} Likes
        </button>
      </div>
    </div>
  );
}
