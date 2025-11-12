// Load jobs from localStorage
function loadJobs() {
    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobs;
}

// Save jobs to localStorage
function saveJobs(jobs) {
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Handle job creation
const form = document.getElementById("jobForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let job = {
            name: document.getElementById("jobName").value,
            burst: document.getElementById("burstTime").value,
            priority: document.getElementById("priority").value,
            status: "Pending"
        };

        let jobs = loadJobs();
        jobs.push(job);
        saveJobs(jobs);

        alert("Job added!");
        window.location.href = "jobs.html";
    });
}

// Show jobs in jobs.html
let table = document.getElementById("jobsTable");
if (table) {
    let jobs = loadJobs();

    jobs.forEach(job => {
        let row = `<tr>
            <td>${job.name}</td>
            <td>${job.burst}</td>
            <td>${job.priority}</td>
            <td>${job.status}</td>
        </tr>`;
        table.innerHTML += row;
    });
}
