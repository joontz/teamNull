// App.js
import '../App.css';
import students from '../images/students.jpg';
import Header from "../components/header"
import Footer from "../components/footer"
import JobPosting from '../components/jobposting';

export default function App() {
  

  return (
    <div className="container">
      <Header />
        
        <img src={students} alt="Your Image Alt Text" className='landing-img' />
        
        <div className='landing-txt-container'>
          <div className='landing-header-txt'> Applying to be a GTA Tutor has never been easier. </div>
          <div className='landing-header-txt'> Apply for one of the many courses listed below! </div>
        </div>

      <div className='postings-container'>
      <JobPosting />
      </div>
      <Footer/>
      <div style={{ paddingBottom: '60px' }}></div>
    </div>
    
  );
}
