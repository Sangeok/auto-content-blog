'use client';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorMenuBar from './editorMenuBar';

const Tiptap = ({
    onChange,
    content
} : any) => {

    const editor = useEditor({
      extensions: [StarterKit],
      content,
      editorProps: {
          attributes: {
            class:
                "mt-3 border min-h-[300px] rounded-md p-2",
          },
      },
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
  });

      return (
          <div className="w-full gap-y-8 ">
              <EditorMenuBar editor={editor}/>
              <EditorContent
                editor={editor} 
              />
          </div>
      )
}

export default Tiptap