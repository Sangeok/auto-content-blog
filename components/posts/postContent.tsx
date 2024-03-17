"use client";

import { DeletePosts } from "@/app/actions/deletePosts";
import { userStore } from "@/store/user-store";
import { PencilLineIcon, Trash, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostContentProps {
    title : string;
    subtitle : string;
    content : string;
    imgUrl : string;
    id : number;
    createdAt : Date;
}

const NoSSRContent = dynamic(()=>import("../ssrContent"), {
    ssr : false
})

const PostContent = ({title,subtitle,content,imgUrl,id,createdAt }:PostContentProps ) => {
    const {isAdmin} = userStore();
    const router = useRouter();

    const isEdit = () => {
        if(!isAdmin) {
            return alert("권한이 없습니다.");
        }
        router.push(`/writer/direct?edit=true&title=${title}&postId=${id}`);
    }

    const isDelete = async (title : string) => {
        if(!isAdmin) {
            return alert("권한이 없습니다.");
        }
        await DeletePosts(title).then((res)=>{
            if(res?.success) {
                alert("게시글 삭제완료.");
                router.push("/");
            }
            else {
                alert("게시글 삭제실패.");
            }
        });
    }

    return (
        <div className="flex flex-col w-full mb-10">
                <div className="w-full flex justify-between">
                    <div/>
                    <div>
                        <h2 className="font-bold">{title}</h2>
                        <h6 className="text-wh-300 text-xs">{createdAt.toLocaleDateString()}</h6>
                    </div>
                    <div className="flex gap-x-5">
                        <div
                            className="hover:cursor-pointer"
                            onClick={()=>isEdit()}
                        >
                            <PencilLineIcon/>
                        </div>
                        <div
                            className="hover:cursor-pointer"
                            onClick={()=>isDelete(title)}
                        >
                            <Trash />
                        </div>
                    </div>
                </div>
                <div className="relative w-auto mt-2 mb-16 h-96">
                    <Image
                        src={imgUrl}
                        alt="PostContent"
                        fill={true}
                        sizes="(max-width : 480px) 100vw,
                               (max-width : 768px) 85vw,            
                               (max-width : 1060px) 75vw,
                               60vw"   
                    />
                </div>
                <div className="">
                    <NoSSRContent content={content} />
                </div>
        </div>
    )
}

export default PostContent;