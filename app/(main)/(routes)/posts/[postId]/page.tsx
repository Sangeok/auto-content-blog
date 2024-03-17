// Detail page(server component)

import db from "@/lib/db";
import PostContent from "@/components/posts/postContent";
import SideBar from "@/components/posts/sideBar";

interface PostDetailPageProps {
    params : {
        postId : string;
    }
}

const PostDetailPage = async ({params} : PostDetailPageProps) => {
    const {postId} = params;

    const myPost = await db.posts.findUnique({
        where : {
            id : parseInt(postId)
        }
    });

    if(!myPost) {
        return null;
    }

    return (
        <div className="px-10 leading-7">
            <div className="flex flex-col gap-10 mb-5">
                <div className="basis-3/4">
                    <PostContent {...myPost}/>
                </div>
                <div className="basis-1/4">
                    <SideBar />
                </div>
            </div>
            
        </div>
    )
}

export default PostDetailPage;