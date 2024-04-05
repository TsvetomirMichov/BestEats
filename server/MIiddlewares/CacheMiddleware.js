module.exports.setChache = (req, res, next) => {
    const period = 60 * 5

    if (req.method === "GET") {
        res.set("Cache-Control", `public, max-age=${period}`)
    } else {
        res.set("Cache-Control", "no-store")
    }

    next()
}

