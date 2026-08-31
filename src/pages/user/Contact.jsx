import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Thank you for contacting JewelleryHub. We will get back to you soon!"
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">

        <section className="contact-header">

          <span>
            JEWELLERYHUB
          </span>

          <h1>
            Contact Us
          </h1>

          <p>
            We would love to hear from you.
            Get in touch with our team.
          </p>

        </section>


        <section className="contact-container">

          {/* CONTACT INFORMATION */}

          <div className="contact-info">

            <span className="contact-label">
              GET IN TOUCH
            </span>

            <h2>
              We're here to help
            </h2>

            <p>
              Have a question about an order, product,
              delivery, or anything else? Contact us and
              our team will be happy to assist you.
            </p>


            <div className="contact-item">

              <div className="contact-icon">
                ✉
              </div>

              <div>
                <span>
                  Email
                </span>

                <strong>
                  support@jewelleryhub.com
                </strong>
              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                ☎
              </div>

              <div>
                <span>
                  Phone
                </span>

                <strong>
                  +91 98765 43210
                </strong>
              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                ◇
              </div>

              <div>
                <span>
                  Address
                </span>

                <strong>
                  JewelleryHub, India
                </strong>
              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                ◷
              </div>

              <div>
                <span>
                  Support Hours
                </span>

                <strong>
                  Monday - Saturday, 9 AM - 6 PM
                </strong>
              </div>

            </div>

          </div>


          {/* CONTACT FORM */}

          <div className="contact-form-card">

            <h2>
              Send us a message
            </h2>

            <p>
              Fill in the form below and we'll get back
              to you shortly.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="contact-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-submit-button"
              >
                Send Message
              </button>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Contact;