import {Role} from "./Role";

export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  email: string;
  role: Role;

  constructor(id: number, login: string, password: string, name: string, email: string, role: Role) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
