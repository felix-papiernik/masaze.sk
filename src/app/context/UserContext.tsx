"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@prisma/client";
import { EntityData } from "@/schema/TokenPayload";

interface EntityContextType {
  entity: EntityData | null;
  setEntity: (entity: EntityData | null) => void;
}

const EntityContext = createContext<EntityContextType | undefined>(undefined);

export function EntityProvider({
  children,
  initialEntity,
}: {
  children: ReactNode;
  initialEntity: EntityData | null;
}) {
  const [entity, setEntity] = useState<EntityData | null>(initialEntity);

  return (
    <EntityContext.Provider value={{ entity: entity, setEntity: setEntity }}>
      {children}
    </EntityContext.Provider>
  );
}

export function useUser() {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
