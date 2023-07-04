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
    tableContainer.innerHTML= '';
  
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
      const degreeCell = createDegreeCell(student.degree, 'student-degree');
  
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

  function createDegreeCell(content, id) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = id;
  
    const degreeContainer = document.createElement('div');
    degreeContainer.classList.add('degree-container');
  
    const text = document.createElement('span');
    text.textContent = content;
  
    // Create the edit image element
    const editImg = document.createElement('img');
    editImg.src = './images/edit 1.png';
    editImg.alt = 'Edit';
    editImg.classList.add('edit-icon');
  
    // Event listener for edit image
    editImg.addEventListener('click', function() {
      // Find the corresponding cell and call the editCell function
      const degreeCell = editImg.closest('.cell');
      editCell(degreeCell);
    });
  
    // Create the delete image element
    const deleteImg = document.createElement('img');
    deleteImg.src = './images/trash-2 1.png';
    deleteImg.alt = 'Delete';
    deleteImg.classList.add('delete-icon');
  
    // Event listener for delete image
    deleteImg.addEventListener('click', function() {
      // Find the corresponding cell and call the deleteCell function
      const degreeCell = deleteImg.closest('.cell');
      deleteCell(degreeCell);
    });
  
    degreeContainer.appendChild(text);
    degreeContainer.appendChild(editImg);
    degreeContainer.appendChild(deleteImg);
    
  
    cell.appendChild(degreeContainer);
  
    return cell;
  }
  
 function editCell(student) {
  // Replace the form data with the previous values from the student array
  document.getElementById('name').value = student.name;
  document.getElementById('age').value = student.age;
  document.getElementById('gpa').value = student.grade;
  document.getElementById('degree').value = student.degree;
  document.getElementById('email').value = student.email;

  const submitButton = document.getElementById('btn');
  submitButton.textContent = 'Edit Student';
  submitButton.removeEventListener('click', addStudent);
  submitButton.addEventListener('click', () => {
    updateStudent(student);
  });
}
  
  function deleteCell(cell) {
    // Find the row element containing the cell
    const row = cell.parentElement.parentElement;

    // Check if the row is deleted.
    if (row.deleted) {
      // Remove the row from the table's data.
      table.deleteRow(row.rowIndex);
    } else {
      // Remove the row element from the table
      row.remove();
  
      // Get the index of the row to be deleted
      const rowIndex = row.rowIndex - 1;
  
      // Remove the corresponding student from the students array
      students.splice(rowIndex, 1);
  
      // Update the table display
      displayTable();
    }
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
    
  }



// Function to update a student
function updateStudent(student) {
  if (studentIndex !== -1) {
    students[studentIndex] = student;
    displayTable();
  }
}
 
  

  // Function to handle search input
  function handleSearchInput(event) {
    const searchValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('.row:not(.row-header)');
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll('.cell');
      let isRowVisible = false;
  
      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(searchValue)) {
          isRowVisible = true;
        }
      });
  
      if (isRowVisible) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }
  
  document.getElementById('btn').addEventListener('click', addStudent);
  document.getElementById('search-box').addEventListener('input', handleSearchInput);
 
  displayTable();
  