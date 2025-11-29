import React, { createContext, useState, ReactNode } from "react";

export interface UserGroup {
  id: string;
  name: string;
  discountRate: number;
  description: string;
  memberCount: number;
  createdAt: string;
}

interface UserGroupsContextType {
  groups: UserGroup[];
  addGroup: (group: Omit<UserGroup, "id" | "createdAt" | "memberCount">) => void;
  updateGroup: (id: string, updates: Partial<UserGroup>) => void;
  deleteGroup: (id: string) => void;
  getGroupDiscount: (groupId: string) => number;
}

export const UserGroupsContext = createContext<UserGroupsContextType | undefined>(undefined);

const INITIAL_GROUPS: UserGroup[] = [
  {
    id: "group1",
    name: "Regular Customer",
    discountRate: 0,
    description: "Standard retail customers",
    memberCount: 324,
    createdAt: "2024-01-01",
  },
  {
    id: "group2",
    name: "Gold Member",
    discountRate: 5,
    description: "Loyal customers with Gold loyalty tier",
    memberCount: 87,
    createdAt: "2024-02-15",
  },
  {
    id: "group3",
    name: "Platinum Member",
    discountRate: 10,
    description: "Platinum loyalty tier members",
    memberCount: 23,
    createdAt: "2024-02-15",
  },
  {
    id: "group4",
    name: "Wholesale Partner",
    discountRate: 15,
    description: "Bulk buyers and business partners",
    memberCount: 12,
    createdAt: "2024-03-20",
  },
  {
    id: "group5",
    name: "Affiliate",
    discountRate: 20,
    description: "Affiliate marketers and resellers",
    memberCount: 8,
    createdAt: "2024-04-10",
  },
];

export function UserGroupsProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<UserGroup[]>(INITIAL_GROUPS);

  const addGroup = (groupData: Omit<UserGroup, "id" | "createdAt" | "memberCount">) => {
    const newGroup: UserGroup = {
      ...groupData,
      id: `group${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      memberCount: 0,
    };
    setGroups([...groups, newGroup]);
  };

  const updateGroup = (id: string, updates: Partial<UserGroup>) => {
    setGroups(groups.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGroup = (id: string) => {
    if (groups.length > 1) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const getGroupDiscount = (groupId: string): number => {
    const group = groups.find(g => g.id === groupId);
    return group?.discountRate || 0;
  };

  return (
    <UserGroupsContext.Provider
      value={{
        groups,
        addGroup,
        updateGroup,
        deleteGroup,
        getGroupDiscount,
      }}
    >
      {children}
    </UserGroupsContext.Provider>
  );
}

export function useUserGroups() {
  const context = React.useContext(UserGroupsContext);
  if (context === undefined) {
    throw new Error("useUserGroups must be used within UserGroupsProvider");
  }
  return context;
}
