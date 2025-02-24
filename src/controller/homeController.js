const handleHelloWorld = (req, res) => {
    const name = "Tran Xuan Son"
    return res.render("home.ejs", {name})
}

const handleUserPage= (req, res) => {
    return res.render("user.ejs")
}

const handleAbout = (req, res) => {
    return res.render("about.ejs")
}

const handleCreateNewUser = (req, res) => {
    return res.send("handleCreateNewUser")
}

module.exports = {
    handleHelloWorld: handleHelloWorld,
    handleAbout: handleAbout,
    handleUserPage: handleUserPage,
    handleCreateNewUser: handleCreateNewUser
}