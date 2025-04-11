import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(request, params.id, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(request, params.id, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(request, params.id, 'PUT')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(request, params.id, 'DELETE')
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(request, params.id, 'PATCH')
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // For preflight requests, return a successful response with appropriate CORS headers
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

async function handleRequest(
  request: NextRequest,
  endpointId: string,
  method: string
) {
  // Initialize the Supabase client
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    // Log the request for analytics (optional)
    await logRequest(supabase, endpointId, method)
    
    // Fetch the endpoint configuration
    const { data: endpoint, error } = await supabase
      .from('endpoints')
      .select('*')
      .eq('id', endpointId)
      .single()
    
    if (error || !endpoint) {
      return new NextResponse(
        JSON.stringify({ error: 'Endpoint not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }
    
    // Check if the request method matches the endpoint's configured method
    if (endpoint.method !== method) {
      return new NextResponse(
        JSON.stringify({ error: `Method ${method} not allowed for this endpoint` }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Allow': endpoint.method,
          },
        }
      )
    }
    
    // Parse the response body (stored as a string in the database)
    let responseBody: any
    try {
      responseBody = JSON.parse(endpoint.response_body)
    } catch (e) {
      responseBody = { message: endpoint.response_body }
    }
    
    // Return the configured response
    return new NextResponse(
      JSON.stringify(responseBody),
      {
        status: endpoint.status_code,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (err) {
    console.error('Error handling mock request:', err)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}

// Function to log API requests for analytics
async function logRequest(supabase: any, endpointId: string, method: string) {
  try {
    await supabase
      .from('request_logs')
      .insert([
        {
          endpoint_id: endpointId,
          method: method,
          timestamp: new Date().toISOString(),
        }
      ])
  } catch (err) {
    // Log but don't fail the request if logging fails
    console.error('Error logging request:', err)
  }
} 