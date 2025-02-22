// Handle comment posting
function postComment() {
    let input = document.getElementById("commentInput").value;
    if (input.trim() === "") return;
    
    let li = document.createElement("li");
    li.textContent = input;
    document.getElementById("commentList").appendChild(li);
    
    document.getElementById("commentInput").value = "";
}

// Handle adding projects (for future backend integration)
function addProject() {
    alert("Add Project functionality will be implemented here.");
}

// Handle viewing projects
function viewProjects() {
    alert("Project listing functionality will be implemented.");
}