import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 10,
          fontSize: 12
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey} style={{ color: p.fill }}>
            {p.name}: {p.value}%
          </div>
        ))}
      </div>
    )
  }
  return null
}

const CourseProgressChart = ({ data }) => {
  return (
    <div className="card">
      <div className="card-title">
        <span className="drag-icon">⋮⋮</span>
        Course progress rate
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          barCategoryGap="10%"
          barGap={1}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--border-color)"
            strokeDasharray="3 3"
          />

         <XAxis
          dataKey="district"
          interval={0}               // 👈 FORCE ALL LABELS
          angle={-30}                // 👈 PREVENT OVERLAP
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12, fill: 'var(--muted-text)' }}
          axisLine={false}
          tickLine={false}
        />


          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: 'var(--muted-text)' }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Course Progress %',
              angle: -90,
              position: 'insideLeft',
              fill: 'var(--muted-text)',
              fontSize: 12
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingBottom: 8 }}
          />

          <Bar
            dataKey="below"
            name="Below"
            fill="#f87171"
            barSize={28}
            radius={[1, 1, 0, 0]}
          />
          
          <Bar
            dataKey="average"
            name="Average"
            fill="#34d399"
            barSize={28}
            radius={[1, 1, 0, 0]}
          />
          
          <Bar
            dataKey="good"
            name="Good"
            fill="#60a5fa"
            barSize={28}
            radius={[1, 1, 0, 0]}
          
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CourseProgressChart
