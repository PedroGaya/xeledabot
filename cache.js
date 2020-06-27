module.exports = {
    cache: {},
    set(args) {
        this.cache = args
    },
    add(args) {
        for (var prop in args) {
            if (args.hasOwnProperty(prop) && !this.cache[prop]) {
                this.cache[prop] = args[prop]
            }
        }
    },
    get() {
        return this.cache
    }
}