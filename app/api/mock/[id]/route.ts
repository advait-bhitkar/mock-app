import { NextResponse } from 'next/server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Define all the route handlers following Next.js standards
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'GET')
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'POST')
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'PUT')
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'DELETE')
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const endpointId = context.params.id
  return handleMockRequest(endpointId, 'PATCH')
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

// Common handler for all requests
async function handleMockRequest(endpointId: string, method: string) {
  const supabase = createClientComponentClient()
  
  try {
    // Try to log the request for analytics
    try {
      await supabase
        .from('request_logs')
        .insert([{
          endpoint_id: endpointId,
          method,
          timestamp: new Date().toISOString()
        }])
    } catch (logError) {
      console.error('Failed to log request:', logError)
      // Continue even if logging fails
    }
    
    // Get the endpoint configuration
    const { data: endpoint, error } = await supabase
      .from('endpoints')
      .select('*')
      .eq('id', endpointId)
      .single()
    
    if (error || !endpoint) {
      return NextResponse.json(
        { error: 'Endpoint not found' },
        { 
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
    
    // Check if method is allowed
    if (endpoint.method !== method) {
      return NextResponse.json(
        { error: `Method ${method} not allowed` },
        { 
          status: 405,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Allow': endpoint.method
          }
        }
      )
    }
    
    // Parse the response body
    let responseBody
    try {
      responseBody = JSON.parse(endpoint.response_body)
    } catch (e) {
      responseBody = { message: endpoint.response_body }
    }
    
    // Return the configured response
    return NextResponse.json(
      responseBody,
      { 
        status: endpoint.status_code,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (err) {
    console.error('Error handling mock request:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
} 