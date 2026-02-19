let students =[];

function loadStudent(){
    fetch('students.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            students = data;
            displayStudent();
        })
        .catch(error => {
            showMessage('There was a problem with the fetch operation:', "error");
   });
}

function displayStudent(){
    const table = document.getElementById('studentsTable');
    table.innerHTML = ``;

    if(students.length === 0){
        showMessage("No student records found.", "error");
        return;
    }

    students.forEach(student => {
        const row =`
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button class="edit-btn" onclick="updateStudent(${student.id})">Update</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += row;
    });

    showMessage("Student records loaded successfully.", "success");

}

function showMessage(message, type){
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.innerText = '';
        messageDiv.className = '';
    }, 3000);
}

function addStudent(){
    const id = document.getElementById('studentID').value;
    const name = document.getElementById('studentName').value;
    const course = document.getElementById('studentCourse').value;
    const marks = document.getElementById('studentMarks').value;
    if(!id || !name || !course || !marks){
        showMessage("Please fill in all fields.", "error");
        return;
    }

    if(marks < 0 || marks > 100){
        showMessage("Marks should be between 0 and 100.", "error");
        return;
    }

    const exitstingStudent = students.find(student => student.id === id);
    if(exitstingStudent){
        showMessage("Student with this ID already exists.", "error");
        return;
    }

    const newStudent = {
        id: id,
        name: name,
        course: course,
        marks: marks
    };
    students.push(newStudent);
    displayStudent();
    showMessage("Student added successfully.", "success");
}

function updateStudent(id){
    const student = students.find(student => student.id === id);
    if(!student){
        showMessage("Student not found.", "error");
        return;
    }
    const newCourse = prompt("Enter new course:", student.course);
    const newMarks = prompt("Enter new marks:", student.marks);
    if(newCourse){
        student.course = newCourse;
    }
    if(newMarks){
        if(newMarks < 0 || newMarks > 100){
            showMessage("Marks should be between 0 and 100.", "error");
            return;
        }
        student.marks = newMarks;
    }
    displayStudent();
    showMessage("Student updated successfully.", "success");
}

function deleteStudent(id){
    const index = students.findIndex(student => student.id === id);
    if(index === -1){
        showMessage("Student not found.", "error");
        return;
    }
    students.splice(index, 1);
    displayStudent();
    showMessage("Student deleted successfully.", "success");
}

addEventListener('DOMContentLoaded', loadStudent);