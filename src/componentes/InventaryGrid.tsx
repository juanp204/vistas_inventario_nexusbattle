import DroppableCuadrado from "./droppableCuadrado";
import DraggableItem from "./draggableItem";

interface InventoryItem {
  _id: string;
  name: string;
  image: string;
  active: boolean;
}

const InventoryGrid: React.FC<{
  baseId: string;
  items: { [key: string]: InventoryItem | null };
  onHover: (item: InventoryItem | null) => void;
}> = ({ baseId, items, onHover }) => {
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => (
        <DroppableCuadrado
          key={`${baseId}${index + 1}`}
          id={`${baseId}${index + 1}`}
        >
          {items[`${baseId}${index + 1}`] && (
            <DraggableItem
              id={items[`${baseId}${index + 1}`]!._id}
              content={items[`${baseId}${index + 1}`]!.name}
              image={items[`${baseId}${index + 1}`]!.image}
              onHover={onHover}
            />
          )}
        </DroppableCuadrado>
      ))}
    </>
  );
};

export default InventoryGrid;
