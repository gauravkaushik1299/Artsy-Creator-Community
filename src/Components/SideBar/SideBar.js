import React from "react";
import "./SideBar.css";

const items = ["Home", "Notifications", "Shop", "Conversation", "Wallet", "Subscription", "My Profile", "Settings"];
const icons = { Home: "⌂", Notifications: "♧", Shop: "♡", Conversation: "▤", Wallet: "▣", Subscription: "☆", "My Profile": "◉", Settings: "⚙" };

export default function Sidebar({ activeItem, onNavigate, unread = 0 }) {
  return <aside className="sidebar"><div><div className="sidebar-label">MENU</div><nav className="menu" aria-label="Main navigation"><ul>{items.map((item) => <li key={item}><button className={activeItem === item ? "active" : ""} onClick={() => onNavigate(item)}><span className="nav-icon" aria-hidden="true">{icons[item]}</span><span>{item}</span>{item === "Notifications" && unread > 0 && <span className="unread-badge">{unread}</span>}</button></li>)}</ul></nav></div><div className="sidebar-bottom"><div className="sidebar-promo"><span className="promo-spark">✦</span><strong>Create something<br/>wonderful.</strong><p>Share your work with the community.</p><button onClick={() => onNavigate("My Profile")}>View profile <span>→</span></button></div><button className="logout" onClick={() => onNavigate("My Profile")}><span className="nav-icon">↗</span> My account</button></div></aside>;
}
