function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ paddingLeft: '20px' }}>
      <span className="navbar-brand">
        <strong>TODO LIST</strong>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}

export default Navbar;
