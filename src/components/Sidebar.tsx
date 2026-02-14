import { LayoutDashboard, Users, Mail, Settings, Bell, Search, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6 space-y-8 z-50">
      {/* Brand Icon or Logo placeholder */}
      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg mb-4">
        <LayoutDashboard className="w-6 h-6 text-white" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-6">
        <Link href="#" className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm border border-gray-100">
          <LayoutDashboard className="w-6 h-6" />
        </Link>
        <Link href="#" className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
          <Users className="w-6 h-6" />
        </Link>
        <Link href="#" className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
          <Mail className="w-6 h-6" />
        </Link>
        <Link href="#" className="p-3 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
          <Settings className="w-6 h-6" />
        </Link>
      </nav>

      {/* spacer to push logout to bottom */}
      <div className="flex-grow"></div>

       <button className="p-3 text-gray-400 hover:text-red-500 transition-colors mt-auto mb-4">
          <LogOut className="w-6 h-6" />
        </button>
    </aside>
  );
}
