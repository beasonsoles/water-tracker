export const getImage = (userName) => {
    if (userName === 'Bea') {
        return require('../assets/images/bea.jpeg')
    } else if (userName === 'Jesús') {
        return require('../assets/images/jesus.jpeg')
    } else {
        return require('../assets/images/user.png')
    }
}