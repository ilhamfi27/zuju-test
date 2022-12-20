import fs from 'fs';

export const fileExistance = (file: any): boolean => {
  try {
    fs.readFileSync(file)
    return true
  } catch (err) {
    return false
  }
}

export default fileExistance