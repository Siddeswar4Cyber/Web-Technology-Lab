import StudentCard from './StudentCard';
import './App.css';

const App = () => {
  const students = [
    { name: 'John', department: 'CS', marks: 92 },
    { name: 'Jane', department: 'EE', marks: 78 },
    { name: 'Mike', department: 'ME', marks: 85 }
  ];

  return (
    <div className="app">
      <h1 style={{ textAlign: 'center', color: '#333'}}>Students-Dashboard</h1>
      {students.map((student) => (
        <StudentCard key={student.name} student={student} />
      ))}
    </div>
  );
};

export default App;