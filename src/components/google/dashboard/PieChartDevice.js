import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Desktop", value: 420 },
  { name: "Mobile", value: 980 },
  { name: "Tablet", value: 95 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function PieChartDevice() {
  return (
    <div  style={{
    width: "100%",
    height: 350,
    background: "#fff",
    padding: 16,
  }}>
     

      <ResponsiveContainer style={{width:'100%',height:'100%'}} width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={55}
            paddingAngle={3}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}