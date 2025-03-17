import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, PlusCircle, Bell, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
}

const Navbar = ({
  isLoggedIn = true,
  username = "John Doe",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}: NavbarProps) => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate("/campaigns/create");
  };

  const handleLogout = () => {
    // In a real app, this would log the user out
    navigate("/login");
  };
  return (
    <nav className="w-full h-20 px-4 md:px-6 lg:px-8 border-b bg-background flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#623895] flex items-center justify-center">
            <span className="text-white font-bold">GF</span>
          </div>
          <span className="text-xl font-bold hidden md:block">
            GoFundMe Clone
          </span>
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center max-w-md w-full">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-9 w-full" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Search Icon */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/campaigns">Campaigns</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">About Us</Link>
          </Button>
        </div>

        {/* Create Campaign Button */}
        <Button
          onClick={handleCreateCampaign}
          className="hidden sm:flex gap-1 bg-[#623895] hover:bg-[#4e2d76]"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Create Campaign
        </Button>

        {/* Mobile Create Button */}
        <Button
          onClick={handleCreateCampaign}
          variant="ghost"
          size="icon"
          className="sm:hidden"
        >
          <PlusCircle className="h-5 w-5" />
        </Button>

        {isLoggedIn ? (
          <>
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>
                      {username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/donations">My Donations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/pledges">My Pledges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/campaigns">My Campaigns</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Login/Signup Buttons */}
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        )}

        {/* Mobile Menu Button - Only shown on very small screens */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
