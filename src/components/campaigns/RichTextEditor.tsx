import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
} from "lucide-react";

interface RichTextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor = ({
  initialContent = "",
  onChange = () => {},
  placeholder = "Tell your story...",
  minHeight = "300px",
}: RichTextEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleFormatClick = (format: string) => {
    setSelectedFormat(format === selectedFormat ? null : format);
    // In a real implementation, this would apply formatting to selected text
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange(newContent);
  };

  const handleImageUpload = () => {
    // In a real implementation, this would open a file picker
    alert("Image upload functionality would be implemented here");
  };

  const handleLinkInsert = () => {
    // In a real implementation, this would prompt for URL
    const url = prompt("Enter URL:");
    if (url) {
      // Insert link at cursor position
      alert(`Link to ${url} would be inserted here`);
    }
  };

  const FormatButton = ({
    format,
    icon: Icon,
    tooltip,
  }: {
    format: string;
    icon: React.ElementType;
    tooltip: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 p-0",
        selectedFormat === format && "bg-accent text-accent-foreground",
      )}
      onClick={() => handleFormatClick(format)}
      aria-label={tooltip}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="w-full border rounded-md bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b">
        <FormatButton format="bold" icon={Bold} tooltip="Bold" />
        <FormatButton format="italic" icon={Italic} tooltip="Italic" />
        <FormatButton format="underline" icon={Underline} tooltip="Underline" />

        <div className="h-6 w-px bg-border mx-1" />

        <FormatButton format="h1" icon={Heading1} tooltip="Heading 1" />
        <FormatButton format="h2" icon={Heading2} tooltip="Heading 2" />
        <FormatButton format="quote" icon={Quote} tooltip="Quote" />

        <div className="h-6 w-px bg-border mx-1" />

        <FormatButton format="bullet-list" icon={List} tooltip="Bullet List" />
        <FormatButton
          format="ordered-list"
          icon={ListOrdered}
          tooltip="Numbered List"
        />

        <div className="h-6 w-px bg-border mx-1" />

        <FormatButton
          format="align-left"
          icon={AlignLeft}
          tooltip="Align Left"
        />
        <FormatButton
          format="align-center"
          icon={AlignCenter}
          tooltip="Align Center"
        />
        <FormatButton
          format="align-right"
          icon={AlignRight}
          tooltip="Align Right"
        />

        <div className="h-6 w-px bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={handleImageUpload}
          aria-label="Insert Image"
        >
          <Image className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={handleLinkInsert}
          aria-label="Insert Link"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="p-4 focus:outline-none"
        style={{ minHeight }}
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        placeholder={placeholder}
        data-placeholder={placeholder}
      />

      <div className="p-2 text-xs text-muted-foreground border-t">
        <p>
          Tip: You can use formatting tools above or keyboard shortcuts like
          Ctrl+B for bold
        </p>
      </div>
    </div>
  );
};

export default RichTextEditor;
