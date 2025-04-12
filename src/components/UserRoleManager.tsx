import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Shield, User, Users } from 'lucide-react';

interface UserProfile {
  id: string;
  role: 'admin' | 'hr' | 'user';
  email: string;
  created_at: string;
}

// Mock data for user emails
const mockUserEmails: Record<string, string> = {
  'admin-user-id': 'admin@example.com',
  'hr-user-id': 'hr@example.com',
  'regular-user-id': 'user@example.com',
};

export function UserRoleManager() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'hr' | 'user'>('user');

  // Fetch all users with their roles
  const { data: users, isLoading, error } = useQuery<UserProfile[]>({
    queryKey: ['userProfiles'],
    queryFn: async () => {
      if (!isAdmin) return [];
      
      // Get all profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, role, created_at')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Map the data to our UserProfile interface with mock emails
      return profiles.map(profile => ({
        id: profile.id,
        role: profile.role as 'admin' | 'hr' | 'user',
        // Use mock email or generate a placeholder based on role
        email: mockUserEmails[profile.id] || `${profile.role}@example.com`,
        created_at: profile.created_at
      }));
    },
    enabled: !!isAdmin,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: 'admin' | 'hr' | 'user' }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfiles'] });
      toast.success('User role updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update role: ${error.message}`);
    }
  });

  // Handle role update
  const handleRoleUpdate = (userId: string, newRole: 'admin' | 'hr' | 'user') => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  if (!isAdmin) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            Failed to load user data. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Role Management
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.map((userProfile) => (
              <TableRow key={userProfile.id}>
                <TableCell>{userProfile.email}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userProfile.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                      : userProfile.role === 'hr'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {userProfile.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                    {userProfile.role === 'hr' && <User className="h-3 w-3 mr-1" />}
                    {userProfile.role === 'user' && <User className="h-3 w-3 mr-1" />}
                    {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={userProfile.role}
                    onValueChange={(value: 'admin' | 'hr' | 'user') => 
                      handleRoleUpdate(userProfile.id, value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {new Date(userProfile.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {users ? users.length : 0} users total
        </p>
      </CardFooter>
    </Card>
  );
} 