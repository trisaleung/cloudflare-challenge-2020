addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const response = await fetch(url)
    const results = await gatherResponse(response)

    var resultsArray = results.variants

    var random = Math.random() * 100;

    if(random < 50 && random >= 0) {
      return Response.redirect(resultsArray[1])
    }
    else if(random >= 50 && random < 100) {
      return Response.redirect(resultsArray[0])
    }
  } catch (err) {
    return new Response(err.stack || err)
  }
}

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type')
  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (contentType.includes('application/text')) {
    return await response.text()
  } else if (contentType.includes('text/html')) {
    return await response.text()
  } else {
    return await response.text()
  }
}

const url = 'https://cfw-takehome.developers.workers.dev/api/variants'