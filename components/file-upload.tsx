"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { SingleImageDropzone } from "./ui/singleImageDropZone";

interface FileUploadProps {
    onChange : (url? : string) => void;
    value : string;
}

const FileUpload = ({
    onChange,
    value,
} : FileUploadProps) => {
    const [file, setFile] = useState<File>();
    const { edgestore} = useEdgeStore();

    const uploadImgeHandler = async () => {
        if (file) {
            // 여기서 사진이 아니면 upload못하게 하면 좋긴한데 어짜피 나만 쓰니까 패스

            const res = await edgestore.publicFiles.upload({
              file,
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            onChange(res.url);
        }
    }

    useEffect(()=>{
        if(file) {
            uploadImgeHandler();
        }
    }, [file]);

    return (
        <div>
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                onChange={(file) => {
                    setFile(file);
                }}
            />
            <button
                onClick={async () => {
                if (file) {
                    const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                        console.log(progress);
                    },
                    });
                    // you can run some server action or api here
                    // to add the necessary data to your database
                    console.log(res);
                }
                }}
            >
            </button>
        </div>
    )
}

export default FileUpload;