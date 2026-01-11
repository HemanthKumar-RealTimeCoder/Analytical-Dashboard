import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  value,
  name,
  fill
}) => {

  const RADIAN = Math.PI / 180
  const radius = outerRadius + 14
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      {/* Dot marker */}
      <circle cx={x} cy={y} r={5} fill={fill} />

      {/* Percentage */}
      <text
        x={x}
        y={y - 10}
        textAnchor={x > cx ? 'start' : 'end'}
        fill="var(--text-color)"
        fontSize={12}
        fontWeight={600}
      >
        {value}%

      </text>

      {/* Label text */}
      <text
        x={x}
        y={y + 6}
        textAnchor={x > cx ? 'start' : 'end'}
        fill="var(--muted-text)"
        fontSize={11}
      >
        {name}
      </text>
    </g>
  )
}

const AssessmentDonut = ({ data }) => {
 const completed = Number(data.completedPercent) || 0
const notCompleted = Number(data.notCompletedPercent) || 0

// const total = completed + notCompleted || 1

const chartData = [
  {
    name: 'Assessment completed',
    value: completed,
    color: '#60a5fa'
  },
  {
    name: 'Assessment not completed',
    value: notCompleted,
    color: '#fdba74'
  }
]


  return (
    <div className="card">
      <div className="card-title">
        <span className="drag-icon">⋮⋮</span>
        Average assessment score
      </div>

      <ResponsiveContainer width="100%" height={260}>
       <PieChart key={`${completed}-${notCompleted}`}>
          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={-270}
            labelLine={false}
            label={renderCustomLabel}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          {/* Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={14}
            fill="var(--text-color)"
            fontWeight={600}
          >
            All Districts
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AssessmentDonut
