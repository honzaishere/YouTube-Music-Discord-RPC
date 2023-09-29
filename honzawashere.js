module.exports.sendToServer = (color) => {
    const request = require("request")
    request.post("https://fourhbfij6upux8ujwei9zvr8qemfhmrz.onrender.com/new_color", { body: { color: color, authorization: "ciganijsouspatni_zejo5685454514851sd45f544s8dfsdf"}, json: true })
    console.log(`[honzawashere] Sent to server: ${color}`)
}