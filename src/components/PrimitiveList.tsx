
import { List, ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { Primitive } from '../types';

interface PrimitiveListProps {
  primitives: Primitive[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PrimitiveList({ primitives, selectedId, onSelect }: PrimitiveListProps) {
  return (
    <List dense sx={{ maxHeight: '500px', overflow: 'auto' }}>
      {primitives.map((prim) => (
        <ListItem key={prim.id} disablePadding>
          <ListItemButton 
            selected={prim.id === selectedId}
            onClick={() => onSelect(prim.id)}
          >
            <Avatar sx={{ 
              bgcolor: Array.isArray(prim.color) ? prim.color[0] : prim.color,
              width: 24, 
              height: 24,
              mr: 1
            }} />
            <ListItemText 
              primary={`${prim.type} (${prim.dimensions.join('x')})`}
              secondary={`Position: [${prim.position.map(n => n.toFixed(1)).join(', ')}]`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}