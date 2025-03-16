import React, { useState } from "react";
import { useImmer } from "use-immer";
import "./UserProfileWithImmer.css"; // Import the CSS file

const UserProfileWithImmer = () => {
  // Setting up the user profile state with Immer
  const [userProfile, updateUserProfile] = useImmer({
    name: "Azarias A'Neals",
    email: "Azarias.p.Aneals@seattlecolleges.edu",
    contactDetails: {
      phone: "123-456-7890",
      address: "11049 2nd Ave NE, Seattle, WA",
    },
    preferences: {
      newsletter: true,
      notifications: true,
    },
  });

  // Local state for form inputs (so we don’t update immediately)
  const [contactDetails, setContactDetails] = useState({
    phone: userProfile.contactDetails.phone,
    address: userProfile.contactDetails.address,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Update user profile with new contact details
  const updateContactDetails = (e) => {
    e.preventDefault();
    updateUserProfile((draft) => {
      draft.contactDetails.phone = contactDetails.phone;
      draft.contactDetails.address = contactDetails.address;
    });
  };

  // Toggle newsletter subscription status
  const toggleNewsletter = () => {
    updateUserProfile((draft) => {
      draft.preferences.newsletter = !draft.preferences.newsletter;
    });
  };

  return (
    <div className="profile-container">
      <h2>🧑‍💻User Profile 😊</h2>

      <div className="profile-box">
        <p><strong>Name:</strong> {userProfile.name}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Phone:</strong> {userProfile.contactDetails.phone}</p>
        <p><strong>Address:</strong> {userProfile.contactDetails.address}</p>
        <p>
          <strong>Newsletter:</strong>{" "}
          <span className={userProfile.preferences.newsletter ? "subscribed" : "not-subscribed"}>
            {userProfile.preferences.newsletter ? "Subscribed" : "Not Subscribed"}
          </span>
        </p>
      </div>

      <button className="button" onClick={toggleNewsletter}>
        {userProfile.preferences.newsletter ? "Unsubscribe" : "Subscribe"} to Newsletter
      </button>

      <form onSubmit={updateContactDetails} className="profile-form">
        <h3>📞 Update Contact Details 📱</h3>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={contactDetails.phone}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={contactDetails.address}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" className="button">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfileWithImmer;
