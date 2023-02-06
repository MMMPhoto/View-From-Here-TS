export type Photo = {
  createdAt: Date,
  id:  string,
  lat: number,
  lng: number,
  public_id: string,
  tags?: string[],
  url: string
};
