export enum EmailErrors {
  NONE = 'No errors',
  EMPTY = 'E-mail field can not be empty',
  TAKEN = 'This e-mail already taken. Try to login',
  INVALID = 'Invalid e-mail adress',
}

export enum UsernameErrors {
  NONE = 'No errors',
  EMPTY = 'Username field can not be empty',
  TAKEN = 'Username already exists',
  INVALID = 'Invalid username',
}

export enum PasswordErrors {
  NONE = 'No errors',
  EMPTY = 'Password field can not be empty',
  SHORT = 'Password must be min. 8 characters',
}

export enum RepeatErrors {
  NONE = 'No errors',
  EMPTY = 'This field can not be empty',
  DIFFERENT = 'Passwords are different',
}
