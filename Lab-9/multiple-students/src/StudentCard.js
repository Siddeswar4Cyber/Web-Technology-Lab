const StudentCard = (propes) => {
  return (
    <div className="card">
      <h3>{propes.student.name}</h3>
      <p>Department: {propes.student.department}</p>
      <p>Marks: {propes.student.marks}</p>
    </div>
  );
};

export default StudentCard;