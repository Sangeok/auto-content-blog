import DOMPurify from "dompurify";

interface NoSSRContentProps {
    content : string;
}

const SsrContent = ({content}:NoSSRContentProps) => {
    const cleanContent = DOMPurify.sanitize(content);

    return (
        <span
            dangerouslySetInnerHTML={{
                __html: cleanContent
            }}
        />
    )
}

export default SsrContent;