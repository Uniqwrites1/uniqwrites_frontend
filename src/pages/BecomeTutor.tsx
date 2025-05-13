import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subjects: string;
  teachingMode: string;
  cv: File | null;
}

const BecomeTutor = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subjects: "",
    teachingMode: "",
    cv: null,
  });
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("/api/become-tutor", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.ok) {
        setFeedback("Application submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subjects: "",
          teachingMode: "",
          cv: null,
        });
      } else {
        setFeedback("Error submitting application. Please try again.");
      }
    } catch (error) {
      setFeedback(`An unexpected error occurred: ${error}. Please try again.`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Become a Tutor</h1>
      <p style={styles.description}>
        Join our platform and help students achieve their academic goals. Fill
        out the form below to apply.
      </p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          style={styles.input}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.input}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <label style={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <input
          style={styles.input}
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />

        <label style={styles.label} htmlFor="subjects">
          Subjects You Can Teach
        </label>
        <input
          style={styles.input}
          type="text"
          id="subjects"
          name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          placeholder="Enter subjects you can teach"
          required
        />

        <label style={styles.label} htmlFor="teachingMode">
          Preferred Teaching Mode
        </label>
        <select
          style={styles.select}
          id="teachingMode"
          name="teachingMode"
          value={formData.teachingMode}
          onChange={handleChange}
          required
        >
          <option value="">Select...</option>
          <option value="online">Online</option>
          <option value="physical">Physical</option>
        </select>

        <label style={styles.label} htmlFor="cv">
          Upload CV
        </label>
        <input
          style={styles.fileInput}
          type="file"
          id="cv"
          name="cv"
          onChange={handleFileChange}
          required
        />

        <button style={styles.button} type="submit">
          Apply to Become a Tutor
        </button>
        {feedback && <p>{feedback}</p>}
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  description: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#444",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
  },
  fileInput: {
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
  },
};

export default BecomeTutor;
