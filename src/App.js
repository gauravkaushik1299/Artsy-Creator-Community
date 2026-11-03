import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TopBar from "./Components/TopBar/TopBar";
import Sidebar from "./Components/SideBar/SideBar";
import Feed from "./Components/Feed/Feed";
import RightSidebar from "./Components/RightSideBar/RightSideBar";

const initialPosts = [
  { id: 1, name: "Lara Leones", handle: "@thewallart", avatar: require("./Assets/Feed/pexels-ali-pazani-2613260@2x.jpg"), image: require("./Assets/Feed/pexels-humphrey-muleba-2045248@2x.jpg"), text: "A little color and a quiet moment to reset the mind. What do you see in this piece?", likes: 9800, comments: 86, liked: false },
  { id: 2, name: "Thomas J.", handle: "@thecustomcreator", avatar: require("./Assets/Feed/pexels-imad-clicks-9810659@2x.jpg"), image: require("./Assets/Feed/pexels-tobias-bjørkli-2236382@2x.jpg"), text: "Chasing the last light of the day. Made this on the coast last weekend.", likes: 4200, comments: 31, liked: false },
  { id: 3, name: "Studio North", handle: "@studionorth", avatar: require("./Assets/Feed/pexels-ali-pazani-2613260@2x.jpg"), image: require("./Assets/Feed/pexels-steve-1266808.jpg"), text: "New work in progress. The best part is seeing the colors come together.", likes: 1200, comments: 18, liked: false },
];

const products = [
  { name: "Coastal Light", artist: "Thomas J.", price: 120, image: require("./Assets/Feed/pexels-steve-1266808.jpg") },
  { name: "Still Life No. 4", artist: "Lara Leones", price: 85, image: require("./Assets/Feed/pexels-suzyhazelwood-1629236.jpg") },
  { name: "Blue Horizon", artist: "Studio North", price: 160, image: require("./Assets/Feed/pexels-steve-30936353.jpg") },
  { name: "Quiet Shapes", artist: "Mira K.", price: 95, image: require("./Assets/Feed/pexels-steve-30925664.jpg") },
];

function savedState(key, fallback) {
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
}

function App() {
  const [page, setPage] = useState("Home");
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(() => savedState("artsy.posts", initialPosts));
  const [notifications, setNotifications] = useState(() => savedState("artsy.notifications", [
    { id: 1, text: "Emilie Jones liked your artwork", time: "10 minutes ago", read: false },
    { id: 2, text: "Chris Doe started following you", time: "Yesterday", read: false },
    { id: 3, text: "Your weekly creator digest is ready", time: "2 days ago", read: true },
  ]));
  const [cart, setCart] = useState(() => savedState("artsy.cart", []));
  const [notice, setNotice] = useState("");
  const [composer, setComposer] = useState(false);
  const [draft, setDraft] = useState("");
  const [settings, setSettings] = useState(() => savedState("artsy.settings", { email: true, activity: true }));
  useEffect(() => { window.localStorage.setItem("artsy.posts", JSON.stringify(posts)); }, [posts]);
  useEffect(() => { window.localStorage.setItem("artsy.notifications", JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { window.localStorage.setItem("artsy.cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem("artsy.settings", JSON.stringify(settings)); }, [settings]);
  const unread = notifications.filter((item) => !item.read).length;
  const filteredPosts = useMemo(() => posts.filter((post) => `${post.name} ${post.handle} ${post.text}`.toLowerCase().includes(query.toLowerCase())), [posts, query]);
  const flash = (message) => { setNotice(message); window.setTimeout(() => setNotice(""), 2400); };
  const toggleLike = (id) => setPosts((items) => items.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post));
  const addPost = (event) => { event.preventDefault(); if (!draft.trim()) return; setPosts((items) => [{ id: Date.now(), name: "You", handle: "@yourprofile", avatar: require("./Assets/Feed/pexels-ali-pazani-2613260@2x.jpg"), image: require("./Assets/Feed/pexels-steve-1266808.jpg"), text: draft.trim(), likes: 0, comments: 0, liked: false }, ...items]); setDraft(""); setComposer(false); setPage("Home"); flash("Your post is live"); };
  const addToCart = (product) => { setCart((items) => [...items, product]); flash(`${product.name} added to your bag`); };
  const view = () => {
    if (page === "Home" || page === "Shop" || page === "Notifications" || page === "Conversation" || page === "My Profile" || page === "Settings" || page === "Wallet" || page === "Subscription") return null;
    return null;
  };
  const openNotifications = () => { setPage("Notifications"); setNotifications((items) => items.map((item) => ({ ...item, read: true }))); };
  return (
    <div className="app-container">
      <TopBar query={query} onQueryChange={setQuery} onSeller={() => setComposer(true)} cartCount={cart.length} onCart={() => setPage("Shop")} onSearchSubmit={() => setPage("Home")} />
      <div className="content-layout">
        <Sidebar activeItem={page} onNavigate={(item) => item === "Notifications" ? openNotifications() : setPage(item)} unread={unread} />
        <main className="main-content">
          {page === "Home" && <Feed posts={filteredPosts} onLike={toggleLike} onComment={() => setPage("Conversation")} onShare={() => { navigator.clipboard?.writeText(window.location.href); flash("Link copied to clipboard"); }} onCompose={() => setComposer(true)} query={query} />}
          {page === "Shop" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">CREATOR MARKETPLACE</p><h1>Shop artwork</h1><p>Discover original work from independent artists.</p></div><span className="cart-summary">Bag · {cart.length}</span></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><img src={product.image} alt={product.name}/><div className="product-info"><h3>{product.name}</h3><p>by {product.artist}</p><div className="product-buy"><strong>${product.price}</strong><button onClick={() => addToCart(product)}>Add to bag</button></div></div></article>)}</div>{cart.length > 0 && <div className="cart-checkout"><div><strong>{cart.length} item{cart.length === 1 ? "" : "s"} in your bag</strong><span> Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</span></div><button onClick={() => { flash("Checkout is ready to connect to a payment provider"); }}>Continue to checkout</button></div>}</section>}
          {page === "Notifications" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">YOUR ACTIVITY</p><h1>Notifications</h1><p>You're all caught up on unread activity.</p></div><button className="quiet-button" onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}>Mark all read</button></div><div className="notification-list">{notifications.map((item) => <article className={`notification-row ${item.read ? "read" : ""}`} key={item.id}><span className="notification-avatar">{item.text.charAt(0)}</span><div><p>{item.text}</p><small>{item.time}</small></div>{!item.read && <i/>}</article>)}</div></section>}
          {page === "Conversation" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">INBOX</p><h1>Conversations</h1><p>Your messages with the community.</p></div><button className="primary-button" onClick={() => flash("Choose an artist from the community to start a conversation")}>New message</button></div><div className="conversation-list">{[{name:"Emilie Jones", message:"Thanks for sharing your latest work!", time:"10:42 AM"},{name:"Chris Doe",message:"Would you be open to a commission?",time:"Yesterday"},{name:"Thomas Edward",message:"The print arrived safely, love it.",time:"Monday"}].map((m) => <article className="conversation-row" key={m.name}><div className="person-avatar">{m.name.split(" ").map((x) => x[0]).join("")}</div><div className="conversation-copy"><strong>{m.name}</strong><p>{m.message}</p></div><small>{m.time}</small><button aria-label={`Reply to ${m.name}`} onClick={() => flash(`Reply to ${m.name} is ready`)}>Reply</button></article>)}</div></section>}
          {page === "My Profile" && <section className="page-panel"><div className="profile-cover"/><div className="own-profile"><div className="own-avatar">Y</div><div><p className="eyebrow">CREATOR PROFILE</p><h1>Your profile</h1><p>@yourprofile · Independent creator</p></div><button className="quiet-button" onClick={() => flash("Profile editor opened")}>Edit profile</button></div><div className="profile-stats"><div><strong>{posts.length}</strong><span>Posts</span></div><div><strong>248</strong><span>Followers</span></div><div><strong>180</strong><span>Following</span></div></div><h2 className="section-title">Your recent work</h2><div className="profile-work">{posts.slice(0,3).map((post) => <img key={post.id} src={post.image} alt={post.text}/>)}</div></section>}
          {page === "Settings" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">PREFERENCES</p><h1>Settings</h1><p>Manage how you use the community.</p></div></div><div className="settings-list"><label><span><strong>Email updates</strong><small>Product news and creator tips</small></span><input type="checkbox" checked={settings.email} onChange={(e) => setSettings({...settings,email:e.target.checked})}/></label><label><span><strong>Activity notifications</strong><small>Likes, comments, and new followers</small></span><input type="checkbox" checked={settings.activity} onChange={(e) => setSettings({...settings,activity:e.target.checked})}/></label><button className="quiet-button" onClick={() => flash("Your preferences are saved on this device")}>Save preferences</button></div></section>}
          {page === "Wallet" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">PAYMENTS</p><h1>Your wallet</h1><p>Purchases and payout information.</p></div></div><div className="wallet-card"><span>AVAILABLE BALANCE</span><strong>$0.00</strong><p>No payouts yet. Your creator earnings will show here.</p><button className="primary-button" onClick={() => flash("Payout setup is ready to connect to a payment provider")}>Set up payouts</button></div><h2 className="section-title">Recent transactions</h2><p className="empty-note">Transactions will appear here.</p></section>}
          {page === "Subscription" && <section className="page-panel"><div className="page-heading"><div><p className="eyebrow">MEMBERSHIP</p><h1>Subscription</h1><p>Support the creators and art you love.</p></div></div><div className="membership-card"><span>YOUR PLAN</span><h2>Community</h2><p>You're on the free plan. Follow artists and explore the marketplace at no cost.</p><button className="primary-button" onClick={() => flash("You're already on the Community plan")}>Current plan</button></div></section>}
          {view()}
        </main>
        <RightSidebar onMessage={() => setPage("Conversation")} />
      </div>
      {composer && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setComposer(false)}><form className="compose-modal" onSubmit={addPost}><button type="button" className="modal-close" onClick={() => setComposer(false)}>×</button><p className="eyebrow">SHARE WITH THE COMMUNITY</p><h2>Create a post</h2><textarea autoFocus placeholder="What are you creating today?" value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={500}/><div className="compose-footer"><small>{draft.length}/500</small><button className="primary-button" disabled={!draft.trim()}>Publish post</button></div></form></div>}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}
export default App;
