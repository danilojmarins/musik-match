export interface UserResponse {
  name: string;
  bio: string;
  state: string;
  city: string;
  type: "COVER" | "AUTHORAL" | "MIXED" | null;
  musicianInstruments:
    | {
        name: string;
        proficiency: number;
      }[]
    | null;
  bandInstruments: string[] | null;
  genres: string[];
  role: "MUSICIAN" | "BAND" | "ADMIN";
}
