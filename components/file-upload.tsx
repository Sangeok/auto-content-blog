"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { SingleImageDropzone } from "./ui/singleImageDropZone";
import { Button } from "./ui/button";

interface FileUploadProps {
    onChange : (url? : string) => void;
    file : File | undefined;
}

const FileUpload = ({
    onChange,
    file,
} : FileUploadProps) => {
    const { edgestore } = useEdgeStore();

    const uploadImgeHandler = async () => {
        if (file) {
            // 여기서 사진이 아니면 upload못하게 하면 좋긴한데 어짜피 나만 쓰니까 패스
            const res = await edgestore.publicFiles.upload({
              file,
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            if(res.url) {
                onChange(res.url);
            }
        }
    }

    useEffect(()=>{
        if(file) {
            uploadImgeHandler();
        }
    }, [file]);

    return (
        <div className="flex w-full justify-center">

        <Button
            className="border text-white bg-blue-500 rounded-md mt-2 hover:bg-blue-600"
            onClick={async (e:React.MouseEvent) => {
                e.stopPropagation();
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
            Image Upload
        </Button>
        </div>
    )
}

export default FileUpload;