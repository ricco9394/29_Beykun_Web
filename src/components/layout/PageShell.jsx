import { Outlet } from 'react-router-dom';
import { LeftSidebar } from '../sidebars/LeftSidebar';
import { RightSidebar } from '../sidebars/RightSidebar';

export function PageShell() {
  return (
    <div className="wrapper">
      <div className="main-grid">
        <LeftSidebar />
        <div className="content-area">
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
