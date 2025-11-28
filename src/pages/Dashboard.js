import Overview from '../components/Overview'
import StudyStatistics from '../components/StudyStatistics'
import Progress from '../components/Progress'
import MyCourses from '../components/MyCourses'
import LiveEvents from '../components/LiveEvents'
import Activity from '../components/Activity'

function DashboardContent() {
    return (
        <div className="dashboard-content">
            <h2 className="mb-4">Dashboard</h2>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="row g-4">
                        <div className="col-12">
                            <Overview />
                        </div>

                        <div className="col-lg-7">
                            <StudyStatistics />
                        </div>
                        <div className="col-lg-5">
                            <Progress />
                        </div>

                        {/* My Courses qismi */}
                        <div className="col-12">
                            <MyCourses />
                        </div>
                    </div>
                </div>

                {/* O'ng ustun (4/12 qism) */}
                <div className="col-lg-4">
                    <div className="row g-4">
                        <div className="col-12">
                            <LiveEvents />
                        </div>
                        <div className="col-12">
                            <Activity />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent
