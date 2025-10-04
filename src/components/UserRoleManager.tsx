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
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

export function UserRoleManager() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all users with their roles
  const { data: users, isLoading, error } = useQuery<UserProfile[]>({
    queryKey: ['userProfiles'],
    queryFn: async (): Promise<UserProfile[]> => {
      if (!isAdmin) return [];
      
      try {
        // Get all user roles with profile data
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select(`
            user_id,
            role,
            created_at
          `)
          .order('created_at', { ascending: false });
        
        if (rolesError) throw rolesError;
        if (!userRoles || userRoles.length === 0) return [];
        
        // Get profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name');
        
        if (profilesError) console.error('Error fetching profiles:', profilesError);
        
        const profileMap = new Map<string, { first_name: string | null; last_name: string | null }>();
        profiles?.forEach(p => {
          if (p.id) profileMap.set(p.id, { first_name: p.first_name, last_name: p.last_name });
        });
        
        // Map to unique users (highest privilege role)
        const userMap = new Map<string, UserProfile>();
        
        userRoles.forEach(userRole => {
          const existing = userMap.get(userRole.user_id);
          const profile = profileMap.get(userRole.user_id);
          
          if (!existing || 
              (userRole.role === 'admin') ||
              (userRole.role === 'hr' && existing.role !== 'admin')) {
            userMap.set(userRole.user_id, {
              id: userRole.user_id,
              role: userRole.role as 'admin' | 'hr' | 'user',
              email: 'user@example.com', // Email not directly accessible
              first_name: profile?.first_name || null,
              last_name: profile?.last_name || null,
              created_at: userRole.created_at
            });
          }
        });
        
        return Array.from(userMap.values());
      } catch (err) {
        console.error('Error in queryFn:', err);
        return [];
      }
    },
    enabled: !!isAdmin,
    staleTime: 1000 * 60 * 5,
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: 'admin' | 'hr' | 'user' }) => {
      // First, remove all existing roles for the user
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      // Then insert the new role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });
      
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
              <TableHead>User</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.map((userProfile) => (
              <TableRow key={userProfile.id}>
                <TableCell>
                  <div>
                    <div>{userProfile.email}</div>
                    {(userProfile.first_name || userProfile.last_name) && (
                      <div className="text-sm text-muted-foreground">
                        {[userProfile.first_name, userProfile.last_name].filter(Boolean).join(' ')}
                      </div>
                    )}
                  </div>
                </TableCell>
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
