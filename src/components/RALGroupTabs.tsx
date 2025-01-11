import { useState } from 'react'
import styles from './RALGroupTabs.module.css'
import { PALLETE, RAL_GROUPS } from '../lib'

export function RALGroupTabs({
  onGroupToggle,
}: {
  onGroupToggle: (groups: string[]) => void
}) {
  const [selectedGroups, setSelectedGroups] = useState(RAL_GROUPS)

  const getGroupColor = (group: (typeof RAL_GROUPS)[number]) => {
    const groupColors = Object.keys(PALLETE).filter((ral) =>
      ral.startsWith(group.slice(0, 5))
    )
    return PALLETE[groupColors[groupColors.length - 1]][0]
  }

  const handleGroupClick = (group: (typeof RAL_GROUPS)[number]) => {
    const newSelectedGroups = selectedGroups.includes(group)
      ? selectedGroups.filter((g) => g !== group)
      : [...selectedGroups, group]
    setSelectedGroups(newSelectedGroups)
    onGroupToggle(newSelectedGroups)
  }

  return (
    <div className={styles.ralGroupTabs}>
      {RAL_GROUPS.map((group) => (
        <div
          key={group}
          className={`${styles.ralGroupTab} ${
            selectedGroups.includes(group) ? styles.selected : ''
          }`}
          onClick={() => handleGroupClick(group)}
          style={{
            backgroundColor: selectedGroups.includes(group)
              ? getGroupColor(group)
              : '#ccc',
            ...(selectedGroups.includes(group) && {
              boxShadow: `0 4px 8px 0 ${getGroupColor(group)}`,
            }),
          }}
        >
          {group}
        </div>
      ))}
    </div>
  )
}
