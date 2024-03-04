"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePosts } from "@/app/actions/createPosts";
import { Textarea } from "../ui/textarea";
import FileUpload from "../file-upload";
import EditorMenuBar from "../editorMenuBar";
import Tiptap from "../tiptap";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from "react";

const formSchema = z.object({
    title : z
        .string()
        .min(1, {message : "Title is required"})
        .max(100, {message : "Title must be less than 100 characters"}),
    content : z.string().min(1, {message : "Content is required"}),
    imageUrl : z.string().min(1, {message : "Image is required"}),
})

export default function DirectWrite() {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : {
            title : "",
            content : "",
            imageUrl : "",
        },
    })

    const [content, setContent] = useState<string>('')
    const handleContentChange = (reason: any) => {
      setContent(reason)
    }

    return (
        <div className="mt-8 mx-auto w-full max-w-3xl px-4">
            <div className="bg-white py-8 shadow rounded-lg px-10">
                <h1 className="text-center text-2xl font-extrabold mb-10">
                    Create a Post!
                </h1>
                <div>
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex justify-center">
                                                <FileUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus:border-2 focus:border-black border-gray-300 bg-white rounded-md" 
                                                placeholder="title"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                        <Tiptap
                                            placeholder="content"
                                            onChange={field.onChange}
                                        />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="flex justify-end">
                                <Button 
                                    className="justify-end"
                                    variant="custom">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}