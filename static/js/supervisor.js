function fetchProjects() {
    fetch('http://127.0.0.1:5000/projects')
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("projectContainer");
            container.innerHTML = "";
            data.forEach(project => {
                let div = document.createElement("div");
                div.classList.add("project-card");
                div.innerHTML = `<h3>${project.name}</h3>
                                <p>Year: ${project.year}</p>
                                <p>Semester: ${project.sem}</p>
                                <p>Dept: ${project.dept}</p>
                                <p>Status: ${project.status}</p>
                                <button onclick="deleteProject(${project.id})">Remove</button>`;
                container.appendChild(div);
            });
        });
}

function addProject() {
    let name = document.getElementById("projectName").value;
    let year = document.getElementById("year").value;
    let sem = document.getElementById("semester").value;
    let dept = document.getElementById("department").value;

    fetch('http://127.0.0.1:5000/add_project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, year, sem, dept })
    }).then(response => response.json())
      .then(() => { hidePopup(); fetchProjects(); });
}

function deleteProject(id) {
    fetch(http://127.0.0.1:5000/remove_project/${id}, { method: 'DELETE' })
        .then(() => fetchProjects());
}

function showPopup() { document.getElementById("popup").style.display = "flex"; }
function hidePopup() { document.getElementById("popup").style.display = "none"; }