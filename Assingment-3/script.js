// Assignment 3 — Full script.js
// Works with the table.html/table.css structure I gave you (dataRow + dropDownTextArea, deleteCell/editCell, etc.)
// Covers: submit disabled on load, expand/collapse, checkbox row yellow, dynamic delete/edit buttons,
// delete removes both rows + popup, edit modal + ok/cancel, add new student in sequence after resequencing.
// :contentReference[oaicite:0]{index=0}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("myTable");
  const tbody = table.querySelector("tbody");

  const submitBtn = document.getElementById("button");
  const addBtn = document.getElementById("add");

  // Modal elements (must exist in HTML)
  const editModal = document.getElementById("editModal");
  const editTitle = document.getElementById("editTitle");
  const editInput = document.getElementById("editInput");
  const editOk = document.getElementById("editOk");
  const editCancel = document.getElementById("editCancel");

  let editTargetStudentNum = null;

  // -----------------------------
  // On load requirements
  // -----------------------------
  collapseAllDetails();          // table not expanded on load
  setSubmitEnabled(false);       // submit disabled + gray on load
  hideAllActionCellsOnLoad();    // delete/edit hidden initially

  // -----------------------------
  // Helpers
  // -----------------------------
  function showPopup(message) {
    alert(message);
  }

  function setSubmitEnabled(enabled) {
    submitBtn.disabled = !enabled;
    submitBtn.classList.toggle("enabled", enabled); // .enabled -> orange in CSS
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

  // ✅ IMPORTANT FIX: resequence so table never “skips” numbers after deletes.
  // After resequence: students become 1..N, and next add becomes N+1.
  function resequenceTable() {
    const dataRows = Array.from(tbody.querySelectorAll(".dataRow"));

    dataRows.forEach((row, idx) => {
      const oldNum = getStudentNumFromRow(row);
      const newNum = idx + 1;

      // Update main row attribute
      row.setAttribute("data-student", String(newNum));

      // Update Student name cell text
      const studentNameCell = row.querySelector(".studentName");
      if (studentNameCell) studentNameCell.textContent = `Student ${newNum}`;

      // Update Advisor cell: in our HTML it is the 3rd cell (index 2) after controls + student
      // If you changed column order, adjust this index.
      if (row.children[2]) row.children[2].textContent = `Teacher ${newNum}`;

      // Update details row linked to oldNum
      const detailsRow = tbody.querySelector(
        `.dropDownTextArea[data-details-for="${oldNum}"]`
      );
      if (detailsRow) {
        detailsRow.setAttribute("data-details-for", String(newNum));
        const strong = detailsRow.querySelector("strong");
        if (strong) strong.textContent = `Student ${newNum} Details:`;

        // Optional: replace any other mentions of Student X in details text (light touch)
        // (Keeps content consistent without needing perfect parsing)
        detailsRow.innerHTML = detailsRow.innerHTML.replaceAll(
          `Student ${oldNum}`,
          `Student ${newNum}`
        );
      }
    });
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

  // -----------------------------
  // Event Delegation: clicks
  // -----------------------------
  tbody.addEventListener("click", (e) => {
    const target = e.target;

    // Expand/collapse
    if (target.classList.contains("arrowIcon")) {
      const row = target.closest(".dataRow");
      if (!row) return;
      const num = getStudentNumFromRow(row);
      toggleDetailsFor(num);
      return;
    }

    // Delete
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

      // resequence to keep 1..N (this prevents “skip after 4” issue)
      resequenceTable();

      showPopup(`Student ${studentNum} Record deleted successfully`);

      // submit state after delete
      setSubmitEnabled(anyRowSelected());
      return;
    }

    // Edit
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
  // Checkbox change: select/deselect
  // -----------------------------
  tbody.addEventListener("change", (e) => {
    const target = e.target;
    if (!target.classList.contains("rowCheck")) return;

    const row = target.closest(".dataRow");
    if (!row) return;

    const checked = target.checked;

    // row highlight
    row.classList.toggle("selected", checked);

    // show/hide delete & edit buttons
    setRowActionsVisible(row, checked);

    // submit enable/disable + orange/gray
    setSubmitEnabled(anyRowSelected());
  });

  // -----------------------------
  // Add new student
  // -----------------------------
  addBtn.addEventListener("click", () => {
    try {
      // Because we resequence on delete, next student is always N+1
      const nextNum = tbody.querySelectorAll(".dataRow").length + 1;

      const { main, details } = buildStudentRows(nextNum);
      tbody.appendChild(main);
      tbody.appendChild(details);

      // Hide action cells initially for new row
      setRowActionsVisible(main, false);

      showPopup(`Student ${nextNum} Record added successfully`);
    } catch (err) {
      showPopup("Error: Record addition failed.");
    }
  });

  // Submit click (not explicitly required what to do, just feedback)
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
