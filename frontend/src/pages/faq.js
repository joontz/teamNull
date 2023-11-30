// App.js
import '../App.css';
import Header from "../components/header"
import ApplicationInfo from '../components/application-info.component';



export default function Faq() {
  
  return (
    <div className='container'>
      <Header></Header>
        <ApplicationInfo></ApplicationInfo>
      <div style={{height: '20px'}}></div>
    </div>
  );
}
