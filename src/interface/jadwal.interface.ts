import UserInterface from "./user.interface";

interface JadwalInterface {
  tanggal: Date;
  user: Array<UserInterface>;
}

export default JadwalInterface;