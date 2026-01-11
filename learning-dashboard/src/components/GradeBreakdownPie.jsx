import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

const COLORS = [
  '#7cc4ff', // A
  '#22c55e', // B
  '#fdba74', // C
  '#ff8a8a', // D
  '#e5e7eb'  // E
]

const renderLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  payload,
  fill
}) => {
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 14
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      {/* dot */}
      <circle cx={x} cy={y} r={5} fill={fill} />

      {/* percentage from API (NOT recharts percent) */}
      <text
        x={x + 8}
        y={y + 4}
        fill="var(--text-color)"
        fontSize={12}
        fontWeight={600}
      >
        {payload.percent}%
      </text>
    </g>
  )
}

const GradeBreakdownPie = ({ data }) => {
  return (
  <div className="card">
    <div className="card-title">
      <span className="drag-icon">⋮⋮</span>
      Learners Details Breakdown
    </div>

    <div className="grade-row">
      {/* PIE */}
      <ResponsiveContainer width={360} height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="percent"
            cx="50%"
            cy="50%"
            outerRadius={110}
            paddingAngle={1}
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.grade}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* LEGEND */}
      <div className="grade-legend">
        {data.map((item, index) => (
          <div className="legend-item" key={item.grade}>
            <span
              className="legend-color"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="legend-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

}

export default GradeBreakdownPie
