
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Pencil, Save } from 'lucide-react';

interface ChapterEditorProps {
  chapterId: string;
  title: string;
  content: string;
  duration?: string;
  onSave: (id: string, title: string, content: string, duration?: string) => void;
}

const CourseChapterEditor = ({ 
  chapterId, 
  title: initialTitle, 
  content: initialContent,
  duration: initialDuration,
  onSave
}: ChapterEditorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState(initialTitle);
  const [content, setContent] = React.useState(initialContent);
  const [duration, setDuration] = React.useState(initialDuration || '15 minutes');

  const handleSave = () => {
    onSave(chapterId, title, content, duration);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Chapter title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <Input 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 15 minutes"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chapter content"
              className="min-h-[300px]"
              rows={10}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseChapterEditor;
