
import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  FormControlLabel, 
  Switch 
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Primitive, AddPrimitiveParams } from '../types';

interface AddPrimitiveDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (primitives: Primitive[]) => void;
}

export function AddPrimitiveDialog({ open, onClose, onAdd }: AddPrimitiveDialogProps) {
  const [params, setParams] = useState<AddPrimitiveParams>({
    type: 'box',
    count: 1,
    width: 1,
    height: 1,
    depth: 1,
    coloredSides: false
  });

  const handleAdd = () => {
    const newPrimitives: Primitive[] = [];
    
    for (let i = 0; i < params.count; i++) {
      newPrimitives.push({
        id: uuidv4(),
        type: params.type,
        position: [
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        ],
        dimensions: [params.width, params.height, 1],
        color: params.coloredSides 
          ? Array(6).fill(0).map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`)
          : `#${Math.floor(Math.random()*16777215).toString(16)}`,
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ]
      });
    }
    
    onAdd(newPrimitives);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Primitives</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={params.type}
            onChange={(e) => setParams({...params, type: e.target.value as 'box' | 'pyramid'})}
          >
            <MenuItem value="box">Box</MenuItem>
            <MenuItem value="pyramid">Pyramid</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          margin="normal"
          fullWidth
          label="Count"
          type="number"
          value={params.count}
          onChange={(e) => setParams({...params, count: parseInt(e.target.value) || 1})}
        />
        
        <TextField
          margin="normal"
          fullWidth
          label="Width"
          type="number"
          value={params.width}
          onChange={(e) => setParams({...params, width: parseFloat(e.target.value) || 1})}
        />

        <FormControlLabel
          control={
            <Switch
              checked={params.coloredSides}
              onChange={(e) => setParams({...params, coloredSides: e.target.checked})}
            />
          }
          label="Different colors for each side"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
}