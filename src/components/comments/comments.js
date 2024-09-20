import apiClient from "@/lib/api";
import { useEffect, useState, version } from "react";
import Creator from "../creator";
import Link from "next/link";
import Image from "next/image";
import VerificationBadge from "@/assets/icons/verificationBadge";
import More from "@/assets/icons/more";
import Like from "@/assets/icons/like";
import NoComment from "@/assets/icons/noComment";

export default function GetComments({ url, refresh }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = { url };

    apiClient
      .post("/get-comments", data)
      .then((response) => setComments(response.data.data.comments))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [url, refresh]);

  return (
    <div className="flex flex-col gap-2 overflow-hidden">
      {loading === false && comments.length > 0 ? (
        comments.map((comment, index) => (
          <Comment
            key={index}
            username={comment.user.username}
            profile={comment.user.Profile_photo}
            verification={comment.user.User_verification_status}
            date={comment.date}
            comment={comment.comment}
            comment_id={comment.comment_uniq_id}
            isLike={comment.is_liked}
            likeCount={comment.likes_count}
          />
        ))
      ) : (
        loading === true ? (
          <CommentPlaceholder />
        ) : (
          <NoCommentHolder />
        )
      )}
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
          className={
            "p-2 flex gap-2 rounded-lg bg-neutral-300/25 text-neutral-800 transition-all " +
            (isLiked == true ? "!bg-blue-500 !text-neutral-200" : null)
          }
        >
          <Like />
          {LikedsCount} Likes
        </button>
      </div>
    </div>
  );
}

function CommentPlaceholder() {
  return (
    <div className="bg-neutral-200/50 rounded-lg flex flex-col gap-2 p-2 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center justify-center">
          <div className="flex gap-1 items-center justify-center ">
            <span className="rounded-lg w-12 h-12 bg-neutral-300" />
            <span className=" bg-neutral-300 w-20 h-6 rounded-lg" />
          </div>
          <span className="bg-neutral-300 w-20 h-6 rounded-lg" />
        </div>
        <span className="w-8 h-8 rounded-lg bg-neutral-300" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="w-full h-5 rounded-full bg-neutral-300" />
        <span className="w-full h-5 rounded-full bg-neutral-300" />
        <span className="w-3/4 h-5 rounded-full bg-neutral-300" />
      </div>
      <div className="flex gap-2">
        <span className="w-24 h-10 rounded-lg bg-neutral-300" />
        <span className="w-24 h-10 rounded-lg bg-neutral-300" />
      </div>
    </div>
  );
}

function NoCommentHolder() {
  return(
    <div className="flex flex-col gap-2 py-4 mx-auto max-w-md items-center justify-center">
      <NoComment className="w-60 h-60" />
      <span className="font-bold text-neutral-800 text-xl">
        Hiç yorum yapılmamış
      </span>
      <span className="font-normal text-center text-neutral-600">
        Listelere yorum yaparak profilinin puanını yükseltip diğer kullanıcıların önüne geçebilirsin
      </span>
    </div>
  )
}