import React, { useState } from "react";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import "./Style.css";
import BoxEstadisticas from "./componentes/estadisticas";

// Define interface for droppable items
interface DroppableCuadradoProps {
  id: UniqueIdentifier;
  extraClasses?: string;
  children?: React.ReactNode;
}

// Define interface for draggable items
interface DraggableItemProps {
  id: UniqueIdentifier;
}

function Inventario() {
  const [items, setItems] = useState<{
    [key: string]: UniqueIdentifier | null;
  }>({
    cuadrado1: null,
    cuadrado2: null,
    cuadrado3: null,
    cuadrado4: null,
    cuadrado5: null,
    cuadrado6: null,
  });

  // Handler for drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Verifica que haya un elemento droppable debajo del draggable
    if (over) {
      setItems((prevItems) => ({
        ...prevItems,
        [over.id]: active.id,
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div
          className="section1"
          style={{ fontFamily: "OCR A", fontSize: "20px" }}
        >
          <div className="estadisticas">
            <h1>ESTADÍSTICAS</h1>
            <BoxEstadisticas titulo="Nivel" numero={45} />
            <BoxEstadisticas titulo="Vida" numero={100} />
            <BoxEstadisticas titulo="Poder" numero={80} />
            <BoxEstadisticas titulo="Defensa" numero={70} />
            <BoxEstadisticas titulo="Ataque" numero={90} />
            <BoxEstadisticas titulo="Daño" numero={60} />
            <hr />
          </div>
          <div className="habilidades">
            {/* <h1 style={{ justifySelf: "start" }}>HABILIDADES ÉPICAS</h1> */}
          </div>
        </div>
        <div className="section2">
          <div className="sub-section1"></div>
          <div className="sub-section2">
            <div className="sub-sub-section1">
              <div className="containerC">
                {["cuadrado1", "cuadrado2", "cuadrado3"].map(
                  (cuadradoId, index) => (
                    <DroppableCuadrado
                      key={cuadradoId}
                      id={cuadradoId}
                      extraClasses={index % 2 === 0 ? "mvr" : ""}
                    >
                      {items[cuadradoId] && (
                        <DraggableItem id={items[cuadradoId]} />
                      )}
                    </DroppableCuadrado>
                  )
                )}
              </div>
            </div>
            <div className="sub-sub-section2">
              <img
                src="/personajeEjemplo.png"
                alt="Personaje Ejemplo"
                style={{ width: "190px", marginTop: "0px" }}
              />
            </div>
            <div className="sub-sub-section3">
              <div className="containerC">
                {["cuadrado4", "cuadrado5", "cuadrado6"].map(
                  (cuadradoId, index) => (
                    <DroppableCuadrado
                      key={cuadradoId}
                      id={cuadradoId}
                      extraClasses={index % 2 === 0 ? "mvl" : ""}
                    >
                      {items[cuadradoId] && (
                        <DraggableItem id={items[cuadradoId]} />
                      )}
                    </DroppableCuadrado>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="section3">
          <h1>INVENTARIO</h1>
          <div className="inventario">
            {Array.from({ length: 12 }, (_, index) => (
              <DraggableItem key={index} id={`draggable-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

// Droppable component that utilizes the useDroppable hook
const DroppableCuadrado: React.FC<DroppableCuadradoProps> = ({
  id,
  extraClasses = "",
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`cuadrado ${extraClasses} ${isOver ? "over" : ""}`}
    >
      {children}
    </div>
  );
};

// Draggable component that utilizes the useDraggable hook
const DraggableItem: React.FC<DraggableItemProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      className="draggable"
      style={style}
      {...listeners}
      {...attributes}
    >
      {/* Content for draggable item can be added here */}
      {id}
    </div>
  );
};

export default Inventario;
