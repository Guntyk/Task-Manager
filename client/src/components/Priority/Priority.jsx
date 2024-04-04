import { priorityColors } from 'constants/priorityColors';
import 'components/Priority/Priority.css';

export const Priority = ({ number }) => (
  <span className='priority' style={{ background: priorityColors[number] }}>
    {number}
  </span>
);
