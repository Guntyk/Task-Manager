import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useState } from 'react';
import styles from 'pages/Dashboard/Panels/WeeklyProgress/WeeklyProgress.scss';
import { statuses } from 'constants/statuses';

export const WeeklyProgress = ({ tasks }) => {
  const [opacity, setOpacity] = useState({
    Created: 1,
    Completed: 1,
  });
  const curr = new Date(); // get current date
  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  const last = first + 6; // last day is the first day + 6

  const firstDay = new Date(curr.setDate(first)).toISOString().slice(0, 10); // Get first day in YYYY-MM-DD format
  const lastDay = new Date(curr.setDate(last)).toISOString().slice(0, 10); // Get last day in YYYY-MM-DD format

  const weekTasks = tasks.filter(({ creationDate }) => {
    const date = new Date(creationDate).toISOString().slice(0, 10);
    return date >= firstDay && date <= lastDay;
  });

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const tasksData = daysOfWeek.map((day, index) => {
    const dayDate = new Date(curr.setDate(first + index)).toISOString().slice(0, 10);
    const createdTasks = weekTasks.filter(
      ({ creationDate }) => new Date(creationDate).toISOString().slice(0, 10) === dayDate
    );
    const completedTasks = createdTasks.filter(({ status }) => status === 'COMPLETED').length; // Assuming each task has a 'completed' field

    return {
      day,
      Created: createdTasks.length,
      Completed: completedTasks,
    };
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;

    setOpacity((op) => ({ ...op, [dataKey]: 1 }));
  };

  console.log(tasksData);

  return (
    <div className={styles.panel}>
      <span className={styles.title}>Weekly progress</span>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={tasksData}>
          <CartesianGrid stroke='#dddfe1' strokeDasharray='5 5' />
          <XAxis dataKey='day' tickSize={0} tick={<CustomizedTick />} />
          <Tooltip content={<CustomTooltip />} />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Bar
            opacity={opacity.Created}
            dataKey='Created'
            fill={statuses.find(({ key }) => key === 'TODO').color}
            legendType='circle'
          />
          <Bar
            opacity={opacity.Completed}
            dataKey='Completed'
            fill={statuses.find(({ key }) => key === 'COMPLETED').color}
            legendType='circle'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <span>{label}</span>
        <span>Created: {payload[0].value}</span>
        <span>Completed: {payload[1].value}</span>
      </div>
    );
  }
};

const CustomizedTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text className={styles.titleS} x={0} y={0} dy={15} dx={5} textAnchor='end' fill='#666'>
        {payload.value}
      </text>
    </g>
  );
};
