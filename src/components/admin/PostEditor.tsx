'use client';

import { useState } from 'react';
import MathRenderer from '@/components/domain/MathRenderer';
import { Post } from '@prisma/client';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface PostEditorProps {
  post?: Post | null;
}

export default function PostEditor({ post }: PostEditorProps) {
  const [content, setContent] = useState(post?.content || '');
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [published, setPublished] = useState(post?.published || false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!post) {
      setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-100px)]">
      {/* Editor Column */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
           <label className="text-sm font-bold">Title</label>
           <input 
             name="title" 
             value={title} 
             onChange={handleTitleChange}
             className="border p-2 rounded" 
             required 
           />
        </div>
        
        <div className="flex flex-col gap-2">
           <label className="text-sm font-bold">Slug (URL)</label>
           <input 
             name="slug" 
             value={slug} 
             onChange={(e) => setSlug(e.target.value)}
             className="border p-2 rounded" 
             required 
           />
        </div>

        <div className="flex items-center gap-2">
           <input 
             type="checkbox" 
             name="published" 
             id="published" 
             checked={published}
             onChange={(e) => setPublished(e.target.checked)}
           />
           <label htmlFor="published" className="text-sm font-bold">Published?</label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
           <label className="text-sm font-bold">Content (Markdown + LaTeX)</label>
           <p className="text-xs text-gray-500">Use $...$ for inline math and $$...$$ for block math.</p>
           <textarea 
             name="content"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             className="flex-1 border p-4 rounded font-mono resize-none focus:outline-blue-500"
             placeholder="# Hello World\n\nHere is a formula: $$E=mc^2$$"
           />
        </div>
        
        <input type="hidden" name="id" value={post?.id || 'new'} />
        
        <button type="submit" className="bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700">
          Save Post
        </button>
      </div>

      {/* Preview Column */}
      <div className="border rounded bg-white p-6 overflow-y-auto shadow-inner prose max-w-none">
        <h2 className="text-3xl font-bold mb-4 border-b pb-2">{title || 'Untitled'}</h2>
        
        <div className="preview-content">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
               // Optional: Override p to handle block math spacing if needed
               // For now standard rendering
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
