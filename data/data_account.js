module.exports.account = (dataold) => {
    
    const data = {
        user: dataold.user,
        coin: dataold.coin,
        level: dataold.level == undefined || dataold.level == null ? 0 : dataold.level,
        exp: dataold.exp == undefined || dataold.exp == null ? 0 : dataold.exp, 
        role: dataold.role,
        status: dataold.status
    }
}