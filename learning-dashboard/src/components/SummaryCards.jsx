const SummaryCards = ({ summary }) => {
  
  const items = [
    {
      label: 'Total Learner enrolled',
      value: summary.totalLearners.toLocaleString(),
      color: '#0f172a',
      icon: null
    },
    {
      label: 'Male',
      value: summary.male.toLocaleString(),
      color: '#38bdf8',
      icon: <img src="/src/images/male.png" alt="male" />
    },
    {
      label: 'Female',
      value: summary.female.toLocaleString(),
      color: '#f472b6',
      icon: <img src="/src/images/female.png" alt="female" />
    },
    {
      label: 'Others',
      value: summary.others.toLocaleString(),
      color: '#c084fc',
      icon: <img src="/src/images/others.png" alt="others" />
    },
    {
      label: 'Active Learners',
      value: summary.activeLearners.toLocaleString(),
      color: '#10b981',
      icon: null
    },
    {
      label: 'Engaged Learners',
      value: summary.engagedLearners.toLocaleString(),
      color: '#fb923c',
      icon: null
    }
  ]
  

  return (
    <div className="summary-bar">
      {items.map((item, index) => (
        <div className="summary-item" key={item.label}>
          <div className="summary-header">
            {item.icon && (
              <span className="summary-icon">{item.icon}</span>
            )}
            <span className="summary-label">{item.label}</span>
          </div>

          <div
            className="summary-value"
            style={{ color: item.color }}
          >
            {item.value}
          </div>

          {index !== items.length - 1 && (
            <div
              className="summary-divider"
              style={{ backgroundColor: item.color }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
