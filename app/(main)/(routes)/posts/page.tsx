import HotPost from "@/components/posts/hotPost";
import LatestPost from "@/components/posts/latestPost";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";

const postClassName = [
  "col-span-2 row-span-2 bg-black",
  "col-span-2 row-span-1 bg-black",
  "col-span-1 row-span-1 bg-black",
  "col-span-1 row-span-1 bg-black",
];

const PostsPage = async () => {
    const allPosts = await db.posts.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    if(!allPosts) {
        return null;
    }

    const HotPostArr = allPosts
                    .sort((a, b) => b.likes - a.likes) // 좋아요 수에 따라 내림차순 정렬
                    .slice(0, 4); // 상위 3개 선택

    const LatestPostArr = allPosts.slice(0,4);

    return (
        <div className="flex flex-col pt-3 pb-10 px-8 gap-y-3">
            <div className="">
                <h1>Hot Posts</h1>
            </div>
            <div className="sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px]">
                {
                    HotPostArr.map((post, idx) => (
                        <HotPost
                            key={idx}
                            className={postClassName[idx]}
                            title={post.title}
                            imgUrl={post.imgUrl}
                            postId={post.id}
                        />
                    ))
                }
            </div>

            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-full my-3"/>
            {/* 최신 posts */}
            <div className="">
                <h1>Latest Posts</h1>
            </div>
            <div className="sm:grid grid-cols-2 grid-rows-3 gap-x-8 gap-y-8 my-5">
                {
                    LatestPostArr.map((post, idx) => (
                        <>
                            {
                                idx === 0 && 
                                <LatestPost 
                                    className=" col-span-1 row-span-3"
                                    imageHeight="h-96"
                                    imgUrl={post.imgUrl}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    postId={post.id}
                                    isLongCard
                                />
                            }
                            {
                                idx !== 0 && 
                                <LatestPost 
                                    className=" col-span-1 row-span-1 mt-10 sm:mt-0 gap-3 flex justify-between"
                                    imageHeight="h-48"
                                    imgUrl={post.imgUrl}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    postId={post.id}
                                    isSmallCard
                                />
                            }
                        </>
                    ))
                }
            </div>
        </div>
    );
}

export default PostsPage;