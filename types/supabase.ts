export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          codes: string | null;
          created_at: string | null;
          details: string | null;
          id: number;
          image_path: string | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          codes?: string | null;
          created_at?: string | null;
          details?: string | null;
          id?: number;
          image_path?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          codes?: string | null;
          created_at?: string | null;
          details?: string | null;
          id?: number;
          image_path?: string | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          isActivated: boolean | null;
          full_name: string | null;
          id: string;
          isAdmin: boolean | null;
        };
        Insert: {
          avatar_url?: string | null;
          isActivated?: boolean | null;
          full_name?: string | null;
          id: string;
          isAdmin?: Json | null;
        };
        Update: {
          avatar_url?: string | null;
          isActivated?: boolean | null;
          full_name?: string | null;
          id?: string;
          isAdmin?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year";
      pricing_type: "one_time" | "recurring";
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
