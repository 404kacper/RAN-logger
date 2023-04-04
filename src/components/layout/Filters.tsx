import React, { useState } from "react";
import Dropdown from './Dropdown';
import  '../../App.css';

const Filters = () => {
    const [collapsed, setCollapsed] = useState(false);
  
    const handleToggleCollapse = () => {
      setCollapsed(!collapsed);
    };
  
    return (
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar_header">
            <i className="filter_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
            </i>
            {collapsed ? (   
                <i className="sidebar_expand_icon" onClick={handleToggleCollapse}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                        <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg> 
                </i>) : (
                <>
                    <h6 className="sidebar_filters">Filters</h6>
                    <i className="sidebar_expand_icon" onClick={handleToggleCollapse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </i>
                </>
            )}
        </div>
        {collapsed ? null : (
          <div className="sidebar_content">          
            <Dropdown
            options={[
                { name: 'AM', value: 'AM' },
                { name: 'SDA', value: 'SDA' }
            ]}
            label="vendor"
            />
             <Dropdown
            options={[
                { name: 'asdf', value: 'asdf' },
                { name: 'qwer', value: 'qwer' }
            ]}
            label="type"
            />            
          </div>
        )}
      </div>
    );
  };
  
  export default Filters;