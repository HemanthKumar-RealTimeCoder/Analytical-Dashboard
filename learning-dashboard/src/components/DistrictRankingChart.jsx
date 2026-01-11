import { useTheme } from '../theme/ThemeProvider'

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

const DarkRankingCards = ({ data }) => {
  
  return (
    <div className="ranking-strip">
      {data.map(d => (
        <div key={d.district} className="ranking-card">
          <div className="ranking-district">{d.district}</div>
          <div className="ranking-rank">
            {d.rank}
            <span>Rank</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const DistrictRankingChart = ({ data }) => {
  const { theme } = useTheme()

  if (!Array.isArray(data)) return null

 return (
  <div className="card1">
    <div className="card-title">
      <span className="drag-icon">⋮⋮</span>
      District Ranking
    </div>

    {theme === 'dark' ? (
      <DarkRankingCards data={data} />
    ) : (
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          barGap={2}
          barCategoryGap={2}
          margin={{ left: 20, right: 40, bottom: 40 }}
        >
          <CartesianGrid
            stroke="var(--border-color)"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="district"
            tick={({ x, y, payload }) => {
              const rank =
                data.find(d => d.district === payload.value)?.rank

              return (
                <g transform={`translate(${x},${y + 10})`}>
                  <text
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--text-color)"
                  >
                    {payload.value}
                  </text>
                  <text
                    y={14}
                    textAnchor="middle"
                    fontSize={10}
                    fill="var(--muted-text)"
                  >
                    Rank - {rank}
                  </text>
                </g>
              )
            }}
          />

          <YAxis yAxisId="count" />
          <YAxis yAxisId="percent" orientation="right" domain={[0, 100]} />

          <Tooltip />
          <Legend />

          <Bar yAxisId="count" dataKey="male" fill="#7cc4ff" />
          <Bar yAxisId="count" dataKey="female" fill="#f472b6" />
          <Bar yAxisId="count" dataKey="others" fill="#c084fc" />
          <Bar yAxisId="percent" dataKey="passPercent" fill="#22c55e" />
          <Bar
            yAxisId="percent"
            dataKey="completionPercent"
            fill="#fdba74"
          />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
)
}

export default DistrictRankingChart
