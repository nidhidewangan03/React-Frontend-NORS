
import React from 'react';
import './Switch.css';


const Switch = (props) => {
  return (
    <> 
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
      {/* switch2 */}
      <input
        className="react-switch-checkbox"
        id={`react-switch-new1`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new1`}
      >
        <span className={`react-switch-button`} />
      </label>
      {/* switch3 */}
      <input
        className="react-switch-checkbox"
        id={`react-switch-new2`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new2`}
      >
        <span className={`react-switch-button`} />
      </label>
      
       {/* switch4 */}
       <input
        className="react-switch-checkbox"
        id={`react-switch-new4`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new4`}
      >
        <span className={`react-switch-button`} />
      </label>
       {/* switch5 */}
       <input
        className="react-switch-checkbox"
        id={`react-switch-new5`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new5`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;