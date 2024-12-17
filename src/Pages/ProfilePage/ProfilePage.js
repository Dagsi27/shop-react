import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import AdsPage from "./AdditionalPages/AdsPage";
import PurchaseHistoryPage from "./AdditionalPages/PurchaseHistoryPage";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Domyślnie profil

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileContent />;
      case "ads":
        return <AdsPage />;
      case "history":
        return <PurchaseHistoryPage />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ProfileHeader setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="container mt-4">{renderSection()}</div>
    </div>
  );
};

export default ProfilePage;
