let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

let jobCards = document.getElementById("jobCards");
let filteredJobs = document.getElementById("filteredJobs");
let rejectedJobs = document.getElementById("rejectedJobs");
let dynamicCount = document.getElementById("dynamicCount");
let fullDynamicCount = document.getElementById("fullDynamicCount");

let mainContainer = document.getElementById("mainContainer");

// empty job logo selcted
let emptyJobs = document.getElementById("emptyJobs");

// Main toggle btns
let allBtn = document.getElementById("allBtn");
let interviewBtn = document.getElementById("interviewBtn");
let rejectedBtn = document.getElementById("rejectedBtn");

// inside card submit btns
let interviewSubmitBtn = document.getElementById("interviewSubmitBtn");
let rejectedSubmitBtn = document.getElementById("rejectedSubmitBtn");

let interviewList = [];
let rejectedList = [];

let activeTab = "allBtn";

// toggle button functions

function toggleButton(id) {
  activeTab = id;
  allBtn.classList.remove("bg-gray-300", "text-white");
  interviewBtn.classList.remove("bg-gray-300", "text-white");
  rejectedBtn.classList.remove("bg-gray-300", "text-white");

  allBtn.classList.add("bg-gray-300", "text-black");
  interviewBtn.classList.add("bg-gray-300", "text-black");
  rejectedBtn.classList.add("bg-gray-300", "text-black");

  const selected = document.getElementById(id);

  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-blue-500", "text-white");

  if (id == "interviewBtn") {
    rejectedJobs.classList.add("hidden");
    jobCards.classList.add("hidden");
    filteredJobs.classList.remove("hidden");
    dynamicCount.innerText = interviewList.length;
    if (interviewList.length == 0) {
      emptyJobs.style.display = "flex";
    }
  } else if (id == "allBtn") {
    jobCards.classList.remove("hidden");
    filteredJobs.classList.add("hidden");
    dynamicCount.innerText = jobCards.children.length;
    emptyJobs.style.display = "none";
  } else if (id == "rejectedBtn") {
    jobCards.classList.add("hidden");
    filteredJobs.classList.add("hidden");

    rejectedJobs.classList.remove("hidden");
    dynamicCount.innerText = rejectedList.length;
    if (rejectedList.length != 0) {
      emptyJobs.style.display = "none";
    }
  }
}

function checkEmpty() {
  if (activeTab === "interviewBtn") {
    emptyJobs.style.display = interviewList.length === 0 ? "flex" : "none";
  } else if (activeTab === "rejectedBtn") {
    emptyJobs.style.display = rejectedList.length === 0 ? "flex" : "none";
  } else {
    emptyJobs.style.display = "none";
  }
}

// Calculate count functions

function calculateCount() {
  totalCount.innerText = jobCards.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

// delete the job posts

function handleDelete(jobName) {
  const allTitles = document.querySelectorAll(".card-title");
  let card;

  allTitles.forEach((title) => {
    if (title.innerText === jobName) {
      card = title.closest(".card");
    }
  });

  interviewList = interviewList.filter((job) => job.jobName !== jobName);
  rejectedList = rejectedList.filter((job) => job.jobName !== jobName);

  card.remove();
  renderFilteredJobs();
  renderRejectedJobs();
  calculateCount();
}

// Main function

mainContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("interview")) {
    const parentNode = e.target.parentNode.parentNode;

    const jobName = parentNode.querySelector(".card-title").innerText;

    let jobStatus = parentNode.querySelector("#status").innerText;

    jobStatus = "Interview";

    let jobInfo = {
      jobName,
      jobStatus,
    };

    const isJobExist = interviewList.find(
      (job) => job.jobName == jobInfo.jobName,
    );

    if (!isJobExist) {
      interviewList.push(jobInfo);
      let jobStatusHtml = parentNode.querySelector("#status");
      jobStatusHtml.classList.remove("bg-red-500", "text-white");
      jobStatusHtml.classList.add(
        "bg-green-400",
        "text-black",
        "border-none",
        "font-semibold",
      );

      jobStatusHtml.innerText = jobStatus;
    }

    // remove the job list from the interview section

    rejectedList = rejectedList.filter((job) => job.jobName != jobInfo.jobName);

    renderFilteredJobs(jobStatus);
    renderRejectedJobs(jobStatus);
    calculateCount();

    // ================ Rejected button related work ============
  } else if (e.target.classList.contains("rejected")) {
    const parentNode = e.target.parentNode.parentNode;

    const jobName = parentNode.querySelector(".card-title").innerText;

    let jobStatus = parentNode.querySelector("#status").innerText;
    console.log(jobStatus);
    jobStatus = "Rejected";

    let jobInfo = {
      jobName,
      jobStatus,
    };

    const isJobExist = rejectedList.find(
      (job) => job.jobName == jobInfo.jobName,
    );

    if (!isJobExist) {
      rejectedList.push(jobInfo);

      let jobStatusHtml = parentNode.querySelector("#status");
      jobStatusHtml.classList.remove("bg-green-400", "text-black");
      jobStatusHtml.classList.add(
        "bg-red-500",
        "text-white",
        "border-none",
        "font-semibold",
      );
      jobStatusHtml.innerText = jobStatus;
    }

    // remove the job list from the interview section

    interviewList = interviewList.filter(
      (job) => job.jobName != jobInfo.jobName,
    );

    renderRejectedJobs();
    renderFilteredJobs();
    calculateCount();
  } else if (e.target.classList.contains("delete")) {
    const parentNode = e.target.parentNode.parentNode;
    let deleteBtn = parentNode.querySelector(".delete");

    function handleDelete(jobName) {
      if (jobName == jobInfo.jobName) {
        let bossNode = parentNode.parentNode;

        bossNode.deleteElement();
      }
    }
  }
});

// Render Interview jobs

function renderFilteredJobs() {
  filteredJobs.innerHTML = "";
  for (const job of interviewList) {
    let div = document.createElement("div");

    div.innerHTML = `
        <div class="card bg-base-100 shadow-xl mt-5 mb-10">
          <div class="card-body">

           <div class="flex justify-between">
              <h2 class="card-title">${job.jobName}</h2>
             <button
                onclick="handleDelete('${job.jobName}')"
                class="px-2 py-1 rounded-lg  text-white delete"
              >
                <i class="fa-solid fa-trash text-2xl text-red-600"></i>
              </button>
            </div>
            <p><strong>Post:</strong> Frontend Developer</p>
            <p><strong>Salary:</strong> $40k-$60k | Full Time</p>

            <button id="status" class="btn  btn-success btn-sm w-fit ">
              ${job.jobStatus}
            </button>

            <p class="text-sm mt-2">
              Work on modern UI using HTML, CSS, and JavaScript to build
              responsive web apps.
            </p>

            <div class="card-actions mt-3">
              <button  id="interviewSubmitBtn" class="btn interview btn-success btn-sm text-lg">Interview</button>
              <button id="rejectedSubmitBtn"  class="btn rejected btn-error btn-sm text-lg">Rejected</button>
            </div>
          </div>
        </div>
        
        `;
    filteredJobs.appendChild(div);
  }

  checkEmpty();
}

// Render Rejected jobs
function renderRejectedJobs() {
  rejectedJobs.innerHTML = "";
  for (const job of rejectedList) {
    let div = document.createElement("div");

    div.innerHTML = `
        <div class="card bg-base-100 shadow-xl mt-5">
          <div class="card-body">


           <div class="flex justify-between">
              <h2 class="card-title">${job.jobName}</h2>
              <button
                onclick="handleDelete('${job.jobName}')"
                class="px-2 py-1 rounded-lg  text-white delete"
              >
                <i class="fa-solid fa-trash text-2xl text-red-600"></i>
              </button>
            </div>
            <p><strong>Post:</strong> Frontend Developer</p>
            <p><strong>Salary:</strong> $40k-$60k | Full Time</p>
            <button id="status" class="btn  bg-red-500 text-white  btn-sm w-fit ">
              ${job.jobStatus}
            </button>
            <p class="text-sm mt-2">
              Work on modern UI using HTML, CSS, and JavaScript to build
              responsive web apps.
            </p>
            <div class="card-actions mt-3">
              <button  id="interviewSubmitBtn" class="btn interview btn-success btn-sm text-lg">Interview</button>
              <button id="rejectedSubmitBtn"  class="btn btn-error btn-sm text-lg rejected">Rejected</button>
            </div>
          </div>
        </div>
        
        `;
    rejectedJobs.appendChild(div);
  }

  checkEmpty();
}
