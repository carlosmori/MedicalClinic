export interface User {
  name: string;
  email: string;
  password: string;
  profile: string;
  firstTimeLogIn: boolean;
  isProfessionalEnabled?: boolean;
}
