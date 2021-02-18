import { customAlphabet, random } from "nanoid"
import dotenv from 'dotenv';
dotenv.config()

const idLength = parseInt(process.env.ID_LENGTH) || 8
const idAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz'

const generateId = () =>
    customAlphabet(idAlphabet, idLength)


export default generateId()