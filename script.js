// -------------------------------------
// CREATE JOB PAGE (create-job.html)
// -------------------------------------

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



// -------------------------------------
// JOBS PAGE (jobs.html)
// -------------------------------------

const jobsTable = document.querySelector(".jobs-table-body");
if (jobsTable) {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    jobsTable.innerHTML = "";

    if (jobs.length === 0) {
        jobsTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; padding:20px;">
                    No jobs created yet.
                </td>
            </tr>
        `;
    } else {
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
}
