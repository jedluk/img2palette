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
      ral.slice(4, 6).startsWith(group)
    )
    const middleIndex = Math.floor(groupColors.length / 2)
    return PALLETE[groupColors[middleIndex]][0]
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
          }}
        >
          {group}
        </div>
      ))}
    </div>
  )
}
