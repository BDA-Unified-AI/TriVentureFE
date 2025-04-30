// types/types.ts

export interface Reaction {
  id: string;
  type: number;
}

export interface Post {
  id: string;
  content: string;
  picture?: string[];
  created_at: string;
  updated_at: string;
  user_info: {
    user_id: string;
    name: string;
    picture: string;
  };
  destination_id: string;
  destination_name: string;
  comment_count: number;
  reaction_count: number;
  current_user_reaction?: {
    id: string;
    reaction_type: number;
  };
  reactions?: Reaction[];
}

export interface DestinationItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Comment {
  id: string;
  content: string;
  post_id: string;
  user_id: string; // Ensure this field is defined in your Comment interface
  user_info?: {
    name: string;
    picture: string;
    user_id: string;
  };
  created_at: string;
  updated_at: string;
}
