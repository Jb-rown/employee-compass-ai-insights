import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Upload, Settings, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-1">
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border p-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/employees" icon={<Users size={18} />} label="Employees" />
          <NavItem to="/predict" icon={<LineChart size={18} />} label="Predict Retention" />
          <NavItem to="/upload" icon={<Upload size={18} />} label="Upload Data" />
          <NavItem to="/admin/settings" icon={<Settings size={18} />} label="Admin/Settings" />
        </div>
      </aside>
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default DashboardLayout;
