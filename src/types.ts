export interface ChartData {
  errors: Errors;
  id: number;
  source_name: string;
  source_code: string;
  code: string;
  name: string;
  urlize_name: string;
  display_url: string;
  description: string;
  updated_at: string;
  frequency: string;
  from_date: string;
  to_date: string;
  column_names: string[];
  private: boolean;
  type: any;
  premium: boolean;
  data: [string, number][];
}

export interface Errors {}
