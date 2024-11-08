function daysToMs(days){
    return (days * 24 * 60 * 60 * 1000)
}

class dataService {
    getDateXDaysAgo(days){
        let now = new Date(Date.now());
        let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        return new Date(nowDate.getTime()-daysToMs(days))
    }
}
module.exports = new dataService();