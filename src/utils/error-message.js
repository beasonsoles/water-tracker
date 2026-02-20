export const getErrorMessage = error => {
  if (!error) {
    return 'An error occurred. Please try again'
  }
  let message
  switch (error.code) {
    case 'auth/invalid-credential':
      message = 'Invalid email or password'
      break
    case 'auth/user-not-found':
      message = 'No account found with this email'
      break
    case 'auth/wrong-password':
      message = 'Incorrect password'
      break
    case 'auth/email-already-in-use':
      message = 'This email is already registered'
      break
    case 'auth/network-request-failed':
      message = 'Network error. Please check your internet connection'
      break
    default:
      message = 'An error occurred. Please try again'
      break
  }
  return message
}
