import { NextApiRequest, NextApiResponse } from 'next';
import { corsAllMethods, runMiddleware } from '@/utils/cors';
import { query as deeplQuery } from '@/utils/deepl';

const DEFAULT_DEEPL_FREE_API = 'https://api-free.deepl.com/v2/translate';

const getDeepLAPIKey = (keys: string | undefined) => {
  const keyArray = keys?.split(',') ?? [];
  return keyArray.length ? keyArray[Math.floor(Math.random() * keyArray.length)] : '';
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, corsAllMethods);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { DEEPL_FREE_API } = process.env;
  const deepFreeApiUrl = DEEPL_FREE_API || DEFAULT_DEEPL_FREE_API;
  const deeplApiUrl = deepFreeApiUrl;
  const deeplAuthKey = getDeepLAPIKey(process.env['DEEPL_FREE_API_KEYS']);

  const {
    text,
    source_lang: sourceLang = 'auto',
    target_lang: targetLang = 'en',
  }: { text: string[]; source_lang: string; target_lang: string } = req.body;
  
  try {
    const result = await deeplQuery({
      text: text[0] ?? '',
      sourceLang,
      targetLang,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error proxying DeepL request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
