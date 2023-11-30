import '../App.css';
import Header from '../components/header';
import AddCourse from '../components/addCourse';
import ApplicationData from '../components/applicationData';
import ViewCourses from '../components/viewCourses';

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="dashboard-grid">
        <AddCourse />
        <div id="dash-item4">
          <ViewCourses />
        </div>
        <div id="dash-item5">
          <ApplicationData />
        </div>
      </div>
    </div>
  );
}
