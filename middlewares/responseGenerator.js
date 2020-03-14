module.exports.sendResponse = async (res, statusCode, message, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({
    'status': statusCode,
    'message': message,
    'data': data
  }))
  res.end()
}
