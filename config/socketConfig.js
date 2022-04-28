const socket = require('socket.io')

function addSocket(server){
    const io = socket(server);

    io.on('connection', (socket)=>{
        socket.on('join-recipe-page', ({recipeId})=>{
            socket.join(recipeId)
        })

        socket.on('addComment', ({comment,recipeId})=>{
            socket.broadcast.to(recipeId).emit("comment-added", comment)
        })

        socket.on('deleteComment', ({recipeId, commentId})=>{
            socket.broadcast.to(recipeId).emit("comment-deleted", {commentId})
        })

        socket.on('leave-recipe-page', ({recipeId})=>{
            socket.leave(recipeId);
        })
    })
}

module.exports = {
    addSocket
}