const pluralize = require('pluralize')

module.exports = {
  formatReqPayload: (obj) => {
    return JSON.stringify({
      data: {
        type: pluralize.plural(obj.modelName),
        attributes: obj.attributes,
        relationships: obj.relationships
      }
    })
  },
  runArbitraryRequest : (req, headers = {}) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(req.method, req.url)
      xhr.setRequestHeader('Content-Type', 'application/vnd.api+json')
      xhr.setRequestHeader('Accept', 'application/vnd.api+json')
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key.toString(), headers[key].toString())
      })
      xhr.send(req.data)

      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if (xhr.status >= 200 && xhr.status < 300){
            resolve(xhr.responseText);
          } else{
            reject({
              status: xhr.status,
              data: xhr.responseText
            })
          }
        }
      }
    })
  }
}
