import { useEffect, useState } from 'react'
import { fetchDashboardData } from './api/dashboard'
import SummaryCards from './components/SummaryCards'
import TopBar from './components/TopBar'
import CourseProgressChart from './components/CourseProgressChart'
import PassStatsChart from './components/PassStatsChart'
import AssessmentDonut from './components/AssessmentDonut'
import GradeBreakdownPie from './components/GradeBreakdownPie'
import DistrictRankingChart from './components/DistrictRankingChart'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [year, setYear] = useState(2024)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('monthly')
  const [selectedDistrict, setSelectedDistrict] = useState('All District')
  const [theme, setTheme] = useState('light')


  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const data = await fetchDashboardData(year)
      setDashboardData(data)
      setLoading(false)
    }

    loadData()
  }, [year])

  if (loading) {
    return <div style={{ padding: 20 }}>Loading dashboard...</div>
  }

  if (!dashboardData) {
    return <div style={{ padding: 20 }}>Failed to load data</div>
  }
// ===============================
// FILTER DASHBOARD DATA BY DISTRICT
// ===============================
const filteredDashboardData =
  selectedDistrict === 'All District'
    ? dashboardData
    : (() => {
        const districtRows = dashboardData.courseProgress.filter(
          d => d.district === selectedDistrict
        )

        // derive summary safely
        const derivedSummary = {
          totalLearners: districtRows.reduce((s, d) => s + d.totalLearners, 0),
          male: districtRows.reduce((s, d) => s + d.male, 0),
          female: districtRows.reduce((s, d) => s + d.female, 0),
          others: districtRows.reduce((s, d) => s + d.others, 0),
          activeLearners: districtRows.reduce((s, d) => s + d.activeLearners, 0),
          engagedLearners: districtRows.reduce((s, d) => s + d.engagedLearners, 0)
        }

        return {
          ...dashboardData,
          summary: derivedSummary,
          courseProgress: districtRows,
          passStats: dashboardData.passStats,
          gradeBreakdown: dashboardData.gradeBreakdown,
          assessmentCompletion: dashboardData.assessmentCompletion
        }
      })()



//  CORRECT DISTRICT ARRAY (FROM REAL API)
const districtChartData = dashboardData.districtRanking.districts.map(d => {
  const totalUsers = d.male + d.female + d.others

  return {
    ...d,
    passPercent: totalUsers
      ? Math.round((d.passed / totalUsers) * 100)
      : 0,
    completionPercent: totalUsers
      ? Math.round((d.assessmentCompleted / totalUsers) * 100)
      : 0
  }
})



 return (
  <div className={`dashboard-page ${theme}`}>

    <h3 className="dashboard-title">Dashboard</h3>

    {/* Top controls */}
    <div className="dashboard-topbar">
      <TopBar
        year={year}
        period={period}
        setPeriod={setPeriod}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
      />
      {/* <button
  className="theme-toggle"
  onClick={() =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }
>
  🌙
</button> */}


      <div className="year-switch">
        <section><button onClick={() => setYear(2024)}>2024</button>
        <button id="bt2"onClick={() => setYear(2025)}>2025</button></section>
      </div>
    </div>

    {/* Summary cards */}
    <div className="dashboard-row">
      <SummaryCards summary={dashboardData.summary} />
      {/* <SummaryCards summary={filteredDashboardData.summary} /> */}

    </div>

    {/* Row 2 */}
    <div className="dashboard-grid-2">
      
        <CourseProgressChart data={filteredDashboardData.courseProgress} />
     

      
        <PassStatsChart stats={filteredDashboardData.passStats} />
      
    </div>

    {/* Row 3 */}
    <div className="dashboard-grid-2">
     
        <AssessmentDonut data={filteredDashboardData.assessmentCompletion} />
      

      
        <GradeBreakdownPie data={filteredDashboardData.gradeBreakdown} />
     
    </div>

    {/* Row 4 */}
    <div className="dashboard-row">
      <DistrictRankingChart data={districtChartData} />
    </div>
     {/* <pre style={{ marginTop: 20 }}>
        {JSON.stringify(dashboardData.summary, null, 2)}
      </pre> */}
  </div>
)
}

export default App
