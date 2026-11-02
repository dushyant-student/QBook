export const validateContact = ({ name, email, subject, message,}) => {
  const errors = {};

  if (!name || name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters";
  } else if (name.trim().length > 60) {
    errors.name = "Name cannot exceed 60 characters";
  }

  if (!email || email.length > 254) {
    errors.email = "Valid email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!subject || subject.trim().length < 3) {
    errors.subject = "Subject must contain at least 3 characters";
  } else if (subject.trim().length > 100) {
    errors.subject = "Subject cannot exceed 100 characters";
  }

  if (!message || message.trim().length < 10) {
    errors.message = "Message must contain at least 10 characters";
  } else if (message.length > 2000) {
    errors.message = "Message cannot exceed 2000 characters";
  }

  return errors;
};



export const escapeHtml = (value = "") => {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
};