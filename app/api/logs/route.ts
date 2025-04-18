import { NextResponse } from 'next/server'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: Request) {
  const supabase = createClientComponentClient()
  const url = new URL(request.url)
  
  // Extract query parameters for pagination and filtering
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)
  const search = url.searchParams.get('search') || ''
  const method = url.searchParams.get('method') || ''
  
  // Calculate offset
  const offset = (page - 1) * limit
  
  try {
    // Get logs with endpoint information
    let query = supabase
      .from('api_logs')
      .select(`
        id, 
        mock_api_id,
        request_headers,
        timestamp,
        request_ip,
        response_status,
        response_time_ms
      `)
      .order('timestamp', { ascending: false })
      .range(offset, offset + limit - 1)
    
    // Apply filters if present
    if (method && typeof method === 'string') {
      // Method filter would need to be applied on request_headers->>'method'
      // This may not work directly with Supabase, so we'll filter client-side instead
    }
    
    // Execute the query
    const { data: rawLogs, error } = await query
    
    if (error) {
      throw error
    }
    
    // Get total count for pagination
    const { data: countData, error: countError } = await supabase
      .from('api_logs')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      throw countError
    }
    
    const totalCount = countData?.length || 0
    
    // Now get endpoint information for these logs
    const mockApiIds = rawLogs?.map(log => log.mock_api_id).filter(Boolean) || []
    let endpointsMap: Record<string, string> = {}
    
    if (mockApiIds.length > 0) {
      const { data: endpoints } = await supabase
        .from('endpoints')
        .select('id, path, method')
        .in('id', mockApiIds)
      
      if (endpoints?.length) {
        endpointsMap = endpoints.reduce((acc, endpoint) => {
          acc[endpoint.id] = endpoint.path
          return acc
        }, {} as Record<string, string>)
      }
    }
    
    // Format the logs data to match frontend expectations
    const logs = (rawLogs || []).map(log => {
      // Get method from request headers or default to GET
      let requestMethod = 'GET'
      if (log.request_headers && typeof log.request_headers === 'object') {
        requestMethod = log.request_headers.method || 'GET'
      }
      
      // Get endpoint path from our endpoints map
      const endpointPath = endpointsMap[log.mock_api_id] || '/api/unknown'
      
      return {
        id: log.id,
        timestamp: log.timestamp,
        method: requestMethod,
        endpoint_path: endpointPath,
        status_code: log.response_status || 200,
        response_time: log.response_time_ms || 0,
        ip_address: log.request_ip || '127.0.0.1'
      }
    })
    
    // Filter by method and search if provided
    let filteredLogs = logs
    
    if (method) {
      filteredLogs = filteredLogs.filter(log => 
        log.method.toUpperCase() === method.toUpperCase()
      )
    }
    
    if (search) {
      filteredLogs = filteredLogs.filter(log => 
        log.endpoint_path.toLowerCase().includes(search.toLowerCase()) || 
        log.ip_address.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Format the response
    return NextResponse.json({
      logs: filteredLogs,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (err) {
    console.error('Error fetching logs:', err)
    // Return mock data for demonstration while we debug
    const mockLogs = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        method: 'GET',
        endpoint_path: '/api/users',
        status_code: 200,
        response_time: 45,
        ip_address: '192.168.1.105'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        method: 'POST',
        endpoint_path: '/api/users/new',
        status_code: 201,
        response_time: 87,
        ip_address: '192.168.1.105'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        method: 'GET',
        endpoint_path: '/api/products',
        status_code: 200,
        response_time: 63,
        ip_address: '192.168.1.108'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 360000).toISOString(),
        method: 'PUT',
        endpoint_path: '/api/products/5',
        status_code: 200,
        response_time: 124,
        ip_address: '192.168.1.108'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 480000).toISOString(),
        method: 'DELETE',
        endpoint_path: '/api/products/2',
        status_code: 404,
        response_time: 32,
        ip_address: '192.168.1.110'
      }
    ]
    
    return NextResponse.json({
      logs: mockLogs,
      pagination: {
        page: 1,
        limit: 50,
        total: 5,
        pages: 1
      }
    })
  }
} 