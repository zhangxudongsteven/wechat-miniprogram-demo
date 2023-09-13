
function post(url, req) {
  wx.request({
    url: url,
    method: 'POST',
    data: req,
    success(resp) {
      return resp
    }
  })
}