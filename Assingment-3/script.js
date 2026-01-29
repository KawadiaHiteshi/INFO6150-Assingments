document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("myTable");
  const tbody = table.querySelector("tbody");

  const submitBtn = document.getElementById("button");
  const addBtn = document.getElementById("add");

  // Modal elements
  const editModal = document.getElementById("editModal");
  const editTitle = document.getElementById("editTitle");
  const editInput = document.getElementById("editInput");
  const editOk = document.getElementById("editOk");
  const editCancel = document.getElementById("editCancel");

  let editTargetStudentNum = null;

  // Requirement 2b: Submit disabled + gray on load
  setSubmitEnabled(false);

  // Requirement 2a: Ensure dropdowns are collapsed on load
  collapseAllDetails();

  // ---------- Helpers ----------
  function setSubmitEnabled(enabled) {
    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle("enabled", enabled);
  }

  function anyRowSelected() {
    return tbody.querySelectorAll(".dataRow .rowCheck:checked").length > 0;
  }

  function collapseAllDetails() {
    tbody.querySelectorAll(".dropDownTextArea").forEach((r) => (r.style.display = "none"));
  }

  function toggleDetailsFor(studentNum) {
    const detailsRow = tbody.querySelector(`.dropDownTextArea[data-details-for="${studentNum}"]`);
    if (!detailsRow) return;
    detailsRow.style.display = (detailsRow.style.display === "none" || detailsRow.style.display === "")
      ? "table-row"
      : "none";
  }

  function getStudentNumFromRow(row) {
    return parseInt(row.getAttribute("data-student"), 10);
  }

  function ensureRowButtons(row, show) {
    const deleteCell = row.querySelector(".deleteCell");
    const editCell = row.querySelector(".editCell");

    if (show) {
      if (!deleteCell.querySelector("button")) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "rowActionBtn deleteBtn";
        deleteCell.appendChild(delBtn);
      }
      if (!editCell.querySelector("button")) {
        const eBtn = document.createElement("button");
        eBtn.textContent = "Edit";
        eBtn.className = "rowActionBtn editBtn";
        editCell.appendChild(eBtn);
      }
      // show (if already exists)
      deleteCell.style.visibility = "visible";
      editCell.style.visibility = "visible";
    } else {
      // Requirement 10c: hide buttons when deselected
      deleteCell.style.visibility = "hidden";
      editCell.style.visibility = "hidden";
    }
  }

  function showPopup(msg) {
    alert(msg);
  }

  // Find the smallest missing student number (Requirement 5c)
  function getNextStudentNumber() {
    const nums = new Set();
    tbody.querySelectorAll(".dataRow").forEach((row) => nums.add(getStudentNumFromRow(row)));

    let n = 1;
    while (nums.has(n)) n++;
    return n;
  }

  function buildStudentRows(n) {
    const main = document.createElement("tr");
    main.className = "dataRow";
    main.setAttribute("data-student", String(n));
    main.innerHTML = `
      <td class="controlsCell">
        <input type="checkbox" class="rowCheck" />
        <br/><br/>
        <img src="down.png" class="arrowIcon" alt="Toggle details" width="25" />
      </td>
      <td class="studentName">Student ${n}</td>
      <td>Teacher ${n}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${10000 + n * 1111}</td>
      <td>100%</td>
      <td class="deleteCell"></td>
      <td class="editCell"></td>
    `;

    const details = document.createElement("tr");
    details.className = "dropDownTextArea";
    details.setAttribute("data-details-for", String(n));
    details.innerHTML = `
      <td colspan="10">
        <strong>Student ${n} Details:</strong><br/>
        Award Details: Honors Student<br/>
        Fall 1-2024 (TA)<br/>
        Comments: Outstanding<br/>
        Award Status: A
      </td>
    `;

    // collapsed by default
    details.style.display = "none";

    return { main, details };
  }

  // ---------- Events ----------
  // Event delegation for checkbox, arrow, delete, edit
  tbody.addEventListener("click", (e) => {
    const target = e.target;

    // Toggle details when arrow clicked (Requirement 11)
    if (target.classList.contains("arrowIcon")) {
      const row = target.closest(".dataRow");
      if (!row) return;
      toggleDetailsFor(getStudentNumFromRow(row));
      return;
    }

    // Delete row (Requirement 8)
    if (target.classList.contains("deleteBtn")) {
      const row = target.closest(".dataRow");
      if (!row) return;

      const studentNum = getStudentNumFromRow(row);
      const detailsRow = tbody.querySelector(`.dropDownTextArea[data-details-for="${studentNum}"]`);

      row.remove();
      if (detailsRow) detailsRow.remove();

      showPopup(`Student ${studentNum} Record deleted successfully`);
      setSubmitEnabled(anyRowSelected());
      return;
    }

    // Edit row (Requirement 9)
    if (target.classList.contains("editBtn")) {
      const row = target.closest(".dataRow");
      if (!row) return;

      const studentNum = getStudentNumFromRow(row);
      editTargetStudentNum = studentNum;

      editTitle.textContent = `Edit details of Student ${studentNum}`;
      editInput.value = "";
      openModal();
      return;
    }
  });

  // Checkbox change (Requirement 7 + 10)
  tbody.addEventListener("change", (e) => {
    const target = e.target;
    if (!target.classList.contains("rowCheck")) return;

    const row = target.closest(".dataRow");
    if (!row) return;

    const checked = target.checked;

    // Requirement 7a
    row.classList.toggle("selected", checked);

    // Requirement 7c/7d and 10c
    ensureRowButtons(row, checked);

    // Requirement 7b + 10b
    setSubmitEnabled(anyRowSelected());
  });

  // Add new student (Requirement 5 + 6)
  addBtn.addEventListener("click", () => {
    try {
      const nextNum = getNextStudentNumber();
      const { main, details } = buildStudentRows(nextNum);

      tbody.appendChild(main);
      tbody.appendChild(details);

      showPopup(`Student ${nextNum} Record added successfully`);
    } catch (err) {
      showPopup("Error: Record addition failed.");
    }
  });

  // Submit button click (not required to do anything specific, but safe)
  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    showPopup("Selected awards submitted successfully!");
  });

  // Modal OK/Cancel
  editOk.addEventListener("click", () => {
    const val = editInput.value.trim();
    if (!val) {
      showPopup("Please enter some data before clicking OK.");
      return;
    }
    showPopup(`Student ${editTargetStudentNum} data updated successfully`);
    closeModal();
  });

  editCancel.addEventListener("click", () => closeModal());

  editModal.addEventListener("click", (e) => {
    // click outside modal closes it
    if (e.target === editModal) closeModal();
  });

  function openModal() {
    editModal.classList.remove("hidden");
    editInput.focus();
  }

  function closeModal() {
    editModal.classList.add("hidden");
    editTargetStudentNum = null;
  }

  // Requirement 10c: hide delete/edit cells initially
  tbody.querySelectorAll(".dataRow").forEach((row) => ensureRowButtons(row, false));
});
