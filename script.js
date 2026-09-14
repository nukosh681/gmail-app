const emails = [
  {
    id: 1,
    sender: "Professor Lee",
    email: "professor.lee@university.edu",
    subject: "Programming assignment reminder",
    preview: "Hi everyone, this is a reminder that your UI project is due on Friday...",
    date: "2:14 PM",
    unread: true,
    starred: false,
    body: `
      <p>Hi everyone,</p>
      <p>This is a reminder that your user interface programming project is due on Friday at 11:59 PM.</p>
      <p>Please make sure your submission includes your HTML, CSS, and JavaScript files, along with a short explanation of the features you implemented.</p>
      <p>Best,<br>Professor Lee</p>
    `
  },
  {
    id: 2,
    sender: "Career Services",
    email: "careers@university.edu",
    subject: "Workshop registration confirmed",
    preview: "Your registration for the internship preparation workshop has been confirmed.",
    date: "12:47 PM",
    unread: true,
    starred: true,
    body: `
      <p>Hello,</p>
      <p>Your registration for the internship preparation workshop has been confirmed.</p>
      <p>The workshop will cover CV writing, interview preparation, and networking strategies.</p>
      <p>We look forward to seeing you there.</p>
    `
  },
  {
    id: 3,
    sender: "Maya",
    email: "maya@example.com",
    subject: "Birthday plans 🎉",
    preview: "I found a few places we could go after dinner. Tell me what you think!",
    date: "11:02 AM",
    unread: true,
    starred: false,
    body: `
      <p>Hey!</p>
      <p>I found a few places we could go after dinner. I’ll send you the options later today.</p>
      <p>This birthday is going to be so fun 🎉</p>
    `
  },
  {
    id: 4,
    sender: "Student Affairs",
    email: "studentaffairs@university.edu",
    subject: "Weekly schedule",
    preview: "Please review your work schedule for this week and let us know if anything needs to be changed.",
    date: "Sep 13",
    unread: false,
    starred: false,
    body: `
      <p>Dear Student,</p>
      <p>Please review your work schedule for this week and let us know if anything needs to be changed.</p>
      <p>Thank you,<br>Student Affairs</p>
    `
  },
  {
    id: 5,
    sender: "CodeLab",
    email: "hello@codelab.dev",
    subject: "Welcome to your JavaScript course",
    preview: "Your course dashboard is ready. Start with lesson one whenever you are ready.",
    date: "Sep 12",
    unread: false,
    starred: false,
    body: `
      <p>Welcome to CodeLab!</p>
      <p>Your JavaScript course dashboard is ready. Start with lesson one whenever you are ready.</p>
      <p>Happy coding!</p>
    `
  }
];

const emailList = document.getElementById("emailList");
const inboxView = document.getElementById("inboxView");
const messageView = document.getElementById("messageView");
const searchInput = document.getElementById("searchInput");
const composeWindow = document.getElementById("composeWindow");
const toast = document.getElementById("toast");

function renderEmails(list = emails) {
  emailList.innerHTML = "";

  list.forEach(email => {
    const row = document.createElement("div");
    row.className = `email-row ${email.unread ? "unread" : ""}`;
    row.dataset.id = email.id;

    row.innerHTML = `
      <div>
        <input class="row-checkbox" type="checkbox" aria-label="Select email">
      </div>
      <div class="star-cell ${email.starred ? "starred" : ""}" title="Star">
        ${email.starred ? "★" : "☆"}
      </div>
      <div class="sender">${email.sender}</div>
      <div class="subject-line">
        <span>${email.subject}</span>
        <span class="subject-preview"> - ${email.preview}</span>
      </div>
      <div class="date">${email.date}</div>
    `;

    row.addEventListener("click", event => {
      if (
        event.target.classList.contains("row-checkbox") ||
        event.target.classList.contains("star-cell")
      ) return;

      openMessage(email.id);
    });

    const star = row.querySelector(".star-cell");
    star.addEventListener("click", event => {
      event.stopPropagation();
      email.starred = !email.starred;
      star.classList.toggle("starred", email.starred);
      star.textContent = email.starred ? "★" : "☆";
    });

    emailList.appendChild(row);
  });

  document.getElementById("rangeText").textContent =
    list.length ? `1–${list.length} of ${list.length}` : "0 of 0";
}

function openMessage(id) {
  const email = emails.find(item => item.id === id);
  if (!email) return;

  email.unread = false;

  document.getElementById("messageSubject").textContent = email.subject;
  document.getElementById("messageSender").textContent = email.sender;
  document.getElementById("messageEmail").textContent = `<${email.email}>`;
  document.getElementById("messageDate").textContent = email.date;
  document.getElementById("messageBody").innerHTML = email.body;
  document.getElementById("senderAvatar").textContent =
    email.sender.charAt(0).toUpperCase();

  const star = document.getElementById("messageStar");
  star.textContent = email.starred ? "★" : "☆";
  star.onclick = () => {
    email.starred = !email.starred;
    star.textContent = email.starred ? "★" : "☆";
  };

  inboxView.classList.add("hidden");
  messageView.classList.remove("hidden");
  renderEmails();
}

document.getElementById("backButton").addEventListener("click", () => {
  messageView.classList.add("hidden");
  inboxView.classList.remove("hidden");
});

searchInput.addEventListener("input", event => {
  const term = event.target.value.toLowerCase().trim();

  const filtered = emails.filter(email =>
    email.sender.toLowerCase().includes(term) ||
    email.subject.toLowerCase().includes(term) ||
    email.preview.toLowerCase().includes(term)
  );

  renderEmails(filtered);
});

document.getElementById("composeButton").addEventListener("click", () => {
  composeWindow.classList.remove("hidden");
  document.getElementById("composeTo").focus();
});

document.getElementById("closeCompose").addEventListener("click", () => {
  composeWindow.classList.add("hidden");
});

document.getElementById("minimizeCompose").addEventListener("click", () => {
  composeWindow.style.height =
    composeWindow.style.height === "40px" ? "530px" : "40px";
});

document.getElementById("discardButton").addEventListener("click", () => {
  clearCompose();
  composeWindow.classList.add("hidden");
});

document.getElementById("sendButton").addEventListener("click", () => {
  const recipient = document.getElementById("composeTo").value.trim();

  if (!recipient) {
    showToast("Please add a recipient");
    return;
  }

  clearCompose();
  composeWindow.classList.add("hidden");
  showToast("Message sent");
});

function clearCompose() {
  document.getElementById("composeTo").value = "";
  document.getElementById("composeSubject").value = "";
  document.getElementById("composeBody").value = "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2500);
}

document.getElementById("menuButton").addEventListener("click", () => {
  document.body.classList.toggle("sidebar-collapsed");
  document.getElementById("sidebar").classList.toggle("collapsed");
});

document.getElementById("refreshButton").addEventListener("click", () => {
  showToast("Inbox refreshed");
});

document.getElementById("selectAll").addEventListener("change", event => {
  document.querySelectorAll(".row-checkbox").forEach(checkbox => {
    checkbox.checked = event.target.checked;
  });
});

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
    item.classList.add("active");

    const folder = item.dataset.folder;
    if (folder === "Starred") {
      renderEmails(emails.filter(email => email.starred));
    } else {
      renderEmails(emails);
    }

    messageView.classList.add("hidden");
    inboxView.classList.remove("hidden");
  });
});

renderEmails();
