import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  LabelList
} from 'recharts'

const PassStatsChart = ({ stats }) => {
  const total = stats.overallLearners || 1

  const data = [
    {
      name: 'Overall Learners',
      value: stats.overallLearners,
      percent: 100,
      color: '#7cc4ff'
    },
    {
      name: 'Assessment taken',
      value: stats.assessmentTaken,
      percent: Math.round((stats.assessmentTaken / total) * 100),
      color: '#35c9de'
    },
    {
      name: 'Passed',
      value: stats.passed,
      percent: Math.round((stats.passed / total) * 100),
      color: '#22c55e'
    },
    {
      name: 'Failed',
      value: stats.failed,
      percent: Math.round((stats.failed / total) * 100),
      color: '#ff8a8a'
    }
  ]

  return (
    <div className="card">
      <div className="card-title">
        <span className="drag-icon">⋮⋮</span>
        Pass Percentage
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 80, right: 30, top: 10, bottom: 30 }}
        >
          <CartesianGrid horizontal={false} stroke="var(--border-color)" />

          {/* X Axis */}
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fill: 'var(--muted-text)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Performance',
              position: 'bottom',
              fill: 'var(--muted-text)',
              fontSize: 12
            }}
          />

          {/* Y Axis – numeric values */}
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            width={80}
            tick={({ payload, y }) => {
              const item = data.find(d => d.name === payload.value)
              return (
                <g transform={`translate(0,${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={4}
                    textAnchor="end"
                    fill="var(--text-color)"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {item.value.toLocaleString()}
                  </text>
                </g>
              )
            }}
            label={{
              value: 'Pass Percentage',
              angle: -90,
              position: 'insideLeft',
              fill: 'var(--muted-text)',
              fontSize: 12
            }}
          />

          <Bar
            dataKey="percent"
            radius={[0, 6, 6, 0]}
            maxBarSize={22}
          >
            {/* Text inside bars */}
            <LabelList
              dataKey="name"
              position="insideLeft"
              style={{
                fill: '#0f172a',
                fontSize: 12,
                fontWeight: 500
              }}
            />

            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PassStatsChart
