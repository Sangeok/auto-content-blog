import Link from "next/link";
import Image from "next/image";

// 화면 크기에 따라 넓이가 다르게 보이도록 적용도 해보자

interface HotPostsProps {
    className? : string;
    title : string;
    imgUrl : string;
}

const HotPost = ({
    className,
    title,
    imgUrl,
} : HotPostsProps) => {
    return (
        <Link
            className={`${className} sm:mt-0 sm:h-auto relative mt-7 block w-full h-96 hover:opacity-70`}
            href="/"
        >
            <Image
                src={imgUrl}
                alt="Hot Posts"
                fill={true}
            />
            <div className="absolute z-2 bottom-0 left-0 p-3">
                <h4 className="text-wh-100 mt-2">{title}</h4>
            </div>
        </Link>
    )
}

export default HotPost;
