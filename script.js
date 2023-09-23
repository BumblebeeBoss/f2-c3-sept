
document.addEventListener("DOMContentLoaded", function () {
//   let studentData = []; // Initialize an empty array to store student data

//   // Fetch the student data from the provided URL
//   fetch(
//     "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       studentData = data; // Store the student data in the array
//       displayStudents(studentData); // Display all students by default
//     })
//     .catch((error) => console.error("Error fetching data:", error));
   




  let studentData = [];
  async function fetchdata() {
    const response = await fetch(
         "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
         )
    const data = await response.json();
    studentData = data;
    displaystudentsdata(studentData);
  }
  fetchdata();
  // Function to display student data
  function displaystudentsdata(students) {
    const tableBody = document.getElementById("student-data");
    tableBody.innerHTML = ""; // Clear existing data

    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? "Passing" : "Failed"}</td>
                <td>${student.email}</td>
            `;
      tableBody.appendChild(row);
    });
  }

  // Sorting functionality
  function sortStudentsByFullName(order) {
    studentData.sort((a, b) => {
      const fullNameA = `${a.first_name} ${a.last_name}`;
      const fullNameB = `${b.first_name} ${b.last_name}`;
      return order === "asc"
        ? fullNameA.localeCompare(fullNameB)
        : fullNameB.localeCompare(fullNameA);
    });
    displaystudentsdata(studentData);
  }

  function sortStudentsByMarks() {
    // studentData.sort((a, b) => a.marks - b.marks);
    // displayStudents(studentData);

    const sortbymarksstudent = studentData.sort((a, b) => a.marks - b.marks);
    displaystudentsdata(sortbymarksstudent);
  }

  function sortStudentsByPassing() {
    const passingStudents = studentData.filter((student) => student.passing);
    displaystudentsdata(passingStudents);
  }

  function sortStudentsByClass() {
    // studentData.sort((a, b) => a.class - b.class);
    // displayStudents(studentData);

    const sortbyclassstudents = studentData.sort((a, b) => a.class - b.class);
    displaystudentsdata(sortbyclassstudents);
  }

  function sortStudentsByGender() {
    // Separate male and female students
    const maleStudents = studentData.filter(
      (student) => student.gender.toLowerCase() === "male"
    );
    const femaleStudents = studentData.filter(
      (student) => student.gender.toLowerCase() === "female"
    );

    // Display both tables (male and female) one below the other
    const combinedStudents = [...maleStudents, ...femaleStudents];
    displaystudentsdata(combinedStudents);
  }

  // Event listeners for sorting buttons
  document.getElementById("btn-1").addEventListener("click", () => sortStudentsByFullName("asc"));
  document.getElementById("btn-2").addEventListener("click", () => sortStudentsByFullName("desc"));
  document.getElementById("btn-3").addEventListener("click", sortStudentsByMarks);
  document.getElementById("btn-4").addEventListener("click", sortStudentsByPassing);
  document.getElementById("btn-5").addEventListener("click", sortStudentsByClass);
  document.getElementById("btn-6").addEventListener("click", sortStudentsByGender);

  // Search functionality
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("search-btn");
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = studentData.filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    displaystudentsdata(filteredStudents);
  });
});
