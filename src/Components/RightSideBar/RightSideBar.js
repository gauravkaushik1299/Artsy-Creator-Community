import React, { useState } from "react";
import "./RightSideBar.css";

const RightSidebar = ({ onMessage = () => {} }) => {
  // Manage which tab is active
  const [activeTab, setActiveTab] = useState("artists");

  // Sample data — replace images with real paths or imports
  const artistItems = [
    {
      id: 1,
      name: "Thomas Edward",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-ekaterina-12203460@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    {
      id: 2,
      name: "Chris Doe",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-genaro-servín-763210@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: false,
    },
    {
      id: 3,
      name: "Emilie Jones",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-pixabay-164455@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    {
      id: 4,
      name: "Jessica Williams",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-steve-johnson-1269968@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    {
      id: 5,
      name: "Thomas Edward",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-ekaterina-12203460@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    {
      id: 6,
      name: "Chris Doe",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-genaro-servín-763210@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: false,
    },
    {
      id: 7,
      name: "Emilie Jones",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-pixabay-164455@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    {
      id: 8,
      name: "Jessica Williams",
      username: "@thewildwithyou",
      image: require("../../Assets/RightSideBar/pexels-steve-johnson-1269968@2x.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
  ];

  // If you have different items for photographers:
  const photographerItems = [
    {
      id: 1,
      name: "John Smith",
      username: "@photogjohn",
      image: require("../../Assets/RightSideBar/pexels-steve-1451567.jpg"),
      profilePic: require("../../Assets/RightSideBar/pexels-anastasia-shuraeva-4406721@2x.jpg"),
      online: true,
    },
    // etc...
  ];

  // Determine which list to display based on active tab
  const displayItems =
    activeTab === "artists" ? artistItems : photographerItems;

  // Handle tab click to switch between artists and photographers
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <aside className="right-sidebar">
      {/* Tabs for switching between artists and photographers */}
      <div className="tabs">
        <button
          className={activeTab === "artists" ? "active" : ""}
          onClick={() => handleTabClick("artists")}
        >
          Artists
        </button>
        <button
          className={activeTab === "photographers" ? "active" : ""}
          onClick={() => handleTabClick("photographers")}
        >
          Photographers
        </button>
      </div>

      {/* List of profiles based on the active tab */}
      <div className="profiles-list">
        {displayItems.map((item) => (
          <div className="profile-card" key={item.id}>
            {/* Background image for the card */}
            <img src={item.image} alt={item.name} className="profile-bg" />

            {/* Dark overlay + text */}
            <div className="profile-overlay">
              <div className="profile-info">
                <h5>{item.name}</h5>
                <span>{item.username}</span>
              </div>

              {/* Optional online status indicator */}
            </div>
            <div className="profile-pic-container">
              <img
                src={item.profilePic}
                alt={`${item.name} profile`}
                className="profile-pic"
              />
              {item.online && <div className="status-indicator online"></div>}
            </div>
            <button className="profile-message" onClick={onMessage} aria-label={`Message ${item.name}`}>↗</button>
          </div>
        ))}
      </div>
      {/* Bottom tabs for additional links */}
      <div className="bottom-tabs">
        <p className="privacy">Privacy</p>
        <p className="terms">Terms of Service</p>
        <p className="cookies">Cookies</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
