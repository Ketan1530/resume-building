import { DragDropContext, Droppable, Draggable, type DragEnd } from '@hello-pangea/dnd';
import { useResumeStore } from '@/store/resumeStore';
import { GripVertical } from 'lucide-react';

const sectionLabels: Record<string, string> = {
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  achievements: 'Achievements',
};

export default function SectionReorder() {
  const { resumeData, updateSectionOrder } = useResumeStore();

  const handleDragEnd = (result: DragEnd) => {
    if (!result.destination) return;

    const items = Array.from(resumeData.sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSectionOrder(items);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
          Reorder Sections
        </h3>
        <p className="text-sm text-foreground/60">
          Drag and drop to reorder how sections appear in your resume
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {resumeData.sectionOrder.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 rounded-xl bg-glass-overlay backdrop-blur-md border border-white/10 flex items-center gap-3 transition-all ${
                        snapshot.isDragging
                          ? 'border-primary shadow-lg shadow-primary/20'
                          : 'hover:border-primary/30'
                      }`}
                    >
                      <GripVertical className="w-5 h-5 text-foreground/40" />
                      <span className="font-paragraph text-foreground">
                        {sectionLabels[section]}
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
