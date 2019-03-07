
const loadMessages = async () => {
  const response = await fetch ('/post')
  const jresponse = await response.json()
  formatMessages(jresponse)
}

const formatMessages = (jresponse) => {
  jresponse.forEach( (element) => {
    $('#postContainer').append(element.message)
  })
}

loadMessages()
