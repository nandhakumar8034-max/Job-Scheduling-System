// Handle Create Job
const form = document.getElementById("jobForm");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("jobName").value;
        const burst = document.getElementById("burstTime").value;
        const priority = document.getElementById("priority").value;

        let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

        jobs.push({
            name,
            burst,
            priority,
            status: "Pending",
            created: new Date().toLocaleString()
        });

        localStorage.setItem("jobs", JSON.stringify(jobs));

        alert("Job Added Successfully!");
        window.location.href = "jobs.html";
    });
}


// Load Jobs on jobs.html
const jobsTable = document.getElementById("jobsTable");

if (jobsTable) {
    loadJobs();
}

function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    jobsTable.innerHTML = "";

    jobs.forEach((job, index) => {
        jobsTable.innerHTML += `
            <tr>
                <td>${job.name}</td>
                <td>${job.burst}</td>
                <td>${job.priority}</td>
                <td>${job.status}</td>
                <td>
                    <button onclick="startJob(${index})">Start</button>
                    <button onclick="completeJob(${index})">Complete</button>
                    <button onclick="deleteJob(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function startJob(i) {
    let jobs = JSON.parse(localStorage.getItem("jobs"));
    jobs[i].status = "Running";
    localStorage.setItem("jobs", JSON.stringify(jobs));
    loadJobs();
}

function completeJob(i) {
    let jobs = JSON.parse(localStorage.getItem("jobs"));
    jobs[i].status = "Completed";
    localStorage.setItem("jobs", JSON.stringify(jobs));
    loadJobs();
}

function deleteJob(i) {
    let jobs = JSON.parse(localStorage.getItem("jobs"));
    jobs.splice(i, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    loadJobs();
}


// DASHBOARD
const totalJobs = document.getElementById("totalJobs");
const completedJobs = document.getElementById("completedJobs");
const runningJobs = document.getElementById("runningJobs");
const successRate = document.getElementById("successRate");
const recentJobs = document.getElementById("recentJobs");

if (totalJobs) {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    totalJobs.innerText = jobs.length;
    completedJobs.innerText = jobs.filter(j => j.status === "Completed").length;
    runningJobs.innerText = jobs.filter(j => j.status === "Running").length;

    let success =
        jobs.length === 0
            ? 0
            : Math.round((jobs.filter(j => j.status === "Completed").length / jobs.length) * 100);

    successRate.innerText = success + "%";

    // recent jobs
    recentJobs.innerHTML = "";
    jobs.slice(-5).reverse().forEach(job => {
        recentJobs.innerHTML += `
            <tr>
                <td>${job.name}</td>
                <td>${job.status}</td>
                <td>${job.priority}</td>
                <td>${job.created}</td>
            </tr>
        `;
    });
}
