import  { useState } from 'react';
import './App.css';
import { Primitive } from './types';
import { Button, Container, CssBaseline, Paper, Typography } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { Box } from './components/Box';
import { Pyramid } from './components/Pyramid';
import { PrimitiveList } from './components/PrimitiveList';
import { AddPrimitiveDialog } from './components/AddPrimitiveDialog';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  const [primitives, setPrimitives] = useState<Primitive[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddPrimitives = (newPrimitives: Primitive[]) => {
    setPrimitives([...primitives, ...newPrimitives]);
  };

  const handleClear = () => {
    setPrimitives([]);
    setSelectedId(null);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Typography variant="h3" gutterBottom>3D visualization</Typography>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Paper style={{ width: '300px', padding: '20px' }}>
          <Button 
            variant="contained" 
            onClick={() => setOpenDialog(true)}
            fullWidth
            style={{ marginBottom: '20px' }}
          >
            Add Primitives
          </Button>
          <PrimitiveList 
            primitives={primitives} 
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <Button 
            variant="outlined" 
            onClick={handleClear}
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Clear All
          </Button>
        </Paper>

        <Paper style={{ flex: 1, height: '600px' }}>
        <Canvas camera={{ position: [10, 5, 10], fov: 50, near: 0.1, far: 1000 }}>
  <OrbitControls
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    minDistance={5}
    maxDistance={50}
    target={[0, 0, 0]} // Центр сцены
  />
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  {primitives.map((prim) => (
    <BoxOrPyramid 
      key={prim.id}
      primitive={prim}
      isSelected={prim.id === selectedId}
      onClick={() => setSelectedId(prim.id)}
    />
  ))}
</Canvas>
        </Paper>
      </div>

      <AddPrimitiveDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddPrimitives}
      />
    </Container>
  );
}

function BoxOrPyramid({ primitive, isSelected, onClick }: { 
  primitive: Primitive; 
  isSelected: boolean; 
  onClick: () => void 
}) {
  return primitive.type === 'box' ? (
    <Box primitive={primitive} isSelected={isSelected} onClick={onClick} />
  ) : (
    <Pyramid primitive={primitive} isSelected={isSelected} onClick={onClick} />
  );
}

