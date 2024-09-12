import React from "react";

const DropDown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select onChange={func} defaultValue="0" name="format" id="format" className="">
        <option value="0" disabled>
          {title}
        </option>

        {options.map((o, i) => (
          <option key={i} value={o} className="">
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
