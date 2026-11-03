import React from "react";
import "./TopBar.css";

export default function TopBar({ query, onQueryChange, onSeller, cartCount, onCart, onSearchSubmit }) {
  return <header className="topbar"><button className="brand" onClick={onSearchSubmit} aria-label="Go home"><span className="brand-mark">a</span><span>artsy<span className="brand-dot">.</span></span></button><form className="search-container" onSubmit={(event) => { event.preventDefault(); onSearchSubmit(); }}><span className="search-icon">⌕</span><input aria-label="Search artists and posts" type="search" placeholder="Search artists, posts, and more" value={query} onChange={(event) => onQueryChange(event.target.value)}/><kbd>↵</kbd></form><div className="topbar-actions"><button className="cart-button" onClick={onCart}><span>Bag</span><span className="cart-count">{cartCount}</span></button><button className="seller-button" onClick={onSeller}>＋ <span>Create post</span></button><button className="top-avatar" onClick={onSeller} aria-label="Create a post">Y</button></div></header>;
}
