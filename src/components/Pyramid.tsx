import { useMemo } from 'react';
import * as THREE from 'three';

interface PyramidProps {
  primitive: {
    position: [number, number, number];
    dimensions: [number, number, number];
    color?: string | string[]; // Опциональный цвет
  };
  isSelected: boolean;
  onClick: () => void;
}

export function Pyramid({ primitive, isSelected, onClick }: PyramidProps) {
  const { position, dimensions, color } = primitive;
  const [width, height, depth] = dimensions;

  const { geometry } = useMemo(() => {
    // Создаем геометрию пирамиды (конус с 4 гранями)
    const geom = new THREE.ConeGeometry(width/2, height, 4);
    
    // Корректируем ориентацию и позицию
    geom.rotateY(Math.PI / 4);
    geom.translate(0, height/2, 0);

    // Генерируем цвета для граней
    const colors = [];
    const faceCount = 5; // 4 боковые грани + 1 основание
    
    // Если цвет не передан, генерируем случайные
    const faceColors = color 
      ? (Array.isArray(color) 
          ? color.map(c => new THREE.Color(c))
          : Array(faceCount).fill(new THREE.Color(color)))
      : Array(faceCount).fill(null).map(() => getRandomColor());

    // Назначаем цвета вершинам
    // Боковые грани (4 грани по 3 вершины)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        colors.push(faceColors[i].r, faceColors[i].g, faceColors[i].b);
      }
    }
    
    // Основание (6 вершин - 2 треугольника)
    for (let i = 0; i < 6; i++) {
      colors.push(faceColors[4].r, faceColors[4].g, faceColors[4].b);
    }

    const colorAttr = new THREE.Float32BufferAttribute(colors, 3);
    geom.setAttribute('color', colorAttr);

    return { geometry: geom, colorAttribute: colorAttr };
  }, [width, height, depth, color]);

  return (
    <mesh
      position={position}
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      castShadow
    >
      <meshStandardMaterial 
        vertexColors={true}
        metalness={0.1}
        roughness={0.5}
        side={THREE.DoubleSide}
        emissive={isSelected ? 'yellow' : 'black'}
        emissiveIntensity={isSelected ? 0.5 : 0}
      />
    </mesh>
  );
}

// Функция генерации приятных случайных цветов
function getRandomColor(): THREE.Color {
  return new THREE.Color().setHSL(
    Math.random(), // Оттенок
    0.7 + Math.random() * 0.3, // Насыщенность (0.7-1)
    0.5 + Math.random() * 0.2 // Светлота (0.5-0.7)
  );
}