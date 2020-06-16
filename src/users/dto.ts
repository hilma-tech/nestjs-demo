
import { Gender } from '../types/gender';

export class CreateUserDTO {
    name: string;
    gender?: Gender = Gender.Male;
    username: string;
    password: string;
}
