export interface ModelProjectDetails {
  code: string;
  id: number;
  user_id: number;
  name: string;
  id_province: number;
  id_district: number;
  id_ward: number;
  street: string;
  project_scale: string;
  name_status: string;
  address: string;
  friendly_url: string;
  phone: string;
  type_of_price: number;
  price_min: number;
  price_max: number;
  price: number;
  acreage: number;
  acreage_min: number;
  acreage_max: number;
  description: string;
  project_period: number;
  project_period_by_day: string;
  start_date: string;
  end_date: string;
  longitude: number;
  latitude: number;
  design_images: string;
  avatar_images: string;
  number_of_images: number;
  number_of_videos: number;
  status: number;
  deleted_at: string | number;
  view: number;
  share: number;
  like: number;
  bad_report: number;
  active: number;
  comment: number;
  investor: string;
  project_type: string;
  approval_date: string;
  expiration_date: string;
  created_at: string;
  updated_at: string;
  name_project_type: string;
  hidePhone: string;
  keywords: string;
  tag: string;
}

export interface ModelUtilities {
  id: number;
  id_project: number;
  utility_type: number;
  name: string;
  type: number;
  description: string;
  distance: number;
  deleted_at: string;
  longitude: number;
  latitude: number;
  address: string;
  created_at: string;
  updated_at: string;
  utility_type_name: string;
}

export interface ModelUtilitiesType {
  id: number;
  name: string;
  icon: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface ModelListsImg {
  id: number;
  name: string;
  type: string;
  size: null;
  path: string;
  user_id: number;
  data_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  data_type: number;
}

export interface ModelListsSimilar {
  id: number;
  user_id: number;
  name: string;
  id_province: number;
  id_district: number;
  id_ward: number;
  street: string;
  address: string;
  type_of_price: number;
  price_min: number;
  price_max: number;
  price: number;
  acreage: number;
  acreage_min: number;
  acreage_max: number;
  description: string;
  longitude: number;
  latitude: number;
  avatar_images: string;
  number_of_images: number;
  number_of_videos: number;
  status: number;
  deleted_at: string;
  view: number;
  share: number;
  like: number;
  bad_report: number;
  active: number;
  comment: number;
  investor: string;
  project_type: string;
  approval_date: string;
  created_at: string;
  updated_at: string;
  project_scale: string | number;
  name_district: string;
  name_province: string;
  name_wards: string;
  name_status: string;
  name_project_type: string;
  friendly_url: string;
}
