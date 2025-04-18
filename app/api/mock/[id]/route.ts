import { NextResponse } from 'next/server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'

// Define all the route handlers following Next.js standards
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'GET', request)
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'POST', request)
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'PUT', request)
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'DELETE', request)
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'PATCH', request)
}

export async function OPTIONS(
  request: Request,
  context: { params: { id: string } }
) {
  return NextResponse.json({}, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}

// // Common handler for all requests
// async function handleMockRequest(endpointId: string, method: string) {
//   const supabase = createClientComponentClient()
  
//   try {
//     // Try to log the request for analytics
//     try {
//       await supabase
//         .from('request_logs')
//         .insert([{
//           endpoint_id: endpointId,
//           method,
//           timestamp: new Date().toISOString()
//         }])
//     } catch (logError) {
//       console.error('Failed to log request:', logError)
//       // Continue even if logging fails
//     }
    
    
//     // Get the endpoint configuration
//     const { data: endpoint, error } = await supabase
//       .from('endpoints')
//       .select('*')
//       .eq('id', endpointId)
//       .single()
    
//     if (error || !endpoint) {
//       return NextResponse.json(
//         { error: 'Endpoint not found' },
//         { 
//           status: 404,
//           headers: {
//             'Access-Control-Allow-Origin': '*'
//           }
//         }
//       )
//     }
    
//     // Check if method is allowed
//     if (endpoint.method !== method) {
//       return NextResponse.json(
//         { error: `Method ${method} not allowed` },
//         { 
//           status: 405,
//           headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Allow': endpoint.method
//           }
//         }
//       )
//     }
    
//     // Parse the response body
//     let responseBody
//     try {
//       responseBody = JSON.parse(endpoint.response_body)
//     } catch (e) {
//       responseBody = { message: endpoint.response_body }
//     }
    
//     // Return the configured response
//     return NextResponse.json(
//       responseBody,
//       { 
//         status: endpoint.status_code,
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       }
//     )
//   } catch (err) {
//     console.error('Error handling mock request:', err)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { 
//         status: 500,
//         headers: {
//           'Access-Control-Allow-Origin': '*'
//         }
//       }
//     )
//   }
// } 

async function handleMockRequest(endpointId: string, method: string, req: Request) {
  const supabase = createClientComponentClient()
  const startTime = Date.now()

  try {
    // Fetch the endpoint config (mock API)
    const { data: endpoint, error } = await supabase
      .from('endpoints')
      .select('*')
      .eq('id', endpointId)
      .single()

    const responseTimeMs = Date.now() - startTime

    // If not found, log and return 404
    if (error || !endpoint) {
      await logRequest({
        supabase,
        mock_api_id: endpointId,
        req,
        status: 404,
        responseTimeMs,
      })

      return NextResponse.json(
        { error: 'Endpoint not found' },
        {
          status: 404,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      )
    }

    // Check if method is allowed
    if (endpoint.method !== method) {
      await logRequest({
        supabase,
        mock_api_id: endpointId,
        req,
        status: 405,
        responseTimeMs,
        user_id: endpoint.user_id,
      })

      return NextResponse.json(
        { error: `Method ${method} not allowed` },
        {
          status: 405,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Allow': endpoint.method,
          },
        }
      )
    }

    // Parse the response body
    let responseBody
    try {
      responseBody = JSON.parse(endpoint.response_body)
    } catch {
      responseBody = { message: endpoint.response_body }
    }

    // Log the request before responding
    await logRequest({
      supabase,
      mock_api_id: endpointId,
      req,
      status: endpoint.status_code,
      responseTimeMs,
      user_id: endpoint.user_id,
    })

    // Return the configured response
    return NextResponse.json(responseBody, {
      status: endpoint.status_code,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    console.error('Error handling mock request:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    )
  }
}

// Logger
async function logRequest({
  supabase,
  mock_api_id,
  req,
  status,
  responseTimeMs,
  user_id,
  bodyText,
}: {
  supabase: any
  mock_api_id: string
  req: Request
  status: number
  responseTimeMs: number
  user_id?: string
  bodyText?: string
}) {
  try {
    const headersObj: Record<string, string> = {}
    req.headers.forEach((value, key) => {
      headersObj[key] = value
    })

    let bodyJson = {}
    if (bodyText) {
      try {
        bodyJson = JSON.parse(bodyText)
      } catch {
        bodyJson = { raw: bodyText }
      }
    }

    console.log('Logging API request to database:', {
      endpoint_id: mock_api_id,
      status: status,
      time: responseTimeMs
    })

    // Create a UUID for the id field
    const id = randomUUID()
    const timestamp = new Date().toISOString()
    
    // Create the log data object
    const logData = {
      id,  // Explicitly provide an ID
      mock_api_id,
      timestamp,
      request_ip: headersObj['x-forwarded-for'] || 'unknown',
      request_headers: headersObj,
      request_body: bodyJson,
      response_status: status,
      response_time_ms: responseTimeMs,
      user_id: user_id || null
    }

    // Attempt to insert the log
    const { data, error } = await supabase
      .from('api_logs')
      .insert(logData)
    
    if (error) {
      console.error('Failed to insert log:', error)
      
      // Try a simplified insert with only essential fields
      const essentialData = {
        id: randomUUID(),  // Generate a new UUID
        mock_api_id,
        timestamp: new Date().toISOString(),
        response_status: status,
        response_time_ms: responseTimeMs
      }
      
      console.log('Attempting simplified insert with:', essentialData)
      
      const { error: fallbackError } = await supabase
        .from('api_logs')
        .insert(essentialData)
      
      if (fallbackError) {
        console.error('Even simplified insert failed:', fallbackError)
      } else {
        console.log('Simplified log insert succeeded')
      }
    } else {
      console.log('Log insert succeeded')
    }
  } catch (err) {
    console.error('Failed to log request (exception):', err)
  }
}
