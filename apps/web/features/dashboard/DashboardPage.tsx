import { activityData, memoryItems, projectPulse } from "./data";
import styles from "./dashboard.module.css";

function getHeatColor(minutes: number): string {
  if (minutes >= 150) return "#4b90d0";
  if (minutes >= 100) return "#72acdf";
  if (minutes >= 60) return "#9fc7ea";
  if (minutes >= 30) return "#c3def3";
  return "#e2effb";
}

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.title}>Codbit Dashboard</h1>
            <p className={styles.subtitle}>Track coding rhythm, unfinished thoughts, and project energy.</p>
          </div>
          <span className={styles.pill}>Weekly Snapshot</span>
        </section>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Analytics View</h2>
            <div className={styles.heatmap}>
              {activityData.map((entry) => (
                <div
                  className={styles.heatCell}
                  key={entry.dateLabel}
                  style={{ background: getHeatColor(entry.minutes) }}
                >
                  <div className={styles.day}>{entry.dateLabel}</div>
                  <div className={styles.minutes}>{entry.minutes}m</div>
                </div>
              ))}
            </div>
            <p className={styles.legend}>Lighter blocks mean lower activity, deeper blues mean longer focus.</p>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Project Pulse</h2>
            <div className={styles.pulseList}>
              {projectPulse.map((project) => (
                <div className={styles.pulseItem} key={project.id}>
                  <div className={styles.pulseTitle}>{project.name}</div>
                  <div className={styles.pulseStats}>
                    {project.minutesThisWeek} mins this week - {project.sessions} sessions - {project.streakDays}
                    d streak
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Memory Board</h2>
          <div className={styles.filters}>
            <span className={styles.chip}>All</span>
            <span className={styles.chip}>Bug</span>
            <span className={styles.chip}>Feature</span>
            <span className={styles.chip}>Refactor</span>
            <span className={styles.chip}>This Week</span>
          </div>
          <div className={styles.list}>
            {memoryItems.map((item) => (
              <article className={styles.memoryItem} key={item.id}>
                <h3>{item.title}</h3>
                <p className={styles.memoryMeta}>
                  {item.project} - {item.tag} - {item.createdAt}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
