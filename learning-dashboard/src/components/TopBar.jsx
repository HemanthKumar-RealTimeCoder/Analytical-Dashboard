import { useTheme } from '../theme/ThemeProvider'

const districts = [
  'All District',
  'Ariyulur',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Karur',
  'Madurai'
]

const TopBar = ({
  year,
  period,
  setPeriod,
  selectedDistrict,
  setSelectedDistrict
}) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="topbar">
      {/* Left Section */}
      <div className="topbar-left">
        <div className="period-toggle">
          <button
            className={period === 'monthly' ? 'active' : ''}
            onClick={() => setPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={period === 'quarterly' ? 'active' : ''}
            onClick={() => setPeriod('quarterly')}
          >
            Quarterly
          </button>
        </div>

        <div className="date-range">
          01 Jan, {year}  - 31 Dec, {year}
        </div>
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  )
}

export default TopBar
