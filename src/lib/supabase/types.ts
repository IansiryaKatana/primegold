export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & {
          id: string
          email: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
        Relationships: []
      }
      branches: {
        Row: {
          id: string
          slug: string
          name: string
          address: string
          city: string
          state: string
          country: string
          latitude: number
          longitude: number
          phone: string
          opening_hours: string | null
          services: string[]
          published: boolean
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['branches']['Row']> & {
          slug: string
          name: string
          address: string
          city: string
          state: string
          latitude: number
          longitude: number
          phone: string
        }
        Update: Partial<Database['public']['Tables']['branches']['Row']>
        Relationships: []
      }
      products: {
        Row: {
          id: string
          slug: string
          name: string
          description_html: string | null
          metal_type: string
          weight: string
          purity: string
          base_price_minor: number
          currency: string
          image_url: string | null
          in_stock: boolean
          published: boolean
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['products']['Row']> & {
          slug: string
          name: string
          metal_type: string
          weight: string
          purity: string
        }
        Update: Partial<Database['public']['Tables']['products']['Row']>
        Relationships: []
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          title: string
          price_minor: number
          sku: string | null
          available: boolean
          weight_g: number | null
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['product_variants']['Row']> & {
          product_id: string
          price_minor: number
        }
        Update: Partial<Database['public']['Tables']['product_variants']['Row']>
        Relationships: []
      }
      collections: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          sort_default: string
          is_public: boolean
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['collections']['Row']> & {
          slug: string
          title: string
        }
        Update: Partial<Database['public']['Tables']['collections']['Row']>
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          status: string
          payment_status: string
          currency: string
          subtotal_minor: number
          shipping_minor: number
          tax_minor: number
          total_minor: number
          shipping_method: string | null
          customer_email: string
          customer_name: string | null
          stripe_session_id: string | null
          placed_at: string
        }
        Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
          order_number: string
          customer_email: string
          total_minor: number
        }
        Update: Partial<Database['public']['Tables']['orders']['Row']>
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_title: string
          variant_id: string | null
          qty: number
          unit_price_minor: number
          line_total_minor: number
        }
        Insert: Partial<Database['public']['Tables']['order_items']['Row']> & {
          order_id: string
          product_title: string
          qty: number
          unit_price_minor: number
          line_total_minor: number
        }
        Update: Partial<Database['public']['Tables']['order_items']['Row']>
        Relationships: []
      }
      appointments: {
        Row: {
          id: string
          user_id: string | null
          branch_id: string | null
          mode: string
          service_type: string
          first_name: string
          last_name: string
          email: string
          phone: string
          preferred_date: string
          preferred_time: string
          address: string | null
          status: string
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['appointments']['Row']> & {
          service_type: string
          first_name: string
          last_name: string
          email: string
          phone: string
          preferred_date: string
          preferred_time: string
        }
        Update: Partial<Database['public']['Tables']['appointments']['Row']>
        Relationships: []
      }
      kyc_cases: {
        Row: {
          id: string
          user_id: string | null
          order_id: string | null
          status: string
          retention_until: string | null
          created_at: string
          verified_at: string | null
        }
        Insert: Partial<Database['public']['Tables']['kyc_cases']['Row']>
        Update: Partial<Database['public']['Tables']['kyc_cases']['Row']>
        Relationships: []
      }
      kyc_documents: {
        Row: {
          id: string
          kyc_case_id: string
          doc_type: string
          file_path: string
          status: string
          uploaded_at: string
        }
        Insert: Partial<Database['public']['Tables']['kyc_documents']['Row']> & {
          kyc_case_id: string
          doc_type: string
          file_path: string
        }
        Update: Partial<Database['public']['Tables']['kyc_documents']['Row']>
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          consent_at: string
          status: string
        }
        Insert: Partial<Database['public']['Tables']['newsletter_subscribers']['Row']> & {
          email: string
        }
        Update: Partial<Database['public']['Tables']['newsletter_subscribers']['Row']>
        Relationships: []
      }
      buyback_quotes: {
        Row: {
          id: string
          user_id: string | null
          email: string | null
          estimated_total_minor: number
          currency: string
          status: string
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['buyback_quotes']['Row']> & {
          estimated_total_minor: number
        }
        Update: Partial<Database['public']['Tables']['buyback_quotes']['Row']>
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          body_html: string
          image_url: string | null
          published_at: string
        }
        Insert: Partial<Database['public']['Tables']['blog_posts']['Row']> & {
          slug: string
          title: string
          body_html: string
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>
        Relationships: []
      }
      carts: {
        Row: {
          id: string
          user_id: string | null
          session_token: string | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: Partial<Database['public']['Tables']['carts']['Row']>
        Update: Partial<Database['public']['Tables']['carts']['Row']>
        Relationships: []
      }
      cart_items: {
        Row: {
          id: string
          cart_id: string
          variant_id: string
          qty: number
          unit_price_minor: number
          created_at: string
        }
        Insert: Partial<Database['public']['Tables']['cart_items']['Row']> & {
          cart_id: string
          variant_id: string
          qty: number
          unit_price_minor: number
        }
        Update: Partial<Database['public']['Tables']['cart_items']['Row']>
        Relationships: []
      }
      price_snapshots: {
        Row: {
          id: string
          metal: string
          currency: string
          spot_minor: number
          captured_at: string
        }
        Insert: Partial<Database['public']['Tables']['price_snapshots']['Row']> & {
          metal: string
          spot_minor: number
        }
        Update: Partial<Database['public']['Tables']['price_snapshots']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
