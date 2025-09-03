import React, { useRef, useCallback, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Link, 
  List, 
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Undo,
  Redo,
  Eye,
  EyeOff
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your blog content...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState('paragraph');

  // Execute formatting command
  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      // Update content after command execution
      setTimeout(() => {
        onChange(editorRef.current?.innerHTML || '');
      }, 10);
    }
  }, [onChange]);

  // Handle content changes
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Handle key combinations
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            executeCommand('redo');
          } else {
            executeCommand('undo');
          }
          break;
      }
    }
  }, [executeCommand]);

  // Insert link
  const insertLink = useCallback(() => {
    const url = prompt('Enter the URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  }, [executeCommand]);

  // Insert image
  const insertImage = useCallback(() => {
    const url = prompt('Enter the image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  }, [executeCommand]);

  // Handle heading change
  const handleHeadingChange = useCallback((heading: string) => {
    setSelectedHeading(heading);
    if (heading === 'paragraph') {
      executeCommand('formatBlock', 'div');
    } else {
      executeCommand('formatBlock', heading);
    }
  }, [executeCommand]);

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title, 
    isActive = false,
    className: buttonClassName = ""
  }: {
    onClick: () => void;
    icon: any;
    title: string;
    isActive?: boolean;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 hover:bg-gray-700 rounded transition-colors duration-200 ${
        isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
      } ${buttonClassName}`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className={`border border-gray-600 rounded-lg overflow-hidden bg-gray-800 ${className}`}>
      {/* Toolbar */}
      <div className="bg-gray-900 border-b border-gray-600 p-2">
        <div className="flex items-center gap-1 flex-wrap">
          {/* Heading Selector */}
          <select
            value={selectedHeading}
            onChange={(e) => handleHeadingChange(e.target.value)}
            className="bg-gray-800 text-gray-300 border border-gray-600 rounded px-2 py-1 text-sm mr-2"
          >
            <option value="paragraph">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>

          <div className="w-px h-6 bg-gray-600 mx-1"></div>

          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => executeCommand('bold')}
            icon={Bold}
            title="Bold (Ctrl+B)"
          />
          <ToolbarButton
            onClick={() => executeCommand('italic')}
            icon={Italic}
            title="Italic (Ctrl+I)"
          />
          <ToolbarButton
            onClick={() => executeCommand('underline')}
            icon={Underline}
            title="Underline (Ctrl+U)"
          />
          <ToolbarButton
            onClick={() => executeCommand('strikeThrough')}
            icon={Strikethrough}
            title="Strikethrough"
          />
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'pre')}
            icon={Code}
            title="Code Block"
          />

          <div className="w-px h-6 bg-gray-600 mx-1"></div>

          {/* Alignment */}
          <ToolbarButton
            onClick={() => executeCommand('justifyLeft')}
            icon={AlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyCenter')}
            icon={AlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() => executeCommand('justifyRight')}
            icon={AlignRight}
            title="Align Right"
          />

          <div className="w-px h-6 bg-gray-600 mx-1"></div>

          {/* Lists */}
          <ToolbarButton
            onClick={() => executeCommand('insertUnorderedList')}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => executeCommand('insertOrderedList')}
            icon={ListOrdered}
            title="Numbered List"
          />
          <ToolbarButton
            onClick={() => executeCommand('formatBlock', 'blockquote')}
            icon={Quote}
            title="Quote"
          />

          <div className="w-px h-6 bg-gray-600 mx-1"></div>

          {/* Insert */}
          <ToolbarButton
            onClick={insertLink}
            icon={Link}
            title="Insert Link"
          />
          <ToolbarButton
            onClick={insertImage}
            icon={Image}
            title="Insert Image"
          />

          <div className="w-px h-6 bg-gray-600 mx-1"></div>

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => executeCommand('undo')}
            icon={Undo}
            title="Undo (Ctrl+Z)"
          />
          <ToolbarButton
            onClick={() => executeCommand('redo')}
            icon={Redo}
            title="Redo (Ctrl+Shift+Z)"
          />

          <div className="flex-1"></div>

          {/* Preview Toggle */}
          <ToolbarButton
            onClick={() => setIsPreview(!isPreview)}
            icon={isPreview ? EyeOff : Eye}
            title={isPreview ? "Edit Mode" : "Preview Mode"}
            isActive={isPreview}
          />
        </div>
      </div>

      {/* Editor Area */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 prose prose-invert max-w-none">
            <div 
              className="text-gray-100 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleContentChange}
            onKeyDown={handleKeyDown}
            className="p-4 min-h-[400px] text-gray-100 leading-relaxed focus:outline-none"
            style={{ wordBreak: 'break-word' }}
            data-placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-600 px-4 py-2 text-xs text-gray-400 flex justify-between">
        <span>Press Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</span>
        <span>{value.replace(/<[^>]*>/g, '').length} characters</span>
      </div>

      {/* Custom CSS for placeholder and contentEditable styling */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #6b7280;
          font-style: italic;
        }
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.8rem 0;
        }
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.6rem 0;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
        }
        [contenteditable] pre {
          background: #374151;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        [contenteditable] ul {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};