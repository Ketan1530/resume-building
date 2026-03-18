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
    const { source, destination } = result;

    // If dropped outside the list, do nothing
    if (!destination) return;

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const items = Array.from(resumeData.sectionOrder);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

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
        <Droppable droppableId="sections" type="SECTION">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-2 p-2 rounded-lg transition-colors ${
                snapshot.isDraggingOver ? 'bg-primary/5' : ''
              }`}
            >
              {resumeData.sectionOrder.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 rounded-xl bg-glass-overlay backdrop-blur-md border-2 flex items-center gap-3 transition-all cursor-grab active:cursor-grabbing ${
                        snapshot.isDragging
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/30'
                          : 'border-white/10 hover:border-primary/50'
                      }`}
                    >
                      <GripVertical className="w-5 h-5 text-primary flex-shrink-0" />
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
