import { NextResponse } from 'next/server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'

export async function GET() {
  const supabase = createClientComponentClient()
  
  try {
    // Test database connection
    const { data: dbTest, error: dbError } = await supabase
      .from('api_logs')
      .select('id')
      .limit(1)
    
    if (dbError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to query api_logs table',
        error: dbError,
      }, { status: 500 })
    }
    
    // Get a valid endpoint ID to use as the foreign key
    const { data: endpoint, error: endpointError } = await supabase
      .from('endpoints')
      .select('id')
      .limit(1)
      .single()
    
    if (endpointError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to get a valid endpoint ID',
        error: endpointError,
      }, { status: 500 })
    }
    
    const mock_api_id = endpoint?.id
    
    if (!mock_api_id) {
      return NextResponse.json({
        status: 'error',
        message: 'No endpoints found in the database',
      }, { status: 500 })
    }
    
    // Test insert with minimal data
    const minimalData = {
      id: randomUUID(),
      mock_api_id,
      timestamp: new Date().toISOString(),
      response_status: 200,
      response_time_ms: 42
    }
    
    const { data: minimalInsert, error: minimalError } = await supabase
      .from('api_logs')
      .insert(minimalData)
      .select()
    
    if (minimalError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to insert minimal data into api_logs',
        error: minimalError,
        data: minimalData
      }, { status: 500 })
    }
    
    // Try a more complete insert
    const completeData = {
      id: randomUUID(),
      mock_api_id,
      timestamp: new Date().toISOString(),
      request_ip: '127.0.0.1',
      request_headers: { 'test-header': 'value' },
      request_body: { test: 'data' },
      response_status: 200,
      response_time_ms: 42
    }
    
    const { data: completeInsert, error: completeError } = await supabase
      .from('api_logs')
      .insert(completeData)
      .select()
    
    if (completeError) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to insert complete data into api_logs',
        error: completeError,
        data: completeData
      }, { status: 500 })
    }
    
    // Test successful, return results
    return NextResponse.json({
      status: 'success',
      message: 'Successfully tested api_logs table',
      minimalInsert,
      completeInsert,
      diagnostic: {
        tableExists: Array.isArray(dbTest),
        validEndpointID: mock_api_id
      }
    })
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: 'Uncaught exception testing api_logs',
      error: err instanceof Error ? err.message : String(err)
    }, { status: 500 })
  }
} 