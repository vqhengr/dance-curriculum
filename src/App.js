import './App.css';

function App() {
  const studentName = "John Doe"; // Replace with dynamic data if available
  const curriculum = [
    { dance: "Salsa", level: "Intermediate", progress: "75%" },
    { dance: "Bachata", level: "Beginner", progress: "50%" },
    { dance: "Hip Hop", level: "Advanced", progress: "90%" },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Dance Curriculum</h1>
        <h2>{studentName}'s Progress</h2>
      </header>
      <main>
        <div className="curriculum-container">
          {curriculum.map((course, index) => (
            <div key={index} className="curriculum-item">
              <h3>{course.dance}</h3>
              <p>Level: {course.level}</p>
              <p>Progress: {course.progress}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Dance Academy. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
