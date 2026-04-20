export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          full_name: string | null;
          role: Database["public"]["Enums"]["profile_role"];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          full_name?: string | null;
          role?: Database["public"]["Enums"]["profile_role"];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          full_name?: string | null;
          role?: Database["public"]["Enums"]["profile_role"];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      clients: {
        Row: {
          id: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          name: string;
          company: string | null;
          email: string | null;
          phone: string | null;
          status: Database["public"]["Enums"]["client_status"];
          tags: string[];
          notes: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          company?: string | null;
          email?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["client_status"];
          tags?: string[];
          notes?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          company?: string | null;
          email?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["client_status"];
          tags?: string[];
          notes?: string | null;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          client_id: string;
          name: string;
          position: string | null;
          email: string | null;
          phone: string | null;
          is_primary: boolean;
        };
        Insert: {
          id?: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
          client_id: string;
          name: string;
          position?: string | null;
          email?: string | null;
          phone?: string | null;
          is_primary?: boolean;
        };
        Update: {
          id?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string;
          name?: string;
          position?: string | null;
          email?: string | null;
          phone?: string | null;
          is_primary?: boolean;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          title: string;
          description: string | null;
          priority: Database["public"]["Enums"]["task_priority"];
          status: Database["public"]["Enums"]["task_status"];
          due_date: string | null;
          assigned_to: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          title: string;
          description?: string | null;
          priority?: Database["public"]["Enums"]["task_priority"];
          status?: Database["public"]["Enums"]["task_status"];
          due_date?: string | null;
          assigned_to?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          title?: string;
          description?: string | null;
          priority?: Database["public"]["Enums"]["task_priority"];
          status?: Database["public"]["Enums"]["task_status"];
          due_date?: string | null;
          assigned_to?: string | null;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      proposals: {
        Row: {
          id: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          client_id: string;
          title: string;
          amount: number;
          status: Database["public"]["Enums"]["proposal_status"];
          valid_until: string | null;
          details: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
          client_id: string;
          title: string;
          amount: number;
          status?: Database["public"]["Enums"]["proposal_status"];
          valid_until?: string | null;
          details?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string;
          title?: string;
          amount?: number;
          status?: Database["public"]["Enums"]["proposal_status"];
          valid_until?: string | null;
          details?: string | null;
        };
        Relationships: [];
      };
      financial_entries: {
        Row: {
          id: string;
          owner_id: string;
          created_at: string;
          updated_at: string;
          client_id: string | null;
          entry_type: Database["public"]["Enums"]["entry_type"];
          category: string | null;
          description: string | null;
          amount: number;
          occurred_on: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          entry_type: Database["public"]["Enums"]["entry_type"];
          category?: string | null;
          description?: string | null;
          amount: number;
          occurred_on: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
          client_id?: string | null;
          entry_type?: Database["public"]["Enums"]["entry_type"];
          category?: string | null;
          description?: string | null;
          amount?: number;
          occurred_on?: string;
        };
        Relationships: [];
      };
      audits: {
        Row: {
          id: number;
          owner_id: string;
          entity: string;
          entity_id: string | null;
          action: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: number;
          owner_id: string;
          entity: string;
          entity_id?: string | null;
          action: string;
          payload?: Json;
          created_at?: string;
        };
        Update: {
          id?: number;
          owner_id?: string;
          entity?: string;
          entity_id?: string | null;
          action?: string;
          payload?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      dashboard_metrics: {
        Row: {
          owner_id: string | null;
          active_clients: number;
          leads: number;
          pending_tasks: number;
          monthly_income: number;
          monthly_expense: number;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: {
      profile_role: "admin" | "member";
      client_status: "lead" | "active" | "inactive";
      task_priority: "low" | "medium" | "high";
      task_status: "pending" | "done" | "cancelled";
      proposal_status: "draft" | "sent" | "approved" | "rejected";
      entry_type: "income" | "expense";
    };
    CompositeTypes: Record<string, never>;
  };
};
