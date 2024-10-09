import { useDraggable, UniqueIdentifier } from "@dnd-kit/core";

interface InventoryItem {
  _id: string;
  name: string;
  image: string;
  active: boolean;
}

interface DraggableItemProps {
  id: UniqueIdentifier;
  content: string;
  image: string; // Agregado para mostrar la imagen del objeto
  onHover: (item: InventoryItem | null) => void; // Nueva prop para manejar el hover
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  content,
  image,
  onHover,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="draggable"
      style={style}
      {...listeners}
      {...attributes}
      onMouseEnter={() =>
        onHover({ _id: String(id), name: content, image, active: true })
      } // Activar hover
      onMouseLeave={() => onHover(null)} // Desactivar hover
    >
      <img
        src={image}
        alt={content}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default DraggableItem;
