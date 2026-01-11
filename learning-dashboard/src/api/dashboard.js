
export const fetchDashboardData = async (year = 2024) => {
  try {
    const response = await fetch(
      year === 2024
        ? '/src/data/dashboard_2024.json'
        : '/src/data/dashboard_2025.json'
    )

    if (!response.ok) {
      throw new Error('Failed to load dashboard data')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return null
  }
}
