let xmlDOC = null;

function loadEmployees(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);

    xhr.onload = function(){
        if(xhr.status === 200){
            if(!xhr.responseXML){
                showMessage("Malformed XML file.","error");
                return;
            }
            xmlDOC = xhr.responseXML;
            displayEmployees();
        } else {
            showMessage("Failed to load XML file. Status: " + xhr.status,"error");
        }
    };

    xhr.onerror = function(){
        showMessage("An error occurred while loading the XML file.","error");
    }

    xhr.send();
}

function displayEmployees(){
    const table = document.getElementById("employeeTable");
    table.innerHTML ="";
    const employees = xmlDOC.getElementsByTagName("employee");

    if(employees.length === 0){
        showMessage("No employee data found in the XML file.","info");
        return;
    }

    for(let i=0; i<employees.length; i++){
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const department = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        const row =`
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${department}</td>
                <td>${salary}</td>
                <td>
                    <button class="edit-btn" onclick="updateEmployee(${id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${id})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    }
    showMessage("Employees loaded successfully.","success");
}

function addEmployee(){
    const id = document.getElementById("empID").value;
    const name = document.getElementById("empName").value;
    const department = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    if(!id || !name || !department || !salary){
        showMessage("Please fill in all fields to add an employee.","error");
        return;
    }

    const employees = xmlDOC.getElementsByTagName("employee");

    for(let i=0; i<employees.length; i++){
        if(employees[i].getElementsByTagName("id")[0].textContent === id){
            showMessage("Employee with this ID already exists.","error");
            return;
        }
    }

    const newEmployee = xmlDOC.createElement("employee");
    const idElement = xmlDOC.createElement("id");
    idElement.textContent = id;
    const nameElement = xmlDOC.createElement("name");
    nameElement.textContent = name;
    const deptElement = xmlDOC.createElement("department");
    deptElement.textContent = department;
    const salaryElement = xmlDOC.createElement("salary");
    salaryElement.textContent = salary;

    newEmployee.appendChild(idElement);
    newEmployee.appendChild(nameElement);
    newEmployee.appendChild(deptElement);
    newEmployee.appendChild(salaryElement);

    xmlDOC.documentElement.appendChild(newEmployee);
    displayEmployees();
    showMessage("Employee added successfully.","success");
}

function updateEmployee(id){
    const employees = xmlDOC.getElementsByTagName("employee");
    for(let i=0; i<employees.length; i++){
        if(employees[i].getElementsByTagName("id")[0].textContent === id.toString()){
            const name = prompt("Enter new name:", employees[i].getElementsByTagName("name")[0].textContent);
            const department = prompt("Enter new department:", employees[i].getElementsByTagName("department")[0].textContent);
            const salary = prompt("Enter new salary:", employees[i].getElementsByTagName("salary")[0].textContent);

            if(name) employees[i].getElementsByTagName("name")[0].textContent = name;
            if(department) employees[i].getElementsByTagName("department")[0].textContent = department;
            if(salary) employees[i].getElementsByTagName("salary")[0].textContent = salary;

            displayEmployees();
            showMessage("Employee updated successfully.","success");
            return;
        }
    }
    showMessage("Employee not found.","error");
}

function deleteEmployee(id){
    const employees = xmlDOC.getElementsByTagName("employee");
    for(let i=0; i<employees.length; i++){
        if(employees[i].getElementsByTagName("id")[0].textContent === id.toString()){
            xmlDOC.documentElement.removeChild(employees[i]);
            displayEmployees();
            showMessage("Employee deleted successfully.","success");
            return;
        }
    }
    showMessage("Employee not found.","error");
}

function showMessage(message, type){
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type;
    setTimeout(() => {
        messageDiv.textContent = "";
        messageDiv.className = "";
    }, 3000);
}

document.addEventListener("DOMContentLoaded", loadEmployees);