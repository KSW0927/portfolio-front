import { wbsSchedule } from "./wbsData";

export default function Wbs() {
    return (
        <>
            <header className="guide-content-header">
                <h2 className="guide-h2">컴포넌트 - WBS</h2>
            </header>
            <div className="guide-content-body worklist-page-body">
                <div className="wbs-area">
                    <table className="wbs-table">
                        <colgroup>
                            <col className="col-dep" />
                            <col className="col-task-name" />
                            <col className="col-assignee" />
                            {wbsSchedule.headers.flatMap(h => h.weeks).map((_, i) => (
                                <col key={i} className="col-week" />
                            ))}
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="guide-th" rowSpan={2}>Dep</th>
                                <th rowSpan={2} className="th task-name-header">작업명</th>
                                <th className="guide-th" rowSpan={2}>담당자</th>
                                {wbsSchedule.headers.map(header => (
                                    <th className="guide-th" key={header.month} colSpan={header.weeks.length}>{header.month}</th>
                                ))}
                            </tr>
                            <tr>
                                {wbsSchedule.headers.flatMap(header => header.weeks).map((week, index) => (
                                    <th className="guide-th" key={`${week}-${index}`}>{week}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {wbsSchedule.tasks.map((task, index) => (
                                <tr key={index} className={`depth-${task.depth}`}>
                                    <td className="guide-td">{task.depth}</td>
                                    <td className={`td task-name depth-${task.depth}`}>{task.name}</td>
                                    <td className="guide-td">{task.assignee}</td>
                                    {task.schedule.map((isActive, weekIndex) => (
                                        <td key={weekIndex} className={`td ${isActive ? "schedule-cell active" : "schedule-cell"}`}></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    );
}