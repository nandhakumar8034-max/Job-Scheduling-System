// Safe script that works on ALL pages without errors

// Handle Create Job form (only exists on create-job.html)
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
            status: "Pending"
        });

        localStorage.setItem("jobs", JSON.stringify(jobs));

        alert("Job Added Successfully!");
        window.location.href = "jobs.html";
    });
}

// Load jobs table (only on jobs.html)
const jobsTable = document.querySelector(".jobs-table-body");
if (jobsTable) {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    jobsTable.innerHTML = "";

    jobs.forEach(job => {
        jobsTable.innerHTML += `
            <tr>
                <td>${job.name}</td>
                <td>${job.burst}</td>
                <td>${job.priority}</td>
                <td>${job.status}</td>
            </tr>
        `;
    });
}

// Dashboard updates (only exist on index.html)
const totalJobsBox = document.querySelector("#totalJobs");
const completedJobsBox = document.querySelector("#completedJobs");

if (totalJobsBox && completedJobsBox) {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    totalJobsBox.innerText = jobs.length;
    completedJobsBox.innerText = jobs.filter(j => j.status === "Completed").length;
}
