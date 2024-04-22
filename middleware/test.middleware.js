const test = async (req, res, next) => {
    console.log('test middleware')
    next()
}

module.exports = test