export interface ModelNewsDetail {
  id: number;
  user_id: number;
  type_of_operation: number;
  type_of_real_estate: number;
  province: number;
  district: number;
  ward: number;
  street: string;
  address: string;
  phone: string;
  type_of_money_price: number;
  price_min: number;
  price_max: number;
  price: number;
  acreage: number;
  acreage_min: number;
  acreage_max: number;
  direction: number;
  legal_status: number;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  title: string;
  description: string;
  type_of_post: number;
  post_period: number;
  start_date: string;
  expiration_date: string;
  end_date: string;
  longitude: number;
  latitude: number;
  design_images: string | any;
  avatar_images: string;
  number_of_images: number;
  number_of_videos: number;
  status: number;
  deleted_at: string;
  view: number;
  total_of_share: number;
  total_of_like: number;
  total_of_bad_report: number;
  video: string | any;
  active: number;
  total_of_comment: number | any;
  fee: number;
  code: string;
  created_at: string;
  updated_at: string;
  name_legal_status: string;
  name_direction: string;
  name_operations: string;
  name_post_types: string;
  name_district: string;
  name_province: string;
  name_wards: string;
  name_estates: string;
  hidePhone: string;
  id_project: any;
  unit: string;
  friendly_url: string;
  width: number,
  height: number,
  front_side: number,
  road: number,
  floors_number: number,
  furniture: string,
}

export interface ModelDataFiles {
  id: number;
  name: string;
  type: string;
  size: number | string;
  path: string;
  user_id: number | string;
  post_id: number;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ParamsReactLike {
  user_id: number;
  activity_id: number;
  post_id: number;
  status: number;
  social_network: string;
  description: string;
  name: string;
}

export interface ParamsReactDislike {
  user_id: number;
  activity_id: number;
  post_id: number;
}

export interface ModelListsSimilar {
  id: number;
  user_id: number;
  type_of_operation: number;
  type_of_real_estate: number;
  province: number;
  district: number;
  ward: number;
  street: string;
  address: string;
  phone: string;
  type_of_money_price: number;
  price_min: number;
  price_max: number;
  price: number;
  acreage: number;
  acreage_min: number;
  acreage_max: number;
  direction: number;
  legal_status: number;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  title: string;
  description: string;
  type_of_post: number;
  post_period: number;
  post_period_by_day: number;
  start_date: string;
  end_date: string;
  longitude: number;
  latitude: number;
  design_images: string;
  avatar_images: string;
  number_of_images: number;
  number_of_videos: number;
  status: number;
  deleted_at: string;
  view: number;
  total_of_share: number;
  total_of_like: number;
  total_of_bad_report: number;
  video: number;
  active: number;
  total_of_comment: number;
  fee: number;
  code: string;
  approval_date: string;
  expiration_date: string;
  seo_title: string;
  friendly_url: string;
  content: string;
  tag: string;
  keywords: string;
  created_at: string;
  updated_at: string;
  id_project: number;
  name_legal_status: string;
  name_direction: string;
  name_operations: string;
  name_post_types: string;
  name_district: string;
  name_province: string;
  name_wards: string;
  name_estates: string;
  project_name: string;
}
