const students = [];
let nextStudentId = 1;  

// Function to create a table cell
function createCell(content) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.textContent = content;
  return cell;
}
 
  function displayTable() {
    const tableContainer = document.getElementById('table-container');
  
    // Clear the existing table
    tableContainer.textContent = '';
  
    // Create the table element
    const table = document.createElement('div');
    table.classList.add('table');
  
    // Create the header row
    const headerRow = document.createElement('div');
    headerRow.classList.add('row', 'row-header');
  
    const idHeaderCell = createCell('ID', 'id');
    const nameHeaderCell = createCell('Student Name', 'student-name');
    const emailHeaderCell = createCell('Email', 'student-email');
    const ageHeaderCell = createCell('Age', 'student-age');
    const gradeHeaderCell = createCell('GPA', 'student-gpa');
    const degreeHeaderCell = createCell('Degree', 'student-degree');
  
    headerRow.appendChild(idHeaderCell);
    headerRow.appendChild(nameHeaderCell);
    headerRow.appendChild(emailHeaderCell);
    headerRow.appendChild(ageHeaderCell);
    headerRow.appendChild(gradeHeaderCell);
    headerRow.appendChild(degreeHeaderCell);
  
    table.appendChild(headerRow);
  
    // Create rows for each student
    students.forEach((student) => {
      const row = document.createElement('div');
      row.classList.add('row');
  
      const idCell = createCell(student.ID, 'id');
      const nameCell = createCell(student.name, 'student-name');
      const emailCell = createCell(student.email, 'student-email');
      const ageCell = createCell(student.age, 'student-age');
      const gradeCell = createCell(student.grade, 'student-gpa');
      const degreeCell = createCell(student.degree, 'student-degree');
  
      row.appendChild(idCell);
      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(ageCell);
      row.appendChild(gradeCell);
      row.appendChild(degreeCell);
  
      table.appendChild(row);
    });
  
    // Append the table to the table container
    tableContainer.appendChild(table);
  }

  //create a new student details
  function addStudent(event) {
    event.preventDefault();
  
    const student = {
      ID: nextStudentId,
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      grade: document.getElementById('gpa').value,
      degree: document.getElementById('degree').value,
      email: document.getElementById('email').value,
    };
  
    students.push(student);
    nextStudentId++; // Increment the ID for the next student
    alert("Student details added Successfully")
    displayTable();
    document.getElementById('form').reset();
  }

  // Function to edit a student
function editStudent(student) {
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('gpa').value = student.grade;
  document.getElementById('degree').value = student.degree;
  document.getElementById('email').value = student.email;

  const submitButton = document.getElementById('submit-button');
  submitButton.textContent = 'Edit Student';
  submitButton.removeEventListener('click', addStudent);
  submitButton.addEventListener('click', () => updateStudent(student));
}

// Function to update a student
function updateStudent(student) {
  student.name = document.getElementById('name').value;
  student.age = document.getElementById('age').value;
  student.grade = document.getElementById('gpa').value;
  student.degree = document.getElementById('degree').value;
  student.email = document.getElementById('email').value;

  const submitButton = document.getElementById('submit-button');
  submitButton.textContent = 'Add Student';
  submitButton.removeEventListener('click', updateStudent);
  submitButton.addEventListener('click', addStudent);

  displayTable();

  // Reset the form
  document.getElementById('form').reset();
}
  
  // Function to delete a student
function deleteStudent(id) {
  const index = students.findIndex((student) => student.ID === id);
  if (index !== -1) {
    students.splice(index, 1);
    displayTable();
  }
}

  // Function to handle search input
function handleSearchInput(event) {
  const searchValue = event.target.value.toLowerCase();
  const filteredStudents = students.filter((student) => {
    const { name, email, degree } = student;
    return (
      name.toLowerCase().includes(searchValue) ||
      email.toLowerCase().includes(searchValue) ||
      degree.toLowerCase().includes(searchValue)
    );
  });
  displayTable(filteredStudents);
}
  
  document.getElementById('form').addEventListener('submit', addStudent);
  document.getElementById('search-box').addEventListener('input', handleSearchInput);
 
  displayTable();
  