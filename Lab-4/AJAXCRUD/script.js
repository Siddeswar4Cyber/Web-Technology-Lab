const table = document.getElementById('student-table-body');
const form = document.getElementById('student-form');
const message = document.getElementById('message');

let student =[];
let editMode = false;

function showMessage(text, type){
    message.textContent = text;
    message.className = type;
    setTimeout(() => {
        message.textContent = '';
    }, 3000);
}

function simulateResponse(data,status){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(status >= 200 && status < 300){
                resolve({status, data});
            } else {
                reject({status,data});
            }
        }, 500);
    });
}

async function fetchStudents(){
    try{
        const stored = localStorage.getItem('students');

        if(stored){
            student = JSON.parse(stored);
        } else {
            const response = await fetch('students.json');

            if(!response.ok){
                throw new Error('Failed to fetch students');
            }

            student = await response.json();
            localStorage.setItem('students', JSON.stringify(student));
        }
        console.log(student);
        renderTable();
        showMessage('Students loaded successfully', 'success');
    }
    catch(error){
        showMessage(error.message, 'error');
    }
}

function renderTable(){
    table.innerHTML = '';

    student.forEach(student => {
        const row = `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.marks}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += row;
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const marks = document.getElementById('marks').value;

    const existing = student.find(s => s.id === parseInt(id));

    try{
        if(editMode){
            if(!existing){
                throw {
                    status: 404,
                    data: 'Student not found'
                };
            }

            existing.name = name;
            existing.department = department;
            existing.marks = marks;

            await simulateResponse("Student updated successfully", 200);
            showMessage("Student updated successfully", "success");
            editMode = false;
        }
        else{
            if(existing){
                throw {
                    status: 500,
                    data: 'Student with this ID already exists'
                };
            }
            student.push({
                id: parseInt(id),
                name: name,
                department: department,
                marks: marks
            });
            await simulateResponse("Student added successfully", 200);
            showMessage("Student added successfully", "success");
        }
        localStorage.setItem('students', JSON.stringify(student));
        renderTable();
        form.reset();
    }
    catch(error){
        if(error.status === 404){
            showMessage("404 - Student not found", 'error');
        }
        else{
            showMessage(error.data || "An error occurred", 'error');
        }
    }
});

function editStudent(id){
    const existing = student.find(s => s.id === id);

    if(existing){
        document.getElementById('id').value = existing.id;
        document.getElementById('name').value = existing.name;
        document.getElementById('department').value = existing.department;
        document.getElementById('marks').value = existing.marks;
        editMode = true;
    }
    else{
        showMessage("404 - Student not found", 'error');
    }
}

async function deleteStudent(id){
    const index = student.findIndex(s => s.id === id);

    try{
        if(index === -1){
            throw {
                status: 404,
                data: 'Student not found'
            };
        }
        student.splice(index, 1);

        await simulateResponse("Deleted successfully", 200);

        localStorage.setItem('students', JSON.stringify(student));
        renderTable();
        showMessage("Student deleted successfully", "success");
    }catch(error){
        if(error.status === 404){
            showMessage("404 - Student not found", 'error');
        }
        else{
            showMessage(error.data || "An error occurred", 'error');
        }
    }
}

function addOrUpdateStudent(){
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const marks = document.getElementById('marks').value;
    const index = student.findIndex(s => s.id === id);

    if(index !== -1){
        student[index] = {
            id: parseInt(id),
            name: name, 
            department: department,
            marks: marks
        };
    }
    else{
        student.push({
            id: parseInt(id),
            name: name, 
            department: department,
            marks: marks
        });
    }

}   

// console.log(JSON.parse(localStorage.getItem("students")));
// localStorage.removeItem("students");

fetchStudents();