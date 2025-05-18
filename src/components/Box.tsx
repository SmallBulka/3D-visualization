
import { useMemo } from 'react';
import { Primitive } from '../types';
import * as THREE from 'three';
interface BoxProps {
  primitive: Primitive;
  isSelected: boolean;
  onClick: () => void;
}



export function Box({ primitive, isSelected, onClick }: BoxProps) {
  const { position, dimensions, color } = primitive;
  const [width, height, depth] = dimensions;

  const { geometry } = useMemo(() => {
    const geom = new THREE.BoxGeometry(width, height, depth);
    
    // массив цветов
    const colors = [];
    const faceColors = Array.isArray(color) 
      ? color.map(c => new THREE.Color(c))
      : Array(6).fill(new THREE.Color(color));


    for (let i = 0; i < 6; i++) {

      for (let j = 0; j < 6; j++) {
        colors.push(faceColors[i].r, faceColors[i].g, faceColors[i].b);
      }
    }

    const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
    geom.setAttribute('color', colorAttribute);

    return { geometry: geom, colorAttribute };
  }, [width, height, depth, color]);

  return (
    <mesh
      position={position}
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <meshStandardMaterial 
        vertexColors={true}
        metalness={0.1}
        roughness={0.5}
        emissive={isSelected ? 'yellow' : 'black'}
        emissiveIntensity={isSelected ? 0.5 : 0}
      />
    </mesh>
  );
}