import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-gray-800 text-white h-full p-4">
    <nav>
      <ul className="space-y-4">
        <li>
          <Link to="/home" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/top-up" className="block hover:bg-gray-700 p-2 rounded">Top Up</Link>
        </li>
        <li>
          <Link to="/payment" className="block hover:bg-gray-700 p-2 rounded">Payment</Link>
        </li>
        <li>
          <Link to="/transaction-history" className="block hover:bg-gray-700 p-2 rounded">Transaction History</Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
