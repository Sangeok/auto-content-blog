import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "@/lib/sanitizeHtml";

interface LatestPostProps {
    className? : string;
    imageHeight : string;
    imgUrl : string;
    title : string;
    content : string;
    createdAt : Date;
    isSmallCard? : boolean;
    isLongCard? : boolean;
}

const LatestPost = ({
    className,
    imageHeight,
    title,
    content,
    createdAt,
    imgUrl,
    isSmallCard = false,
    isLongCard = false,
} : LatestPostProps) => {
    const cleanContent = sanitizeHtml(content);

    return (
        <div className={className}>
            <Link className="basis-full hover:opacity-70" href="/">
                <div className={`relative w-auto mb-3 ${imageHeight}`}>
                    <Image
                        src={imgUrl}
                        alt="LatestPost"
                        fill={true}
                    />
                </div>
            </Link>
            <div className="basis-full">
                <Link href="/">
                    <h4
                        className={`font-bold hover:text-accent-green
                            ${isSmallCard ? "text-base" : "text-lg"}
                            ${isSmallCard ? "line-clamp-2" : ""}
                        `}
                    >
                        {title}
                    </h4>
                </Link>
                <div className={`${isSmallCard ? "my-2" : "flex my-3"} gap-3`}>
                    <h6 className="text-gray-300 text-xs">
                        {createdAt.toLocaleDateString()}
                    </h6>
                </div>
                <div className={`text-gray-500 ${isLongCard ? "line-clamp-5" : "line-clamp-3"}`}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: cleanContent
                        }}
                    />
                </div>    
            </div>
        </div>
    )
}

export default LatestPost;