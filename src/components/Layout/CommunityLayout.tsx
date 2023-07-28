import { Outlet } from 'react-router-dom';

export function CommunityLayout() {
  return (
    <div className='inner'>
      <h2>커뮤니티</h2>
      <Outlet />
    </div>
  );
}
