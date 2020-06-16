import { Gender } from '../types/gender';

export class CreatePetDTO {
    name: string;
    gender?: Gender = Gender.Male;
    image: string;
    userId: string;
}