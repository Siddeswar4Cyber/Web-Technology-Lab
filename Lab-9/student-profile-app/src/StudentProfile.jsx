import React from 'react';

const StudentProfile = () => {
  // Student details stored as JavaScript variables
  const student = {
    name: "John Doe",
    department: "Computer Science",
    year: 3,
    section: "A"
  };

  return (
    <div className="student-profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Student Profile</h1>
        
        <div className="profile-details">
          <div className="detail-item">
            <strong>Name:</strong> 
            <span className="detail-value">{student.name}</span>
          </div>
          
          <div className="detail-item">
            <strong>Department:</strong> 
            <span className="detail-value">{student.department}</span>
          </div>
          
          <div className="detail-item">
            <strong>Year:</strong> 
            <span className="detail-value">{student.year}</span>
          </div>
          
          <div className="detail-item">
            <strong>Section:</strong> 
            <span className="detail-value">{student.section}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;