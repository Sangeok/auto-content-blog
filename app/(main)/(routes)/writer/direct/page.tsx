import { FindPosts } from "@/app/actions/findPosts";
import DirectWrite from "@/components/write/directWrite";
import { useSearchParams } from "next/navigation";

interface WriterDirectPageProps {
    searchParams : {
        title : string;
        postId : string;
    }
}

export default async function WriterDirectPage({searchParams} : WriterDirectPageProps) {
    const title = searchParams.title;
    const postId = searchParams.postId;

    const findPosts = await FindPosts(title);

    if(findPosts) {
        return <DirectWrite 
                    title={findPosts.title}
                    subtitle={findPosts.subtitle}
                    content={findPosts.content}
                    imageUrl={findPosts.imgUrl}
                    postId={postId}
                    isEdit={true}
                />
    }

    return (
        <DirectWrite 
            title=""
            subtitle=""
            content=""
            imageUrl=""
            isEdit={false}
        />
    );
}