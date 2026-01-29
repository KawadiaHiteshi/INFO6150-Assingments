// Assignment 3 — script.js (Stable IDs + Fill Gaps)
// Behavior: If Student 3 is deleted, Student 4 stays Student 4.
// Next "Add New Student" will re-create Student 3 and insert it in order.
// :contentReference[oaicite:1]{index=1}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("myTable");
  const tbody = table.querySelector("tbody");

  const submitBtn = document.getElementById("button");
  const addBtn = document.getElementById("add");

  // Modal elements (must exist in your HTML)
  const editModal = document.getElementById("editModal");
  const editTitle = document.getElementById("editTitle");
  const editInput = document.getElementById("editInput");
  const editOk = document.getElementById("editOk");
  const editCancel = document.getElementById("editCancel");

  let editTargetStudentNum = null;

  // -----------------------------
  // On load requirements
  // -----------------------------
  collapseAllDetails();          // Requirement 2a
  setSubmitEnabled(false);       // Requirement 2b
  hideAllActionCellsOnLoad();    // buttons hidden until checkbox selected

  // -----------------------------
  // Helpers
  // -----------------------------
  function showPopup(message) {
    alert(message);
  }

  function setSubmitEnabled(enabled) {
    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle("enabled", enabled); // orange class
  }

  function anyRowSelected() {
    return tbody.querySelectorAll(".dataRow .rowCheck:checked").length > 0;
  }

  function collapseAllDetails() {
    tbody.querySelectorAll(".dropDownTextArea").forEach((r) => {
      r.style.display = "none";
    });
  }

  function toggleDetailsFor(studentNum) {
    const detailsRow = tbody.querySelector(
      `.dropDownTextArea[data-details-for="${studentNum}"]`
    );
    if (!detailsRow) return;

    detailsRow.style.display =
      detailsRow.style.display === "none" || detailsRow.style.display === ""
        ? "table-row"
        : "none";
  }

  function getStudentNumFromRow(row) {
    return parseInt(row.getAttribute("data-student"), 10);
  }

  function getAllExistingStudentNums() {
    return Array.from(tbody.querySelectorAll(".dataRow"))
      .map(getStudentNumFromRow)
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
  }

  // ✅ Smallest missing positive integer (fill the gap)
  // Example: existing [1,2,4] => returns 3
  function getNextStudentNumberFillGap() {
    const nums = getAllExistingStudentNums();
    let want = 1;
    for (const n of nums) {
      if (n === want) want++;
      else if (n > want) break;
    }
    return want;
  }

  // Insert new student rows in correct visual order (between 2 and 4, etc.)
  function insertStudentRowsInOrder(mainRow, detailsRow, newNum) {
    const dataRows = Array.from(tbody.querySelectorAll(".dataRow"));
    // Find first row whose student number is greater than newNum
    const insertBeforeDataRow = dataRows.find((r) => getStudentNumFromRow(r) > newNum);

    if (!insertBeforeDataRow) {
      // append at end
      tbody.appendChild(mainRow);
      tbody.appendChild(detailsRow);
      return;
    }

    // We want to insert main row before that dataRow, and details row right after main.
    tbody.insertBefore(mainRow, insertBeforeDataRow);
    tbody.insertBefore(detailsRow, insertBeforeDataRow);
  }

  function ensureRowButtons(row) {
    const deleteCell = row.querySelector(".deleteCell");
    const editCell = row.querySelector(".editCell");
    if (!deleteCell || !editCell) return;

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
  }

  function setRowActionsVisible(row, visible) {
    const deleteCell = row.querySelector(".deleteCell");
    const editCell = row.querySelector(".editCell");
    if (!deleteCell || !editCell) return;

    if (visible) {
      ensureRowButtons(row);
      deleteCell.style.visibility = "visible";
      editCell.style.visibility = "visible";
    } else {
      deleteCell.style.visibility = "hidden";
      editCell.style.visibility = "hidden";
    }
  }

  function hideAllActionCellsOnLoad() {
    tbody.querySelectorAll(".dataRow").forEach((row) => setRowActionsVisible(row, false));
  }

  // Create main + detail rows for a student number
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

  // -----------------------------
  // Event Delegation: clicks
  // -----------------------------
  tbody.addEventListener("click", (e) => {
    const target = e.target;

    // Expand/collapse (Requirement 11)
    if (target.classList.contains("arrowIcon")) {
      const row = target.closest(".dataRow");
      if (!row) return;
      toggleDetailsFor(getStudentNumFromRow(row));
      return;
    }

    // Delete (Requirement 8) — ✅ NO resequencing here
    if (target.classList.contains("deleteBtn")) {
      const row = target.closest(".dataRow");
      if (!row) return;

      const studentNum = getStudentNumFromRow(row);

      // remove details row too
      const detailsRow = tbody.querySelector(
        `.dropDownTextArea[data-details-for="${studentNum}"]`
      );

      row.remove();
      if (detailsRow) detailsRow.remove();

      showPopup(`Student ${studentNum} Record deleted successfully`);

      // submit state after delete
      setSubmitEnabled(anyRowSelected());
      return;
    }

    // Edit (Requirement 9)
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

  // -----------------------------
  // Checkbox change: select/deselect (Requirement 7 + 10)
  // -----------------------------
  tbody.addEventListener("change", (e) => {
    const target = e.target;
    if (!target.classList.contains("rowCheck")) return;

    const row = target.closest(".dataRow");
    if (!row) return;

    const checked = target.checked;

    // highlight row yellow
    row.classList.toggle("selected", checked);

    // show/hide buttons on that row
    setRowActionsVisible(row, checked);

    // submit enable/disable + orange/gray
    setSubmitEnabled(anyRowSelected());
  });

  // -----------------------------
  // Add new student (Requirement 5 + 6)
  // ✅ Fill gap number + insert into correct order
  // -----------------------------
  addBtn.addEventListener("click", () => {
    try {
      const nextNum = getNextStudentNumberFillGap();
      const { main, details } = buildStudentRows(nextNum);

      // Hide action cells initially
      setRowActionsVisible(main, false);

      // Insert in correct order visually
      insertStudentRowsInOrder(main, details, nextNum);

      showPopup(`Student ${nextNum} Record added successfully`);
    } catch (err) {
      showPopup("Error: Record addition failed.");
    }
  });

  // Submit click (extra feedback)
  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    showPopup("Selected awards submitted successfully!");
  });

  // -----------------------------
  // Modal controls
  // -----------------------------
  editOk.addEventListener("click", () => {
    const val = editInput.value.trim();
    if (!val) {
      showPopup("Please enter some data before clicking OK.");
      return;
    }
    showPopup(`Student ${editTargetStudentNum} data updated successfully`);
    closeModal();
  });

  editCancel.addEventListener("click", closeModal);

  // click outside modal closes it
  editModal.addEventListener("click", (e) => {
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
});
