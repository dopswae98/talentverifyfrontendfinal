import React from "react";

const FooterComponent = () => {
  return (
    <div
      className="py-3 bg-success position-absolute px-5 fw-bold d-flex align-items-center justify-content-between text-white"
      style={{ backgroundColor: "#a699", right: 0, left: 0, bottom: 0 }}
    >
      <div>&copy; Copyright All rights Reserved</div>
      <div>Talent Verify 2023</div>
    </div>
  );
};

export default FooterComponent;
