import { NextResponse } from 'next/server';
import { query as deeplQuery } from '@/utils/deepl.js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

/**
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>}
 */
export async function POST(request) {
  try {
    // DeepL authentication keys are passed directly to the deeplQuery utility
    const body = await request.json();
    const {
      text,
      source_lang: sourceLang = 'auto',
      target_lang: targetLang = 'en',
    } = body;
    
    const result = await deeplQuery({
      text: text[0] ?? '',
      sourceLang,
      targetLang,
    });
    
    return NextResponse.json(result, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error proxying DeepL request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 